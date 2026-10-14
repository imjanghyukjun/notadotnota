'use client'

import { useEffect, useRef } from 'react'

type Project = {
  slug: string
  titleKo: string
  title: string
  year: string
}

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect: (slug: string) => void
}

export function IndexOverlay({ open, projects, onClose, onSelect }: IndexOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // 배경(바깥쪽 여백)을 클릭했을 때만 닫히도록 설정
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      className="fixed inset-0 z-50 flex flex-col bg-white/90 px-6 py-8 md:px-12 md:py-12 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-medium">Index</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-sm hover:opacity-50 transition-opacity"
        >
          (close)
        </button>
      </div>

      <nav className="flex flex-col gap-3 max-w-xl">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            className="text-left text-lg md:text-xl hover:opacity-50 transition-opacity flex items-baseline justify-between group"
          >
            <span className="font-normal">
              {String(i + 1).padStart(2, '0')}. {project.titleKo} <span className="text-muted-foreground">{project.title}</span>
            </span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}