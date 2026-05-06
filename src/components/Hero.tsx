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

      {/* Stat 4 — Since 1995 */}
      <div className="flex flex-col px-7 py-2 flex-1 min-w-[170px]">
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '6px' }}>
          <div style={{ width: '28px', height: '28px', background: '#73B130', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#fff" strokeWidth="2" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="#fff" strokeWidth="2" />
              <rect x="7" y="14" width="2" height="2" fill="#fff" />
              <rect x="11" y="14" width="2" height="2" fill="#fff" />
              <rect x="15" y="14" width="2" height="2" fill="#fff" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>Since 1995</span>
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Serving {city}<br />&nbsp;</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })
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
    if (!formData.service) newErrors.service = 'Please select a service'
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
        service: formData.service,
        message: formData.message,
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
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 pt-16 pb-16 md:pt-[99px] md:pb-[99px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[727px]">
            {/* #1 badge */}
            <div ref={badgeRef} className="relative mb-10" style={{ width: '320px', height: '71px' }}>
              <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.15)', boxShadow: '0px 4px 4px rgba(0,0,0,0.2)', borderRadius: '8px' }} />
              <div className="absolute" style={{ width: '92.21px', height: '69.17px', left: '227.79px', top: '-33.54px', background: '#293E4F', borderRadius: '16px 16px 0px 18px' }} />
              <div className="absolute" style={{ width: '85.67px', height: '62.04px', left: '234.33px', top: '-33.54px', background: '#81D922', borderRadius: '16px 16px 0px 16px' }} />
              <span className="absolute flex items-center" style={{ width: '58px', height: '35px', left: '248.17px', top: 'calc(50% - 35px/2 - 36.2px)', fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontWeight: 700, fontSize: '50.2955px', lineHeight: '34px', color: '#FFFFFF' }}>#1</span>
              <div className="absolute flex flex-col justify-center" style={{ left: '16px', top: '0', bottom: '0', width: '210px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px', lineHeight: '26px', letterSpacing: '0.35px', textTransform: 'uppercase', color: '#FFFFFF', whiteSpace: 'nowrap' }}>BANGALORE&apos;S</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '18px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>Property Management Service</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 ref={headingRef} className="font-quicksand font-bold text-white mb-6 leading-[1.2]" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.8px', maxWidth: '689px' }}>
              Your Property.<br />Fully Managed.<br /><span style={{ color: '#73B130' }}>Zero Hassle.</span>
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

                {/* Services dropdown — replaces Property Type + Property Location */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Services you are looking for?</label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={e => { setFormData({ ...formData, service: e.target.value }); if (errors.service) setErrors({ ...errors, service: '' }) }}
                      className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.service ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.service ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
                    >
                      <option value="">Select a service</option>
                      <option value="Property Management">Property Management</option>
                      <option value="Property Buying Assistance">Property Buying Assistance</option>
                      <option value="Property Selling Assistance">Property Selling Assistance</option>
                      <option value="Rental Assistance">Rental Assistance</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Home Repair and Maintenance">Home Repair and Maintenance</option>
                      <option value="Plot Monitoring">Plot Monitoring</option>
                      <option value="Deep Cleaning">Deep Cleaning</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                  {errors.service && <p className="font-poppins text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Message textarea */}
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us more about your property or requirements..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full bg-[#F3F3F6] rounded-lg px-4 py-3 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all focus:ring-2 focus:ring-[#73B130]/30 resize-none"
                  />
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
