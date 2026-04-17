'use client'
import Image from 'next/image'
import { useSectionAnimation } from './useSectionAnimation'

const testimonials = [
  { name: 'Baskar Gopalan', location: 'New Jersey, USA', initials: 'BG', text: "We've been using their services for over 3 years now and highly recommend them. They currently manage three of my properties, two in Chennai and one near Thanjavur, all handled smoothly and professionally." },
  { name: 'Vinod Krishnan', location: 'Singapore', initials: 'VK', text: "A highly reliable and diligent team. Their attention to detail and efficiency make them a great choice for NRIs. We've had complete peace of mind entrusting our properties to Rajam Property." },
  { name: 'Aparna Shankar', location: 'California, USA', initials: 'AS', text: 'Rajam Property has been managing our properties in Chennai for over two years. From overseeing renovations to sharing regular updates with photos, their service has been consistently excellent.' },
]

export default function Testimonials() {
  const { headingRef, setCardRef } = useSectionAnimation<HTMLHeadingElement, HTMLParagraphElement, HTMLDivElement>()

  return (
    <section id="testimonials" className="bg-white py-24 px-5 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <h2
            ref={headingRef}
            className="font-quicksand text-black"
            style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.27' }}
          >
            Trusted by 1000+ NRIs for Property<br />Management in Bangalore
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={el => setCardRef(el, i)}
              className="relative flex flex-col justify-between p-8 rounded-lg bg-white"
              style={{ border: '1px solid #DBF4DA', minHeight: '300px' }}
            >
              <div className="absolute top-6 right-6">
                <Image src="/green_quote.svg" alt="quote" width={40} height={40} />
              </div>
              <p className="font-poppins text-[#40493D] flex-1 pr-12" style={{ fontWeight: 400, fontSize: '1rem', lineHeight: '1.625', marginBottom: '2rem' }}>
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #73B130, #0D631B)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-poppins text-[#1A1C1E]" style={{ fontWeight: 500, fontSize: '1rem' }}>{t.name}</p>
                  <p className="font-poppins text-[#40493D]" style={{ fontWeight: 400, fontSize: '0.75rem' }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
