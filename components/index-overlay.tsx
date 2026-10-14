'use client'

import Image from 'next/image'
import { useRef } from 'react'
import type { Project } from '@/lib/projects'
import { useOverlay } from '@/lib/use-overlay'

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect: (slug: string) => void
}

export function IndexOverlay({ open, projects, onClose, onSelect }: IndexOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useOverlay(open, onClose, closeRef)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="index-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/85 backdrop-blur-sm px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <header className="sticky top-0 z-10 flex items-baseline justify-between bg-white/80 backdrop-blur-sm py-4">
        <h2 id="index-title" className="text-sm">
          Index ({projects.length} Projects)
        </h2>
        <button ref={closeRef} type="button" onClick={onClose} className="hover:opacity-50 text-sm">
          (Close)
        </button>
      </header>

      {/* gap-x-0으로 이미지 밀착, 열 개수를 줄여 크기를 2배 이상 확대 */}
      <ul className="grid grid-cols-2 items-end gap-x-0 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => onSelect(project.slug)}
              className="group block w-full text-left"
            >
              {/* 이미지 컨테이너 */}
              <span className="relative block w-full" style={{ aspectRatio: project.aspectRatio }}>
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </span>
              {/* 이미지 바로 아래 좌측 하단 번호 표기 */}
              <div className="mt-2 text-xs font-normal tracking-tight text-black">
                {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}