import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | DreamWeaver',
  description:
    'Get in touch with the DreamWeaver team for support, questions, or feedback.',
};

export default function Contact() {
  return (
    <div className="bg-navy-deep min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary golden-text-glow mb-4">
            Contact Us
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have questions, feedback, or need support? We&apos;d love to hear
            from you! Our team is here to help make your DreamWeaver experience
            magical.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-navy-light rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-navy-deep"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Email Support</h3>
                  <a
                    href="mailto:support@dreamweaver-app.com"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    support@dreamweaver-app.com
                  </a>
                  <p className="text-text-secondary text-sm mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-navy-deep"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">
                    General Inquiries
                  </h3>
                  <p className="text-text-secondary text-sm">
                    For business partnerships, media inquiries, or general
                    questions about DreamWeaver.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-navy-light rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-medium mb-2">
                  When will DreamWeaver be available?
                </h3>
                <p className="text-text-secondary text-sm">
                  DreamWeaver is coming soon to both the App Store and Google
                  Play.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-medium mb-2">
                  Is DreamWeaver safe for children?
                </h3>
                <p className="text-text-secondary text-sm">
                  Absolutely! We use advanced content moderation and follow
                  strict COPPA guidelines to ensure all content is
                  age-appropriate and family-friendly.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-medium mb-2">
                  How does the AI story generation work?
                </h3>
                <p className="text-text-secondary text-sm">
                  Our AI creates unique stories based on your child&apos;s
                  profile, interests, and preferences. Each story is
                  personalized and includes beautiful illustrations.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-medium mb-2">
                  How does DreamWeaver pricing work?
                </h3>
                <p className="text-text-secondary text-sm">
                  DreamWeaver uses a credit-based system. You can purchase
                  individual credit packs, or subscribe on a monthly or annual
                  basis to get regular credit top-ups at reduced cost. We offer
                  flexible options to fit different family needs and budgets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="bg-navy-light rounded-lg border border-border p-8">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            What can we help you with?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-navy-deep rounded-lg border border-border golden-glow">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-navy-deep"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-foreground font-medium mb-2">
                Technical Support
              </h3>
              <p className="text-text-secondary text-sm">
                App issues, bugs, or technical questions
              </p>
            </div>

            <div className="text-center p-4 bg-navy-deep rounded-lg border border-border golden-glow">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-navy-deep"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-foreground font-medium mb-2">
                Account Issues
              </h3>
              <p className="text-text-secondary text-sm">
                Login problems, account management, or data concerns
              </p>
            </div>

            <div className="text-center p-4 bg-navy-deep rounded-lg border border-border golden-glow">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-navy-deep"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-foreground font-medium mb-2">Feedback</h3>
              <p className="text-text-secondary text-sm">
                Feature requests, suggestions, or general feedback
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-navy-light rounded-lg border border-border p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Ready to get in touch?
            </h2>
            <p className="text-text-secondary mb-6">
              Send us an email and we&apos;ll get back to you as soon as
              possible.
            </p>
            <a
              href="mailto:support@dreamweaver-app.com"
              className="inline-flex items-center px-6 py-3 bg-primary text-navy-deep font-medium rounded-lg hover:bg-primary-light transition-colors golden-glow"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send us an email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
