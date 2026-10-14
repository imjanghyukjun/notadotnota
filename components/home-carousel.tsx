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

  // 3초 간격 자동 슬라이드
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((current) => current + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused])

  // 무한 루프 리셋 (마지막 슬라이드 도달 시 자연스럽게 처음으로 복귀)
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
    <>
      {/* 1. 모바일용 가로 스크롤 캐러셀 (md:hidden) */}
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
              key={`mobile-${project.slug}-${i}`}
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

      {/* 2. PC(데스크톱)용 화면 가득 차는 3초 슬라이더 (hidden md:block) */}
      <div className="pointer-events-none relative hidden h-screen w-full overflow-hidden md:block" aria-hidden>
        {homeSlides.map((project, i) => {
          // 모바일 슬라이더와 동일한 인덱스를 바라보고 3초마다 100vh 가득 차게 페이드 전환
          const isActive = index % homeSlides.length === i
          return (
            <figure
              key={`pc-${project.slug}-${i}`}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={project.image || '/placeholder.svg'}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </figure>
          )
        })}
      </div>
    </>
  )
}