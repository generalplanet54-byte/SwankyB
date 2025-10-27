# 🎨 SwankyBoyz Brand Identity & Design System

## Visual Identity Overview

**SwankyBoyz** is the world's premier authority for high-end male grooming and lifestyle products. The brand embodies **luxury, sophistication, and accessible expertise** for the modern gentleman.

---

## Color Palette

### Primary Colors

#### Charcoal (`#1A1A1A`)
- **Usage:** Primary background, text, cards, sections
- **Psychology:** Sophisticated, authoritative, grounding
- **Hex:** `#1A1A1A`
- **RGB:** `26, 26, 26`
- **Application:** 
  - Page backgrounds
  - Card backgrounds
  - Text backgrounds
  - Section containers

#### Champagne Gold (`#D4AF37`)
- **Usage:** Accents, highlights, CTAs, premium elements
- **Psychology:** Luxury, prestige, aspiration
- **Hex:** `#D4AF37`
- **RGB:** `212, 175, 55`
- **Application:**
  - Call-to-action buttons
  - Headers and titles
  - Accent lines and borders
  - Premium badges and labels
  - Hover states

#### Off-White (`#FAFAF8`)
- **Usage:** Secondary text, subtle backgrounds
- **Psychology:** Clean, readable, luxury aesthetic
- **Hex:** `#FAFAF8`
- **RGB:** `250, 250, 248`
- **Application:**
  - Body text
  - Light backgrounds
  - High contrast elements
  - Subtle section dividers

### Secondary Colors (Supporting)

```css
/* Semantic Colors */
Success: #10B981 (Emerald)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Info: #3B82F6 (Blue)

/* Transparency Scales */
off-white/10 = 10% opacity
off-white/20 = 20% opacity
off-white/50 = 50% opacity
off-white/70 = 70% opacity
off-white/80 = 80% opacity
off-white/90 = 90% opacity
```

---

## Typography System

### Font Families

#### Display Font: Playfair Display
- **Usage:** Headlines, hero titles, section headers
- **Weight:** Bold (700)
- **Style:** Serif, elegant, sophisticated
- **Sizes:**
  - H1: 48px-64px (hero titles)
  - H2: 32px-42px (section headers)
  - H3: 24px-28px (subsection headers)
  - H4: 18px-22px (card titles)

**Example:**
```html
<h1 class="font-display text-5xl font-bold text-off-white">
  Premium Grooming Excellence
</h1>
```

#### Body Font: Inter
- **Usage:** Body text, paragraphs, descriptions
- **Weights:** Regular (400), Medium (500), Semibold (600)
- **Sizes:**
  - P: 16px (desktop), 14px (mobile)
  - Small: 14px (desktop), 12px (mobile)
  - XSmall: 12px (desktop), 11px (mobile)

**Example:**
```html
<p class="text-base text-off-white/80">
  Expertly curated product recommendations...
</p>
```

---

## Logo Usage

### Logo Files
- **Full Logo:** `/public/logo.svg` (1324×1324px)
- **Favicon:** `/public/favicon.svg` (32×32px)
- **Apple Touch Icon:** `/public/logo.svg`

### Logo Guidelines

#### Minimum Size
- Web: 48×48px
- Print: 0.5 inches
- Never smaller than favicon size

#### Clear Space
- Maintain 20% of logo height/width as clear space around all sides
- Do not overlap text or other elements

#### Color Variations
```css
/* Standard (Charcoal + Gold) */
Primary: #1A1A1A background with #D4AF37 accent

/* Inverted */
Use when placed on light backgrounds
Apply white/gold on dark overlay

/* Monochrome */
Use: Off-white on dark backgrounds
Avoid: Color variations that dilute brand
```

#### Usage Examples

**Website Header:**
```tsx
<img 
  src="/logo.svg" 
  alt="SwankyBoyz Logo" 
  className="h-12 w-12" 
/>
```

**Favicon:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

---

## Design System Components

### Spacing System

```css
Spacing Scale (in Tailwind):
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
5xl: 80px
```

**Container Padding:**
```css
DEFAULT: 1.5rem (24px)
sm: 2rem (32px)
lg: 3rem (48px)
xl: 4rem (64px)
max-width: 1200px (2xl)
```

### Border Radius

```css
rounded-lg: 8px (cards, buttons)
rounded-xl: 12px (premium elements)
rounded-2xl: 16px (large sections)
rounded-full: 9999px (buttons, badges)
```

### Shadows

```css
/* Luxury Shadow */
box-shadow: 0 40px 80px -40px rgba(20, 20, 20, 0.65)

/* Standard Shadows */
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

---

## Button Styles

### Primary CTA (Luxury Gold)
```tsx
<button className="bg-champagne hover:bg-champagne/90 text-charcoal px-6 py-3 rounded-full font-bold uppercase tracking-[0.2em] transition">
  Shop Now
</button>
```

**Usage:**
- Primary actions
- Product CTAs
- Newsletter signups
- Major conversions

### Secondary Button (Outline)
```tsx
<button className="border border-champagne text-champagne hover:bg-champagne/10 px-6 py-3 rounded-full font-bold uppercase tracking-[0.2em] transition">
  View Details
</button>
```

**Usage:**
- Secondary actions
- Alternative paths
- Comparison options

### Luxury Gradient
```tsx
<button className="bg-gradient-to-r from-champagne to-amber-400 hover:to-amber-300 text-charcoal px-6 py-3 rounded-full font-bold transition">
  Exclusive Offer
