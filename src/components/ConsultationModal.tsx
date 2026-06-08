'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/lib/modalContext'

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

export default function ConsultationModal() {
  const { isOpen, closeModal } = useModal()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    propertyLocation: '',
    propertyLocationOther: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

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
        propertyLocation:
          formData.propertyLocation === 'Other'
            ? formData.propertyLocationOther
            : formData.propertyLocation,
      }
      fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    } finally {
      router.push('/thank-you')
    }
  }

  const inputClass = (field: string) =>
    `w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all ${
      errors[field] ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#73B130]/30'
    }`

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) closeModal() }}
      aria-modal="true"
      role="dialog"
      aria-label="Free Consultation Form"
    >
      <div
        className="relative w-full bg-white rounded-2xl overflow-y-auto"
        style={{
          maxWidth: '480px',
          maxHeight: '90vh',
          boxShadow: '0px 25px 60px -12px rgba(0,0,0,0.4)',
          animation: 'modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <form
          id="consultation-form"
          onSubmit={handleSubmit}
          noValidate
          className="px-8 pb-8 pt-10"
        >
          <h2
            className="font-quicksand font-bold text-[#1A1C1E] leading-8 mb-1"
            style={{ fontSize: '1.375rem' }}
          >
            Get your free consultation today.
          </h2>
          <p className="font-poppins font-normal text-[#40493D] text-sm mb-6">
            Our experts will call you back within 24 hours.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">
                Full Name
              </label>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="e.g. Anand Kumar"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                className={inputClass('name')}
              />
              {errors.name && (
                <p className="font-poppins text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">
                Phone Number{' '}
                <span className="text-[#6B7280] font-normal">(WhatsApp preferred)</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: '' })
                }}
                className={inputClass('phone')}
              />
              {errors.phone && (
                <p className="font-poppins text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: '' })
                }}
                className={inputClass('email')}
              />
              {errors.email && (
                <p className="font-poppins text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={formData.propertyType}
                  onChange={(e) => {
                    setFormData({ ...formData, propertyType: e.target.value })
                    if (errors.propertyType) setErrors({ ...errors, propertyType: '' })
                  }}
                  className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${
                    errors.propertyType
                      ? 'bg-[#F3F3F6] ring-2 ring-red-400'
                      : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'
                  } ${formData.propertyType ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
                >
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {errors.propertyType && (
                <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyType}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-semibold text-[#1A1C1E] text-sm block mb-1.5">
                Property Location
              </label>
              <div className="relative">
                <select
                  value={formData.propertyLocation}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      propertyLocation: e.target.value,
                      propertyLocationOther: '',
                    })
                    if (errors.propertyLocation)
                      setErrors({ ...errors, propertyLocation: '' })
                  }}
                  className={`w-full h-12 rounded-lg px-4 font-poppins text-base border-0 outline-none appearance-none transition-all ${
                    errors.propertyLocation
                      ? 'bg-[#F3F3F6] ring-2 ring-red-400'
                      : 'bg-[#F3F3F6] focus:ring-2 focus:ring-[#73B130]/30'
                  } ${formData.propertyLocation ? 'text-[#1A1C1E]' : 'text-[#6B7280]'}`}
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
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {errors.propertyLocation && (
                <p className="font-poppins text-red-500 text-xs mt-1">{errors.propertyLocation}</p>
              )}
              {formData.propertyLocation === 'Other' && (
                <input
                  type="text"
                  placeholder="Please specify your location"
                  value={formData.propertyLocationOther}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyLocationOther: e.target.value })
                  }
                  className="w-full h-[47px] bg-[#F3F3F6] rounded-lg px-4 font-poppins text-base text-[#1A1C1E] placeholder-[#6B7280] border-0 outline-none transition-all focus:ring-2 focus:ring-[#73B130]/30 mt-2"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[56px] rounded-lg text-white font-poppins font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.01] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#73B130' }}
            >
              {submitting ? 'Submitting…' : 'Book Free Callback'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
