'use client'

const PHONE = '+917299914181'
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in Rajam Property's management services for my property in Bangalore. Could you please share more details and help me get started?"
)

export default function FloatingWidgets() {
  return (
    <div className="fixed right-5 z-50 flex flex-col gap-3 bottom-[88px] md:bottom-6">
      {/* Phone Call */}
      <a
        id="floating-call-btn"
        href={`tel:${PHONE}`}
        aria-label="Call us"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: '#73B130' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z"
            fill="white"
          />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${PHONE}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: '#25D366' }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4a11.4 11.4 0 01-5.8-1.58l-.42-.24-4.42 1.04 1.08-4.32-.28-.44A11.38 11.38 0 014.6 16c0-6.28 5.12-11.4 11.4-11.4S27.4 9.72 27.4 16 22.28 27.4 16 27.4zm6.26-8.54c-.34-.18-2.02-1-2.34-1.1-.32-.12-.54-.18-.78.18-.22.34-.88 1.1-1.08 1.32-.2.22-.4.24-.74.06-.34-.18-1.44-.52-2.74-1.66-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.4.52-.6.18-.2.22-.34.34-.56.12-.22.06-.42-.02-.6-.08-.18-.78-1.88-1.08-2.56-.28-.66-.58-.58-.78-.58h-.66c-.22 0-.58.08-.88.4-.3.32-1.14 1.12-1.14 2.72s1.16 3.16 1.32 3.38c.18.22 2.28 3.48 5.52 4.88.78.34 1.38.54 1.84.68.78.24 1.48.2 2.04.12.62-.1 1.9-.78 2.16-1.52.28-.76.28-1.4.2-1.54-.08-.14-.3-.22-.64-.4z"/>
        </svg>
      </a>
    </div>
  )
}
