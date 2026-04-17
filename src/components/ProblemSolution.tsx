const problems = [
  { title: 'Constant Follow-Ups', desc: "You're always chasing tenants, brokers, or vendors for updates." },
  { title: 'Unexpected Issues', desc: 'Repairs and problems show up when you least expect them.' },
  { title: 'No Clarity or Control', desc: "You don't really know what's happening with your property." },
]

const solutions = [
  'A fully managed property without daily involvement',
  'Proactive handling of issues and upkeep',
  "Clear updates so you're always in control",
]

export default function ProblemSolution() {
  return (
    <section className="py-24 px-5 md:px-20 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Problem card */}
          <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid #FFEEEE' }}>
            <div>
              <h3
                className="font-quicksand text-[#6F706E] mb-2"
                style={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.4' }}
              >
                Does Managing Your Property Feel Like<br />a Second Job?
              </h3>
              <p className="font-poppins text-[#40493D]" style={{ fontWeight: 400, fontSize: '1rem' }}>
                Most landlords deal with the same headaches every month
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ background: '#FFFAFA' }}
                >
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#DF6C6C" strokeWidth="1.5" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DF6C6C" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-poppins text-[#DF6C6C]" style={{ fontWeight: 600, fontSize: '1rem' }}>{p.title}</p>
                    <p className="font-poppins text-[#DF6C6C]" style={{ fontWeight: 400, fontSize: '1rem' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution card */}
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col justify-center gap-8"
            style={{ background: '#2C7B30', border: '2px solid rgba(115, 177, 48, 0.5)' }}
          >
            <div className="flex flex-col gap-4">
              <div>
                {/* THE RAPRO WAY — same font size as heading below */}
                <p
                  className="font-quicksand text-green-200 uppercase tracking-widest mb-2"
                  style={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.4' }}
                >
                  The Rapro Way
                </p>
                <h3
                  className="font-quicksand text-white"
                  style={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.4' }}
                >
                  We Manage Everything.
                </h3>
                <p className="font-poppins text-white mt-3 max-w-[32rem]" style={{ fontWeight: 400, fontSize: '0.875rem', lineHeight: '1.6' }}>
                  From finding tenants to collecting rent and handling maintenance we take care of it all so you don&apos;t have to think about your property.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {solutions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ background: '#3D8641', boxShadow: '0px 1px 3px rgba(0,0,0,0.07)' }}
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                        <path d="M7 12.5l3.5 3.5 6-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-poppins text-white" style={{ fontWeight: 500, fontSize: '1.1875rem', lineHeight: '1.6' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
