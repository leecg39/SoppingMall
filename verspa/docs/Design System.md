# **5. Design System (디자인 시스템)**
`````markdown
# Design System
## VERSPA International Website

**Document Version**: 1.0  
**Last Updated**: 2025-01-08  
**Design Philosophy**: Modern & Minimal, Premium B2B

---

## 🎨 Brand Identity

### Brand Essence

**Visual Direction**: Modern, minimal, tech-inspired (think Apple/Dyson)  
**Emotional Tone**: Trust, innovation, calm professionalism  
**Voice**: Friendly yet authoritative, warm but expert

### Logo Usage

**Primary Logo**: VERSPA wordmark with wave icon  
**Safe Space**: Minimum 20px clearance on all sides  
**Minimum Size**: 120px width (digital), 30mm (print)  

**Color Variations**:
- On light backgrounds: Full color (gold + black)
- On dark backgrounds: White + gold
- Monochrome: All black or all white

---

## 🎯 Color Palette

### Primary Colors
````css
:root {
  /* Brand Gold */
  --color-primary-50: #fffbeb;
  --color-primary-100: #fef3c7;
  --color-primary-200: #fde68a;
  --color-primary-300: #fcd34d;
  --color-primary-400: #fbbf24;
  --color-primary-500: #f59e0b;  /* Main brand gold */
  --color-primary-600: #d97706;  /* Hover state */
  --color-primary-700: #b45309;
  --color-primary-800: #92400e;
  --color-primary-900: #78350f;
  
  /* Simplified Tailwind classes */
  /* Primary: amber-500, Hover: amber-600 */
}
````

### Neutral Colors
````css
:root {
  /* Zinc scale for modern minimalism */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-200: #e4e4e7;
  --color-neutral-300: #d4d4d8;
  --color-neutral-400: #a1a1aa;
  --color-neutral-500: #71717a;
  --color-neutral-600: #52525b;
  --color-neutral-700: #3f3f46;
  --color-neutral-800: #27272a;  /* Body text on light BG */
  --color-neutral-900: #18181b;  /* Headings */
  --color-neutral-950: #09090b;  /* Dark backgrounds */
  
  /* Tailwind classes */
  /* Background: zinc-950, Text: zinc-100/zinc-800 */
}
````

### Semantic Colors
````css
:root {
  /* Success */
  --color-success: #10b981;   /* Green-500 */
  --color-success-bg: #d1fae5; /* Green-100 */
  
  /* Error */
  --color-error: #ef4444;     /* Red-500 */
  --color-error-bg: #fee2e2;  /* Red-100 */
  
  /* Warning */
  --color-warning: #f59e0b;   /* Amber-500 (same as primary) */
  --color-warning-bg: #fef3c7; /* Amber-100 */
  
  /* Info */
  --color-info: #3b82f6;      /* Blue-500 */
  --color-info-bg: #dbeafe;   /* Blue-100 */
}
````

### Color Usage Guidelines

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| **Backgrounds** |
| Page background | #09090b | `bg-zinc-950` |
| Card/surface | #18181b | `bg-zinc-900` |
| Input fields | #27272a | `bg-zinc-800` |
| **Text** |
| Primary headings | #fafafa | `text-zinc-50` |
| Body text (dark BG) | #f4f4f5 | `text-zinc-100` |
| Body text (light BG) | #27272a | `text-zinc-800` |
| Muted text | #a1a1aa | `text-zinc-400` |
| **Interactive** |
| Primary button | #f59e0b | `bg-amber-500` |
| Button hover | #d97706 | `hover:bg-amber-600` |
| Link | #f59e0b | `text-amber-500` |
| Link hover | #fbbf24 | `hover:text-amber-400` |
| **Borders** |
| Default border | #3f3f46 | `border-zinc-700` |
| Subtle border | #27272a | `border-zinc-800` |
| Accent border | #d97706 | `border-amber-600` |

---

## 📝 Typography

### Font Families
````css
:root {
  /* Sans-serif for body & UI */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Helvetica Neue', Arial, sans-serif;
  
  /* Serif for headlines (optional, for elegance) */
  --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  
  /* Monospace for code (if needed) */
  --font-mono: 'Fira Code', 'Courier New', monospace;
}
````

**Primary**: Inter (body text, buttons, UI)  
**Accent**: Cormorant Garamond (hero headlines only)  

**Loading Strategy**:
````javascript
// next/font/google
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
````

### Type Scale
````css
/* Fluid typography with clamp() */
:root {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
}
````

### Text Styles

| Style | Font | Size | Weight | Line Height | Tailwind |
|-------|------|------|--------|-------------|----------|
| **Hero H1** | Serif | 60px → 48px (mobile) | 700 | 1.1 | `text-6xl md:text-7xl font-bold` |
| **H2** | Sans | 36px → 30px | 700 | 1.2 | `text-4xl md:text-5xl font-bold` |
| **H3** | Sans | 24px → 20px | 600 | 1.3 | `text-2xl md:text-3xl font-semibold` |
| **H4** | Sans | 20px | 600 | 1.4 | `text-xl font-semibold` |
| **Body** | Sans | 16px | 400 | 1.6 | `text-base` |
| **Body Large** | Sans | 18px | 400 | 1.6 | `text-lg` |
| **Small** | Sans | 14px | 400 | 1.5 | `text-sm` |
| **Caption** | Sans | 12px | 400 | 1.4 | `text-xs` |
| **Button** | Sans | 16px | 600 | 1 | `text-base font-semibold` |

### Font Weight Scale

- **Light**: 300 (rarely used)
- **Regular**: 400 (body text)
- **Medium**: 500 (emphasis)
- **Semibold**: 600 (subheadings, buttons)
- **Bold**: 700 (headings)

---

## 📏 Spacing System

### Base Unit: 4px (0.25rem)
````css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
````

### Layout Spacing

| Context | Spacing | Tailwind |
|---------|---------|----------|
| Component padding (small) | 16px | `p-4` |
| Component padding (medium) | 24px | `p-6` |
| Component padding (large) | 32px | `p-8` |
| Section padding (vertical) | 80px | `py-20` |
| Section padding (mobile) | 48px | `py-12` |
| Element gap (tight) | 8px | `gap-2` |
| Element gap (normal) | 16px | `gap-4` |
| Element gap (loose) | 24px | `gap-6` |

---

## 🧱 Component Library

### Button Components

#### Primary Button
````html
<button class="
  px-8 py-4 
  bg-amber-500 hover:bg-amber-600 
  text-zinc-950 
  font-semibold tracking-wider 
  transition-all duration-300 
  shadow-lg shadow-amber-900/50 
  hover:shadow-amber-800/50 
  hover:-translate-y-1 
  rounded-lg
">
  REQUEST QUOTE
</button>
````

**States**:
- Default: Gold background, dark text
- Hover: Darker gold, shadow expands, lifts up
- Active: Pressed state (translate-y-0)
- Disabled: Opacity 50%, cursor not-allowed

---

#### Secondary Button
````html
<button class="
  px-8 py-4 
  border-2 border-amber-600/50 
  hover:border-amber-500 
  hover:bg-amber-950/20 
  text-zinc-100 
  font-semibold tracking-wider 
  transition-all duration-300 
  rounded-lg
">
  LEARN MORE
</button>
````

---

#### Download Button (Icon + Text)
````html
<button class="
  inline-flex items-center gap-2 
  px-6 py-3 
  bg-zinc-800 hover:bg-zinc-700 
  text-amber-500 
  border border-amber-900/30 
  rounded-lg 
  transition-all duration-300
">
  <svg class="w-5 h-5"><!-- Download icon --></svg>
  <span>Download PDF</span>
</button>
````

---

### Input Components

#### Text Input
````html
<input 
  type="text" 
  class="
    w-full px-4 py-3 
    bg-zinc-800 
    border border-zinc-700 
    focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 
    text-zinc-100 
    rounded-lg 
    transition-all duration-300 
    placeholder:text-zinc-500
  " 
  placeholder="Your Name"
/>
````

**States**:
- Default: Dark background, subtle border
- Focus: Amber border, ring glow
- Error: Red border, red ring
- Disabled: Opacity 50%

---

#### Textarea
````html
<textarea 
  class="
    w-full px-4 py-3 
    bg-zinc-800 
    border border-zinc-700 
    focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 
    text-zinc-100 
    rounded-lg 
    min-h-[120px] 
    resize-y
  " 
  placeholder="Your Message"
></textarea>
````

---

### Card Components

#### Product Card
````html
<div class="
  group 
  bg-gradient-to-br from-zinc-900 to-zinc-800 
  rounded-2xl p-8 
  border border-amber-900/20 
  hover:border-amber-600/50 
  transition-all duration-500 
  hover:shadow-2xl hover:shadow-amber-900/20 
  overflow-hidden
">
  <!-- Badge -->
  <div class="
    absolute top-4 right-4 
    px-3 py-1 
    bg-amber-600 
    text-zinc-950 
    text-xs font-bold tracking-wider 
    rounded-full
  ">
    NO.1 IN SALES
  </div>
  
  <!-- Content -->
  <h3 class="text-3xl font-bold mb-2">VERSPA BASIC</h3>
  <p class="text-amber-500 text-sm tracking-wider mb-4">Best of the Best</p>
  <p class="text-zinc-300 mb-6">Description text...</p>
  
  <!-- Features -->
  <div class="flex flex-wrap gap-2 mb-6">
    <span class="px-3 py-1 bg-zinc-800 border border-amber-900/30 rounded-full text-sm text-zinc-400">
      5-Point Massage
    </span>
  </div>
  
  <!-- CTA -->
  <button class="w-full py-3 border-2 border-amber-600/50 hover:bg-amber-600 hover:text-zinc-950 transition-all duration-300 rounded-lg font-bold tracking-wider">
    LEARN MORE
  </button>
</div>
````

---

### Image Components

#### Product Image (Optimized)
````jsx
import Image from 'next/image';

<div class="relative aspect-[4/3] overflow-hidden rounded-xl">
  <Image
    src="/images/products/basic-hero.jpg"
    alt="VERSPA BASIC Massage Shampoo Chair"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover group-hover:scale-105 transition-transform duration-500"
    priority={false}
  />
</div>
````

---

#### Gallery Image (Lightbox Trigger)
````jsx
<button 
  onClick={openLightbox}
  class="
    relative aspect-[3/2] 
    overflow-hidden rounded-lg 
    group cursor-pointer
  "
>
  <Image
    src="/images/gallery/paris-01.jpg"
    alt="VERSPA installation at Le Coiffeur Premium, Paris"
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover group-hover:scale-110 transition-transform duration-500"
  />
  
  <!-- Overlay on hover -->
  <div class="
    absolute inset-0 
    bg-gradient-to-t from-zinc-950/80 to-transparent 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-300 
    flex items-end p-4
  ">
    <p class="text-zinc-100 text-sm font-semibold">View Details</p>
  </div>
</button>
````

---

## 🌐 Layout Components

### Container (Max Width)
````html
<div class="
  max-w-7xl mx-auto px-6
  /* 1280px max width, centered, 24px padding on sides */
">
  <!-- Content -->
</div>
````

**Breakpoint Adjustments**:
- Mobile: `px-4` (16px padding)
- Tablet+: `px-6` (24px padding)

---

### Section
````html
<section class="
  py-32 px-6 
  /* 128px vertical padding, 24px horizontal */
">
  <div class="max-w-6xl mx-auto">
    <!-- Section content -->
  </div>
</section>
````

**Mobile**:
````html
<section class="py-12 px-4 md:py-32 md:px-6">
````

---

### Grid Layouts

#### 2-Column (Desktop), 1-Column (Mobile)
````html
<div class="
  grid grid-cols-1 md:grid-cols-2 
  gap-8
">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
````

#### 4-Column Product Grid
````html
<div class="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
  gap-6
">
  <!-- Product cards -->
</div>
````

---

## ♿ Accessibility Guidelines

### Color Contrast

**Minimum Ratios** (WCAG 2.1 AA):
- Body text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

**Verified Combinations**:
| Foreground | Background | Ratio | Pass? |
|------------|------------|-------|-------|
| #fafafa (zinc-50) | #09090b (zinc-950) | 18.2:1 | ✅ AAA |
| #f59e0b (amber-500) | #18181b (zinc-900) | 5.8:1 | ✅ AA |
| #a1a1aa (zinc-400) | #09090b (zinc-950) | 7.1:1 | ✅ AA |

---

### Focus States

**Visible Focus Indicators** (required):
````css
/* All interactive elements */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Tailwind utility */
.focus-visible:ring-2.ring-amber-500.ring-offset-2.ring-offset-zinc-950
````

---

### ARIA Labels

**Required for**:
- Icon-only buttons: `aria-label="Download PDF"`
- Form inputs: `<label for="email">` + `<input id="email">`
- Navigation: `<nav aria-label="Main navigation">`
- Image links: `aria-label` on `<a>` tag

---

## 📱 Responsive Behavior

### Breakpoints

| Name | Min Width | Tailwind Prefix | Use Case |
|------|-----------|-----------------|----------|
| Mobile | 0px | (default) | Phones (portrait) |
| Small | 640px | `sm:` | Phones (landscape), Small tablets |
| Medium | 768px | `md:` | Tablets (portrait) |
| Large | 1024px | `lg:` | Tablets (landscape), Laptops |
| XL | 1280px | `xl:` | Desktops |
| 2XL | 1536px | `2xl:` | Large desktops |

---

### Mobile-First Approach

**Pattern**: Start with mobile styles, add complexity at larger breakpoints
````html
<!-- Mobile: Stacked, Tablet+: Side-by-side -->
<div class="
  flex flex-col md:flex-row 
  gap-4 md:gap-8
">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>
````

---

### Typography Scaling
````html
<!-- Hero headline: 48px mobile → 72px desktop -->
<h1 class="text-5xl md:text-7xl font-bold">
  Different Kind of Comfort
</h1>

<!-- Body text: 16px mobile → 18px desktop -->
<p class="text-base lg:text-lg">
  Paragraph content...
</p>
````

---

## 🎬 Animation & Motion

### Transition Defaults
````css
/* Standard transition for interactive elements */
.transition-all.duration-300 /* 300ms for quick interactions */
.transition-all.duration-500 /* 500ms for complex movements */
````

---

### Common Animations

#### Fade In (on page load)
````css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
````

#### Slide Up (on scroll or load)
````css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}
````

#### Hover Lift (buttons, cards)
````html
<div class="
  hover:-translate-y-1 
  transition-transform duration-300
">
  <!-- Content -->
</div>
````

---

### Performance Considerations

**Prefer**:
- `transform` over `top/left` (GPU-accelerated)
- `opacity` over `visibility` (smoother)

**Avoid**:
- Animating `width/height` (causes layout reflow)
- Excessive `box-shadow` animations (performance hit)

---

## 🖼️ Imagery Guidelines

### Image Specifications

| Type | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| Product Hero | 1200×800px | JPG/WebP | 200KB |
| Product Gallery | 1200×800px | JPG/WebP | 200KB |
| Installation Photo | 1600×1000px | JPG/WebP | 300KB |
| Thumbnail | 400×250px | JPG/WebP | 50KB |
| Logo (vector) | -- | SVG | 10KB |

---

### Image Optimization

**Tools**:
- Next.js `<Image>` component (automatic optimization)
- Manual: TinyPNG, Squoosh

**Format Strategy**:
- Modern browsers: WebP (smaller size)
- Fallback: JPG
- Transparency needed: PNG

---

## 🔤 Iconography

**Library**: Lucide React  
**Style**: Outline (stroke-based)  
**Sizes**: 16px, 20px, 24px, 32px  

**Common Icons**:
- `ChevronDown` - Scroll indicator
- `Download` - Download buttons
- `Mail` - Contact info
- `MapPin` - Location
- `Award` - Certifications
- `CheckCircle` - Success messages
- `AlertCircle` - Errors

**Usage**:
````jsx
import { Download } from 'lucide-react';

<Download className="w-5 h-5 text-amber-500" />
````

---

## 🎨 Design Tokens (Reference)
````javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          // ... (full amber scale)
        },
        neutral: {
          // Full zinc scale
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        // Extends default Tailwind spacing
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      }
    }
  }
}
````

---

**Document End**

---