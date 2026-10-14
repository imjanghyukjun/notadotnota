'use client'

import Image from 'next/image'
import { homeSlides } from '@/lib/projects'

type HomeCarouselProps = {
  paused?: boolean
}

export function HomeCarousel({ paused = false }: HomeCarouselProps) {
  // 끊김 없는 무한 롤링을 위해 슬라이드 리스트를 2번 연속으로 복제
  const seamlessSlides = [...homeSlides, ...homeSlides]

  return (
    <>
      {/* 1. 모바일용 가로 스크롤 캐러셀 (md:hidden) */}
      <div className="pointer-events-none relative h-svh overflow-hidden md:hidden" aria-hidden>
        <div className="flex h-full items-center gap-[1.5vw]">
          {homeSlides.map((project, i) => (
            <figure
              key={`mobile-${project.slug}-${i}`}
              className="relative h-[50svh] shrink-0"
              style={{ width: '82vw' }}
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

      {/* 2. PC(데스크톱)용: 천천히 연속해서 쭉~ 올라가는 세로 무한 루프 슬라이더 */}
      <div className="pointer-events-none relative hidden h-screen w-full overflow-hidden md:block" aria-hidden>
        <div
          className={`w-full ${paused ? '[animation-play-state:paused]' : ''} animate-vertical-scroll`}
        >
          {seamlessSlides.map((project, i) => (
            <figure
              key={`pc-scroll-${project.slug}-${i}`}
              className="relative h-screen w-full shrink-0"
            >
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