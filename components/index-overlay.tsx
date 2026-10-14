'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useOverlay } from '@/lib/use-overlay'

type Project = {
  slug: string
  titleKo: string
  title: string
  year: string
  aspectRatio?: number
  image?: string
  alt?: string
}

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect: (slug: string) => void
}

export function IndexOverlay({ open, projects, onClose, onSelect }: IndexOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  useOverlay(open, onClose, closeRef)

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
      <header className="flex items-baseline justify-between py-3 md:block">
        <h2 id="index-title" className="md:sr-only">
          <span lang="ko">찾아보기</span> Index
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="hover:opacity-50 md:absolute md:right-4 md:top-3"
        >
          (Close)
        </button>
      </header>

      {/* 썸네일 그리드: 좌우 여백 0, 아래쪽 끝맞춤 */}
      <div className="grid grid-cols-2 gap-x-0 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-0 md:gap-y-16 pt-8 items-end">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            className="flex flex-col justify-end text-left w-full"
          >
            {/* 원본 비율 유지 (object-contain) */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: project.aspectRatio || '3/4' }}
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                  className="object-contain object-bottom"
                />
              )}
            </div>
            {/* 하단 텍스트: 번호만 표시 및 좌측 정렬 */}
            <div className="mt-1 text-xs text-left">
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}