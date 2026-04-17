# Rapro Dev - Rajam Property Landing Page

Chennai's #1 Property Management Service landing page built with Next.js + Tailwind CSS.

## Tech Stack
- **Next.js 15** (App Router)
- **Tailwind CSS 3**
- **TypeScript**
- Google Fonts: Manrope, Poppins, Inter, Mulish

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Main page (assembles all sections)
│   └── globals.css       # Global styles + Google Fonts import
└── components/
    ├── Navbar.tsx         # Sticky nav with CTA button
    ├── Hero.tsx           # Hero section + consultation form + stats bar
    ├── Testimonials.tsx   # 3-column testimonial cards
    ├── Services.tsx       # 6 service cards grid
    ├── Partners.tsx       # Scrolling partner logos marquee
    ├── Benefits.tsx       # Green section with 5 benefit cards
    ├── WhyChoose.tsx      # 3-column comparison table
    ├── ProblemSolution.tsx # Problem vs Rapro Way side-by-side
    ├── FAQ.tsx            # Accordion FAQ section
    └── Footer.tsx         # Footer with links and contact
```

## Deploying to Vercel

### Option A — Vercel Dashboard (recommended)
1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Click **Deploy** — Vercel auto-detects Next.js ✅

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel
```

## Next Steps (GSAP Animations)
The project is set up and ready for GSAP. In the next iteration we'll add:
- Hero text staggered reveal
- Stats counter animation
- Service cards scroll-triggered fade-in
- Comparison table row-by-row entrance
- Smooth section transitions

Install GSAP when ready:
```bash
npm install gsap
```
