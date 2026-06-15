'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useModal } from '@/lib/modalContext'

// ── Stat belt ──────────────────────────────────────────────────────────────────
function StatBelt() {
  return (
    <div
      className="flex flex-wrap items-stretch justify-center gap-0 mt-6 lg:mt-10"
      style={{
        background: 'rgba(0,0,0,0.60)',
        backdropFilter: 'blur(8px)',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.12)',
        maxWidth: '780px',
        width: '100%',
      }}
    >
      {[
        {
          icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFD700">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ),
          value: '4.8/5',
          label: 'Google Rating',
          border: true,
        },
        {
          icon: (
            <div style={{ width: '26px', height: '26px', background: '#73B130', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="11" r="1" fill="#fff" />
                <circle cx="12" cy="11" r="1" fill="#fff" />
                <circle cx="15" cy="11" r="1" fill="#fff" />
              </svg>
            </div>
          ),
          value: '398+',
          label: 'Verified Reviews',
          border: true,
        },
        {
          icon: (
            <div style={{ width: '26px', height: '26px', background: '#73B130', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="9,12 11,14 15,10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ),
          value: '30+',
          label: 'Years Experience',
          border: true,
        },
        {
          icon: (
            <div style={{ width: '26px', height: '26px', background: '#73B130', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth="2" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3.13a4 4 0 010 7.75" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ),
          value: '1,000+',
          label: 'NRI Clients',
          border: false,
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center flex-1 min-w-[140px] py-5 px-4"
          style={{ borderRight: stat.border ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {stat.icon}
            <span
              style={{
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Review slider ──────────────────────────────────────────────────────────────
const reviews = [
  {
    name: 'Baskar Gopalan',
    location: 'New Jersey, USA',
    avatar: '/reviews/baskar-gopalan.png',
    text: "We've been using their services for over 3 years now. They manage three of my properties, two in Bangalore and one near Mysore, all handled smoothly.",
  },
  {
    name: 'Vinod Krishnan',
    location: 'Singapore',
    avatar: '/reviews/vinod-krishnan.png',
    text: "A highly reliable and diligent team. Their attention to detail and efficiency make them a great choice for NRIs. Complete peace of mind.",
  },
  {
    name: 'Aparna Shankar',
    location: 'California, USA',
    avatar: '/reviews/aparna-shankar.png',
    text: "Rajam Property has been managing our Bangalore properties for over two years. From renovations to regular photo updates, consistently excellent service.",
  },
  {
    name: 'Ramesh Nair',
    location: 'Dubai, UAE',
    avatar: '/reviews/ramesh-nair.png',
    text: "Professional, transparent, and trustworthy. They handle everything from tenants to maintenance so I never have to worry living abroad.",
  },
  {
    name: 'Priya Menon',
    location: 'Melbourne, Australia',
    avatar: '/reviews/priya-menon.png',
    text: "My property is always well-maintained and rent is collected on time every month. I highly recommend Rajam Property to all NRIs.",
  },
  {
    name: 'Suresh Kumar',
    location: 'Toronto, Canada',
    avatar: '/reviews/suresh-kumar.png',
    text: "They took over management of my property seamlessly. Verified tenants, timely payments, and proactive maintenance, exactly what I needed.",
  },
]

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col gap-3"
      style={{
        width: '300px',
        background: 'rgba(10,30,10,0.82)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '14px',
        padding: '20px',
        marginRight: '16px',
      }}
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFD700">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <p
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.92)',
          lineHeight: '1.6',
          flex: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
          style={{ border: '2px solid rgba(115,177,48,0.5)' }}
        >
          <Image
            src={review.avatar}
            alt={review.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#FFFFFF',
            }}
          >
            {review.name}
          </p>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {review.location}
          </p>
        </div>
      </div>
    </div>
  )
}

function ReviewSlider() {
  const doubled = [...reviews, ...reviews]
  return (
    <div id="testimonials" className="w-full mt-12 md:mt-16">
      <p
        className="text-center mb-7 font-quicksand"
        style={{
          fontWeight: 600,
          fontSize: '28px',
          color: '#FFFFFF',
          lineHeight: 1.3,
        }}
      >
        Here&rsquo;s why our customers choose us.
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="flex"
          style={{ animation: 'hero-marquee 32s linear infinite', width: 'max-content' }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export default function Hero({ headingLine2 = 'NRI Property Management' }: { headingLine2?: string }) {
  const { openModal } = useModal()

  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        badgeRef.current,
        headingRef.current,
        subRef.current,
        ctaRef.current,
        statRef.current,
      ]
      gsap.set(els, { y: 40, opacity: 0 })
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: { each: 0.1, ease: 'power2.inOut' },
        ease: 'power4.out',
        delay: 0.15,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="consultation" className="relative overflow-hidden" style={{ minHeight: '100svh', paddingTop: '76px' }}>
      {/* Video background — desktop */}
      <video
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>

      {/* Static image background — mobile */}
      <div
        className="md:hidden absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_bg_mobile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 md:px-10 pt-10 pb-10 md:pt-12 md:pb-12 lg:pt-20 lg:pb-20 max-w-[1200px] mx-auto w-full">

        {/* Trust badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 mb-4 lg:mb-7"
          style={{
            background: 'rgba(13,61,26,0.9)',
            border: '2px solid #9AC136',
            borderRadius: '50px',
            padding: '8px 22px 8px 14px',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#9AC136" />
            <polyline points="9,12 11,14 15,10" stroke="#0D3D1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#FFFFFF',
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
            }}
          >
            Rajam Property Management
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-quicksand font-bold text-white mb-3 lg:mb-5"
          style={{
            fontSize: 'clamp(28px, 3.8vw, 52px)',
            lineHeight: 1.18,
            letterSpacing: '-0.5px',
            maxWidth: '820px',
          }}
        >
          Bangalore&rsquo;s Most Trusted
          <br />
          <span style={{ color: '#8ED044' }}>{headingLine2}</span>
          <br />
          Since 1995
        </h1>

        {/* Description */}
        <p
          ref={subRef}
          className="font-poppins text-white mb-5 lg:mb-9"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            lineHeight: 1.65,
            maxWidth: '600px',
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          Property Maintenance • Tenant Management • Rent Collection • Legal Support • Property Marketing • Emergency Repairs, Everything Your Property Needs, Professionally Managed
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <button
            onClick={openModal}
            className="inline-flex items-center rounded-lg text-white font-poppins font-semibold transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.99]"
            style={{
              background: '#73B130',
              padding: '14px 32px',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(115,177,48,0.45)',
            }}
          >
            Get Free Consultation
          </button>
        </div>

        {/* Stat belt */}
        <div ref={statRef} className="flex justify-center w-full">
          <StatBelt />
        </div>

        {/* Review slider */}
        <ReviewSlider />
      </div>
    </section>
  )
}
