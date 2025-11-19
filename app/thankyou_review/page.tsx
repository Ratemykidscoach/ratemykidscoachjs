import Link from 'next/link';

export default function ThankYouReview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8BCA1] to-[#8a9d85] flex items-center justify-center px-5 py-5">
      <div className="max-w-2xl w-full bg-white rounded-sm py-16 px-12 md:px-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        <div className="w-20 h-20 md:w-[80px] md:h-[80px] mx-auto mb-8 bg-[#A8BCA1] rounded-full flex items-center justify-center text-4xl md:text-[48px] text-white">
          ✓
        </div>

        <h1 className="text-3xl md:text-[42px] font-bold text-[#1a1a1a] mb-5 tracking-tight">
          Thank You!
        </h1>

        <p className="text-lg text-[#4a4a4a] mb-9 leading-7">
          We've received your review and truly appreciate you taking the time to share your experience.
        </p>

        <div className="bg-[#F9F7F4] p-8 rounded-sm border-l-4 border-[#A8BCA1] mb-9 text-left">
          <p className="text-[15px] text-[#2d2d2d] leading-7 mb-3">
            <strong className="text-[#1a1a1a] font-semibold">What happens next?</strong>
          </p>
          <p className="text-[15px] text-[#2d2d2d] leading-7 mb-3">
            We're currently manually reviewing and collecting reviews as we build out the platform. Once we have enough reviews, we'll create dedicated club and coach profile pages.
          </p>
          <p className="text-[15px] text-[#2d2d2d] leading-7">
            <strong className="text-[#1a1a1a] font-semibold">We'll email you when our official site goes live!</strong> You'll be among the first to explore the full platform and see how your contribution helped build this resource for parents everywhere.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-9">
          <Link
            href="/review_form"
            className="inline-block px-10 py-4 text-base font-semibold no-underline rounded-sm transition-all duration-300 font-sans tracking-wide cursor-pointer bg-[#A8BCA1] text-[#1a1a1a] hover:bg-[#8a9d85] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,188,161,0.3)]"
          >
            Leave Another Review
          </Link>
          <Link
            href="/feedback_form"
            className="inline-block px-10 py-4 text-base font-semibold no-underline rounded-sm transition-all duration-300 font-sans tracking-wide cursor-pointer bg-transparent text-[#A8BCA1] border-2 border-[#A8BCA1] hover:bg-[#A8BCA1] hover:text-white hover:-translate-y-0.5"
          >
            Suggest a Club
          </Link>
          <Link
            href="/feedback_form"
            className="inline-block px-10 py-4 text-base font-semibold no-underline rounded-sm transition-all duration-300 font-sans tracking-wide cursor-pointer bg-transparent text-[#A8BCA1] border-2 border-[#A8BCA1] hover:bg-[#A8BCA1] hover:text-white hover:-translate-y-0.5"
          >
            Submit Feedback
          </Link>
        </div>

        <div className="pt-9 border-t-2 border-[#EDE6DB]">
          <h3 className="text-[22px] font-semibold text-[#1a1a1a] mb-4">
            Help Us Grow
          </h3>
          <p className="text-[15px] text-[#4a4a4a] leading-7 mb-5">
            The more parents who contribute, the more valuable this resource becomes. Please share Rate My Kids Coach with other soccer parents in your community!
          </p>
        </div>

        <Link
          href="/"
          className="inline-block text-[#A8BCA1] no-underline font-medium mt-6 text-[15px] transition-colors duration-300 hover:text-[#8a9d85]"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

