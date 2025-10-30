# DreamSpinner Website

Official website for DreamSpinner - AI-powered personalised bedtime stories for children.

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **DreamSpinner Branding**: Matches the app's golden yellow (#D4AF37) and navy theme
- **Static Site Generation**: Optimized for performance and SEO
- **Accessibility**: Built with semantic HTML and ARIA labels

## Pages

- **Home**: Clean hero section with brand name, description, and app store buttons
- **Privacy Policy**: Complete privacy policy matching the app
- **Terms of Service**: Terms and conditions for app usage
- **Contact**: Contact information and FAQ section
- **Delete Account**: Account deletion instructions (for app store compliance, not linked in navigation)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Typography**: Inter (content) + PlayfairDisplay (brand only) + SpaceMono (accents)
- **TypeScript**: Full type safety
- **Static Export**: Ready for deployment to any static host

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment

### Vercel (Recommended - Free)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Add your custom domain `dreamspinner-app.com` in Vercel settings
4. Update Cloudflare DNS to point to Vercel

### Netlify (Alternative - Free)

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`
4. Add your custom domain in Netlify settings

### Manual Static Hosting

1. Run `npm run build` to generate static files in the `out` directory
2. Upload the `out` folder contents to any static host
3. Configure your domain to point to the hosting service

## Domain Setup with Cloudflare

1. In Cloudflare DNS settings, add a CNAME record:
   - Name: `@` (or `dreamspinner-app.com`)
   - Target: Your hosting platform's domain (e.g., `your-site.vercel.app`)
   - Proxy status: Proxied (orange cloud)

2. For www subdomain, add another CNAME:
   - Name: `www`
   - Target: `dreamspinner-app.com`
   - Proxy status: Proxied

## Content Updates

The website content is taken directly from the DreamSpinner app source code to ensure consistency:

- **Privacy Policy**: Matches `app/privacy-policy.tsx` from the app
- **Terms of Service**: Matches `app/terms-of-service.tsx` from the app
- **Branding**: Uses the same colors from `constants/Theme.ts`
- **Typography**:
  - PlayfairDisplay: Only for "DreamSpinner" brand name (matches app)
  - Inter: All content, headings, and body text (modern, readable)
  - SpaceMono: App store buttons and accent elements (matches app)
- **Contact Email**: `support@dreamspinner-app.com`

## App Store Links

The app store buttons are currently showing "Coming Soon". When the app is published, update the home page:

1. **In `src/app/page.tsx`**, change:

   ```jsx
   <AppStoreButtons showComingSoon={true} />
   ```

   to:

   ```jsx
   <AppStoreButtons
     showComingSoon={false}
     appStoreUrl="https://apps.apple.com/your-app-link"
     playStoreUrl="https://play.google.com/store/apps/details?id=your.package.name"
   />
   ```

2. The buttons are already branded and styled to match the DreamSpinner theme
3. They use the secondary font (SpaceMono) consistent with the app's design

## Support

For questions about the website, contact: support@dreamspinner-app.com
