'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ReviewForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coachTiming, setCoachTiming] = useState<'current' | 'past' | ''>('');
  const [ratings, setRatings] = useState<{ [key: string]: number | null }>({
    technical: null,
    communication: null,
    development: null,
    attitude: null,
    organization: null,
  });

  const [formData, setFormData] = useState({
    reviewerName: '',
    email: '',
    phone: '',
    timeAgo: '',
    clubName: '',
    coachName: '',
    teamGender: '',
    ageGroup: '',
    explanations: {
      technical: '',
      communication: '',
      development: '',
      attitude: '',
      organization: '',
    },
    reviewText: '',
  });

  // Handle showing/hiding past coach time field
  useEffect(() => {
    if (coachTiming === 'past') {
      const pastTimeElement = document.getElementById('pastCoachTime');
      const timeAgoElement = document.getElementById('timeAgo') as HTMLSelectElement;
      if (pastTimeElement) pastTimeElement.style.display = 'block';
      if (timeAgoElement) timeAgoElement.required = true;
    } else {
      const pastTimeElement = document.getElementById('pastCoachTime');
      const timeAgoElement = document.getElementById('timeAgo') as HTMLSelectElement;
      if (pastTimeElement) pastTimeElement.style.display = 'none';
      if (timeAgoElement) timeAgoElement.required = false;
    }
  }, [coachTiming]);

  // Initialize star rating functionality
  useEffect(() => {
    const starContainers = document.querySelectorAll('.stars');
    
    starContainers.forEach((starContainer) => {
      const stars = starContainer.querySelectorAll('.star');
      const category = (starContainer as HTMLElement).dataset.category;
      if (!category) return;

      const hiddenInput = document.getElementById(`rating-${category}`) as HTMLInputElement;
      if (!hiddenInput) return;

      stars.forEach((star) => {
        const starElement = star as HTMLElement;
        const value = parseInt(starElement.dataset.value || '0');

        // Click handler
        starElement.addEventListener('click', function () {
          hiddenInput.value = value.toString();
          setRatings((prev) => ({
            ...prev,
            [category]: value,
          }));

          stars.forEach((s) => {
            const sElement = s as HTMLElement;
            const sValue = parseInt(sElement.dataset.value || '0');
            if (sValue <= value) {
              sElement.classList.add('active');
            } else {
              sElement.classList.remove('active');
            }
          });
        });

        // Hover handler
        starElement.addEventListener('mouseenter', function () {
          stars.forEach((s) => {
            const sElement = s as HTMLElement;
            const sValue = parseInt(sElement.dataset.value || '0');
            if (sValue <= value) {
              sElement.style.color = '#A8BCA1';
            }
          });
        });
      });

      // Mouse leave handler for the container
      starContainer.addEventListener('mouseleave', function () {
        const currentValue = hiddenInput.value ? parseInt(hiddenInput.value) : null;
        stars.forEach((s) => {
          const sElement = s as HTMLElement;
          const sValue = parseInt(sElement.dataset.value || '0');
          if (currentValue && sValue <= currentValue) {
            sElement.style.color = '#A8BCA1';
          } else {
            sElement.style.color = '#d4d4d4';
          }
        });
      });
    });

    // Cleanup
    return () => {
      starContainers.forEach((container) => {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star) => {
          star.replaceWith(star.cloneNode(true));
        });
      });
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('explanation-')) {
      const category = name.replace('explanation-', '');
      setFormData((prev) => ({
        ...prev,
        explanations: {
          ...prev.explanations,
          [category]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCoachTimingChange = (value: 'current' | 'past') => {
    setCoachTiming(value);
    setFormData((prev) => ({
      ...prev,
      coachTiming: value,
      timeAgo: value === 'current' ? '' : prev.timeAgo,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.email.trim() && !formData.phone.trim()) {
      alert('Please provide at least one contact method (email or phone) for verification.');
      setIsSubmitting(false);
      return;
    }

    const ratingKeys = ['technical', 'communication', 'development', 'attitude', 'organization'];
    const missingRatings = ratingKeys.filter((key) => !ratings[key]);
    if (missingRatings.length > 0) {
      alert('Please rate all categories before submitting.');
      setIsSubmitting(false);
      return;
    }

    // Prepare data for Supabase
    const row = {
      reviewer_full_name: formData.reviewerName.trim(),
      coach_timing: coachTiming,
      club_name: formData.clubName,
      coach_name: formData.coachName.trim(),
      team_gender: formData.teamGender,
      age_group: formData.ageGroup,
      technical_rating: ratings.technical!,
      communication_rating: ratings.communication!,
      development_rating: ratings.development!,
      attitude_rating: ratings.attitude!,
      professionalism_rating: ratings.organization!,
      overall_review: formData.reviewText.trim(),
      email: formData.email.trim() || null,
      phone_number: formData.phone.trim() || null,
      time_ago: formData.timeAgo || null,
      technical_comment: formData.explanations.technical || null,
      communication_comment: formData.explanations.communication || null,
      development_comment: formData.explanations.development || null,
      attitude_comment: formData.explanations.attitude || null,
      professionalism_comment: formData.explanations.organization || null,
    };

    try {
      const { data, error } = await supabase.from('review_form').insert([row]).select();

      if (error) {
        console.error('Error inserting review into Supabase:', error);
        alert('There was a problem submitting your review:\n\n' + (error.message || 'Unknown error'));
        setIsSubmitting(false);
        return;
      }

      // Redirect to thank you page
      router.push('/thankyou_review');
    } catch (err) {
      console.error('Unexpected error submitting review:', err);
      alert('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE6DB] py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-sm py-12 px-11 md:px-14 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <Link
          href="/"
          className="inline-block text-[#A8BCA1] no-underline font-medium mb-5 text-[15px] transition-colors duration-300 hover:text-[#8a9d85]"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-10 pb-8 border-b border-[#EDE6DB]">
          <h1 className="text-3xl md:text-[36px] font-semibold text-[#1a1a1a] mb-3 tracking-tight">
            Leave a Coach Review
          </h1>
          <p className="text-[15px] text-[#6b6b6b] font-normal tracking-wide">
            Help other parents make informed decisions about their child's soccer coach
          </p>
        </div>

        <form onSubmit={handleSubmit} id="reviewForm">
          {/* Reviewer Information */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6 tracking-tight">Your Information</h2>
            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                name="reviewerName"
                value={formData.reviewerName}
                onChange={handleInputChange}
                required
                placeholder="Your name will be displayed publicly"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
                />
              </div>
              <div>
                <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
                />
              </div>
            </div>
            <p className="text-[13px] text-[#6b6b6b] -mt-2 font-normal">
              * At least one contact method required for verification
            </p>
          </div>

          {/* Coach Information */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6 tracking-tight">
              Coach & Team Information
            </h2>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Is this your child's current coach or a past coach? *
              </label>
              <div className="flex gap-6 mt-2.5">
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    id="current"
                    name="coachTiming"
                    value="current"
                    checked={coachTiming === 'current'}
                    onChange={() => handleCoachTimingChange('current')}
                    required
                    className="w-5 h-5 cursor-pointer accent-[#A8BCA1]"
                  />
                  <label htmlFor="current" className="m-0 font-normal cursor-pointer text-[15px]">
                    Current Coach
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    id="past"
                    name="coachTiming"
                    value="past"
                    checked={coachTiming === 'past'}
                    onChange={() => handleCoachTimingChange('past')}
                    className="w-5 h-5 cursor-pointer accent-[#A8BCA1]"
                  />
                  <label htmlFor="past" className="m-0 font-normal cursor-pointer text-[15px]">
                    Past Coach
                  </label>
                </div>
              </div>
            </div>

            <div id="pastCoachTime" className="mb-6 hidden">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                How long ago did they coach your child? *
              </label>
              <select
                name="timeAgo"
                id="timeAgo"
                value={formData.timeAgo}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)]"
              >
                <option value="">Select timeframe</option>
                <option value="within-1-year">Within the last year</option>
                <option value="1-2-years">1-2 years ago</option>
                <option value="2-3-years">2-3 years ago</option>
                <option value="3-plus-years">3+ years ago</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Club Name *
              </label>
              <select
                name="clubName"
                value={formData.clubName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)]"
              >
                <option value="">Select a club</option>
                <optgroup label="Utah Clubs">
                  <option value="La Roca FC">La Roca FC</option>
                  <option value="RSL Academy">RSL Academy</option>
                  <option value="Forza FC">Forza FC</option>
                  <option value="Impact United Soccer Club">Impact United Soccer Club</option>
                  <option value="Utah Avalanche Soccer Club">Utah Avalanche Soccer Club</option>
                  <option value="Utah Arsenal FC">Utah Arsenal FC</option>
                </optgroup>
                <optgroup label="Arizona Clubs">
                  <option value="Phoenix Rising FC Youth">Phoenix Rising FC Youth</option>
                  <option value="RSL-AZ">RSL-AZ</option>
                  <option value="Arizona Arsenal SC">Arizona Arsenal SC</option>
                  <option value="FC Tucson Youth Soccer">FC Tucson Youth Soccer</option>
                  <option value="Arizona Soccer Club (AZSC)">Arizona Soccer Club (AZSC)</option>
                  <option value="FC Arizona">FC Arizona</option>
                  <option value="Soccer Club Del Sol">Soccer Club Del Sol</option>
                  <option value="Phoenix Rush SC">Phoenix Rush SC</option>
                </optgroup>
              </select>
              <Link
                href="/feedback_form"
                className="inline-block mt-3 text-[#A8BCA1] text-sm no-underline font-medium tracking-wide transition-colors duration-300 hover:text-[#8a9d85]"
              >
                Don't see your club? Help us add it!
              </Link>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Coach Name *
              </label>
              <input
                type="text"
                name="coachName"
                value={formData.coachName}
                onChange={handleInputChange}
                required
                placeholder="First and Last Name"
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a]"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Does this coach work with boys, girls, or both? *
              </label>
              <select
                name="teamGender"
                value={formData.teamGender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)]"
              >
                <option value="">Select option</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Age Group/Team *
              </label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)]"
              >
                <option value="">Select age group</option>
                <option value="U6">U6 (Under 6)</option>
                <option value="U8">U8 (Under 8)</option>
                <option value="U10">U10 (Under 10)</option>
                <option value="U12">U12 (Under 12)</option>
                <option value="U14">U14 (Under 14)</option>
                <option value="U16">U16 (Under 16)</option>
                <option value="U18">U18 (Under 18)</option>
                <option value="U19+">U19+ (Under 19 and older)</option>
              </select>
            </div>
          </div>

          {/* Rating Categories */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6 tracking-tight">Rate the Coach</h2>
            <p className="text-[13px] text-[#6b6b6b] mb-6 font-normal">
              Rate each category from 1-5 stars. Your overall rating will be the average of these categories.
            </p>

            <div className="bg-[#F9F7F4] p-5 rounded-sm border-l-[3px] border-[#A8BCA1] mb-8">
              <label className="block font-medium text-[#2d2d2d] mb-3 text-[15px] tracking-wide">
                Coaching Ability / Technical Skills *
              </label>
              <div className="star-rating stars" data-category="technical">
                <span className="star" data-value="1">★</span>
                <span className="star" data-value="2">★</span>
                <span className="star" data-value="3">★</span>
                <span className="star" data-value="4">★</span>
                <span className="star" data-value="5">★</span>
              </div>
              <input type="hidden" id="rating-technical" required />
              <textarea
                name="explanation-technical"
                value={formData.explanations.technical}
                onChange={handleInputChange}
                className="w-full min-h-[70px] mt-3 px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[14px] transition-all duration-300 font-sans bg-white text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] resize-y leading-relaxed placeholder:text-[#9a9a9a]"
                placeholder="Optional: Explain the rating you gave"
              />
            </div>

            <div className="bg-[#F9F7F4] p-5 rounded-sm border-l-[3px] border-[#A8BCA1] mb-8">
              <label className="block font-medium text-[#2d2d2d] mb-3 text-[15px] tracking-wide">
                Communication with Parents *
              </label>
              <div className="star-rating stars" data-category="communication">
                <span className="star" data-value="1">★</span>
                <span className="star" data-value="2">★</span>
                <span className="star" data-value="3">★</span>
                <span className="star" data-value="4">★</span>
                <span className="star" data-value="5">★</span>
              </div>
              <input type="hidden" id="rating-communication" required />
              <textarea
                name="explanation-communication"
                value={formData.explanations.communication}
                onChange={handleInputChange}
                className="w-full min-h-[70px] mt-3 px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[14px] transition-all duration-300 font-sans bg-white text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] resize-y leading-relaxed placeholder:text-[#9a9a9a]"
                placeholder="Optional: Explain the rating you gave"
              />
            </div>

            <div className="bg-[#F9F7F4] p-5 rounded-sm border-l-[3px] border-[#A8BCA1] mb-8">
              <label className="block font-medium text-[#2d2d2d] mb-3 text-[15px] tracking-wide">
                Player Development *
              </label>
              <div className="star-rating stars" data-category="development">
                <span className="star" data-value="1">★</span>
                <span className="star" data-value="2">★</span>
                <span className="star" data-value="3">★</span>
                <span className="star" data-value="4">★</span>
                <span className="star" data-value="5">★</span>
              </div>
              <input type="hidden" id="rating-development" required />
              <textarea
                name="explanation-development"
                value={formData.explanations.development}
                onChange={handleInputChange}
                className="w-full min-h-[70px] mt-3 px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[14px] transition-all duration-300 font-sans bg-white text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] resize-y leading-relaxed placeholder:text-[#9a9a9a]"
                placeholder="Optional: Explain the rating you gave"
              />
            </div>

            <div className="bg-[#F9F7F4] p-5 rounded-sm border-l-[3px] border-[#A8BCA1] mb-8">
              <label className="block font-medium text-[#2d2d2d] mb-3 text-[15px] tracking-wide">
                Attitude / Positivity *
              </label>
              <div className="star-rating stars" data-category="attitude">
                <span className="star" data-value="1">★</span>
                <span className="star" data-value="2">★</span>
                <span className="star" data-value="3">★</span>
                <span className="star" data-value="4">★</span>
                <span className="star" data-value="5">★</span>
              </div>
              <input type="hidden" id="rating-attitude" required />
              <textarea
                name="explanation-attitude"
                value={formData.explanations.attitude}
                onChange={handleInputChange}
                className="w-full min-h-[70px] mt-3 px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[14px] transition-all duration-300 font-sans bg-white text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] resize-y leading-relaxed placeholder:text-[#9a9a9a]"
                placeholder="Optional: Explain the rating you gave"
              />
            </div>

            <div className="bg-[#F9F7F4] p-5 rounded-sm border-l-[3px] border-[#A8BCA1] mb-8">
              <label className="block font-medium text-[#2d2d2d] mb-3 text-[15px] tracking-wide">
                Organization / Professionalism *
              </label>
              <div className="star-rating stars" data-category="organization">
                <span className="star" data-value="1">★</span>
                <span className="star" data-value="2">★</span>
                <span className="star" data-value="3">★</span>
                <span className="star" data-value="4">★</span>
                <span className="star" data-value="5">★</span>
              </div>
              <input type="hidden" id="rating-organization" required />
              <textarea
                name="explanation-organization"
                value={formData.explanations.organization}
                onChange={handleInputChange}
                className="w-full min-h-[70px] mt-3 px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[14px] transition-all duration-300 font-sans bg-white text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] resize-y leading-relaxed placeholder:text-[#9a9a9a]"
                placeholder="Optional: Explain the rating you gave"
              />
            </div>
          </div>

          {/* Written Review */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6 tracking-tight">Your Review</h2>

            <div className="bg-[#F9F7F4] border-l-[3px] border-[#B79973] p-5 mb-5 rounded-sm text-sm text-[#4a4a4a] leading-7">
              <strong className="text-[#1a1a1a] font-semibold">Please keep your review constructive and helpful:</strong>
              <ul className="mt-2.5 ml-5">
                <li className="mb-1.5">Focus on the coach's abilities and approach, not outcomes like playing time</li>
                <li className="mb-1.5">Be specific and fact-based rather than overly emotional</li>
                <li className="mb-1.5">Avoid hurtful language or personal attacks</li>
                <li className="mb-1.5">Remember that coaches and directors may read these reviews</li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-[#2d2d2d] mb-2.5 text-sm tracking-wide">
                Your Review *
              </label>
              <textarea
                name="reviewText"
                value={formData.reviewText}
                onChange={handleInputChange}
                required
                placeholder="Share your experience with this coach..."
                className="w-full min-h-[120px] px-4 py-3.5 border-[1.5px] border-[#d4d4d4] rounded-sm text-[15px] transition-all duration-300 font-sans bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-[#A8BCA1] focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,188,161,0.1)] placeholder:text-[#9a9a9a] resize-y leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-[18px] bg-[#A8BCA1] text-[#1a1a1a] border-none rounded-sm text-base font-semibold cursor-pointer transition-all duration-300 font-sans tracking-wider uppercase hover:bg-[#8a9d85] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,188,161,0.3)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-[#EDE6DB] text-center">
          <p className="text-xs text-[#6b6b6b]">
            <Link href="/terms" className="text-[#6b6b6b] hover:text-[#A8BCA1] hover:underline transition-colors">
              Terms of Service
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
