import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Rajam Property',
  description: 'Thank you for reaching out to Rajam Property. Our team will get back to you shortly.',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F9F9F9' }}>
      <div
        className="flex flex-col justify-center items-center text-center"
        style={{
          width: '100%',
          maxWidth: '800px',
          minHeight: '400px',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '48px 24px',
          gap: '24px',
          boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.08)',
        }}
      >
        {/* Green check icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '80px',
            border: '2px solid #599C10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#73B130" />
            <path
              d="M9 16.5L13.5 21L23 11"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text content */}
        <div
          className="flex flex-col items-center"
          style={{ gap: '20px', maxWidth: '472px' }}
        >
          <h1
            className="font-poppins text-black"
            style={{ fontWeight: 500, fontSize: 'clamp(1.5rem, 4vw, 2.125rem)', lineHeight: '1.2' }}
          >
            Thank you for reaching out!
          </h1>
          <p
            className="font-poppins text-center"
            style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#7A7A7A',
              maxWidth: '400px',
            }}
          >
            Your details have been submitted successfully. Our team will get back to you shortly with the information you requested.
          </p>

          {/* Return to Home button */}
          <Link
            href="/"
            className="flex items-center justify-center font-poppins text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              width: '243px',
              height: '53px',
              background: '#73B130',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '28px',
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
