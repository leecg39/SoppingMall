markdown# Technical Requirements Document (TRD)
## VERSPA International Website

**Document Version**: 1.0  
**Last Updated**: 2025-01-08  
**Technical Lead**: Development Team  
**Target Deployment**: Vercel

---

## 🏗️ System Architecture Overview

### High-Level Architecture
`````
┌─────────────────────────────────────────────────────┐
│                  End Users                          │
│         (Salon Owners + Distributors)               │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│              CDN (Vercel Edge Network)              │
│         • Static Asset Delivery                      │
│         • Global Distribution                        │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│           Next.js Static Site (SSG)                 │
│  ┌────────────────────────────────────────────┐    │
│  │  Pages (Pre-rendered at Build Time)        │    │
│  │  • / (Home)                                 │    │
│  │  • /products/[slug] (Product Details)      │    │
│  │  • /gallery (Installation Cases)           │    │
│  │  • /certifications                          │    │
│  │  • /contact                                 │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Components                                 │    │
│  │  • Header/Footer                            │    │
│  │  • ProductCard                              │    │
│  │  • ImageGallery                             │    │
│  │  • ContactForm                              │    │
│  │  • DownloadButton                           │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Static Data Sources                        │    │
│  │  • /data/products.json                      │    │
│  │  • /data/gallery.json                       │    │
│  │  • /public/pdfs/*.pdf                       │    │
│  │  • /public/images/*                         │    │
│  └────────────────────────────────────────────┘    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼ (Contact Form Submission)
┌─────────────────────────────────────────────────────┐
│        Email Service (Vercel + Resend API)          │
│        → info@combhair.kr                           │
└─────────────────────────────────────────────────────┘
`````

---

## 💻 Technology Stack

### Frontend Stack

**Framework**: Next.js 14+ (App Router)

**Why Next.js**:
- ✅ Static Site Generation (SSG) for optimal performance
- ✅ Built-in image optimization
- ✅ SEO-friendly with automatic sitemap generation
- ✅ Excellent documentation and AI coding tool compatibility
- ✅ Zero-config deployment to Vercel

**Alternatives Considered**:
- Gatsby: More complex setup, declining community
- Astro: Less familiar to AI coding tools
- Plain React + Vite: Requires manual SSG setup

**Vendor Lock-in Risk**: Low
- Next.js is open-source, can be self-hosted
- Easy migration to Netlify/AWS if needed

---

**UI Framework**: React 18+

**Styling**: Tailwind CSS 3+

**Why Tailwind**:
- ✅ Utility-first approach, fast prototyping
- ✅ Excellent mobile responsiveness utilities
- ✅ Minimal CSS bundle size with PurgeCSS
- ✅ Consistent design system via config

**Alternatives**:
- CSS Modules: More verbose, slower iteration
- Styled Components: Runtime overhead

**Vendor Lock-in Risk**: None
- Standard CSS output, easy to migrate

---

**Iconography**: Lucide React

**Why Lucide**:
- ✅ Lightweight, tree-shakeable
- ✅ Beautiful modern icon set
- ✅ React components out of the box

---

### Backend Stack

**Hosting/Deployment**: Vercel

**Why Vercel**:
- ✅ Zero-config Next.js deployment
- ✅ Automatic HTTPS and global CDN
- ✅ Free tier sufficient for expected traffic
- ✅ Built-in analytics (Core Web Vitals)
- ✅ Preview deployments for every commit

**Cost Estimate**:
- Free tier: 100GB bandwidth/month
- Expected usage: ~20GB/month (well within limit)
- No credit card required for launch

**Scaling Strategy**:
- If exceed free tier: Pro plan at $20/month
- 1TB bandwidth + priority support

**Alternatives**:
- Netlify: Similar features, slightly slower builds
- GitHub Pages: No SSR/API routes support
- AWS S3 + CloudFront: Manual setup, overkill for this scale

**Vendor Lock-in Risk**: Low
- Can export to any static hosting provider
- Next.js supports self-hosted deployment

---

**Email Service**: Resend API (for contact form)

**Why Resend**:
- ✅ Simple API, developer-friendly
- ✅ Free tier: 3,000 emails/month
- ✅ No credit card required to start
- ✅ React Email templates support

**Integration**:
`````javascript
// API Route: /api/contact
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@verspa-international.com',
  to: 'info@combhair.kr',
  subject: 'New Inquiry from Website',
  html: '<p>Contact details...</p>'
});
`````

**Alternatives**:
- SendGrid: More complex pricing
- Direct SMTP: Requires server-side handling
- Formspree: Third-party form service (less control)

**Vendor Lock-in Risk**: Low
- Easy to swap email providers
- Standard REST API pattern

---

### Database/Storage

**Database**: None (Static JSON files in Git repository)

