import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DreamWeaver',
  description:
    "Privacy Policy for DreamWeaver - Learn how we protect your and your children's privacy.",
};

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'DreamWeaver ("we," "our," or "us") is committed to protecting the privacy of children and their families. This Privacy Policy explains how we collect, use, and safeguard information when you use our app.',
    },
    {
      title: 'Information we collect',
      content:
        'A. Personal Data You Provide:\n• Account Information: Name, email address, and password when you create an account. If you register using Google or Apple, we receive information from that service as permitted by your privacy settings.\n• Child Profile Information: Name, date of birth (month and year), interests/preferences, and physical appearance details (e.g., hair color, eye color). This information is highly sensitive and should only be provided with full consent.\n• User-Generated Content: Story prompts, themes, moods, custom character descriptions, and story concepts.\n\nB. Data Collected Automatically:\n• Analytics Data: We use Firebase Analytics (in the mobile app) and Google Analytics (on our website) to collect usage patterns, app performance data, and feature usage statistics to improve our service. This may include device information, app version, operating system, browser type, and anonymous usage metrics.\n• Advertising ID: On Android devices, we collect advertising identifiers for analytics attribution and to understand user acquisition sources.',
    },
    {
      title: 'How we use information',
      content:
        'We use collected information to:\n\n• Create and manage your account\n• Generate personalized stories and illustrations based on provided information\n• Email you regarding your account (such as verification)\n• Improve the efficiency and operation of the app\n• Monitor usage trends to enhance your experience\n• Analyze app performance and user engagement through Firebase Analytics\n• Understand user acquisition sources and campaign effectiveness\n• Provide customer support',
    },
    {
      title: 'Data storage and security',
      content:
        'We use administrative, technical, and physical security measures to protect your personal information, including Firestore Security Rules. All data is stored securely using Firebase, a Google Cloud service.\n\nSecurity measures include:\n• Encrypted data transmission\n• Secure authentication\n• Limited access controls\n• Regular security monitoring\n\nWhile we take reasonable steps to secure your information, no security measures are perfect, and no method of data transmission can be guaranteed against interception or misuse.',
    },
    {
      title: "Children's privacy (COPPA)",
      content:
        "DreamWeaver is intended to be used by parents and legal guardians for the benefit of their children. We do not knowingly collect information from or market to children under 13.\n\nBy creating a Child Profile, you represent that you are the parent or legal guardian with authority to provide this information. Parents and guardians have the right to:\n\n• Review information provided about their child\n• Request deletion of their account and all associated data\n• Refuse further collection or use of their child's information\n• Exercise these rights through the Settings screen or by contacting us",
    },
    {
      title: 'Data sharing',
      content:
        'We do not sell your personal information. We may share information in certain situations:\n\nA. By Law or to Protect Rights:\nWe may share information when necessary to respond to legal process, investigate policy violations, or protect rights, property, and safety.\n\nB. Third-Party Service Providers:\nWe share information with service providers that perform services for us:\n• Backend Hosting: Your data is stored on Google Firebase servers\n• Analytics: Firebase Analytics (mobile app) and Google Analytics (website) process usage data to provide insights and analytics services. These services may collect information about your visits and interactions.\n• AI Model Providers: To generate stories and illustrations, we send your prompts (including child information and custom text) to AI text generation services (such as OpenAI GPT models) and AI image generation services. These providers have their own privacy policies, and we only send the minimum information required for generation.',
    },
    {
      title: 'Your rights',
      content:
        'You have the right to:\n\n• Access your data\n• Correct inaccurate information\n• Delete your account and all associated data\n• Opt-out of non-essential data collection\n• Contact us with privacy concerns',
    },
    {
      title: 'Data retention',
      content:
        'We retain your data only as long as necessary to provide our services. You can delete your account at any time from the Settings screen, which will permanently remove all associated data.',
    },
    {
      title: 'Changes to this policy',
      content:
        'We may update this Privacy Policy periodically. We will notify you of any material changes through the app or via email.',
    },
    {
      title: 'Contact us',
      content:
        'If you have questions about this Privacy Policy or our data practices, please contact us at:\n\nsupport@dreamweaver-app.com\n\nLast updated: January 15, 2025',
    },
  ];

  return (
    <div className="bg-navy-deep min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary golden-text-glow mb-4">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">
            Learn how DreamWeaver protects your and your children&apos;s
            privacy.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-navy-light rounded-lg border border-border p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4 capitalize">
                {section.title}
              </h2>
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <a
            href="#top"
            className="text-primary hover:text-primary-light transition-colors"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </div>
  );
}
