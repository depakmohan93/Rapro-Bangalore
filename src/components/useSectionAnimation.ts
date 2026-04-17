'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useSectionAnimation<
  H extends HTMLElement,
  D extends HTMLElement,
  C extends HTMLElement
>() {
  const headingRef = useRef<H>(null)
  const descRef = useRef<D>(null)
  const cardsRef = useRef<C[]>([])

  const setCardRef = (el: C | null, index: number) => {
    if (el) cardsRef.current[index] = el
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const heading = headingRef.current
    const desc = descRef.current
    const cards = cardsRef.current.filter(Boolean)

    const ctx = gsap.context(() => {
      // Initial hidden state
      gsap.set([heading, desc].filter(Boolean), { y: 50, opacity: 0 })
      gsap.set(cards, { y: 70, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading || desc,
          start: 'top 80%',
          once: true,
        },
      })

      // Heading slides in — longer duration, smooth ease
      if (heading) {
        tl.to(heading, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power4.out',
        })
      }

      // Description follows closely behind
      if (desc) {
        tl.to(desc, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
        }, '-=0.6')
      }

      // Cards stagger in as a wave — tight stagger, smooth ease
      if (cards.length) {
        tl.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: {
            each: 0.1,       // 100ms between each card — feels like one fluid wave
            ease: 'power2.inOut',
          },
          ease: 'power4.out',
        }, '+=0.05')
      }
    })

    return () => ctx.revert()
  }, [])

  return { headingRef, descRef, setCardRef }
}
