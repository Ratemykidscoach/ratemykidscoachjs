"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ReviewRow = {
  review_id: string;
  created_at?: string | null;

  reviewer_full_name: string | null;

  coach_timing: "current" | "past" | null;
  time_ago: string | null;

  state: string | null;

  club_name: string | null;
  coach_name: string | null;
  team_gender: string | null;
  age_group: string | null;

  technical_rating: number | null;
  communication_rating: number | null;
  development_rating: number | null;
  attitude_rating: number | null;
  professionalism_rating: number | null;

  overall_review: string | null;
};

function makeReviewKey(r: ReviewRow) {
  return r.review_id;
}

type VoteState = { like: number; dislike: number; myVote: "like" | "dislike" | null };

function safeAvg(nums: Array<number | null | undefined>) {
  const valid = nums.filter((n): n is number => typeof n === "number" && !Number.isNaN(n));
  if (!valid.length) return null;
  const sum = valid.reduce((a, b) => a + b, 0);
  return Math.round((sum / valid.length) * 10) / 10;
}

function starsString(rating: number | null) {
  if (rating === null) return "☆☆☆☆☆";
  const full = Math.round(rating);
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= full ? "★" : "☆";
  return s;
}

function miniStarsString(rating: number | null) {
  if (!rating) return "☆☆☆☆☆";
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= rating ? "★" : "☆";
  return s;
}

function relativeSubmitted(createdAt?: string | null) {
  if (!createdAt) return "Submitted recently";
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return "Submitted recently";

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Submitted today";
  if (days === 1) return "Submitted 1 day ago";
  if (days < 7) return `Submitted ${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Submitted 1 week ago";
  return `Submitted ${weeks} weeks ago`;
}

function formatReviewerName(full: string | null) {
  if (!full?.trim()) return "Anonymous";
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const lastInitial = parts[parts.length - 1]?.[0]?.toUpperCase() ?? "";
  return `${first} ${lastInitial}.`;
}

function timingLabel(r: ReviewRow) {
  if (r.coach_timing === "current") return { text: "My child's current coach", current: true };
  if (r.coach_timing === "past") {
    const extra = r.time_ago ? ` (${r.time_ago.replace(/-/g, " ")})` : "";
    return { text: `My child's past coach${extra}`, current: false };
  }
  return { text: "Coach relationship not specified", current: false };
}

