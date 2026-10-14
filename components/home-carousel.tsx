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

  // 무한 루프 처리를 위해 마지막 위치에 첫 번째 슬라이드 추가
  const loopSlides = [...homeSlides, homeSlides[0]]

  // 3초 간격 자동 슬라이드
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((current) => current + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused])

  // 무한 루프 리셋 (마지막 슬라이드 도달 시 애니메이션 없이 순간적으로 0번째로 이동)
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
                className="object-contain"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* 2. PC(데스크톱)용 세로(아래에서 위로) 무한 자동 슬라이더 (hidden md:block) */}
      <div className="pointer-events-none relative hidden h-screen w-full overflow-hidden md:block" aria-hidden>
        <div
          className={`w-full ${animate ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{
            transform: `translate3d(0, -${index * 100}vh, 0)`,
          }}
        >
          {loopSlides.map((project, i) => (
            <figure
              key={`pc-${project.slug}-${i}`}
              className="relative h-screen w-full shrink-0"
            >
              {/* object-contain 적용: 원본 비율 손실 없이 전체 이미지 표시 */}
              <Image
                src={project.image || '/placeholder.svg'}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-contain object-center"
              />
            </figure>
          ))}
        </div>
      </div>
    </>
  )
}