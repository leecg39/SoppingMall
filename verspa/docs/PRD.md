# Product Requirements Document (PRD)
## VERSPA International Website

**Document Version**: 1.0  
**Last Updated**: 2025-01-08  
**Project Status**: Planning Phase  
**Owner**: VERSPA Marketing Team

---

## 📋 Executive Summary

**Project Name**: VERSPA International  
**Tagline**: Korea's First Electric Massage Shampoo Chair for Global B2B Market  

**One-Line Description**:  
A premium responsive website introducing VERSPA's innovative massage shampoo chairs to international salon owners and beauty equipment distributors.

---

## 🎯 Problem Statement

### Current Pain Points

**For Sales Team**:
- Buyers repeatedly request product specs, certifications, and case studies via email
- Time wasted searching for and sending PDF materials during and after meetings
- No centralized English resource to share with international prospects

**For Buyers**:
- Difficulty accessing detailed product information outside business hours
- Unable to review materials on mobile devices while traveling
- Lack of visual proof of real-world installations

### The Problem We're Solving

> "Eliminate repetitive information requests by providing a one-stop resource for international buyers to access all VERSPA product information anytime, anywhere."

---

## 💡 Goals & Objectives

### Primary Goal
Enable international buyers to independently access comprehensive VERSPA product information, accelerating the sales cycle.

### Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Monthly Inquiry Submissions | 10+ | Contact form submissions |
| PDF Downloads | 50+ | Download button clicks |
| Average Session Duration | 3+ minutes | Google Analytics |
| Mobile Traffic | 60%+ | Device analytics |

### Non-Goals (Out of Scope for MVP)

❌ Multi-language support (English only for V1)  
❌ E-commerce/online purchasing  
❌ User login/account system  
❌ Live chat/chatbot integration  
❌ Video content library  
❌ Blog/news section  

---

## 👥 User Personas

### Persona 1: International Salon Owner

**Name**: Marie Dubois  
**Age**: 42  
**Location**: Paris, France  
**Business**: Owner of 2 premium hair salons  

**Context**:
- Met VERSPA at a beauty trade show in Dubai
- Researching shampoo chair upgrades for flagship location
- Reviews materials on iPad during commute
- Needs to justify ROI to business partner

**Needs**:
- Detailed product specifications
- Certification documents (CE, FDA)
- Real installation photos from European salons
- Pricing transparency

**Pain Points**:
- Limited time during business hours
- Skeptical of new brands without proven track record
- Concerned about post-purchase support

---

### Persona 2: Beauty Equipment Distributor

**Name**: David Chen  
**Age**: 35  
**Location**: Los Angeles, USA  
**Business**: Wholesale distributor to 50+ salons  

**Context**:
- Scouts innovative products at international exhibitions
- Downloads catalogs to evaluate potential inventory
- Shares materials with retail partners
- Needs quick access to technical specs during client calls

**Needs**:
- High-resolution product images
- Downloadable PDF catalogs
- Patent/technology differentiation
- Installation requirements

**Pain Points**:
- Too many similar products in market
- Needs clear competitive advantages
- Requires proof of quality certifications

---

## 📱 User Stories & Acceptance Criteria

### Epic 1: Product Discovery (MVP Priority 🥇)

**FEAT-1: Browse Product Lineup**

**As a** salon owner  
**I want to** view all VERSPA models with key features  
**So that** I can quickly identify which model suits my needs  

**Acceptance Criteria**:
- [ ] Display 4 product cards: Basic, Zenith, Premium, SoLaS
- [ ] Each card shows: name, tagline, 3 key features, hero image
- [ ] Badge indicating "Best Seller" or "New Technology"
- [ ] "Learn More" CTA button per product
- [ ] Responsive grid: 2 columns on mobile, 2x2 on tablet+

**FEAT-1.1: View Product Detail Page**

**As a** buyer  
**I want to** see comprehensive specifications for each model  
**So that** I can evaluate if it meets my requirements  

**Acceptance Criteria**:
- [ ] Full specifications table (dimensions, weight, power, warranty)
- [ ] High-quality image gallery (min 5 photos per product)
- [ ] Color/finish options with swatches
- [ ] Massage point diagram/illustration
- [ ] Download PDF catalog button
- [ ] "Request Quote" CTA prominently displayed

---

### Epic 2: Trust Building

**FEAT-2: Certification Downloads**

**As a** distributor  
**I want to** download official certifications and patents  
**So that** I can verify product legitimacy  

**Acceptance Criteria**:
- [ ] Dedicated "Certifications" section on homepage
- [ ] Display badges: KC, CE, FDA, ISO 9001
- [ ] Click badge → download PDF certificate
- [ ] Show "11 Patents, 8 Design Rights" with download link
- [ ] Track download events for analytics

**FEAT-3: Installation Gallery**

**As a** salon owner  
**I want to** see real-world installation examples  
**So that** I can visualize VERSPA in my space  

