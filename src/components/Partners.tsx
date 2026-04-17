'use client'

import Image from 'next/image'

const partners = [
  { src: '/Akshaya.png', alt: 'Akshaya', width: 120, height: 50 },
  { src: '/Casagrand.png', alt: 'Casagrand', width: 160, height: 50 },
  { src: '/Embassy.png', alt: 'Embassy Residency', width: 120, height: 50 },
  { src: '/Olympia.png', alt: 'Olympia', width: 130, height: 50 },
  { src: '/prestige.png', alt: 'Prestige Group', width: 100, height: 50 },
  { src: '/Ramaniyam.png', alt: 'Ramaniyam', width: 130, height: 50 },
  { src: '/Synergy.png', alt: 'Synergy Projects', width: 130, height: 50 },
  { src: '/TVH.png', alt: 'TVH', width: 80, height: 50 },
  { src: '/VijayShanti.png', alt: 'Vijay Shanthi', width: 150, height: 50 },
  { src: '/vishranthi.png', alt: 'Vishranthi Homes', width: 130, height: 50 },
]

export default function Partners() {
  return (
    <section className="py-16 px-5 md:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <h2
          className="font-quicksand font-bold text-black mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: '1.27' }}
        >
          Our Property Partners
        </h2>
      </div>

      {/* Full-width marquee — overflows intentionally */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex items-center gap-16"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
          }}
        >
          {/* First set */}
          {partners.map((p, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ height: '60px' }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                className="object-contain"
                style={{ maxHeight: '50px', width: 'auto' }}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((p, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ height: '60px' }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                className="object-contain"
                style={{ maxHeight: '50px', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
