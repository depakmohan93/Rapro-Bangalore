import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VivoCityHero from '@/components/VivoCityHero'
import Testimonials from '@/components/Testimonials'
import Services from '@/components/Services'
import CTA from '@/components/CTA'
import Partners from '@/components/Partners'
import Benefits from '@/components/Benefits'
import WhyChoose from '@/components/WhyChoose'
import CTA2 from '@/components/CTA2'
import ProblemSolution from '@/components/ProblemSolution'
import CTA3 from '@/components/CTA3'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import FloatingWidgets from '@/components/FloatingWidgets'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: 'Vivo City | Rajam Property — Bangalore Property Management',
  description: 'Looking for a property in Bangalore? Rajam Property helps you find, manage, and invest in real estate with 30+ years of expertise.',
}

export default function VivoCityPage() {
  return (
    <main>
      <Navbar />
      <VivoCityHero />
      <Testimonials />
      <Services />
      <CTA />
      <Partners />
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
