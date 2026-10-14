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
      className={`fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-white/80 to-white/55 px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <header className="sticky top-0 z-10 flex items-baseline justify-between bg-transparent py-3">
        <h2 id="index-title">
          Index ({projects.length} Projects, {projects.length} Images total.)
        </h2>
        <button ref={closeRef} type="button" onClick={onClose} className="hover:opacity-50">
          (Close)
        </button>
      </header>

      <ul className="grid grid-cols-2 items-start gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => onSelect(project.slug)}
              className="block w-full text-left"
            >
              <span className="relative block w-full" style={{ aspectRatio: project.aspectRatio }}>
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 10vw, (min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </span>
              <span className="mt-2 flex gap-3">
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>{project.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