export default function ReviewsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  // expand/collapse
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // local votes (UI only)
  const [votes, setVotes] = useState<Record<string, VoteState>>({});

  // modal only after submit
  const submitted = searchParams.get("submitted") === "1";
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (submitted) setShowModal(true);
  }, [submitted]);

  useEffect(() => {
    let alive = true;

    async function fetchReviews() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("review_form")
        .select(
          `
          review_id,
          created_at,
          reviewer_full_name,
          coach_timing,
          time_ago,
          state,
          club_name,
          coach_name,
          team_gender,
          age_group,
          technical_rating,
          communication_rating,
          development_rating,
          attitude_rating,
          professionalism_rating,
          overall_review
        `
        )
        .order("created_at", { ascending: false })
        .limit(500);

      if (!alive) return;

      if (error) {
        setError(error.message || "Failed to load reviews.");
        setRows([]);
      } else {
        setRows((data as ReviewRow[]) || []);
      }
      setLoading(false);
    }

    fetchReviews();

    return () => {
      alive = false;
    };
  }, []);

  const computed = useMemo(() => {
    return rows.map((r) => {
      const overall = safeAvg([
        r.technical_rating,
        r.communication_rating,
        r.development_rating,
        r.attitude_rating,
        r.professionalism_rating,
      ]);
      return { ...r, overall };
    });
  }, [rows]);

  function closeModal() {
    setShowModal(false);

    // remove query param without reload
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("submitted");
    const qs = params.toString();
    router.replace(qs ? `/reviews?${qs}` : "/reviews");
  }

  function toggleCard(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleVote(id: string, voteType: "like" | "dislike") {
    setVotes((prev) => {
      const cur = prev[id] ?? { like: 0, dislike: 0, myVote: null };
      const next = { ...cur };

      // clicking same vote removes it
      if (next.myVote === voteType) {
        next.myVote = null;
        if (voteType === "like") next.like = Math.max(0, next.like - 1);
        else next.dislike = Math.max(0, next.dislike - 1);
        return { ...prev, [id]: next };
      }

      // switch vote
      if (next.myVote === "like") next.like = Math.max(0, next.like - 1);
      if (next.myVote === "dislike") next.dislike = Math.max(0, next.dislike - 1);

      next.myVote = voteType;
      if (voteType === "like") next.like += 1;
      else next.dislike += 1;

      return { ...prev, [id]: next };
    });
  }

  return (
    <>
      <div className="page">
        {/* Modal */}
        <div
          className={`modal-overlay ${showModal ? "" : "hidden"}`}
          id="thankYouModal"
          onClick={(e) => {
            if ((e.target as HTMLElement).id === "thankYouModal") closeModal();
          }}
        >
          <div className="modal">
            <button className="close-btn" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <div className="modal-content">
              <h2>Thank You!</h2>
              <p>
                Your review has been successfully submitted. We appreciate you taking the time to help other parents
                make informed decisions about their children's coaches.
              </p>

              <div className="modal-buttons">
                <Link href="/review_form" className="btn btn-primary" onClick={closeModal}>
                  Leave Another Review
                </Link>
                <Link href="/suggest_club" className="btn btn-secondary" onClick={closeModal}>
                  Suggest a Club
                </Link>
                <Link href="/feedback_form" className="btn btn-secondary" onClick={closeModal}>
                  Leave Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Reviews Content */}
        <div className="header">
          <h1>Parent Reviews</h1>
          <p>Real reviews from real parents</p>
        </div>

        <div className="reviews-container">
          {loading && <div style={{ textAlign: "center", color: "#4a4a4a" }}>Loading reviews…</div>}

          {!loading && error && <div style={{ textAlign: "center", color: "#8b2e2e" }}>{error}</div>}

          {!loading && !error && computed.length === 0 && (
            <div style={{ textAlign: "center", color: "#4a4a4a" }}>
              No reviews yet. Be the first to{" "}
              <Link
                href="/review_form"
                style={{ color: "#A8BCA1", textDecoration: "none", fontWeight: 600 }}
              >
                leave a review
              </Link>
              .
            </div>
          )}

          {!loading &&
            !error &&
            computed.map((r) => {
              const id = String(r.review_id);
              const isExpanded = !!expanded[id];

              const overall = (r as any).overall as number | null;
              const overallStars = starsString(overall);
              const reviewer = formatReviewerName(r.reviewer_full_name);
              const submittedLabel = relativeSubmitted(r.created_at);

              const prettyState =
                r.state?.trim()
                  ? r.state.trim().charAt(0).toUpperCase() + r.state.trim().slice(1).toLowerCase()
                  : null;

              const clubLineParts = [
                prettyState,
                r.club_name || "Unknown Club",
                [r.age_group, r.team_gender].filter(Boolean).join(" "),
              ].filter(Boolean);

              const coachName = r.coach_name || "Unknown Coach";
              const timing = timingLabel(r);

              const vote = votes[id] ?? { like: 0, dislike: 0, myVote: null };

              return (
                <div
                  key={makeReviewKey(r)}
                  className={`review-card ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleCard(id)}
                >
                  <div className="review-header">
                    <div className="coach-info">
                      <h3>{coachName}</h3>
                      <div className="club-name">{clubLineParts.join(" | ")}</div>
                      <div className="review-meta">
                        {submittedLabel} • by {reviewer}
                      </div>
                    </div>

                    <div className="rating-badge">
                      <span className="stars">{overallStars}</span>
                      <span className="rating-number">{overall !== null ? overall.toFixed(1) : "—"}</span>
                    </div>
                  </div>

                  <div className="review-footer">
                    <div className="helpful-section">
                      <span className="helpful-label">Was this helpful?</span>
                    </div>

                    <div className="vote-buttons">
                      <button
                        className={`vote-btn ${vote.myVote === "like" ? "active-like" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(id, "like");
                        }}
                        type="button"
                      >
                        <span className="vote-icon">
                          <ThumbsUpIcon />
                        </span>
                        <span className="vote-count">{vote.like}</span>
                      </button>

                      <button
                        className={`vote-btn ${vote.myVote === "dislike" ? "active-dislike" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(id, "dislike");
                        }}
                        type="button"
                      >
                        <span className="vote-icon">
                          <ThumbsDownIcon />
                        </span>
                        <span className="vote-count">{vote.dislike}</span>
                      </button>
                    </div>
                  </div>

                  <div className="expand-indicator">▼ Click to see full review</div>

                  <div className="review-categories">
                    <div className="category">
                      <div className="category-name">Coaching Ability</div>
                      <div className="category-rating">
                        <span className="mini-stars">{miniStarsString(r.technical_rating)}</span>
                        <span>{r.technical_rating ? `${r.technical_rating.toFixed(1)}` : "—"}</span>
                      </div>
                    </div>

                    <div className="category">
                      <div className="category-name">Communication</div>
                      <div className="category-rating">
                        <span className="mini-stars">{miniStarsString(r.communication_rating)}</span>
                        <span>{r.communication_rating ? `${r.communication_rating.toFixed(1)}` : "—"}</span>
                      </div>
                    </div>

                    <div className="category">
                      <div className="category-name">Player Development</div>
                      <div className="category-rating">
                        <span className="mini-stars">{miniStarsString(r.development_rating)}</span>
                        <span>{r.development_rating ? `${r.development_rating.toFixed(1)}` : "—"}</span>
                      </div>
                    </div>

                    <div className="category">
                      <div className="category-name">Attitude</div>
                      <div className="category-rating">
                        <span className="mini-stars">{miniStarsString(r.attitude_rating)}</span>
                        <span>{r.attitude_rating ? `${r.attitude_rating.toFixed(1)}` : "—"}</span>
                      </div>
                    </div>

                    <div className="category">
                      <div className="category-name">Professionalism</div>
                      <div className="category-rating">
                        <span className="mini-stars">{miniStarsString(r.professionalism_rating)}</span>
                        <span>{r.professionalism_rating ? `${r.professionalism_rating.toFixed(1)}` : "—"}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`coaching-status ${timing.current ? "current" : ""}`}>{timing.text}</div>

                  <div className="review-text">{r.overall_review || "No written review provided."}</div>
                </div>
              );
            })}
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #ede6db;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .header {
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .header p {
          font-size: 1.1em;
          color: #4a4a4a;
        }

        .reviews-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-card {
          background: white;
          border-radius: 2px;
          padding: 25px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
          cursor: pointer;
          border-left: 4px solid #b79973;
        }

        .review-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .coach-info {
          flex: 1;
        }

        .coach-info h3 {
          font-size: 1.2em;
          color: #1a1a1a;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .club-name {
          color: #4a4a4a;
          font-size: 0.9em;
          margin-bottom: 8px;
        }

        .review-meta {
          color: #718096;
          font-size: 0.85em;
        }

        .coaching-status {
          display: none;
          background: #f9f7f4;
          padding: 15px 20px;
          border-radius: 2px;
          font-size: 0.9em;
          color: #4a4a4a;
          margin: 15px 0;
          border-left: 3px solid #b79973;
        }

        .review-card.expanded .coaching-status {
          display: block;
        }

        .coaching-status.current {
          background: #d4e0cf;
          color: #2d5016;
          border-left-color: #a8bca1;
        }

        .review-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }

        .helpful-section {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85em;
          color: #718096;
        }

        .helpful-label {
          font-weight: 500;
        }

        .vote-buttons {
          display: flex;
          gap: 12px;
        }

        .vote-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: #f9f7f4;
          border: 1px solid #e2e8f0;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9em;
          color: inherit;
        }

        .vote-btn:hover {
          background: #ede6db;
          border-color: #b79973;
        }

        .vote-btn.active-like {
          background: #d4e0cf;
          border-color: #a8bca1;
          color: #2d5016;
        }

        .vote-btn.active-dislike {
          background: #fce8e8;
          border-color: #e8b4b4;
          color: #8b2e2e;
        }

        .vote-icon svg {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .rating-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .stars {
          color: #b79973;
          font-size: 1.1em;
          letter-spacing: 1px;
        }

        .rating-number {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.95em;
        }

        .review-categories {
          display: none;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
          margin: 20px 0;
          padding: 20px;
          background: #f9f7f4;
          border-radius: 2px;
        }

        .review-card.expanded .review-categories {
          display: grid;
        }

        .category {
          font-size: 0.85em;
        }

        .category-name {
          color: #4a4a4a;
          margin-bottom: 3px;
          font-weight: 500;
        }

        .category-rating {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .mini-stars {
          color: #b79973;
          font-size: 0.9em;
        }

        .review-text {
          display: none;
          color: #4a4a4a;
          line-height: 1.6;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
          white-space: pre-wrap;
        }

        .review-card.expanded .review-text {
          display: block;
        }

        .expand-indicator {
          color: #a8bca1;
          font-size: 0.85em;
          margin-top: 12px;
          font-weight: 500;
        }

        .review-card.expanded .expand-indicator {
          display: none;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-overlay.hidden {
          display: none;
        }

        .modal {
          background: white;
          border-radius: 2px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease-out;
          border-left: 4px solid #a8bca1;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5em;
          color: #a0aec0;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f7fafc;
          color: #1a1a1a;
        }

        .modal-content {
          text-align: center;
        }

        .modal h2 {
          color: #1a1a1a;
          font-size: 1.8em;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .modal p {
          color: #4a4a4a;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .modal-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn {
          padding: 14px 24px;
          border: none;
          border-radius: 2px;
          font-size: 1em;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-family: "Poppins", sans-serif;
        }

        .btn-primary {
          background: #a8bca1;
          color: white;
        }
        .btn-primary:hover {
          background: #92a786;
        }

        .btn-secondary {
          background: #f9f7f4;
          color: #1a1a1a;
        }
        .btn-secondary:hover {
          background: #ede6db;
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 1.8em;
          }
          .review-card {
            padding: 20px;
          }
          .review-categories {
            grid-template-columns: 1fr;
          }
          .modal {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
}

function ThumbsUpIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
    </svg>
  );
}

function ThumbsDownIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.73 5.25h1.035A7.465 7.465 0 0 1 18 9.375a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.535.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 0 0-.322 1.672V21a.75.75 0 0 1-.75.75 2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 0 1 1.5 12c0-2.848.992-5.464 2.649-7.521C4.537 3.997 5.136 3.75 5.754 3.75h5.018c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 0 0 1.423.23ZM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
    </svg>
  );
}