**Rationale**:
- Small dataset (~10 products, ~50 gallery images)
- Content updates infrequent (monthly at most)
- Simplifies deployment and maintenance
- Zero database hosting costs

**Data Structure**:
`````
/data
├── products.json          # Product catalog
├── gallery.json           # Installation photos metadata
└── certifications.json    # Certificate/patent info

/public
├── pdfs/
│   ├── verspa-basic-en.pdf
│   ├── verspa-zenith-en.pdf
│   └── certificates/
│       ├── ce-cert.pdf
│       └── fda-cert.pdf
├── images/
│   ├── products/
│   │   ├── basic-hero.jpg
│   │   ├── basic-gallery-1.jpg
│   │   └── ...
│   └── gallery/
│       ├── salon-paris-01.jpg
│       └── ...
`````

**File Storage**: Git LFS (Large File Storage) for images/PDFs

**Why Git LFS**:
- ✅ Keeps repository size manageable
- ✅ Version control for binary files
- ✅ Free tier: 1GB storage + 1GB bandwidth/month (sufficient)

**Alternatives**:
- Cloudinary: Adds complexity, monthly cost
- AWS S3: Overkill, requires separate deployment
- Direct in repo: Would bloat Git history

---

### External APIs/Services

**None required for MVP**

**Future Considerations**:
- Google Analytics 4 (if detailed tracking needed)
- Hotjar/Microsoft Clarity (heatmaps, session replay)
- Weglot (multi-language automation - Phase 3)

---

## 🔧 Non-Functional Requirements

### Performance

**Target Metrics**:
| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Total Page Size | < 2MB | DevTools Network |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |

**Optimization Strategies**:
- Image optimization: Next.js `<Image>` component with WebP conversion
- Lazy loading: Below-the-fold images and gallery
- Code splitting: Automatic route-based splitting
- Font optimization: Preload Google Fonts, use `font-display: swap`
- Critical CSS: Inline above-the-fold styles

---

### Security

**Checklist**:
- [x] HTTPS enforced (Vercel automatic)
- [x] Content Security Policy (CSP) headers
- [x] No sensitive data in client-side code
- [x] Environment variables for API keys
- [x] Form input sanitization (email validation)
- [x] Rate limiting on contact form (Vercel Edge Functions)
- [x] GDPR-compliant (no cookies/tracking without consent)

**Environment Variables**:
`````bash
# .env.local (never commit to Git)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # If analytics added
`````

---

### Accessibility (WCAG 2.1 Level AA)

