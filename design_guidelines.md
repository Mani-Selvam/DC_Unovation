# DC Unovation Website Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from modern B2B SaaS and creative agency leaders:
- **Linear**: Clean typography, generous spacing, subtle animations
- **Stripe**: Trust-building through minimalism, clear hierarchy
- **Vercel**: Developer-focused precision with elegant restraint
- **Webflow**: Creative confidence with bold section transitions

**Rationale**: As a company offering web development, UI/UX, and branding services, DC Unovation's site must demonstrate design excellence while maintaining high conversion potential.

## Core Design Principles
1. **Professional Confidence**: Showcase technical expertise through precise, polished interfaces
2. **Conversion-Focused**: Clear CTAs, trust signals, minimal friction to contact
3. **Visual Storytelling**: Use imagery and layout to communicate capability
4. **Effortless Interaction**: Forms feel helpful, not burdensome; modals enhance rather than interrupt

---

## Typography

### Font System
**Primary**: Inter (Google Fonts) - clean, modern, excellent legibility
**Accent**: Space Grotesk (Google Fonts) - distinctive for headlines, technical feel

### Hierarchy
- **Hero Headline**: Space Grotesk, 4xl/5xl (mobile/desktop), font-bold, tracking-tight
- **Section Headlines**: Space Grotesk, 3xl/4xl, font-bold
- **Subheadings**: Inter, xl/2xl, font-semibold
- **Body Text**: Inter, base/lg, font-normal, leading-relaxed
- **Small Text**: Inter, sm, font-medium (form labels, captions)
- **CTA Buttons**: Inter, base, font-semibold, tracking-wide

---

## Layout System

### Spacing Primitives
Use Tailwind units: **4, 6, 8, 12, 16, 20, 24** for consistency
- Component padding: p-6 (mobile), p-8/p-12 (desktop)
- Section vertical spacing: py-16 (mobile), py-20/py-24 (desktop)
- Element gaps: gap-4, gap-6, gap-8
- Container max-width: max-w-7xl with px-6 (mobile), px-8 (desktop)

### Grid System
- **Services Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6
- **Portfolio Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8
- **Testimonials**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6
- **Blog Preview**: grid-cols-1 md:grid-cols-3, gap-6
- **Metrics**: grid-cols-2 md:grid-cols-4, gap-8

---

## Component Library

### Navigation
- **Fixed navbar** on scroll with backdrop blur (backdrop-blur-lg)
- Logo left, navigation center, CTA button right
- Mobile: Hamburger menu with slide-in drawer
- Smooth scroll to anchors with offset for fixed header

### Hero Section
- **Full viewport height** (min-h-screen) with gradient background
- **Large hero image**: Abstract tech/innovation visual positioned right side (desktop) or background (mobile)
- Headline + subheadline left-aligned or centered
- Two CTAs side-by-side: Primary (solid) + Secondary (outline/ghost)
- Trust badges below CTAs: Client logo strip with subtle opacity
- **Buttons with blurred backgrounds** when overlaying images

### Service Cards
- Rounded cards (rounded-xl) with subtle shadow (shadow-lg)
- Icon at top (large, 48px)
- Service title (font-bold, xl)
- 2-3 line description
- Hover: subtle lift (hover:-translate-y-1) and shadow increase

### Process/Workflow Section
- Horizontal timeline on desktop, vertical on mobile
- 5 steps with connecting line
- Each step: Number badge → Title → Short description
- Icons for each phase

### Portfolio Grid
- **Image-first cards** with overlay on hover
- Project thumbnail with aspect-ratio-video or aspect-ratio-square
- Overlay shows: Project title + Brief result + "I want similar project" button
- Cards have rounded corners (rounded-lg) and shadow
- **Modal triggered** by CTA collects: Name, Email, Message (optional), Project reference (hidden)

### Testimonials
- Card-based layout with quote, author photo (circular), name, title, company
- Rotation indicator if carousel (dots below)
- Quote icon subtle in background

### Metrics/Highlights
- Large numbers (text-5xl/6xl, font-bold) with animated counters
- Label below each number
- Centered alignment in each grid cell

