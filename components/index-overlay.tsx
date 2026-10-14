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
        // 배경(바깥쪽 여백) 클릭 시 닫기
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

      {/* 원래의 썸네일 그리드 레이아웃 구조 복원 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-6 md:gap-y-16 pt-8">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            className="group flex flex-col gap-2 text-left hover:opacity-50 transition-opacity"
          >
            <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="truncate max-w-[70%] text-muted-foreground">
                <span lang="ko">{project.titleKo}</span> {project.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}