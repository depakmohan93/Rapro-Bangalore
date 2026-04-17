'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const benefits = [
  { icon: '/7.svg', title: '24/7 Property Oversight', desc: 'We offer 24/7 security and monitoring for all the properties managed under our services to ensure your property is always in safe hands.' },
  { icon: '/Tailord.svg', title: 'Tailored Packages', desc: 'A detailed package that covers every single detail your property needs, from minor repair to complete renovations, renting, security and more.' },
  { icon: '/RTSM.svg', title: 'Reliable Tenant Screening & Management', desc: 'Our rigorous screening process ensures that your property is let out only to reliable and background-verified tenants. We also handle timely rent collection and upkeep to share regular updates.' },
  { icon: '/EGH.svg', title: 'Everything on Ground Is Handled for You', desc: 'Tenant management, property inspections, repairs, and updates all taken care of, without your involvement.' },
  { icon: '/DPM.svg', title: 'Dedicated Property Manager', desc: 'We assign an expert Property Manager to ensure timely site visits, supervision, tenant coordination, buying and selling assistance etc., with whom you can communicate at any time.' },
]

export default function Benefits() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const heading = headingRef.current
    const desc = descRef.current
    const cards = cardRefs.current.filter(Boolean)

    const ctx = gsap.context(() => {
      gsap.set([heading, desc], { y: 50, opacity: 0 })
      gsap.set(cards, { y: 70, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: heading, start: 'top 80%', once: true },
      })

      tl.to(heading, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' })
        .to(desc, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.6')
        .to(cards, { y: 0, opacity: 1, duration: 0.85, stagger: { each: 0.12, ease: 'power2.inOut' }, ease: 'power4.out' }, '+=0.05')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 px-5 md:px-20" style={{ background: '#319F38' }}>
      <div className="max-w-[1148px] mx-auto">
        <div className="text-center mb-16 max-w-[1100px] mx-auto">
          <h2 ref={headingRef} className="font-quicksand text-white mb-4" style={{ fontWeight: 600, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: '1.27' }}>
            Experience the Benefits of Effortless<br />Property Management Service
          </h2>
          <p ref={descRef} className="font-poppins text-white mx-auto" style={{ fontWeight: 400, fontSize: '1rem', maxWidth: '32rem' }}>
            Our expert team delivers personalized care, ensuring your property thrives while you enjoy complete peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {benefits.slice(0, 2).map((b, i) => (
            <div key={i} ref={el => { cardRefs.current[i] = el }} className="bg-white rounded-2xl p-8 flex flex-col" style={{ boxShadow: '0px 4px 3.4px rgba(0,0,0,0.16)', gap: '0.375rem' }}>
              <Image src={b.icon} alt={b.title} width={64} height={64} className="flex-shrink-0 mb-3" />
              <h3 className="font-quicksand text-black" style={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.4' }}>{b.title}</h3>
              <p className="font-poppins text-black" style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: '1.6' }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.slice(2).map((b, i) => (
            <div key={i} ref={el => { cardRefs.current[i + 2] = el }} className="bg-white rounded-2xl p-8 flex flex-col" style={{ boxShadow: '0px 4px 3.4px rgba(0,0,0,0.16)', gap: '0.375rem' }}>
              <Image src={b.icon} alt={b.title} width={64} height={64} className="flex-shrink-0 mb-3" />
              <h3 className="font-quicksand text-black" style={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.4' }}>{b.title}</h3>
              <p className="font-poppins text-black" style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: '1.6' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
