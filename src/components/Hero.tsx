'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function FloatingBadge() {
  const circularText = 'YEARS OF EXPERTISE • 30+ YEARS OF EXPERTISE • 30+ '
  const chars = circularText.split('')
  const total = chars.length
  const radius = 52
  return (
    <div style={{ width: '130px', height: '130px', position: 'relative' }}>
      <div className="absolute inset-0 rounded-full" style={{ background: '#47A940' }} />
      <div className="absolute rounded-full" style={{ background: '#0D631B', boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.15)', top: '5px', left: '5px', right: '5px', bottom: '5px' }} />
      <div className="absolute inset-0 rounded-full" style={{ animation: 'spin-badge 10s linear infinite' }}>
        {chars.map((char, i) => (
          <span key={i} className="absolute" style={{ left: '50%', top: '50%', transformOrigin: '0 0', transform: `rotate(${(i / total) * 360}deg) translateY(-${radius}px)`, fontSize: '7.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: 1 }}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
        <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: '#FFFFFF', lineHeight: 1 }}>30+</span>
      </div>
      <style>{`@keyframes spin-badge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ── Inline stat strip (Screenshot 3 style) ───────────────────────────────────
function StatStrip({ city }: { city: 'Chennai' | 'Bangalore' }) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-0 gap-y-0 mt-8"
      style={{
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.12)',
        maxWidth: '680px',
        padding: '18px 16px 18px 0',
      }}
    >
      {/* Stat 1 — Google Rating */}
      <div className="flex flex-col px-7 py-2 flex-1 min-w-[150px] md:border-r border-white/15">
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '6px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFD700" style={{ flexShrink: 0 }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.1 }}>4.8/5</span>
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Google Rating</span>
        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FFD700">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </div>
      </div>

      {/* Stat 2 — Verified Reviews */}
      <div className="flex flex-col px-7 py-2 flex-1 min-w-[150px] md:border-r border-white/15">
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '6px' }}>
          <div style={{ width: '28px', height: '28px', background: '#73B130', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="11" r="1" fill="#fff" />
              <circle cx="12" cy="11" r="1" fill="#fff" />
              <circle cx="15" cy="11" r="1" fill="#fff" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.1 }}>398+</span>
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Verified Reviews on Google</span>
      </div>

      {/* Stat 3 — Years Experience */}
      <div className="flex flex-col px-7 py-2 flex-1 min-w-[150px] md:border-r border-white/15">
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '6px' }}>
          <div style={{ width: '28px', height: '28px', background: '#73B130', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="9,12 11,14 15,10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.1 }}>30+</span>
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Years Experience<br />&nbsp;</span>
      </div>

      {/* Stat 4 — Trusted by 1,000+ NRIs */}
      <div className="flex flex-col px-7 py-2 flex-1 min-w-[170px]">
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '6px' }}>
          <div style={{ width: '28px', height: '28px', background: '#73B130', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3.13a4 4 0 010 7.75" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>1,000+</span>
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Trusted by NRIs<br />&nbsp;</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsStripRef = useRef<HTMLDivElement>(null)
  const formWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftEls = [badgeRef.current, headingRef.current, subRef.current, statsStripRef.current]
      gsap.set(leftEls, { y: 50, opacity: 0 })
      gsap.set(formWrapRef.current, { y: 70, opacity: 0 })
      gsap.to(leftEls, { y: 0, opacity: 1, duration: 1.1, stagger: { each: 0.1, ease: 'power2.inOut' }, ease: 'power4.out', delay: 0.2 })
      gsap.to(formWrapRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="consultation" className="relative min-h-screen pt-[76px] overflow-hidden">
      {/* Desktop: video background */}
      <video className="hidden md:block absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>
      {/* Mobile: static image background */}
      <div className="md:hidden absolute inset-0 w-full h-full" style={{ backgroundImage: 'url(/hero_bg_mobile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 pt-16 pb-16 md:pt-[99px] md:pb-[99px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[727px]">
            {/* Rajam Property Management pill badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-3 mb-10" style={{ background: '#0D3D1A', border: '2px solid #9AC136', borderRadius: '50px', padding: '10px 24px 10px 16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#9AC136" />
                <path d="M9 21V12h6v9" stroke="#0D3D1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF', whiteSpace: 'nowrap', letterSpacing: '0.2px' }}>Rajam Property Management</span>
            </div>

            {/* Main heading */}
            <h1 ref={headingRef} className="font-quicksand font-bold text-white mb-6 leading-[1.2]" style={{ fontSize: 'clamp(32px, 4vw, 60px)', letterSpacing: '-0.8px', maxWidth: '689px' }}>
              NRI Property Management in Bangalore Since 1995
            </h1>

            {/* Updated description */}
            <p ref={subRef} className="font-poppins font-light text-white mb-0 leading-[1.6]" style={{ fontSize: '18px', maxWidth: '520px' }}>
              Trusted property management in Bangalore for owners who want verified tenants, rent collection, maintenance support, and complete peace of mind.
            </p>

            {/* Stat strip */}
            <div ref={statsStripRef}>
              <StatStrip city="Bangalore" />
            </div>
          </div>

          {/* ── Right column — Form ──────────────────────────────────── */}
          <div ref={formWrapRef} className="relative w-full lg:w-[480px] flex-shrink-0 mt-20 lg:mt-0">
            <div className="absolute -top-20 -left-4 lg:-left-20 z-20 pointer-events-none"><FloatingBadge /></div>
            <div id="consultation-form" style={{ width: '100%', height: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '0.75rem' }}>
              <iframe
                src="https://mathiverse.gridapps.in/f/e0b6f247-5efd-4ea4-b393-2d35554df3cb?embed=1&utm_source=mathiverse&utm_medium=form&utm_campaign=lead-form-bangalore&utm_content=rajam-property"
                width="100%"
                height="700"
                frameBorder="0"
                title="Registration form"
                style={{ display: 'block', border: 'none' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
