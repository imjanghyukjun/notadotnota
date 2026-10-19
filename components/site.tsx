'use client'

import { useCallback, useState, useEffect } from 'react'
import { projects, Project } from '@/lib/projects'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact'
import { IndexOverlay } from '@/components/index-overlay'
import { AboutOverlay } from '@/components/about-overlay'
import { HomeCarousel } from '@/components/home-carousel'
import ProjectDetailPanel from '@/components/project-detail-panel'

type Panel = 'none' | 'photography' | 'design' | 'about'

export function Site() {
  const [panel, setPanel] = useState<Panel>('none')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 0: 이름, 1: 사진, 2: 그래픽디자인, 3: 4초 휴식 중
  const [step, setStep] = useState<number>(0)
  const [isGreen, setIsGreen] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (panel === 'none' && !selectedProject) {
      if (step === 0 || step === 1 || step === 2) {
        setIsGreen(true)
        timer = setTimeout(() => {
          setIsGreen(false)
          timer = setTimeout(() => {
            if (step < 2) {
              setStep(prev => prev + 1)
            } else {
              setStep(3)
            }
          }, 800)
        }, 800)
      } else if (step === 3) {
        timer = setTimeout(() => {
          setStep(0)
        }, 4000)
      }
    }

    return () => clearTimeout(timer)
  }, [step, panel, selectedProject])

  const closeAll = useCallback(() => {
    setPanel('none')
    setSelectedProject(null)
  }, [])

  const closeDetail = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const selectProject = useCallback((slug: string) => {
    const found = projects.find((p) => p.slug === slug)
    if (found) {
      setSelectedProject(found)
    }
  }, [])

  const filteredProjects =
    panel === 'photography'
      ? projects.filter((p) => p.category === 'photography')
      : panel === 'design'
      ? projects.filter((p) => p.category === 'design')
      : projects

  const overlayTitle =
    panel === 'photography'
      ? { ko: '사진', en: 'Photography' }
      : { ko: '그래픽 디자인', en: 'Graphic Design' }

  const isDetailView = selectedProject !== null

  const detailCategoryLabel =
    selectedProject?.category === 'photography' || panel === 'photography'
      ? { ko: '사진', en: 'Photography' }
      : { ko: '그래픽 디자인', en: 'Graphic Design' }

  const currentCategoryProjects = selectedProject
    ? projects.filter(p => p.category === selectedProject.category)
    : []
  const selectedProjectIndex = selectedProject
    ? currentCategoryProjects.findIndex(p => p.slug === selectedProject.slug)
    : -1
  
  const projectPrefix = selectedProject?.category === 'photography' ? 'p' : 'd'
  const formattedProjectNumber = selectedProject?.number 
    ? `${projectPrefix}.${selectedProject.number}` 
    : ''

  const getBlinkStyle = (itemIdx: number) => {
    const active = (panel === 'none' && !selectedProject && step === itemIdx && isGreen)
    return {
      color: active ? 'rgb(0, 255, 0)' : 'inherit',
      transition: 'color 0.8s ease-in-out',
    }
  }

  const getMobileItemStyle = (itemKey: 'about' | 'photography' | 'design', itemIdx: number) => {
    if (panel === itemKey) {
      return { color: 'rgb(0, 255, 0)', transition: 'color 0.3s ease' }
    }
    if (panel === 'none' && !selectedProject && step === itemIdx && isGreen) {
      return { color: 'rgb(0, 255, 0)', transition: 'color 0.8s ease-in-out' }
    }
    return { color: 'inherit', transition: 'color 0.3s ease' }
  }

  return (
    <>
      <main className="h-svh w-full overflow-hidden md:h-screen relative">
        <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
        <HomeCarousel paused={panel !== 'none' || isDetailView} />

        {/* 2. 인덱스 오버레이 */}
        <IndexOverlay
          open={panel === 'photography' || panel === 'design'}
          projects={filteredProjects}
          title={overlayTitle}
          onClose={closeAll}
          onSelect={selectProject}
        />

        {/* 3. 50:50 분할 디테일 오버레이 패널 */}
        <div
          className={`fixed inset-0 z-50 bg-white/97 transition-opacity duration-300 ease-out ${
            isDetailView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isDetailView}
        >
          {isDetailView && (
            <>
              {/* 최상단 헤더 */}
              <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between py-3 px-2 md:px-4 bg-transparent mix-blend-difference text-white leading-snug pointer-events-none">
                <h2 className="text-[15px] font-normal tracking-normal pointer-events-auto pr-2">
                  <button 
                    type="button" 
                    onClick={closeAll}
                    className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
                  >
                    <span lang="ko">장혁준</span> Jang Hyukjun
                  </button>
                  {' ( '}
                  <button
                    type="button"
                    onClick={() => {
                      const targetCategory = selectedProject?.category || (panel === 'photography' ? 'photography' : 'design')
                      setSelectedProject(null)
                      setPanel(targetCategory)
                    }}
                    className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
                  >
                    <span lang="ko">{detailCategoryLabel.ko}</span> {detailCategoryLabel.en}
                  </button>
                  {' ( '}
                  <span>{formattedProjectNumber}</span>
                </h2>
                <button 
                  type="button"
                  onClick={closeDetail}
                  className="hover:opacity-50 ml-auto cursor-pointer text-[15px] font-normal leading-snug text-white pointer-events-auto shrink-0"
                >
                  (Close)
                </button>
              </header>

              {/* 50:50 레이아웃 */}
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
                {/* [좌측 50%] cursor-default로 기본 마우스 커서 적용 */}
                <div 
                  className="w-full h-full overflow-y-auto bg-white grid grid-cols-1 md:grid-cols-2 pt-3 pb-10 text-black leading-snug font-normal cursor-default"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) closeDetail()
                  }}
                >
                  {/* 왼쪽 구역 (비워둠) */}
                  <div className="hidden md:block"></div>

                  {/* 오른쪽 구역의 좌상단 배치 */}
                  <div className="px-2 md:px-4 flex flex-col items-start text-left">
                    <div className="whitespace-pre-wrap select-text w-full space-y-4">
                      {selectedProject.titleKo || selectedProject.title ? (
                        <p className="font-bold text-[15px]">{selectedProject.titleKo || selectedProject.title}</p>
                      ) : null}
                      {selectedProject.year ? (
                        <p className="text-[15px]">{selectedProject.year}</p>
                      ) : null}
                      {selectedProject.descriptionKo || selectedProject.description ? (
                        <p className="text-[15px]">{selectedProject.descriptionKo || selectedProject.description}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* [우측 50%] 스크롤 시 (Close) 버튼 상단선 위로 올라가지 못하도록 pt-3 한계 세팅 */}
                <div className="w-full h-full overflow-y-auto bg-white/97 border-l border-gray-100/50 pt-3">
                  <ProjectDetailPanel
                    images={selectedProject.series && selectedProject.series.length > 0 ? selectedProject.series : [selectedProject.image]}
                    onClose={closeDetail}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 4. 메인 메뉴 바 */}
      {!isDetailView && (
        <div className="pointer-events-none fixed inset-x-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
          {panel === 'none' && (
            <div className="pointer-events-auto hidden bg-background px-0.5 text-balance md:block font-normal">
              <button 
                type="button" 
                onClick={() => { setSelectedProject(null); setPanel('about'); }} 
                style={getBlinkStyle(0)}
                className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
              >
                <span lang="ko">장혁준</span> Jang Hyukjun
              </button>{' '}
              ({' '}
              <button 
                type="button" 
                onClick={() => { setSelectedProject(null); setPanel('photography'); }} 
                style={getBlinkStyle(1)}
                className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
              >
                <span lang="ko">사진</span> Photography
              </button>{' '}
              ({' '}
              <button 
                type="button" 
                onClick={() => { setSelectedProject(null); setPanel('design'); }} 
                style={getBlinkStyle(2)}
                className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
              >
                <span lang="ko">그래픽 디자인</span> Graphic Design
              </button>{' '}
              ({' '}
              <a href={`mailto:${EMAIL}`} className="hover:opacity-50 transition-opacity underline underline-offset-4 decoration-transparent hover:decoration-current">
                {EMAIL}
              </a>{' '}
              ({' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity underline underline-offset-4 decoration-transparent hover:decoration-current">
                instagram@{INSTAGRAM_HANDLE}
              </a>
            </div>
          )}

          <div className="pointer-events-auto flex items-center justify-center text-[12px] leading-none md:hidden">
            <div className="inline-block bg-background px-0.5 py-0.5 whitespace-nowrap leading-none text-black">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                  setPanel(prev => prev === 'about' ? 'none' : 'about')
                }}
                style={getMobileItemStyle('about', 0)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
              >
                <span lang="ko">장혁준</span> Jang Hyukjun
              </button>{' '}
              ({' '}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                  setPanel(prev => prev === 'photography' ? 'none' : 'photography')
                }}
                style={getMobileItemStyle('photography', 1)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
              >
                <span lang="ko">사진</span> Photography
              </button>{' '}
              ({' '}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                  setPanel(prev => prev === 'design' ? 'none' : 'design')
                }}
                style={getMobileItemStyle('design', 2)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
              >
                <span lang="ko">그래픽 디자인</span> Graphic Design
              </button>
            </div>
          </div>
        </div>
      )}

      <AboutOverlay open={panel === 'about'} onClose={closeAll} />
    </>
  )
}