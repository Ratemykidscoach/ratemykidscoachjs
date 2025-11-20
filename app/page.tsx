import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern relative min-h-[90vh] flex items-center justify-center px-5 py-16 bg-gradient-to-br from-[#A8BCA1] to-[#8a9d85] overflow-hidden">
        <div className="max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-[56px] font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Your Child Deserves a Great Coach
          </h1>
          <p className="text-lg md:text-[22px] text-white mb-10 font-normal opacity-95">
            Bringing transparency and accountability to youth sports coaching. Starting with soccer, expanding to all youth sports as we grow.
          </p>
          <Link
            href="/review_form"
            className="inline-block bg-white text-[#1a1a1a] px-12 py-[18px] text-lg font-semibold no-underline rounded-sm transition-all duration-300 tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            Review a Coach
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-24 md:py-[100px] px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 tracking-tight">
              The Problem
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              Parents invest thousands of dollars annually in club sports, yet have no way to evaluate coaches before committing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-[#F9F7F4] p-9 rounded-sm border-l-4 border-[#B79973]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                No Accountability
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                Coaches operate without transparent feedback systems. There's no easy way to know if a coach is skilled, communicative, or supportive until your child is already on the team.
              </p>
            </div>

            <div className="bg-[#F9F7F4] p-9 rounded-sm border-l-4 border-[#B79973]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                Parents Are Silent
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                Fear of retaliation keeps parents quiet. Concerned about playing time or team dynamics, parents rarely speak up—even when coaching is problematic.
              </p>
            </div>

            <div className="bg-[#F9F7F4] p-9 rounded-sm border-l-4 border-[#B79973]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                Kids Pay the Price
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                The right coach can build confidence and skills. The wrong coach can crush a child's love for the game. Parents deserve to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-[#EDE6DB] py-24 md:py-[100px] px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 tracking-tight">
              The Solution
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[17px] text-[#4a4a4a] mb-6 leading-[1.9] text-left">
              Rate My Kids Coach creates transparency in youth sports by giving parents a platform to share honest, constructive feedback about coaches.
            </p>
            <p className="text-[17px] text-[#4a4a4a] mb-6 leading-[1.9] text-left">
              We're starting with soccer—the sport we know best—and once we have a strong foundation of reviews, we'll expand to baseball, football, basketball, lacrosse, volleyball, and beyond.
            </p>
            <p className="text-[17px] text-[#4a4a4a] mb-6 leading-[1.9] text-left">
              We're building a resource that helps parents make informed decisions, holds coaches accountable, and ultimately improves the coaching landscape for every young athlete.
            </p>
            <p className="text-[17px] text-[#4a4a4a] mb-6 leading-[1.9] text-left">
              Our platform isn't about tearing coaches down—it's about celebrating great coaching and providing constructive feedback that helps everyone improve.
            </p>
          </div>
        </div>
      </section>

      {/* How You Help Section */}
      <section className="bg-[#d4e0cf] py-24 md:py-[100px] px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 tracking-tight">
              How You Can Help
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              We're building this platform from the ground up, and we need YOUR voice to make it happen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-9 rounded-sm border-l-4 border-[#A8BCA1]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                Leave a Coach Review
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                Share your experience with your child's current or past soccer coach. Your review helps other parents make informed decisions and contributes to the foundation of this platform. Once we have soccer reviews, we'll expand to other sports!
              </p>
            </div>

            <div className="bg-white p-9 rounded-sm border-l-4 border-[#A8BCA1]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                Tell Us What Matters
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                What features would make this platform most valuable to you? What other criteria should parents use to evaluate coaches? Your feedback shapes what we build.
              </p>
            </div>

            <div className="bg-white p-9 rounded-sm border-l-4 border-[#A8BCA1]">
              <h3 className="text-[22px] font-semibold mb-3 text-[#1a1a1a]">
                Spread the Word
              </h3>
              <p className="text-[#4a4a4a] text-[15px] leading-7">
                The more parents who contribute, the more valuable this resource becomes. Share with other soccer parents who care about coaching quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#A8BCA1] to-[#8a9d85] py-24 md:py-[100px] px-5 text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[42px] font-bold mb-5">
            Start Making an Impact Today
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-95">
            Review a coach. Share your feedback. Help us build the platform that youth sports parents need.
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <Link
              href="/review_form"
              className="inline-block bg-white text-[#1a1a1a] px-12 py-[18px] text-lg font-semibold no-underline rounded-sm transition-all duration-300 tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] w-full md:w-auto max-w-[300px]"
            >
              Review a Coach
            </Link>
            <Link
              href="/feedback_form"
              className="inline-block bg-transparent text-white border-2 border-white px-12 py-[18px] text-lg font-semibold no-underline rounded-sm transition-all duration-300 tracking-wider uppercase hover:bg-white hover:text-[#1a1a1a] w-full md:w-auto max-w-[300px]"
            >
              Give Feedback
            </Link>
          </div>
          <p className="mt-8 text-base opacity-90">
            Currently accepting soccer coach reviews from Utah and Arizona clubs. More sports and locations coming soon!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-10 px-5 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2.5 text-[15px]">Rate My Kids Coach - A BYU Sandbox Project</p>
          <p className="text-sm opacity-70 mb-3">Starting with soccer, expanding to all youth sports.</p>
          <p className="text-xs opacity-50">
            <Link href="/terms" className="text-white hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
