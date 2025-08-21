import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Your DreamWeaver Account | DreamWeaver',
  description: 'Instructions for permanently deleting your DreamWeaver account and all associated data.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeleteAccount() {
  return (
    <div className="bg-navy-deep min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary golden-text-glow mb-4">
            Delete Your DreamWeaver Account
          </h1>
          <p className="text-foreground text-lg">
            We&apos;re sorry to see you go! This page explains how to permanently delete your DreamWeaver account and all associated data.
          </p>
        </div>

        {/* Important Warning */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="text-warning text-xl">⚠️</div>
            <div>
              <h3 className="text-warning font-semibold mb-2">Important:</h3>
              <p className="text-foreground">
                Account deletion is permanent and cannot be undone. All your data will be permanently removed from our servers.
              </p>
            </div>
          </div>
        </div>

        {/* How to Delete */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">How to Delete Your Account</h2>
          
          <div className="space-y-6">
            {/* Option 1 */}
            <div className="bg-navy-light rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Option 1: Delete from the App (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>Open the DreamWeaver app</li>
                <li>Go to Settings</li>
                <li>Scroll down and tap &ldquo;Delete Account&rdquo;</li>
                <li>Follow the confirmation prompts</li>
                <li>Your account will be deleted immediately</li>
              </ol>
            </div>

            {/* Option 2 */}
            <div className="bg-navy-light rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Option 2: Email Us</h3>
              <p className="text-foreground mb-3">If you cannot access the app, email us at:</p>
              <p className="text-primary font-semibold mb-4">
                <a href="mailto:support@dreamweaver-app.com" className="hover:text-primary-light transition-colors">
                  support@dreamweaver-app.com
                </a>
              </p>
              <p className="text-foreground mb-2">Include in your email:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground mb-4">
                <li>The email address associated with your account</li>
                <li>Your request to delete your account</li>
                <li>Any child profile names (to help us identify your account)</li>
              </ul>
              <p className="text-text-secondary">
                We will process your request within 7 business days and send you a confirmation email.
              </p>
            </div>
          </div>
        </div>

        {/* What Data Gets Deleted */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">What Data Gets Deleted</h2>
          <div className="bg-navy-light rounded-lg border border-border p-6">
            <p className="text-foreground mb-4">When you delete your DreamWeaver account, we permanently remove:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>Account Information:</strong> Name, email address, password</li>
              <li><strong>Child Profiles:</strong> Names, birth dates, interests, preferences, physical descriptions</li>
              <li><strong>Generated Stories:</strong> All stories created using our AI service</li>
              <li><strong>User Content:</strong> Custom prompts, themes, and character descriptions</li>
              <li><strong>Subscription Data:</strong> RevenueCat subscription and purchase history</li>
              <li><strong>App Settings:</strong> Preferences and app configuration</li>
            </ul>
          </div>
        </div>

        {/* Data Retention */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Data Retention</h2>
          
          <div className="bg-success/10 border border-success/30 rounded-lg p-6 mb-4">
            <p className="text-foreground">
              <strong className="text-success">Immediate Deletion:</strong> Most data is deleted immediately when you request account deletion.
            </p>
          </div>

          <div className="space-y-4 text-foreground">
            <p>
              <strong>Backup Retention:</strong> Due to our backup systems, some data may remain in encrypted backups for up to 30 days before being permanently purged.
            </p>
            <p>
              <strong>Legal Requirements:</strong> We may retain certain transaction records as required by law, but these will not contain personal information and cannot be used to identify you.
            </p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">What Happens to Subscriptions</h2>
          <div className="bg-navy-light rounded-lg border border-border p-6">
            <p className="text-foreground mb-4">
              Account deletion does not automatically cancel active subscriptions. To avoid future charges:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>iOS:</strong> Cancel your subscription in the App Store settings</li>
              <li><strong>Android:</strong> Cancel your subscription in Google Play settings</li>
            </ul>
          </div>
        </div>

        {/* Before You Delete */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Before You Delete</h2>
          <div className="bg-navy-light rounded-lg border border-border p-6">
            <p className="text-foreground mb-4">Consider these alternatives:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>Save Stories:</strong> Export or save any stories you want to keep before deleting</li>
              <li><strong>Cancel Subscription:</strong> You can cancel your subscription without deleting your account</li>
              <li><strong>Contact Support:</strong> We may be able to help resolve any issues you&apos;re experiencing</li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Need Help?</h3>
          <p className="text-foreground mb-2">If you have questions about account deletion or need assistance, contact us:</p>
          <p className="text-foreground mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:support@dreamweaver-app.com" className="text-primary hover:text-primary-light transition-colors">
              support@dreamweaver-app.com
            </a>
          </p>
          <p className="text-text-secondary">
            <strong>Response Time:</strong> We typically respond within 24-48 hours
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center text-text-muted text-sm">
          <p>Last updated: January 15, 2025</p>
        </div>
      </div>
    </div>
  );
}