**Requirements**:
- [x] Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`)
- [x] Alt text for all images
- [x] Color contrast ratio ≥ 4.5:1 for body text
- [x] Keyboard navigable (focus states visible)
- [x] ARIA labels for interactive elements
- [x] Skip to main content link
- [x] Form labels properly associated with inputs

**Testing Tools**:
- Lighthouse accessibility audit
- axe DevTools browser extension
- Manual keyboard navigation test

---

### Browser/Device Support

**Target Browsers**:
- Chrome/Edge (latest 2 versions)
- Safari iOS (latest 2 versions)
- Samsung Internet (latest version)

**Not Supported**:
- Internet Explorer (officially dead)
- Opera Mini (limited CSS support)

**Responsive Breakpoints**:
`````css
/* Tailwind default breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
`````

---

### SEO Requirements

**Technical SEO**:
- [x] Semantic HTML structure
- [x] Meta tags: title, description, og:image
- [x] Structured data (JSON-LD): Organization, Product
- [x] XML sitemap auto-generated
- [x] robots.txt configured
- [x] Canonical URLs
- [x] Mobile-friendly (Google's mobile-first indexing)

**Example Meta Tags**:
`````html
<title>VERSPA International | Premium Massage Shampoo Chairs</title>
<meta name="description" content="Korea's first electric massage shampoo chair. Trusted by salons worldwide. KC, CE, FDA certified." />
<meta property="og:image" content="/og-image.jpg" />
`````

---

## 🗄️ Data Schema

### products.json Structure
`````json
{
  "products": [
    {
      "id": "verspa-basic",
      "name": "VERSPA BASIC",
      "tagline": "Best of the Best",
      "description": "Our best-selling product designed for head spas...",
      "badge": "NO.1 IN SALES",
      "features": [
        "5-Point Massage",
        "Leg Reclining",
        "Head Spa Optimized"
      ],
      "specs": {
        "dimensions": "1900 x 840 x 830 mm",
        "weight": "66.5 kg",
        "voltage": "AC 220-240V, 50-60Hz",
        "warranty": "3 years"
      },
      "colors": ["Black", "Desert Brown", "Gray Beige"],
      "images": {
        "hero": "/images/products/basic-hero.jpg",
        "gallery": [
          "/images/products/basic-1.jpg",
          "/images/products/basic-2.jpg"
        ]
      },
      "pdfCatalog": "/pdfs/verspa-basic-en.pdf"
    }
  ]
}
`````

---

### gallery.json Structure
`````json
{
  "installations": [
    {
      "id": "salon-paris-01",
      "image": "/images/gallery/paris-01.jpg",
      "salonName": "Le Coiffeur Premium",
      "location": "Paris, France",
      "product": "verspa-zenith",
      "year": 2024
    }
  ]
}
`````

---

## 🔐 Access Control & Permissions

**Not Applicable** (Public website, no authentication)

**Future Consideration**:
- If dealer portal added: JWT-based auth with Next-Auth.js

---

## 🔄 Data Lifecycle

### Content Update Process

**Workflow**:
1. Marketing team updates JSON file in Git repo
2. Commits to `main` branch
3. Vercel auto-deploys (build time: ~2 minutes)
4. Changes live globally via CDN

**Data Retention**:
- Static files: Indefinite (in Git history)
- Contact form emails: Handled by recipient's email retention policy
- No user data stored on servers

**GDPR Compliance**:
- No cookies set (unless analytics added with consent)
- No personal data collection beyond voluntary contact form
- Contact form includes privacy notice link

---

## 📊 Monitoring & Analytics

### Performance Monitoring

**Vercel Analytics** (Built-in, free):
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- No code installation needed

### Traffic Analytics

**Option 1: Vercel Web Analytics** (Privacy-friendly)
- No cookies required
- GDPR compliant
- Page views, unique visitors, top pages

**Option 2: Google Analytics 4** (If detailed tracking needed)
- Requires cookie consent banner
- More granular event tracking

**Recommendation**: Start with Vercel Analytics, add GA4 only if business requires deeper insights

---

## 🚨 Error Handling & Logging

**Client-Side**:
- React Error Boundaries for component failures
- Fallback UI: "Something went wrong, please refresh"

**Server-Side** (API Routes):
- Try-catch blocks in contact form handler
- Return user-friendly error messages
- Log errors to Vercel logs (accessible via dashboard)

**Example**:
`````javascript
try {
  await resend.emails.send({...});
  return { success: true };
} catch (error) {
  console.error('Email send failed:', error);
  return { success: false, message: 'Unable to send message. Please email us directly at info@combhair.kr' };
}
`````

---

## 🔧 Development Environment

**Required Tools**:
- Node.js 18+ (LTS version)
- Git 2.30+
- Code editor: VS Code (recommended)

**Setup Commands**:
`````bash
# Clone repository
git clone https://github.com/verspa/international-website.git

# Install dependencies
cd international-website
npm install

# Run development server
npm run dev
# → Opens at http://localhost:3000

# Build for production
npm run build

# Test production build locally
npm run start
`````

---

## 🚀 Deployment Strategy

**CI/CD Pipeline**: Automatic via Vercel

**Workflow**:
1. Push to `main` branch (or merge PR)
2. Vercel detects change via GitHub webhook
3. Runs build: `npm run build`
4. Deploys to production URL
5. Purges CDN cache globally
6. Deployment complete (~3 minutes total)

**Preview Deployments**:
- Every PR gets unique preview URL
- Test changes before merging to main

**Rollback Strategy**:
- Instant rollback via Vercel dashboard
- Or revert Git commit and push

---

## 📋 Technical Debt & Future Improvements

### Known Limitations

1. **Content Updates Require Code Deployment**
   - Impact: Marketing team depends on developer
   - Future: Consider Headless CMS (Sanity, Contentful) in Phase 2

2. **No Image Optimization Pipeline**
   - Current: Manual image compression before commit
   - Future: Integrate Cloudinary or similar service

3. **Email-Only Contact Form**
   - Current: No CRM integration
   - Future: Connect to HubSpot/Salesforce API

---

## 🧪 Testing Strategy

**Manual Testing Checklist** (Pre-Launch):
- [ ] All links functional
- [ ] Forms submit successfully
- [ ] PDFs download correctly
- [ ] Images load on all pages
- [ ] Responsive on iPhone SE, iPad, Desktop
- [ ] Cross-browser test (Chrome, Safari, Samsung Internet)

**Automated Testing** (Phase 2):
- Jest + React Testing Library for component tests
- Playwright for E2E tests
- Lighthouse CI in GitHub Actions

---

## 📞 Support & Maintenance

**Maintenance Responsibility**: Marketing Team (2-3 people)

**Expected Maintenance Tasks**:
- Add new product models (quarterly)
- Update gallery photos (monthly)
- Refresh PDF catalogs (as needed)

**Developer Support Needed**:
- Major feature additions (e.g., video integration)
- Performance optimization
- Security updates

---

**Document End**

---