'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from '@/lib/modalContext'

const EMBED_URLS: Record<string, string> = {
  '/property-management':
    'https://eventshare.pana.space/f/7537349d-65ac-47ed-95ae-cc48fbbd50cf?embed=1',
}
const DEFAULT_EMBED_URL =
  'https://eventshare.pana.space/f/20f2bbb6-6d0d-493d-8d3d-10054ab8d29d?embed=1'

export default function ConsultationModal() {
  const { isOpen, closeModal } = useModal()
  const pathname = usePathname()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)

  const embedUrl = EMBED_URLS[pathname] ?? DEFAULT_EMBED_URL

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  // Redirect to /thank-you on successful Mathiverse form submission
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Mathiverse postMessage]', e.origin, e.data)
      }
      if (!e.origin.includes('eventshare.pana.space') && !e.origin.includes('pana.space')) return
      const data = e.data
      if (!data) return
      const isSubmission =
        data?.type === 'form:submitted' ||
        data?.type === 'form-submitted' ||
        data?.type === 'submitted' ||
        data?.type === 'success' ||
        data?.event === 'submitted' ||
        data?.event === 'form:submitted' ||
        data?.status === 'submitted' ||
        data?.status === 'success'
      if (isSubmission) {
        closeModal()
        router.push('/thank-you')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [closeModal, router])

  if (!isOpen) return null

  return (
    <>
      <Script src="https://eventshare.pana.space/embed.js" strategy="lazyOnload" />

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={(e) => { if (e.target === overlayRef.current) closeModal() }}
        aria-modal="true"
        role="dialog"
        aria-label="Consultation Form"
      >
        <div
          className="relative w-full"
          style={{
            maxWidth: '560px',
            maxHeight: '100vh',
            animation: 'modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* Close button floats over the iframe */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <iframe
            src={embedUrl}
            width="100%"
            height="700"
            frameBorder="0"
            title="Registration form"
            data-mathiverse-form="embed"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}
