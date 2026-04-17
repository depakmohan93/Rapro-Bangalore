'use client'

export default function FloatingCTA() {
  return (
    <a
      href="#consultation-form"
      className="fixed bottom-[1rem] left-4 right-4 z-50 flex md:hidden items-center justify-center rounded-lg text-white font-poppins font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]"
      style={{
        background: 'linear-gradient(103.43deg, #0D631B 0%, #2E7D32 100%)',
        boxShadow: '0px 4px 16px rgba(13, 99, 27, 0.4)',
        paddingTop: '14px',
        paddingBottom: '14px',
      }}
    >
      Book Free Callback
    </a>
  )
}
