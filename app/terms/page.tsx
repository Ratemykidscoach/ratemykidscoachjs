import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#EDE6DB] py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-sm py-12 px-8 md:px-14 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <Link
          href="/"
          className="inline-block text-[#A8BCA1] no-underline font-medium mb-8 text-[15px] transition-colors duration-300 hover:text-[#8a9d85]"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl md:text-[42px] font-bold text-[#1a1a1a] mb-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[#6b6b6b] mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-sm max-w-none text-[#4a4a4a] leading-7 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Rate My Kids Coach ("the Platform", "we", "us", "our"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">2. Description of Service</h2>
            <p>
              Rate My Kids Coach is a platform that allows parents and guardians to share reviews and ratings of youth sports coaches. The Platform provides a forum for users to post opinions, reviews, and feedback about coaches. We are not responsible for the accuracy, completeness, or truthfulness of user-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">3. Age Requirement</h2>
            <p>
              <strong className="text-[#1a1a1a]">3.1 Minimum Age:</strong> The Platform is intended for users who are 18 years of age or older. By using the Platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms of Service.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">3.2 No Minor Data Collection:</strong> We do not knowingly collect, store, or process personal information from individuals under the age of 18. If we become aware that we have collected information from a minor, we will take steps to delete such information immediately. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">4. Minors and Privacy</h2>
            <p>
              <strong className="text-[#1a1a1a]">4.1 Prohibition on Minor Information:</strong> You are strictly prohibited from including any personally identifiable information about any minor (including but not limited to names, contact information, photographs, or any other identifying details) in any content you post on the Platform. This prohibition applies to all reviews, comments, and any other user-generated content.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">4.2 Content Focus:</strong> Reviews and content posted on the Platform must focus solely on coaches, coaching methods, programs, and team management. Content must not target, identify, or discuss specific children or minors in any way. Any content that violates this provision will be immediately removed, and your access to the Platform may be terminated.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">4.3 Your Responsibility:</strong> You are solely responsible for ensuring that your content does not include any information about minors. We are not responsible for content that may inadvertently include such information, but we reserve the right to remove any content we believe may violate this provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">5. User-Generated Content</h2>
            <p>
              <strong className="text-[#1a1a1a]">5.1 Content Responsibility:</strong> You are solely responsible for all content you post, including reviews, ratings, comments, and any other materials. You represent and warrant that your content is truthful, accurate, and based on your personal experience as a parent or guardian.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">5.2 Content Guidelines:</strong> You agree not to post content that:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Is defamatory, libelous, or contains false statements of fact</li>
              <li>Violates any person's privacy rights or contains personal information without consent</li>
              <li>Is harassing, threatening, or abusive</li>
              <li>Violates any applicable laws or regulations</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains spam, advertising, or promotional content</li>
              <li>Includes any information about minors, as prohibited in Section 4</li>
            </ul>
            <p>
              <strong className="text-[#1a1a1a]">5.3 No Endorsement:</strong> We do not endorse, verify, or guarantee the accuracy of any user-generated content. Reviews and ratings reflect the opinions of individual users and not the Platform. We are not responsible for any defamatory, inaccurate, or objectionable content posted by users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">6. Limitation of Liability</h2>
            <p>
              <strong className="text-[#1a1a1a]">6.1 Platform as Intermediary:</strong> Rate My Kids Coach acts solely as an intermediary platform for user-generated content. We are not responsible for, and do not control, the content posted by users. We are not liable for any claims, damages, or losses arising from user-generated content, including but not limited to defamation, privacy violations, or any other legal claims.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">6.2 No Warranty:</strong> THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE MAKE NO WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR AVAILABILITY OF THE PLATFORM OR ANY CONTENT THEREON.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">6.3 Limitation of Damages:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, RATE MY KIDS COACH, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, REPUTATION, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE PLATFORM OR ANY CONTENT POSTED THEREON, REGARDLESS OF THE THEORY OF LIABILITY.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">6.4 Content Disputes:</strong> We are not responsible for disputes between users, coaches, clubs, or any third parties arising from content posted on the Platform. All disputes must be resolved directly between the parties involved or through the dispute resolution process outlined in Section 14.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">7. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Rate My Kids Coach, its affiliates, officers, directors, employees, and agents from and against any and all claims, demands, damages, obligations, losses, liabilities, costs, debts, and expenses (including but not limited to reasonable attorney's fees and court costs) arising from or related to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any third-party rights, including but not limited to defamation, privacy, intellectual property, or rights of minors</li>
              <li>Any content you post on the Platform, including but not limited to reviews, ratings, comments, or other materials</li>
              <li>Your failure to comply with any applicable laws or regulations</li>
            </ul>
            <p>
              This indemnification obligation will survive the termination of your use of the Platform and these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">8. Content Moderation and Removal</h2>
            <p>
              <strong className="text-[#1a1a1a]">8.1 Right to Review and Verify:</strong> We reserve the right to review all content submitted to the Platform. We may request verification of your identity and your relationship to the coach or program being reviewed, including but not limited to proof that you are a parent or guardian of a child who was coached by the individual or program in question. Failure to provide such verification when requested may result in the removal of your content or the refusal to publish it.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">8.2 Right to Remove or Refuse:</strong> We reserve the right, in our sole discretion, to review, edit, refuse to publish, or remove any content at any time for any reason, including but not limited to content that we determine: (a) violates these Terms of Service; (b) is false, misleading, or defamatory; (c) cannot be reasonably verified; (d) is abusive, harassing, or threatening; (e) includes information about minors; (f) is otherwise objectionable or inappropriate; or (g) may expose us to legal liability.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">8.3 No Obligation to Monitor:</strong> We do not have an obligation to monitor or review all content posted on the Platform prior to publication. We are not responsible for content that may be inaccurate, offensive, or objectionable. However, we reserve the right to take action on any content at any time, including after publication.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">8.4 Reporting Content:</strong> If you believe content on the Platform violates these Terms or your rights, you may contact us. However, we are not obligated to remove content based solely on a complaint, and we will evaluate each report in our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">9. No Guarantee of Publication</h2>
            <p>
              <strong className="text-[#1a1a1a]">9.1 Submission Does Not Guarantee Publication:</strong> Submitting content to the Platform, including reviews, ratings, or any other materials, does not guarantee that such content will be published, posted, or made available on the Platform. We reserve the right, in our sole discretion, to refuse to publish any content for any reason, with or without notice.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">9.2 Content May Be Removed:</strong> Even if content is initially published on the Platform, we reserve the right to remove such content at any time, with or without notice, for any reason, including but not limited to violations of these Terms of Service, legal concerns, or changes in our policies.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">9.3 No Right to Publication:</strong> You have no right or expectation that your content will be published or remain published on the Platform. We are under no obligation to publish, maintain, or preserve any content you submit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">10. Privacy and Data Collection</h2>
            <p>
              Your use of the Platform is also governed by our data collection practices. By using the Platform, you consent to the collection and use of information as described. We collect contact information (email and/or phone) for verification purposes only. We are not responsible for unauthorized access to or disclosure of your information. We do not knowingly collect information from minors, as stated in Section 3.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">11. Intellectual Property</h2>
            <p>
              <strong className="text-[#1a1a1a]">11.1 User Content License:</strong> By posting content on the Platform, you grant Rate My Kids Coach a non-exclusive, royalty-free, perpetual, irrevocable, worldwide, and fully sublicensable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such content (in whole or in part) in any media, format, or technology now known or later developed, for any purpose, including commercial purposes.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">11.2 Platform Content:</strong> All content on the Platform, except user-generated content, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Rate My Kids Coach or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">11.3 No Reverse Engineering:</strong> You may not copy, reproduce, republish, upload, post, transmit, or distribute any material from the Platform without our prior written consent, except as expressly permitted by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">12. Prohibited Uses</h2>
            <p>You agree not to use the Platform to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Post false, misleading, or defamatory information</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, threaten, or intimidate others</li>
              <li>Violate any applicable local, state, national, or international law</li>
              <li>Interfere with or disrupt the Platform or servers</li>
              <li>Use automated systems to post content without authorization</li>
              <li>Include any information about minors, as prohibited in Section 4</li>
              <li>Post content that you know or should know is false or cannot be verified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">13. Disclaimers</h2>
            <p>
              <strong className="text-[#1a1a1a]">13.1 No Guarantee of Accuracy:</strong> We do not guarantee the accuracy, completeness, or usefulness of any information on the Platform. Reviews and ratings are opinions of individual users and should not be considered as factual statements. We are not responsible for any errors or omissions in user-generated content.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">13.2 No Professional Advice:</strong> The Platform does not provide professional advice. Information on the Platform should not be used as a substitute for professional judgment or decision-making. You should independently verify any information before making decisions based on content found on the Platform.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">13.3 Third-Party Content:</strong> The Platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party sites. Your interactions with third parties are solely between you and the third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">14. Dispute Resolution & Arbitration</h2>
            <p>
              <strong className="text-[#1a1a1a]">14.1 Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms of Service, your use of the Platform, or any content posted thereon, shall be resolved exclusively through binding arbitration in accordance with the rules of the American Arbitration Association ("AAA"), rather than in court. The arbitration shall be conducted in Salt Lake County, Utah, United States.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">14.2 Waiver of Jury Trial and Class Actions:</strong> BY AGREEING TO ARBITRATION, YOU AND RATE MY KIDS COACH EACH WAIVE THE RIGHT TO A TRIAL BY JURY AND THE RIGHT TO PARTICIPATE IN A CLASS ACTION, REPRESENTATIVE ACTION, OR CONSOLIDATED PROCEEDING. You agree that disputes will be resolved on an individual basis only, and you will not bring, join, or participate in any class, collective, or representative action or proceeding against Rate My Kids Coach.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">14.3 Exceptions:</strong> Notwithstanding the foregoing, either party may bring a lawsuit in a court of competent jurisdiction in Salt Lake County, Utah, to: (a) seek injunctive relief to prevent or stop unauthorized use or abuse of the Platform; (b) enforce intellectual property rights; or (c) resolve disputes related to the collection or use of personal information in violation of applicable privacy laws.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">14.4 Governing Law for Disputes:</strong> The arbitration and these Terms of Service shall be governed by the laws of the State of Utah, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">15. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Platform at any time, without prior notice, for any reason, including but not limited to violation of these Terms of Service, posting false or defamatory content, or including information about minors in your content. Upon termination, your right to use the Platform will immediately cease, and we may delete or remove any content you have posted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">16. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Your continued use of the Platform after any changes constitutes acceptance of the new terms. We will update the "Last Updated" date at the top of this page. If you do not agree to the modified terms, you must stop using the Platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">17. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of Utah, United States, without regard to its conflict of law provisions. Except as provided in Section 14 (Dispute Resolution & Arbitration), any legal action or proceeding arising under these Terms of Service shall be brought exclusively in the courts of Salt Lake County, Utah, or the United States District Court for the District of Utah.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">18. Severability</h2>
            <p>
              If any provision of these Terms of Service is found to be unenforceable or invalid by a court of competent jurisdiction or an arbitrator, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect. The invalid or unenforceable provision shall be replaced with a valid and enforceable provision that comes closest to the intent of the invalid or unenforceable provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3 mt-6">19. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through the feedback form on the Platform.
            </p>
          </section>

          <section className="mt-8 pt-6 border-t border-[#EDE6DB]">
            <p className="text-sm text-[#6b6b6b]">
              <strong className="text-[#1a1a1a]">BY USING RATE MY KIDS COACH, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

