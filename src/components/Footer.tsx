import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1A1C1E] text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image src="/Logo_dark.svg" alt="Rapro Logo" width={100} height={45} />
            </div>
            <p className="font-poppins text-[#A0A0A0] max-w-xs mb-6" style={{ fontWeight: 400, fontSize: '0.875rem', lineHeight: '1.6' }}>
              Bangalore&apos;s award-winning property management service. Trusted by 1000+ NRIs for over 30 years.
            </p>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/rajam-property-management-services/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: '#73B130' }} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="white"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/rajamproperty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: '#73B130' }} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/rajampropertymanagement" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: '#73B130' }} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@rajampropertymanagement" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: '#73B130' }} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#73B130"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-quicksand text-white mb-4" style={{ fontWeight: 600, fontSize: '1rem' }}>Services</h4>
            <ul className="flex flex-col gap-2">
              {['Property Management', 'Tenant Management', 'Buying & Selling', 'Legal Support', 'Property Inspection'].map(s => (
                <li key={s}>
                  <a href="#services" className="font-poppins text-[#A0A0A0] hover:text-[#73B130] transition-colors" style={{ fontWeight: 400, fontSize: '0.875rem' }}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-quicksand text-white mb-4" style={{ fontWeight: 600, fontSize: '1rem' }}>Contact</h4>
            <div className="flex flex-col gap-3 font-poppins text-[#A0A0A0]" style={{ fontWeight: 400, fontSize: '0.875rem' }}>
              <a href="tel:+917299914181" className="hover:text-[#73B130] transition-colors">📞 +91 72999 14181</a>
              <a href="mailto:enquiry@rajamproperty.in" className="hover:text-[#73B130] transition-colors">✉️ enquiry@rajamproperty.in</a>
              <p>📍 Bangalore, Karnataka, India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-poppins text-[#A0A0A0]" style={{ fontWeight: 400, fontSize: '0.875rem' }}>
            © 2026 Rapro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-poppins text-[#A0A0A0] hover:text-white transition-colors" style={{ fontWeight: 400, fontSize: '0.875rem' }}>Privacy Policy</a>
            <a href="#" className="font-poppins text-[#A0A0A0] hover:text-white transition-colors" style={{ fontWeight: 400, fontSize: '0.875rem' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
