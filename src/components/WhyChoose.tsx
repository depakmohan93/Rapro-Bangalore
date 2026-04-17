export default function WhyChoose() {
  const rows = [
    { feature: 'Full-Service Coverage', withUs: 'We take care of everything from tenants and maintenance to documentation and updates.', without: 'Services are limited. You still end up managing multiple things yourself.' },
    { feature: 'One Point of Contact', withUs: 'You have a dedicated property manager who handles your property end-to-end.', without: 'No clear owner. You deal with different people for different tasks.' },
    { feature: 'Property Upkeep', withUs: 'Regular inspections and proactive maintenance keep your property in top condition.', without: 'Issues are addressed only when they become problems.' },
    { feature: 'Transparency & Updates', withUs: "You receive consistent updates with reports and photos, so you always know what's happening.", without: "Limited visibility. You're often unsure about your property's status." },
    { feature: 'Handling Issues', withUs: 'From repairs to tenant concerns, everything is handled quickly without your involvement.', without: "You're pulled in to resolve issues or follow up constantly." },
    { feature: 'Support Availability', withUs: '24/7 support ensures your property is taken care of at all times.', without: 'Support is limited and response times can be slow.' },
    { feature: 'Managing from Abroad (NRI)', withUs: 'We manage your property completely while you stay worry-free, wherever you are.', without: 'No structured support for remote property owners.' },
  ]

  return (
    <section className="py-[60px] md:py-[100px] px-5 md:px-20">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-quicksand font-semibold text-black mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: '1.27' }}>
            Why Smart Property Owners Choose Rapro
          </h2>
          <p className="font-poppins text-[#40493D] text-base">
            We handle everything from acquisition to maintenance.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #D8D8D8' }}>
          <div className="grid grid-cols-3">
            <div className="flex items-center justify-center p-4 md:p-6" style={{ border: '1px solid #D8D8D8', borderRadius: '16px 0 0 0' }}>
              <span className="font-poppins font-semibold text-black text-sm md:text-xl tracking-wide text-center">What Matters to You</span>
            </div>
            <div className="flex items-center justify-center p-4 md:p-6 bg-[#73B130]">
              <span className="font-poppins font-semibold text-white text-sm md:text-xl tracking-wide text-center">With Rajam Property</span>
            </div>
            <div className="flex items-center justify-center p-4 md:p-6 bg-[#E7E7E7]" style={{ borderRadius: '0 16px 0 0' }}>
              <span className="font-poppins font-semibold text-[#A5A5A5] text-sm md:text-xl tracking-wide text-center">With Others</span>
            </div>
          </div>

          {rows.map((row, i) => {
            const isLast = i === rows.length - 1
            return (
              <div key={i} className="grid grid-cols-3" style={{ borderTop: '1px solid #D8D8D8' }}>
                <div className="flex items-center justify-center p-3 md:p-6 bg-white" style={{ borderRadius: isLast ? '0 0 0 16px' : 0, borderRight: '1px solid #D8D8D8' }}>
                  <span className="font-poppins font-semibold text-[#4B4B4B] text-xs md:text-base text-center leading-snug">{row.feature}</span>
                </div>
                <div className="flex items-center justify-center p-3 md:p-6 bg-[#ECFBEB]" style={{ borderRight: '1px solid #D8D8D8' }}>
                  <span className="font-poppins font-medium text-[#4B4B4B] text-xs md:text-sm leading-snug text-center">{row.withUs}</span>
                </div>
                <div className="flex items-center justify-center p-3 md:p-6 bg-white" style={{ borderRadius: isLast ? '0 0 16px 0' : 0 }}>
                  <span className="font-poppins font-medium text-[#4B4B4B] text-xs md:text-sm leading-snug text-center">{row.without}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
