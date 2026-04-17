import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
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
