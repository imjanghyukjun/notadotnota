'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { projects } from '@/lib/projects'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact'
import { IndexOverlay } from '@/components/index-overlay'
import { AboutOverlay } from '@/components/about-overlay'
import { HomeCarousel } from '@/components/home-carousel'

type Panel = 'none' | 'index' | 'about'

export function Site() {
  const [panel, setPanel] = useState<Panel>('none')
  const closePanel = useCallback(() => setPanel('none'), [])

  const selectProject = useCallback((slug: string) => {
    setPanel('none')
    requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <>
      <main
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('figure')) return
          setPanel('index')
        }}
        className="h-svh overflow-hidden md:h-auto md:min-h-svh md:overflow-visible md:pb-24"
      >
        <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
        <div className="mx-auto hidden w-[25vw] flex-col gap-3 md:flex">
          {projects.map((project, i) => (
            <figure
              key={project.slug}
              id={project.slug}
              className="relative w-full"
              style={{ aspectRatio: project.aspectRatio }}
            >
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.alt}
                fill
                priority={i === 0}
                sizes="25vw"
                className="object-cover"
              />
              <figcaption className="sr-only">
                {project.titleKo} {project.title}, {project.year}
              </figcaption>
            </figure>
          ))}
        </div>
        <HomeCarousel paused={panel !== 'none'} />
      </main>

      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
        <div className="pointer-events-auto hidden bg-background px-0.5 text-balance md:block">
          <button type="button" onClick={() => setPanel('about')} className="hover:opacity-50">
            <span lang="ko">장혁준</span> Jang Hyukjun
          </button>{' '}
          ({' '}
          <span lang="ko">사진</span> Photography ({' '}
          <span lang="ko">그래픽 디자인</span> Graphic Design ({' '}
          <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
            {EMAIL}
          </a>{' '}
          ({' '}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
            instagram@{INSTAGRAM_HANDLE}
          </a>
        </div>

        <div className="pointer-events-auto flex flex-col items-center gap-2.5 text-[12px] md:hidden">
          <div className="bg-background px-0.5 whitespace-nowrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPanel('about')
              }}
              className="py-2 hover:opacity-50"
            >
              <span lang="ko">장혁준</span> Jang Hyukjun
            </button>{' '}
            ({' '}
            <span lang="ko">사진</span> Photography ({' '}
            <span lang="ko">그래픽 디자인</span> Graphic Design
          </div>
          <div className="bg-background px-0.5 whitespace-nowrap">
            ({' '}
            <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
              {EMAIL}
            </a>{' '}
            ({' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
              instagram@{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-3 left-4 z-50 text-xs leading-tight">
        <p>
          <span lang="ko">장혁준</span> Jang Hyukjun
        </p>
        <p className="text-muted-foreground">All Rights Reserved {'©'} 2026</p>
      </footer>

      <IndexOverlay
        open={panel === 'index'}
        projects={projects}
        onClose={closePanel}
        onSelect={selectProject}
      />
      <AboutOverlay open={panel === 'about'} onClose={closePanel} />
    </>
  )
}