</button>
```

**Usage:**
- High-priority CTAs
- Limited-time offers
- Premium features

---

## Card & Section Design

### Product Card
```tsx
<article className="group rounded-2xl border border-off-white/10 bg-charcoal/80 overflow-hidden hover:border-champagne/50 transition">
  {/* Image */}
  <div className="relative overflow-hidden h-60">
    <img className="object-cover group-hover:scale-105 transition duration-500" />
  </div>
  
  {/* Content */}
  <div className="p-6 space-y-4">
    <h3 className="font-display text-xl text-off-white font-bold">Title</h3>
    <p className="text-sm text-off-white/70">Description</p>
    <div className="flex items-center justify-between">
      <span className="font-bold text-champagne">$299.99</span>
      <span className="text-xs text-off-white/60">⭐ 4.8/5</span>
    </div>
  </div>
</article>
```

### Section Container
```tsx
<section className="bg-charcoal py-24 space-y-12">
  <div className="container space-y-8">
    <h2 className="font-display text-4xl text-off-white">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

---

## Text Styles & Hierarchy

### Headings

**H1 - Hero/Page Title**
```tsx
<h1 className="font-display text-5xl sm:text-6xl leading-tight text-off-white font-bold">
  {children}
</h1>
```

**H2 - Section Header**
```tsx
<h2 className="font-display text-4xl leading-tight text-off-white sm:text-5xl">
  {children}
</h2>
```

**H3 - Subsection**
```tsx
<h3 className="font-display text-2xl text-off-white font-bold">
  {children}
</h3>
```

**H4 - Card/Box Title**
```tsx
<h4 className="font-display text-lg text-off-white font-bold">
  {children}
</h4>
```

### Body Text

**Paragraph**
```tsx
<p className="text-base text-off-white/80 leading-relaxed">
  {children}
</p>
```

**Small Text**
```tsx
<span className="text-sm text-off-white/70">
  {children}
</span>
```

**Accent Text**
```tsx
<span className="text-xs uppercase tracking-[0.3em] font-semibold text-champagne">
  {children}
</span>
```

---

## Badge & Label System

### Bestseller Badge
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
  🏆 Bestseller
</span>
```

### Limited Stock Badge
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
  ⚠️ Only 5 Left
</span>
```

### Deal Expiring Badge
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
  ⏰ Ending Soon
</span>
```

---

## Responsive Design Guidelines

### Breakpoints

```css
Mobile: 0px - 640px (sm)
Tablet: 640px - 1024px (md/lg)
Desktop: 1024px+ (xl/2xl)
```

### Responsive Text

```tsx
/* Heading responsive */
<h1 className="text-4xl sm:text-5xl lg:text-6xl">

/* Padding responsive */
<div className="px-4 sm:px-6 lg:px-8">

/* Grid responsive */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

---

## Animation & Interaction

### Hover Effects

**Subtle Scale**
```css
transition hover:scale-105 duration-300
```

**Color Shift**
```css
transition hover:bg-champagne/90 duration-200
```

**Border Highlight**
```css
transition hover:border-champagne/50 duration-300
```

### Loading States

```tsx
<div className="animate-pulse">
  <div className="h-12 bg-off-white/10 rounded-lg"></div>
</div>
```

### Entrance Animations

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Dark Mode

SwankyBoyz is **dark-first** with optional light mode support.

```tsx
// Tailwind dark mode config
darkMode: 'class'

// Usage
<div className="bg-off-white dark:bg-charcoal">
  {children}
</div>
```

---

## Accessibility

### Color Contrast
- Text on Charcoal: Off-white (WCAG AAA)
- Text on Champagne: Charcoal (WCAG AAA)
- All combinations meet accessibility standards

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-charcoal">
  {children}
</button>
```

### Alt Text
```tsx
<img alt="Braun Series 9 PRO+ Electric Shaver - Premium grooming tool" />
```

---

## Implementation Checklist

- [x] Create Favicon (`/public/favicon.svg`)
- [x] Create Branding Guide (this file)
- [x] Update HTML favicon links
- [x] Configure Tailwind colors
- [x] Define typography system
- [ ] Create component library documentation
- [ ] Build Storybook components
- [ ] Create design tokens file
- [ ] Implement theme switcher
- [ ] Set up brand guidelines in design tool (Figma)

---

## Design Resources

### External Tools
- **Tailwind CSS:** https://tailwindcss.com
- **Playfair Display Font:** https://fonts.google.com/specimen/Playfair+Display
- **Color Picker:** https://www.color-hex.com
- **Accessibility Checker:** https://webaim.org/resources/contrastchecker/

### Files
- Logo: `/public/logo.svg`
- Favicon: `/public/favicon.svg`
- Tailwind Config: `/tailwind.config.js`
- Index HTML: `/index.html`

---

## Brand Voice & Copy

### Tone
- **Authoritative** yet approachable
- **Sophisticated** without being pretentious
- **Expert** but relatable
- **Luxurious** but accessible

### Key Brand Messages
1. "Premium expertise for modern gentlemen"
2. "We test so you don't waste money"
3. "Luxury doesn't have to be complicated"
4. "Confidence comes from knowing you have the best"
5. "Executive grooming excellence"

### Example Copy

**Hero:** "Grooming Excellence for the Modern Executive"

**Subheading:** "Expert-tested, premium-quality grooming solutions. From electric shavers to skincare, we've curated the absolute best tools for the discerning gentleman."

**CTA:** "Explore Premium Grooming"

---

## Future Enhancements

- [ ] Component library (Storybook)
- [ ] Design tokens system
- [ ] Animation library
- [ ] Icon system
- [ ] Pattern library
- [ ] Figma design file
- [ ] Brand guidelines PDF
- [ ] Video brand identity

---

**SwankyBoyz: Where luxury meets expertise. 🎩✨**
