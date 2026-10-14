'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { homeSlides } from '@/lib/projects'

type HomeCarouselProps = {
  paused?: boolean
}

export function HomeCarousel({ paused = false }: HomeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 무한 롤링용 데스크톱 슬라이드 데이터
  const seamlessSlides = [...homeSlides, ...homeSlides]

  // 모바일에서 우측/좌측 클릭 시 이동
  const handleNext = () => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth * 0.82
    scrollRef.current.scrollBy({ left: width, behavior: 'smooth' })
  }

  const handlePrev = () => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth * 0.82
    scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' })
  }

  return (
    <>
      {/* 1. 모바일용 가로 스크롤 캐러셀 (md:hidden) */}
      <div className="relative h-svh w-full overflow-hidden md:hidden">
        <div
          ref={scrollRef}
          className="flex h-full w-full items-center overflow-x-auto snap-x snap-mandatory scroll-smooth gap-0 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {homeSlides.map((project, i) => (
            <figure
              key={`mobile-${project.slug}-${i}`}
              className="relative h-[55svh] w-[82vw] shrink-0 snap-start flex-none"
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

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-0 top-0 z-20 h-full w-1/4 cursor-pointer opacity-0"
        />
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-0 top-0 z-20 h-full w-3/4 cursor-pointer opacity-0"
        />
      </div>

      {/* 2. PC(데스크톱)용: 화면 세로 절대 중앙 + 하단선 All Rights Reserved 바닥선에 정확히 밀착 */}
      <div className="pointer-events-none relative hidden h-screen w-full overflow-hidden md:block" aria-hidden>
        <div
          className={`w-full h-full ${paused ? '[animation-play-state:paused]' : ''} animate-vertical-scroll`}
        >
          {seamlessSlides.map((project, i) => (
            <figure
              key={`pc-scroll-${project.slug}-${i}`}
              className="relative h-screen w-full shrink-0 flex items-center justify-center py-[1.05rem] px-3"
            >
              <div className="relative h-full w-full">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-contain object-center"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </>
  )
}