'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

function validateIndianPhone(phone: string): string | null {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '')
  const regex = /^(\+91|91|0)?[6-9]\d{9}$/
  if (!cleaned) return 'Phone number is required'
  if (!regex.test(cleaned)) return 'Enter a valid Indian mobile number (10 digits starting with 6-9)'
  return null
}
function validateEmail(email: string): string | null {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address'
  return null
}
function validateName(name: string): string | null {
  if (!name.trim()) return 'Full name is required'
  if (name.trim().length < 2) return 'Name must be at least 2 characters'
  return null
}

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
            {char === ' ' ? '\u00A0' : char}
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
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', propertyType: '', propertyLocation: '', propertyLocationOther: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

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

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const nameErr = validateName(formData.name)
    const phoneErr = validateIndianPhone(formData.phone)
    const emailErr = validateEmail(formData.email)
    if (nameErr) newErrors.name = nameErr
    if (phoneErr) newErrors.phone = phoneErr
    if (emailErr) newErrors.email = emailErr
    if (!formData.propertyType) newErrors.propertyType = 'Please select a property type'
    if (!formData.propertyLocation) newErrors.propertyLocation = 'Please select a location'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      const payload = {
        timestamp,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: formData.propertyType,
        propertyLocation: formData.propertyLocation === 'Other' ? formData.propertyLocationOther : formData.propertyLocation,
      }
      // Fire-and-forget — don't await, never block the redirect
      fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {}) // silently ignore errors
    } finally {
      // Always redirect — API call must never block the user
      router.push('/thank-you')
    }
  }

  const inputClass = (field: string) =>
    `w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all ${errors[field] ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#73B130]/30'}`

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
            <form id="consultation-form" onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl px-10 pb-10 pt-14" style={{ boxShadow: '0px 25px 42.7px -12px rgba(44,123,48,0.36)' }}>
              <h2 className="font-quicksand font-bold text-[#1A1C1E] text-2xl leading-8 mb-1">Get your free consultation today.</h2>
              <p className="font-poppins font-normal text-[#40493D] text-sm mb-8">Our experts will call you back within 24 hours.</p>
              <div className="flex flex-col gap-4">

                {/* Full Name */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Full Name</label>
                  <input type="text" placeholder="e.g. Anand Kumar" value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }) }} className={inputClass('name')} />
                  {errors.name && <p className="font-poppins text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Phone Number <span className="text-[#6B7280] font-normal">(WhatsApp preferred)</span></label>
                  <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: '' }) }} className={inputClass('phone')} />
                  {errors.phone && <p className="font-poppins text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Email</label>
                  <input type="email" placeholder="xyz@gmail.com" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }} className={inputClass('email')} />
                  {errors.email && <p className="font-poppins text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Property Type dropdown */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Type</label>
                  <div className="relative">
                    <select
                      value={formData.propertyType}
                      onChange={e => { setFormData({ ...formData, propertyType: e.target.value }); if (errors.propertyType) setErrors({ ...errors, propertyType: '' }) }}
                      className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.propertyType ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.propertyType ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
                    >
                      <option value="">Select property type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                  {errors.propertyType && <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                </div>

                {/* Property Location dropdown */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Location</label>
                  <div className="relative">
                    <select
                      value={formData.propertyLocation}
                      onChange={e => { setFormData({ ...formData, propertyLocation: e.target.value, propertyLocationOther: '' }); if (errors.propertyLocation) setErrors({ ...errors, propertyLocation: '' }) }}
                      className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.propertyLocation ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.propertyLocation ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
                    >
                      <option value="">Select a location</option>
                      <option value="Whitefield">Whitefield</option>
                      <option value="Koramangala">Koramangala</option>
                      <option value="Indiranagar">Indiranagar</option>
                      <option value="HSR Layout">HSR Layout</option>
                      <option value="Marathahalli">Marathahalli</option>
                      <option value="Electronic City">Electronic City</option>
                      <option value="Sarjapur Road">Sarjapur Road</option>
                      <option value="JP Nagar">JP Nagar</option>
                      <option value="Jayanagar">Jayanagar</option>
                      <option value="Hebbal">Hebbal</option>
                      <option value="Yelahanka">Yelahanka</option>
                      <option value="Bannerghatta Road">Bannerghatta Road</option>
                      <option value="BTM Layout">BTM Layout</option>
                      <option value="Bellandur">Bellandur</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                  {errors.propertyLocation && <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyLocation}</p>}
                  {formData.propertyLocation === 'Other' && (
                    <input
                      type="text"
                      placeholder="Please specify your location"
                      value={formData.propertyLocationOther}
                      onChange={e => setFormData({ ...formData, propertyLocationOther: e.target.value })}
                      className="w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all focus:ring-2 focus:ring-[#73B130]/30 mt-2"
                    />
                  )}
                </div>

                {/* Submit */}
                <button type="submit" disabled={submitting} className="w-full h-[60px] rounded-lg text-white font-poppins font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.01] mt-2 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: '#73B130' }}>
                  {submitting ? 'Submitting...' : 'Book Free Callback'}
                </button>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
