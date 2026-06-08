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
      gsap.set([heading, desc].filter(Boolean), { y: 30, opacity: 0 })
      gsap.set(cards, { y: 40, opacity: 0 })

      // Heading + desc trigger together on heading
      if (heading || desc) {
        gsap.to([heading, desc].filter(Boolean), {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading || desc,
            start: 'top 92%',
            once: true,
          },
        })
      }

      // Cards trigger independently when they enter the viewport
      if (cards.length) {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: { each: 0.1, ease: 'power2.inOut' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 92%',
            once: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return { headingRef, descRef, setCardRef }
}
