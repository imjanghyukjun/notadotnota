'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/projects'

type HomeCarouselProps = {
  paused?: boolean
}

export function HomeCarousel({ paused = false }: HomeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 프로젝트들 중 이미지가 존재하는 항목만 추출
  const images = projects.filter((p) => p.image)

  const scrollToNext = () => {
    if (!containerRef.current) return
    const nextIndex = (currentIndex + 1) % images.length
    const targetElement = containerRef.current.children[nextIndex] as HTMLElement
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      setCurrentIndex(nextIndex)
    }
  }

  const scrollToPrev = () => {
    if (!containerRef.current) return
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    const targetElement = containerRef.current.children[prevIndex] as HTMLElement
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      setCurrentIndex(prevIndex)
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 
        가로 스크롤 캐러셀 컨테이너
        - snap-x snap-mandatory: 슬라이드 후 각 이미지 시작 지점에 딱 멈춤
        - gap-0: 이미지 간 여백 완전 제거
        - no-scrollbar: 스크롤바 숨김
      */}
      <div
        ref={containerRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((project, index) => (
          <div
            key={project.slug || index}
            className="flex-none snap-start h-full flex items-center justify-center w-[82vw] md:w-full"
          >
            <div className="relative h-[65vh] w-full md:h-[80vh]">
              <Image
                src={project.image!}
                alt={project.alt || project.title}
                fill
                priority={index === 0}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 클릭 감지 영역 (화면 좌/우 클릭 시 다음/이전으로 스무스 이동) */}
      <button
        type="button"
        onClick={scrollToPrev}
        aria-label="Previous slide"
        className="absolute left-0 top-0 z-20 h-full w-1/3 cursor-pointer opacity-0"
      />
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Next slide"
        className="absolute right-0 top-0 z-20 h-full w-2/3 cursor-pointer opacity-0"
      />
    </div>
  )
}