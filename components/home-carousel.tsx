'use client'

import Image from 'next/image'
import { homeSlides } from '@/lib/projects'

type HomeCarouselProps = {
  paused?: boolean
}

export function HomeCarousel({ paused = false }: HomeCarouselProps) {
  // 무한 롤링용 데스크톱 슬라이드 데이터
  const seamlessSlides = [...homeSlides, ...homeSlides]

  // 모바일 메인 고정용 첫 번째 이미지
  const mainProject = homeSlides[0]

  return (
    <>
      {/* 1. 모바일용: 좌우 여백 2배로 확대 (px-2) */}
      <div className="relative flex h-svh w-full items-center justify-center px-2 md:hidden">
        {mainProject && (
          <figure className="relative h-full w-full">
            <Image
              src={mainProject.image || '/placeholder.svg'}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </figure>
        )}
      </div>

      {/* 2. PC(데스크톱)용: 기존 원래 여백 (px-3) 유지 */}
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