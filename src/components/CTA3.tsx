import Image from 'next/image'

export default function CTA3() {
  return (
    <section className="w-full bg-white flex items-center justify-center py-[60px] md:py-[100px] px-5 md:px-20">
      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center" style={{ maxWidth: '64rem', minHeight: '20rem', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', borderRadius: '2rem', padding: '3rem 2rem' }}>
        <Image src="/Card_bg.png" alt="" fill className="object-cover" priority />
        <div className="relative z-10 flex flex-col items-center text-center gap-4 w-full" style={{ maxWidth: '54rem' }}>
          <h2 className="font-quicksand text-white" style={{ fontWeight: 600, fontSize: 'clamp(2rem, 3.5vw, 2.625rem)', lineHeight: '1.4' }}>
            Looking for a Reliable Partner to Manage Your Property?
          </h2>
          <p className="font-poppins text-white" style={{ fontWeight: 400, fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', lineHeight: '1.6' }}>
            Join 700+ NRIs worldwide who trust Rapro for complete property management.
          </p>
          <div className="flex justify-center pt-2 w-full">
            <a
              href="#consultation-form"
              className="text-black bg-white relative overflow-hidden inline-flex items-center justify-center rounded-md font-semibold transition-colors cursor-pointer
                py-[10px] px-6 text-base
                before:absolute before:inset-0 before:rounded-[inherit]
                before:bg-[linear-gradient(45deg,transparent_25%,rgba(200,200,200,0.4)_50%,transparent_75%,transparent_100%)]
                before:bg-[length:250%_250%,100%_100%]
                before:bg-[position:200%_0,0_0]
                before:bg-no-repeat
                before:transition-[background-position_0s_ease]
                before:duration-1000
                hover:before:bg-[position:-100%_0,0_0]"
            >
              Get free call back
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
