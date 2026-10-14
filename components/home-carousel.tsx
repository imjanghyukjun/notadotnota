'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { homeSlides } from '@/lib/projects'

const SLIDE_VW = 82
const GAP_VW = 1.5
const START_VW = 7
const STEP_VW = SLIDE_VW + GAP_VW
const INTERVAL_MS = 3000
const MOVE_MS = 700

type HomeCarouselProps = {
  paused?: boolean
}

export function HomeCarousel({ paused = false }: HomeCarouselProps) {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const loopSlides = [...homeSlides, homeSlides[0]]

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((current) => current + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused])

  useEffect(() => {
    if (index !== homeSlides.length) return
    const timeout = window.setTimeout(() => {
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true))
      })
    }, MOVE_MS)
    return () => window.clearTimeout(timeout)
  }, [index])

  return (
    <div className="pointer-events-none relative h-svh overflow-hidden md:hidden" aria-hidden>
      <div
        className={`flex h-full items-center ${animate ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{
          gap: `${GAP_VW}vw`,
          transform: `translate3d(calc(${START_VW}vw - ${index * STEP_VW}vw), 0, 0)`,
        }}
      >
        {loopSlides.map((project, i) => (
          <figure
            key={`${project.slug}-${i}`}
            className="relative h-[50svh] shrink-0"
            style={{ width: `${SLIDE_VW}vw` }}
          >
            <Image
              src={project.image || '/placeholder.svg'}
              alt=""
              fill
              priority={i < 2}
              sizes="82vw"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
