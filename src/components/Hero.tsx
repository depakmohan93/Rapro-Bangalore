'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

// Google Apps Script Web App URL — replace this after deploying your script
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || ''


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

export default function Hero() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', propertyType: 'Apartment', location: '' })
  const [otherLocation, setOtherLocation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const reviewRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const formWrapRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftEls = [badgeRef.current, headingRef.current, subRef.current, reviewRef.current, pillsRef.current]
      gsap.set(leftEls, { y: 50, opacity: 0 })
      gsap.set(formWrapRef.current, { y: 70, opacity: 0 })
      gsap.set(statsRef.current, { y: 40, opacity: 0 })
      gsap.to(leftEls, { y: 0, opacity: 1, duration: 1.1, stagger: { each: 0.1, ease: 'power2.inOut' }, ease: 'power4.out', delay: 0.2 })
      gsap.to(formWrapRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 })
      gsap.to(statsRef.current, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.9 })
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
    if (!formData.location) newErrors.location = 'Please select a property location'
    if (formData.location === 'Other' && !otherLocation.trim()) newErrors.location = 'Please enter your location'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      const finalLocation = formData.location === 'Other' ? otherLocation : formData.location
      const payload = {
        timestamp,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: formData.propertyType,
        location: finalLocation,
      }
      // Fire-and-forget — don't await, never block the redirect
      if (APPS_SCRIPT_URL) {
        const params = new URLSearchParams(payload)
        fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
          method: 'GET',
          mode: 'no-cors',
        }).catch(() => {}) // silently ignore sheet errors
      }
    } finally {
      // Always redirect — sheet write must never block the user
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

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 pt-16 pb-6 md:pt-[99px] md:pb-[99px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">
          <div className="flex-1 lg:max-w-[727px]">
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
            <h1 ref={headingRef} className="font-quicksand font-bold text-white mb-6 leading-[1.2]" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.8px', maxWidth: '689px' }}>
              Your Property.<br />Fully Managed.<br /><span style={{ color: '#73B130' }}>Zero Hassle.</span>
            </h1>
            <p ref={subRef} className="font-poppins font-light text-white mb-6 leading-[1.6]" style={{ fontSize: '20px', maxWidth: '486px' }}>
              Rajam Property is an award-winning business focused on complete property needs.
            </p>
            <div ref={reviewRef} className="flex items-center gap-3 mb-8">
              <Image src="/review_cluster.png" alt="Customer reviews" width={138} height={38} className="object-contain flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <a href="#testimonials" className="flex items-center gap-2 cursor-pointer">
                  <span className="font-mulish font-semibold text-white text-sm">Read reviews</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFEC3E"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>)}
                  <span className="font-mulish text-white text-sm font-medium ml-1">5.0</span>
                </div>
              </div>
            </div>
            <div ref={pillsRef} className="grid grid-cols-2 gap-3 max-w-[570px]">
              {['No Signup Fee', 'Verified Tenants', '12+ Services in One', '100% Transparent Billing'].map((feature) => (
                <div key={feature} className="flex items-center gap-3 px-3 py-2 rounded" style={{ background: 'rgba(185,233,183,0.19)', backdropFilter: 'blur(2px)' }}>
                  <Image src="/Green_tick.svg" alt="check" width={24} height={24} className="flex-shrink-0" />
                  <span className="font-poppins font-medium text-white/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={formWrapRef} className="relative w-full lg:w-[480px] flex-shrink-0 mt-20 lg:mt-0">
            <div className="absolute -top-20 -left-4 lg:-left-20 z-20 pointer-events-none"><FloatingBadge /></div>
            <form id="consultation-form" onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl px-10 pb-10 pt-14" style={{ boxShadow: '0px 25px 42.7px -12px rgba(44,123,48,0.36)' }}>
              <h2 className="font-quicksand font-bold text-[#1A1C1E] text-2xl leading-8 mb-1">Get your free consultation today.</h2>
              <p className="font-poppins font-normal text-[#40493D] text-sm mb-8">Our experts will call you back within 24 hours.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Full Name</label>
                  <input type="text" placeholder="e.g. Anand Kumar" value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }) }} className={inputClass('name')} />
                  {errors.name && <p className="font-poppins text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Phone Number <span className="text-[#6B7280] font-normal">(WhatsApp preferred)</span></label>
                  <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: '' }) }} className={inputClass('phone')} />
                  {errors.phone && <p className="font-poppins text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Email</label>
                  <input type="email" placeholder="xyz@gmail.com" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }} className={inputClass('email')} />
                  {errors.email && <p className="font-poppins text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Type</label>
                  <div className="relative">
                    <select value={formData.propertyType} onChange={e => setFormData({ ...formData, propertyType: e.target.value })} className="w-full h-12 bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] border-0 outline-none focus:ring-2 focus:ring-[#73B130]/30 appearance-none transition-all">
                      <option>Apartment</option><option>Independent House</option><option>Villa</option><option>Commercial</option><option>Plot</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg></div>
                  </div>
                </div>
                <div>
                  <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">Property Location</label>
                  <div className="relative">
                    <select value={formData.location} onChange={e => { setFormData({ ...formData, location: e.target.value }); setOtherLocation(''); if (errors.location) setErrors({ ...errors, location: '' }) }} className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${errors.location ? 'bg-[#F3F3F6] ring-2 ring-red-400' : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'} ${formData.location ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}>
                      <option value="">Select area</option><option>Whitefield</option><option>Koramangala</option><option>Indiranagar</option><option>HSR Layout</option><option>Jayanagar</option><option>Electronic City</option><option>Marathahalli</option><option>Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" /></svg></div>
                  </div>
                  {formData.location === 'Other' && (
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={otherLocation}
                      onChange={e => { setOtherLocation(e.target.value); if (errors.location) setErrors({ ...errors, location: '' }) }}
                      className={`w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all mt-2 ${errors.location ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#73B130]/30'}`}
                    />
                  )}
                  {errors.location && <p className="font-poppins text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <button type="submit" disabled={submitting} className="w-full h-[60px] rounded-lg text-white font-poppins font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.01] mt-2 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: '#73B130' }}>
                  {submitting ? 'Submitting...' : 'Book Free Callback'}
                </button>


              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Stat Card — Figma mobile spec ────────────────────────── */}
      <div ref={statsRef} className="relative z-10 w-full px-5 md:px-20 lg:px-20 pb-16">
        <div className="stat-card">
          {/* Stat 1 — Trusted Customers */}
          <div className="stat-card__item">
            <span className="stat-card__value">3000+</span>
            <span className="stat-card__label">Trusted Customers</span>
          </div>

          {/* Stat 2 — Google Rating */}
          <div className="stat-card__item">
            <span className="stat-card__value">4.8/5</span>
            <span className="stat-card__label">Google Rating</span>
          </div>

          {/* Stat 3 — Happy NRIs */}
          <div className="stat-card__item">
            <span className="stat-card__value">1000+</span>
            <span className="stat-card__label">Happy NRI&apos;s</span>
          </div>

          {/* Stat 4 — Years of Service */}
          <div className="stat-card__item">
            <span className="stat-card__value">30+</span>
            <span className="stat-card__label">Years of Service</span>
          </div>

          {/* Vertical centre divider */}
          <div className="stat-card__divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
