'use client'
import Image from 'next/image'
import { useSectionAnimation } from './useSectionAnimation'

const services = [
  { icon: '/PMR.svg', title: 'Property Maintenance & Repairs', desc: 'They manage regular maintenance, emergency repairs, and vendor coordination to keep the property in good condition.' },
  { icon: '/TM.svg', title: 'Tenant Management', desc: "They handle tenant screening, onboarding, and issue resolution so you don't deal with tenants directly." },
  { icon: '/BS.svg', title: 'Buying & Selling', desc: 'Expert guidance at every step. From property discovery to final paperwork, we make transactions seamless and stress-free.' },
  { icon: '/LDS.svg', title: 'Legal & Documentation Support', desc: 'They handle agreements, legal compliance, and documentation, reducing legal risks for owners.' },
  { icon: '/TAVM.svg', title: 'Tenant Acquisition & Vacancy Management', desc: 'They help in finding tenants, marketing the property, and minimizing vacancy time.' },
  { icon: '/PMI.svg', title: 'Property Monitoring & Inspections', desc: 'They conduct regular inspections and monitoring to ensure the property is safe and well-maintained.' },
]

export default function Services() {
  const { headingRef, descRef, setCardRef } = useSectionAnimation<HTMLHeadingElement, HTMLParagraphElement, HTMLDivElement>()

  return (
    <section id="services" className="py-[60px] md:py-[100px] px-4 md:px-20">
      <div className="max-w-[1280px] mx-auto rounded-2xl px-4 py-8 md:p-20" style={{ background: '#F9F9F9' }}>
        <div className="text-center mb-10 md:mb-16">
          <h2 ref={headingRef} className="font-quicksand text-black mb-4" style={{ fontWeight: 600, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: '1.27' }}>
            All-in-one package for your property needs. Fully managed.
          </h2>
          <p ref={descRef} className="font-poppins text-[#40493D]" style={{ fontWeight: 400, fontSize: '1.125rem' }}>
            We handle everything from acquisition to maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => setCardRef(el, i)}
              className="bg-white rounded-2xl p-6 md:p-10 flex flex-col hover:shadow-md transition-shadow w-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)', gap: '0.375rem' }}
            >
              <Image src={service.icon} alt={service.title} width={56} height={56} className="mb-3" />
              <h3 className="font-quicksand text-[#1A1C1E]" style={{ fontWeight: 600, fontSize: '1.25rem', lineHeight: '1.4' }}>
                {service.title}
              </h3>
              <p className="font-poppins text-[#40493D]" style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: '1.6' }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
