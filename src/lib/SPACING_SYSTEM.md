# Rapro Spacing System — Reference Guide

## Overview

Three named spacing scales built on an **8-point base grid**.  
Switch the whole site to a different density by changing **two values**.

---

## The Three Scales

| Scale        | Feel                          | Section padding (mobile → desktop) | Typography  |
|--------------|-------------------------------|-------------------------------------|-------------|
| **tight**    | Dense, conversion-focused     | 48px → 72px                        | 1.5–2.75rem |
| **balanced** | Modern SaaS ← **active**      | 60px → 100px                       | 1.75–3.25rem|
| **airy**     | Premium / editorial / luxury  | 80px → 140px                       | 2–4rem      |

---

## How to Switch Scales

### Step 1 — `src/app/layout.tsx`
Add `data-spacing` attribute to `<html>`:

```tsx
// tight
<html lang="en" data-spacing="tight" suppressHydrationWarning>

// balanced (default)
<html lang="en" data-spacing="balanced" suppressHydrationWarning>

// airy
<html lang="en" data-spacing="airy" suppressHydrationWarning>
```

### Step 2 — `src/lib/spacing.ts`
Change line 24:
```ts
export const ACTIVE_SCALE: SpacingScale = 'balanced' // 'tight' | 'balanced' | 'airy'
```

That's it. Both changes propagate site-wide instantly.

---

## CSS Custom Properties Available

Every section and component should use these tokens instead of hardcoded values.

### Spacing Tokens

| Token                    | balanced | tight | airy   |
|--------------------------|----------|-------|--------|
| `--sp-xs`                | 4px      | 4px   | 8px    |
| `--sp-sm`                | 8px      | 8px   | 16px   |
| `--sp-md`                | 16px     | 12px  | 24px   |
| `--sp-lg`                | 24px     | 16px  | 40px   |
| `--sp-xl`                | 32px     | 24px  | 56px   |
| `--sp-2xl`               | 48px     | 32px  | 80px   |
| `--sp-3xl`               | 64px     | 40px  | 112px  |
| `--sp-section-mobile`    | 60px     | 48px  | 80px   |
| `--sp-section-desktop`   | 100px    | 72px  | 140px  |
| `--sp-stack-tight`       | 12px     | 8px   | 16px   |
| `--sp-stack-default`     | 20px     | 12px  | 32px   |
| `--sp-stack-loose`       | 32px     | 20px  | 56px   |
| `--sp-card-mobile`       | 20px     | 16px  | 28px   |
| `--sp-card-desktop`      | 32px     | 24px  | 48px   |

### Typography Tokens

| Token          | balanced          | tight             | airy              |
|----------------|-------------------|-------------------|-------------------|
| `--fs-hero`    | clamp(1.75→3.25r) | clamp(1.5→2.75r)  | clamp(2→4rem)     |
| `--fs-section` | clamp(1.75→3.25r) | clamp(1.5→2.75r)  | clamp(2→3.75r)    |
| `--fs-cta`     | clamp(2→2.625r)   | clamp(1.75→2.25r) | clamp(2.25→3.25r) |
| `--fs-sub`     | clamp(.9375→1.125)| clamp(.875→1r)    | clamp(1→1.25r)    |
| `--fs-body`    | 1rem              | 0.875rem          | 1.0625rem         |
| `--fs-label`   | 0.75rem           | 0.75rem           | 0.8125rem         |
| `--lh-heading` | 1.27              | 1.2               | 1.3               |
| `--lh-body`    | 1.6               | 1.5               | 1.7               |

---

## Utility Classes (globals.css)

These pre-built classes apply the active scale automatically:

```tsx
<section className="section-py">          // responsive section padding
  <div className="card-p">               // responsive card padding
    <h2 className="heading-section">     // section heading size
    <h1 className="heading-hero">        // hero heading size
    <h2 className="heading-cta">         // CTA heading size
    <p  className="text-sub">            // subheading / lead body copy
    <span className="text-label">        // UPPERCASE stat labels
```

---

## Button Component Usage

```tsx
import { Button, CTAWhiteButton, PrimaryButton } from '@/components/ui/Button'

// Navbar CTA
<Button variant="primary" size="sm" href="#consultation-form">
  Get Free Consultation
</Button>

// Mobile navbar CTA
<Button variant="primary" size="sm" href="#consultation-form">
  Book Free Callback
</Button>

// CTA section buttons (all 3 CTAs)
<CTAWhiteButton href="#consultation-form" size="md">
  Book Your Free Consultation
</CTAWhiteButton>

// Hero form submit
<Button variant="primary" size="lg" fullWidth type="submit">
  Submit
</Button>
```

---

## Stat Card Usage (Hero.tsx)

The stat card now uses `.stat-card` CSS class from globals.css,
which exactly mirrors the Figma spec:
- 328px max-width, 144px height
- Glass background: rgba(255,255,255,0.03)
- Border: 1px solid rgba(214,214,214,0.35)
- backdrop-filter: blur(3.35px)
- Border-radius: 16px
- Vertical divider line at centre

```tsx
<div className="stat-card relative" style={{ maxWidth: '328px' }}>
  <div className="stat-card__item">
    <span className="stat-card__value">500+</span>
    <span className="stat-card__label">Trusted Customers</span>
  </div>
  <div className="stat-card__item">
    <span className="stat-card__value">4.8/5</span>
    <span className="stat-card__label">Google Rating</span>
  </div>
  <div className="stat-card__item">
    <span className="stat-card__value">300+</span>
    <span className="stat-card__label">Happy NRI's</span>
  </div>
  <div className="stat-card__item">
    <span className="stat-card__value">30+</span>
    <span className="stat-card__label">Years of Service</span>
  </div>
  <div className="stat-card__divider" aria-hidden="true" />
</div>
```

---

## Files Delivered

| File                                      | Purpose                                      |
|-------------------------------------------|----------------------------------------------|
| `src/lib/spacing.ts`                      | TS spacing + typography tokens for all 3 scales |
| `src/components/ui/Button.tsx`            | Reusable button with all variants            |
| `src/app/globals.css`                     | CSS custom properties + utility classes + stat-card styles |
| `src/components/Hero_StatCard.snippet.tsx`| Drop-in stat card JSX for Hero.tsx           |

---

## Migration Checklist

When updating existing components to use the system:

- [ ] Replace `py-[60px] md:py-[100px]` → `section-py`
- [ ] Replace hardcoded heading `style={{ fontSize: 'clamp(...)' }}` → `className="heading-section"`
- [ ] Replace inline CTA button classNames → `<CTAWhiteButton>`
- [ ] Replace Navbar CTA `<a>` tag → `<Button variant="primary" size="sm">`
- [ ] Replace stat card HTML → see snippet above
- [ ] Add `data-spacing="balanced"` to `<html>` in layout.tsx
