'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface ClubFormData {
  clubName: string;
  clubLocation: string;
  clubCity: string;
  clubEmail: string;
  clubNotes: string;
}

interface FeedbackFormData {
  ratingCriteria: string;
  featureIdeas: string;
  generalFeedback: string;
  feedbackEmail: string;
}

export default function FeedbackForm() {
  const router = useRouter();
  const [isSubmittingClub, setIsSubmittingClub] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const [clubFormData, setClubFormData] = useState<ClubFormData>({
    clubName: '',
    clubLocation: '',
    clubCity: '',
    clubEmail: '',
    clubNotes: '',
  });

  const [feedbackFormData, setFeedbackFormData] = useState<FeedbackFormData>({
    ratingCriteria: '',
    featureIdeas: '',
    generalFeedback: '',
    feedbackEmail: '',
  });

  const handleClubInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClubFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedbackInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingClub(true);

    if (!clubFormData.clubName.trim() || !clubFormData.clubLocation.trim()) {
      alert('Please fill out at least the club name and state/location.');
      setIsSubmittingClub(false);
      return;
    }

    const row = {
      club_name: clubFormData.clubName.trim(),
      state: clubFormData.clubLocation.trim(),
      city: clubFormData.clubCity.trim() || null,
      email: clubFormData.clubEmail.trim() || null,
      additional_notes: clubFormData.clubNotes.trim() || null,
    };

    try {
      const { data, error } = await supabase
        .from('club_suggestion_form')
        .insert([row])
        .select();

      if (error) {
        console.error('Error inserting club suggestion:', error);
        alert('There was a problem submitting your club suggestion.');
        setIsSubmittingClub(false);
        return;
      }

      // Redirect to thank you page
      router.push('/thankyou_clubsug');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
      setIsSubmittingClub(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);

    if (!feedbackFormData.ratingCriteria.trim() || !feedbackFormData.featureIdeas.trim()) {
      alert('Please fill out the required fields.');
      setIsSubmittingFeedback(false);
      return;
    }

    const row = {
      criteria: feedbackFormData.ratingCriteria.trim(),
      features: feedbackFormData.featureIdeas.trim(),
      other: feedbackFormData.generalFeedback.trim() || null,
      email: feedbackFormData.feedbackEmail.trim() || null,
    };

    try {
      const { data, error } = await supabase
        .from('feedback_form')
        .insert([row])
        .select();

      if (error) {
        console.error('Error inserting feedback:', error);
        alert('There was a problem submitting your feedback.');
        setIsSubmittingFeedback(false);
        return;
      }

      // Redirect to thank you page
      router.push('/thankyou_feedback');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE6DB] py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block text-[#A8BCA1] no-underline font-medium mb-8 text-[15px] transition-colors duration-300 hover:text-[#8a9d85]"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-[42px] font-bold text-[#1a1a1a] mb-4 tracking-tight">
            Help Us Build
          </h1>
          <p className="text-lg text-[#6b6b6b] font-normal max-w-2xl mx-auto leading-relaxed">
            Your feedback shapes what we create. Suggest clubs to add to our database and share what features matter most to you.
          </p>
        </div>

        {/* Suggest a Club Section */}
        <div className="bg-white rounded-sm py-11 px-12 md:px-14 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl md:text-[28px] font-semibold text-[#1a1a1a] mb-3 tracking-tight">
            Suggest a Club
          </h2>
          <p className="text-[15px] text-[#6b6b6b] mb-8 leading-7">
            Don't see your child's club in our list? Let us know and we'll add it to our database!
          </p>

          <div className="bg-[#d4e0cf] p-5 rounded-sm mb-6 text-sm text-[#2d2d2d] leading-7">
            We're currently focused on soccer clubs in Utah and Arizona, but we'd love to know where else you need reviews. This helps us prioritize which clubs and regions to expand to next.
          </div>

          <form onSubmit={handleClubSubmit} id="clubForm">
            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Club Name *
              </label>
              <input
                type="text"
                name="clubName"
                value={clubFormData.clubName}
                onChange={handleClubInputChange}
                required
                placeholder="Enter the club name"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                State/Location *
              </label>
              <input
                type="text"
                name="clubLocation"
                value={clubFormData.clubLocation}
                onChange={handleClubInputChange}
                required
                placeholder="e.g., Utah, Arizona, California"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                City <span className="text-[#9a9a9a] font-normal text-[13px]">(Optional)</span>
              </label>
              <input
                type="text"
                name="clubCity"
                value={clubFormData.clubCity}
                onChange={handleClubInputChange}
                placeholder="What city is this club based in?"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Your Email{' '}
                <span className="text-[#9a9a9a] font-normal text-[13px]">
                  (Optional - if we need to follow up)
                </span>
              </label>
              <input
                type="email"
                name="clubEmail"
                value={clubFormData.clubEmail}
                onChange={handleClubInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Additional Notes{' '}
                <span className="text-[#9a9a9a] font-normal text-[13px]">(Optional)</span>
              </label>
              <textarea
                name="clubNotes"
                value={clubFormData.clubNotes}
                onChange={handleClubInputChange}
                placeholder="Anything else we should know about this club?"
                className="w-full min-h-[120px] px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a] resize-y leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingClub}
              className="w-full py-4 bg-[#A8BCA1] text-[#1a1a1a] border-none rounded-sm text-base font-semibold cursor-pointer transition-all duration-300 font-sans tracking-wider uppercase hover:bg-[#8a9d85] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,188,161,0.3)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingClub ? 'Submitting...' : 'Submit Club Suggestion'}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#d4d4d4] to-transparent my-10" />

        {/* Feature Feedback Section */}
        <div className="bg-white rounded-sm py-11 px-12 md:px-14 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl md:text-[28px] font-semibold text-[#1a1a1a] mb-3 tracking-tight">
            Share Your Feedback
          </h2>
          <p className="text-[15px] text-[#6b6b6b] mb-8 leading-7">
            Help us build the features that matter most to parents. What would make this platform more valuable to you?
          </p>

          <div className="bg-[#d4e0cf] p-5 rounded-sm mb-6 text-sm text-[#2d2d2d] leading-7">
            We're building this platform based on what parents actually need. Your input directly influences what features we prioritize and how we design the review process.
          </div>

          <form onSubmit={handleFeedbackSubmit} id="feedbackForm">
            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                What other criteria would you like to see when rating coaches? *
              </label>
              <textarea
                name="ratingCriteria"
                value={feedbackFormData.ratingCriteria}
                onChange={handleFeedbackInputChange}
                required
                placeholder="e.g., Punctuality, Game Strategy, Conflict Resolution, etc."
                className="w-full min-h-[120px] px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a] resize-y leading-relaxed"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                What features would make this platform most useful to you? *
              </label>
              <textarea
                name="featureIdeas"
                value={feedbackFormData.featureIdeas}
                onChange={handleFeedbackInputChange}
                required
                placeholder="e.g., Coach response to reviews, Parent discussion forums, Team size information, etc."
                className="w-full min-h-[120px] px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a] resize-y leading-relaxed"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Any other feedback or suggestions?{' '}
                <span className="text-[#9a9a9a] font-normal text-[13px]">(Optional)</span>
              </label>
              <textarea
                name="generalFeedback"
                value={feedbackFormData.generalFeedback}
                onChange={handleFeedbackInputChange}
                placeholder="Share any other thoughts, concerns, or ideas..."
                className="w-full min-h-[120px] px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a] resize-y leading-relaxed"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Your Email{' '}
                <span className="text-[#9a9a9a] font-normal text-[13px]">
                  (Optional - if you'd like us to follow up)
                </span>
              </label>
              <input
                type="email"
                name="feedbackEmail"
                value={feedbackFormData.feedbackEmail}
                onChange={handleFeedbackInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingFeedback}
              className="w-full py-4 bg-[#A8BCA1] text-[#1a1a1a] border-none rounded-sm text-base font-semibold cursor-pointer transition-all duration-300 font-sans tracking-wider uppercase hover:bg-[#8a9d85] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,188,161,0.3)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