### Blog Preview Cards
- Featured image at top (aspect-ratio-video)
- Category tag (small badge)
- Title (font-semibold, lg)
- Excerpt (2 lines, text-ellipsis)
- Read time + date metadata

### Contact Form
- Full-width section with 2-column layout (desktop): Form left, Contact info/map placeholder right
- Form fields: Name, Email, Phone (optional), Message (textarea)
- Clear field labels above inputs
- Input styling: border, rounded-lg, focus ring
- Submit button: Full-width on mobile, auto on desktop
- Success state: Toast notification (top-right) with checkmark icon
- Error state: Red border on fields, inline error text below

### Modals
- Centered overlay with backdrop (bg-black/50)
- Modal container: max-w-lg, rounded-xl, shadow-2xl
- Close button (X) top-right
- Content padding: p-6 to p-8
- Footer with action buttons right-aligned

### Footer
- Dark section (inverted) with 4-column layout (desktop), stacked (mobile)
- Column 1: Logo + tagline
- Column 2-3: Quick links (Services, Company, Resources)
- Column 4: Newsletter signup (small form: email input + submit)
- Bottom bar: Copyright, social icons, legal links
- Newsletter form posts to footer webhook

### Buttons
- **Primary**: Solid fill, rounded-lg, px-6 py-3, shadow-md
- **Secondary**: Outline, border-2, rounded-lg, px-6 py-3
- **Ghost**: No border, hover background
- All buttons: Transition on hover (scale, shadow), active state (slight press)
- **Blurred backgrounds** when placed over images: backdrop-blur-md with semi-transparent background

### Forms
- Consistent input styling across all forms
- Labels: font-medium, mb-2
- Inputs: border, rounded-lg, px-4 py-2, focus:ring-2
- Required field indicator: asterisk
- Validation: Red border + error text for invalid, green checkmark for valid
- Submit buttons: Disabled state when submitting (opacity-50, cursor-not-allowed)

---

## Section-Specific Guidelines

### About/Company Overview
- 2-column layout: Text left, Image/stats right
- Mission statement (text-lg)
- 3-4 key stats with large numbers

### Careers/Join Us
- Brief intro paragraph
- 2-3 open positions listed as cards
- "View all positions" CTA
- Job application modal with file upload placeholder

---

## Animations
**Use sparingly** - only where they enhance UX:
- Scroll-triggered fade-in for section headers (Framer Motion)
- Hover states on interactive elements (CSS transitions, not Framer)
- Number counters on Metrics section (animate when in viewport)
- Smooth anchor scrolling (scroll-behavior: smooth or Framer Motion scroll)
- Modal open/close: Fade + scale animation

**Avoid**: Excessive parallax, distracting background animations, autoplay carousels

---

## Images

### Hero Section
**Large hero image**: Abstract visualization of technology, innovation, or digital creation
- Placement: Right half (desktop), full background with overlay (mobile)
- Style: Modern, gradient-enhanced, slightly abstract
- Purpose: Set professional, forward-thinking tone

### Portfolio Cards
- Project screenshots or mockups
- High-quality, consistent aspect ratio (16:9 or 4:3)
- Show finished work in context (devices, browsers)

### About Section
- Team photo or office environment (optional but recommended)
- Authentic, professional, shows human side

### Blog Preview
- Featured images per article (placeholder: tech/design related)

### Testimonials
- Client headshots (circular, 64px diameter)

---

## Responsive Behavior
- **Mobile-first approach**: All sections stack vertically on mobile
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation: Hamburger menu below md
- Forms: Single column below md
- Grids: Collapse to single column, then 2, then 3+
- Hero: Full viewport on all sizes, adjust font scaling
- CTA buttons: Full-width on mobile, auto on desktop

---

## Accessibility
- All interactive elements keyboard navigable
- Form inputs with proper labels and ARIA attributes
- Focus states visible (ring-2 on focus)
- Sufficient contrast ratios (WCAG AA minimum)
- Alt text for all images
- Semantic HTML (nav, section, article, footer)

---

## Brand Application
**Electric Blue** (primary action, accents, links)
**Violet** (secondary accent, highlights, hover states)
Use as gradient backgrounds, button fills, icon colors, and accent elements throughout. Maintain neutral grays for text and backgrounds to let brand colors pop strategically.