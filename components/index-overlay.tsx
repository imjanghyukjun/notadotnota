'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useOverlay } from '@/lib/use-overlay'

type Project = {
  slug: string
  titleKo: string
  title: string
  year: string
  aspectRatio?: string | number
  image?: string
  series?: string[]
  alt?: string
  category?: 'design' | 'photography'
}

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect?: (slug: string) => void
  title?: { ko: string; en: string }
}

export function IndexOverlay({ open, projects, onClose, title }: IndexOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  useOverlay(open, onClose)

  // 각 프로젝트별 시리즈 이미지 슬라이드 인덱스 상태 관리
  const [seriesIndices, setSeriesIndices] = useState<Record<string, number>>({})

  const handleImageClick = (project: Project) => {
    // 시리즈 이미지가 등록되어 있는 경우에만 클릭 시 다음 사진으로 교체
    if (project.series && project.series.length > 1) {
      setSeriesIndices((prev) => {
        const currentIndex = prev[project.slug] || 0
        const nextIndex = (currentIndex + 1) % project.series!.length
        return { ...prev, [project.slug]: nextIndex }
      })
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // 창 바깥쪽 배경 클릭 시 닫기
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="index-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/90 px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* 상단 고정(Sticky) 및 완전 투명 배경 */}
      <header className="sticky top-0 z-30 flex items-center justify-between py-3 bg-transparent">
        {/* 좌측 상단 헤더 타이틀 (동적 적용) */}
        <h2 id="index-title" className="text-[15px] font-normal tracking-tight">
          <span lang="ko">{title?.ko || '찾아보기'}</span> {title?.en || 'Index'}
        </h2>
        {/* 우측 상단 (Close) 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 ml-auto cursor-pointer"
        >
          (Close)
        </button>
      </header>

      {/* 썸네일 그리드: 모바일 2칸(grid-cols-2), 좌우 여백 0(gap-x-0)으로 딱 붙게 설정 */}
      <div className="grid grid-cols-2 gap-x-0 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-0 md:gap-y-16 pt-8 items-end">
        {projects.map((project, i) => {
          const hasSeries = Boolean(project.series && project.series.length > 1)
          const currentSeriesIndex = seriesIndices[project.slug] || 0
          const displayImage = hasSeries ? project.series![currentSeriesIndex] : project.image

          return (
            <div
              key={project.slug}
              onClick={() => handleImageClick(project)}
              className={`group flex flex-col justify-end text-left w-full ${
                hasSeries ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              {/* 이미지 영역 (회전 클래스 제거됨) */}
              <div className="relative w-full overflow-hidden flex items-center justify-center">
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt={project.alt || project.title}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                    className="h-auto w-full object-contain grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0"
                  />
                )}
              </div>
              {/* 하단 번호 */}
              <div className="mt-1 text-xs text-left">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}