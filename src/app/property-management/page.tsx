import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import Services from '@/components/Services'
import CTA from '@/components/CTA'
import Benefits from '@/components/Benefits'
import WhyChoose from '@/components/WhyChoose'
import CTA2 from '@/components/CTA2'
import ProblemSolution from '@/components/ProblemSolution'
import CTA3 from '@/components/CTA3'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import FloatingWidgets from '@/components/FloatingWidgets'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata = {
  title: "Rajam Property | Bangalore's #1 Property Management Service",
  description:
    "Award-winning property management in Bangalore. Trusted by 1000+ NRIs. No signup fee, verified tenants, 12+ services in one.",
}

export default function PropertyManagementPage() {
  return (
    <main>
      <Navbar />
      <Hero headingLine2="Property Management" />
      <Partners />
      <Services />
      <CTA />
      <Benefits />
      <WhyChoose />
      <CTA2 />
      <ProblemSolution />
      <CTA3 />
      <FAQ />
      <Footer />
      <FloatingWidgets />
      <FloatingCTA />
    </main>
  )
}