**Acceptance Criteria**:
- [ ] Gallery grid with min 12 high-quality photos
- [ ] Filter by: product model, country/region
- [ ] Lightbox view for full-screen images
- [ ] Caption showing: salon name (if permitted), location, product model
- [ ] Lazy loading for performance

---

### Epic 3: Lead Generation

**FEAT-4: Contact/Inquiry Form**

**As a** buyer  
**I want to** submit a quote request  
**So that** VERSPA can follow up with me  

**Acceptance Criteria**:
- [ ] Form fields: Name, Company, Email, Phone, Country, Product Interest, Message
- [ ] Email validation (format check)
- [ ] Submit button disabled until required fields filled
- [ ] Success message: "Thank you! We'll contact you within 24 hours."
- [ ] Email sent to: info@combhair.kr
- [ ] No database storage (direct email delivery)

---

## 🎨 Experience Design Principles

### Design Philosophy
**Tone**: Modern & Minimal (Apple/Dyson aesthetic)  
**Language**: Friendly yet professional, warm B2B communication  
**Layout**: Clean, spacious, information clarity over decoration  

### Key Principles

1. **Simplicity First**: Avoid information overload, focus on essentials
2. **Mobile-First**: 60%+ users on smartphones post-meeting
3. **Trust Signals**: Certifications and real installations upfront
4. **Fast Access**: Critical info (specs, downloads) within 2 clicks
5. **Conversion Focus**: Clear CTAs for inquiry and downloads

---

## 📊 Information Architecture
```
Home
├── Hero Section (Brand intro + value prop)
├── Product Lineup (4 models overview)
│   ├── VERSPA Basic (detail page)
│   ├── VERSPA Zenith (detail page)
│   ├── VERSPA Premium (detail page)
│   └── VERSPA SoLaS (detail page)
├── Installation Gallery
├── Certifications & Quality
├── About VERSPA
│   ├── Brand Story (Beauty × Healing)
│   ├── Innovation Timeline
│   └── Why Choose VERSPA
└── Contact Us
```

---

## 🚀 Success Criteria

### Launch Readiness Checklist

**Content**:
- [ ] All 4 product pages complete with specs
- [ ] Min 12 installation photos licensed
- [ ] PDF catalogs prepared (English versions)
- [ ] Certificate PDFs scanned and optimized

**Technical**:
- [ ] Mobile responsiveness tested (iOS Safari, Android Chrome)
- [ ] Page load time < 3 seconds on 4G
- [ ] Forms functional (test email delivery)
- [ ] Download buttons tracked in analytics

**Business**:
- [ ] Sales team trained on how to share URL
- [ ] Business cards updated with website URL
- [ ] Email signature includes website link

---

## 🔄 Post-Launch Iteration Plan

### Phase 1: MVP Launch (Week 1-2)
- Core product pages live
- Basic inquiry form
- Certificate downloads

### Phase 2: Enhancement (Month 2-3)
- Add video testimonials (if available)
- Expand installation gallery (target 30+ photos)
- A/B test inquiry form placement

### Phase 3: Expansion (Month 4-6)
- Multi-language support (Chinese, Japanese)
- Video product demonstrations
- Dealer locator map

---

## 📐 Assumptions & Risks

### Assumptions

| Assumption | Validation Method | Risk if Wrong |
|------------|------------------|---------------|
| Buyers prefer mobile browsing post-meeting | Track device analytics | Low - responsive design covers both |
| PDF downloads indicate serious interest | Correlate downloads with conversions | Low - still valuable awareness metric |
| English-only is acceptable for initial launch | Survey sales team and past inquiries | Medium - may limit Asian markets |

### Risks & Mitigation

**Risk 1: Low organic traffic (no SEO history)**  
**Impact**: High  
**Mitigation**: Focus on direct sharing (trade shows, email signatures), paid ads if needed  

**Risk 2: Content updates require developer**  
**Impact**: Medium  
**Mitigation**: Document update process clearly, train marketing team on Git basics  

**Risk 3: Competitors copy design/content**  
**Impact**: Low  
**Mitigation**: Unique brand story, patented technology focus  

---

## 🔗 Reference Materials

- **Uploaded Documents**: 3 VERSPA brochures (Basic, Brand Intro, Zenith)
- **Existing Website**: verspa.co.kr (Korean version)
- **Naver Store**: smartstore.naver.com/combhair

---

## 📝 Decision Log

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| 2025-01-08 | Static site (no database) | Small scale, easy maintenance | Tech Team |
| 2025-01-08 | Next.js SSG framework | SEO-friendly, fast performance | Tech Team |
| 2025-01-08 | English-only for V1 | Faster launch, validate demand first | Marketing |
| 2025-01-08 | No live chat integration | Keep simple, email-based follow-up | Marketing |

---

**Document End**  
Next Review Date: 2025-02-08 (1 month post-launch)