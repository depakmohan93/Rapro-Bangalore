'use client'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  { q: 'What is property management?', a: 'Property management means handling everything related to your property from tenant management to maintenance and rent collection. We take care of day-to-day operations so your property stays maintained and profitable. You stay completely hands-free while we manage it for you.' },
  { q: 'What services does Rajam Property offer?', a: 'We offer a complete suite of property management services including tenant acquisition, tenant management, property maintenance & repairs, legal & documentation support, property monitoring & inspections, and buying & selling assistance.' },
  { q: 'Who is this service for?', a: 'Our service is ideal for NRIs, busy professionals, and anyone who owns property in Bangalore but cannot manage it personally. We specialize in remote property management.' },
  { q: 'How do you manage my property remotely?', a: 'We assign a dedicated property manager who conducts regular site visits, handles all ground-level tasks, and keeps you updated with photos and reports via WhatsApp and email.' },
  { q: 'How do you ensure my property is safe?', a: 'We conduct regular inspections, maintain relationships with verified vendors, and provide 24/7 oversight. Any issues are proactively identified and resolved before they escalate.' },
  { q: 'Can you help if my property is currently vacant?', a: 'Absolutely. Vacant property management is one of our core services. We handle marketing, tenant screening, documentation, and onboarding to minimize your vacancy period.' },
  { q: "What makes Rajam Property different?", a: "Over 30 years of experience, a dedicated manager for every property, transparent billing, verified tenants, and 1000+ happy NRI clients make us Bangalore's most trusted property management firm." },
  { q: 'Do I need to be in Bangalore to use your service?', a: 'Not at all. We are specifically designed for owners who live outside Bangalore. Everything is managed remotely on your behalf with regular updates.' },
  { q: 'How do I get started?', a: 'Simply fill out the free consultation form on this page and our team will call you back within 24 hours to understand your property needs and recommend the right package.' },
]

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const body = bodyRef.current
    const arrow = arrowRef.current
    if (!body || !arrow) return

    // Skip animation on first render — just set state silently
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (!isOpen) {
        gsap.set(body, { height: 0, opacity: 0, paddingBottom: 0 })
        gsap.set(arrow, { rotation: 0 })
      } else {
        gsap.set(body, { height: 'auto', opacity: 1, paddingBottom: '1.5rem' })
        gsap.set(arrow, { rotation: 180 })
      }
      return
    }

    if (isOpen) {
      // Open: expand height from 0 → auto smoothly
      gsap.set(body, { height: 'auto', paddingBottom: '1.5rem' })
      const fullHeight = body.offsetHeight
      gsap.fromTo(body,
        { height: 0, opacity: 0, paddingBottom: 0 },
        { height: fullHeight, opacity: 1, paddingBottom: '1.5rem', duration: 0.45, ease: 'power3.out' }
      )
      gsap.to(arrow, { rotation: 180, duration: 0.35, ease: 'power3.out' })
    } else {
      // Close: collapse height back to 0
      gsap.to(body, {
        height: 0,
        opacity: 0,
        paddingBottom: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      })
      gsap.to(arrow, { rotation: 0, duration: 0.3, ease: 'power3.inOut' })
    }
  }, [isOpen])

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: isOpen ? '#FBFFF6' : '#FFFFFF',
        border: isOpen ? '1px solid #73B130' : '1px solid #EDEDED',
        transition: 'background 0.3s, border-color 0.3s',
      }}
      onClick={onClick}
    >
      {/* Question row */}
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-poppins text-[#1A1C1E] pr-4" style={{ fontWeight: 400, fontSize: '1rem' }}>
          {q}
        </span>
        <div className="flex-shrink-0">
          <svg
            ref={arrowRef}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            style={{ display: 'block' }}
          >
            <path d="M1 1l5 5 5-5" stroke={isOpen ? '#0D631B' : '#1A1C1E'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Answer — GSAP controls height */}
      <div ref={bodyRef} className="overflow-hidden px-6" style={{ height: 0, opacity: 0 }}>
        <p className="font-poppins text-[#40493D] border-t border-[#F3F3F6] pt-4" style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: '1.6' }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  // Scroll-triggered entrance
  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, subRef.current, itemsRef.current], { y: 50, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
      })

      tl.to(headingRef.current, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' })
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.6')
        .to(itemsRef.current, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.5')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" className="py-24 px-5 md:px-20" style={{ background: '#FBFBFB', border: '1px solid #EEEEEE' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">

          {/* Left */}
          <div className="lg:w-[28.375rem] flex-shrink-0">
            <h2
              ref={headingRef}
              className="font-quicksand text-black mb-4"
              style={{ fontWeight: 600, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: '1.27' }}
            >
              Frequently Asked Questions
            </h2>
            <p
              ref={subRef}
              className="font-poppins text-[#73B130]"
              style={{ fontWeight: 500, fontSize: '1.25rem', lineHeight: '1.5' }}
            >
              Everything You Need to Know About Property Management
            </p>
          </div>

          {/* Right — FAQ items */}
          <div ref={itemsRef} className="flex-1 flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
