'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navLinks.forEach(link => {
      const el = document.getElementById(link.id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(link.id)
          else setActiveSection(prev => (prev === link.id ? '' : prev))
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setMenuOpen(false)
    if (menuOpen) window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 h-[76px] flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Image src="/Logo_light.svg" alt="Rapro Logo" width={100} height={45} priority />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="flex flex-col py-1 transition-colors"
                  style={{ borderBottom: isActive ? '2px solid #15803D' : '2px solid transparent' }}
                >
                  <span className="font-inter text-base transition-colors" style={{ fontWeight: isActive ? 700 : 500, color: isActive ? '#15803D' : '#475569' }}>
                    {link.label}
                  </span>
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="#consultation-form"
            className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-lg text-white font-inter font-bold text-base transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(103.43deg, #0D631B 0%, #2E7D32 100%)', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)' }}
          >
            Get Free Consultation
          </a>

          {/* Mobile — mail icon + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mail Icon */}
            <a
              href="mailto:enquiry@rajamproperty.in"
              aria-label="Send email"
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: 'rgba(115,177,48,0.1)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#73B130" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,12 2,6"/>
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="flex flex-col items-center justify-center w-9 h-9 gap-[5px]"
            >
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: '#1A1A1A',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: '#1A1A1A',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: '#1A1A1A',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className="fixed left-0 right-0 z-40 bg-white md:hidden overflow-hidden transition-all duration-300"
        style={{
          top: '76px',
          maxHeight: menuOpen ? '300px' : '0px',
          boxShadow: menuOpen ? '0px 4px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="flex flex-col px-5 py-4 gap-1">
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 font-inter text-base border-b"
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0D631B' : '#475569',
                  borderColor: 'rgba(0,0,0,0.06)',
                }}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="#consultation-form"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex items-center justify-center py-3 rounded-lg text-white font-inter font-bold text-base"
            style={{ background: 'linear-gradient(103.43deg, #0D631B 0%, #2E7D32 100%)' }}
          >
            Get Free Consultation
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0,0,0,0.2)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
