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

  // 현재 필터링된 카테고리 내에서 선택된 프로젝트의 정확한 1부터 시작하는 순번 계산
  const currentCategoryProjects = selectedProject
    ? projects.filter(p => p.category === selectedProject.category)
    : []
  const selectedProjectIndex = selectedProject
    ? currentCategoryProjects.findIndex(p => p.slug === selectedProject.slug)
    : -1
  
  const projectPrefix = selectedProject?.category === 'photography' ? 'p' : 'd'
  const formattedProjectNumber = selectedProjectIndex !== -1 
    ? `${projectPrefix}.${String(selectedProjectIndex + 1).padStart(2, '0')}` 
    : ''

  // PC 및 홈 화면 점멸 스타일에 사용되는 함수
  const getBlinkStyle = (itemIdx: number) => {
    const active = (panel === 'none' && !selectedProject && step === itemIdx && isGreen)
    return {
      color: active ? 'rgb(0, 255, 0)' : 'inherit',
      transition: 'color 0.8s ease-in-out',
    }
  }

  // 모바일 전용: 활성화된 상태에 따른 g255(초록색) 강조 스타일 계산
  const getMobileItemStyle = (itemKey: 'about' | 'photography' | 'design', itemIdx: number) => {
    // 1. 특정 패널이 열려있는 경우 해당 항목에 g255 강조
    if (panel === itemKey) {
      return { color: 'rgb(0, 255, 0)', transition: 'color 0.3s ease' }
    }
    // 2. 홈 화면(panel === 'none')인 경우 기존 깜빡임 모션 유지
    if (panel === 'none' && !selectedProject && step === itemIdx && isGreen) {
      return { color: 'rgb(0, 255, 0)', transition: 'color 0.8s ease-in-out' }
    }
    // 3. 그 외 기본 상태는 블랙/기본색 유지
    return { color: 'inherit', transition: 'color 0.3s ease' }
  }

  return (
    <>
      <main className="h-svh w-full overflow-hidden md:h-screen relative">
        <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
        <HomeCarousel paused={panel !== 'none' || isDetailView} />

        {/* 2. 사진/그래픽 디자인 인덱스 오버레이 */}
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

              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
                <div 
                  className="hidden md:block w-full h-full bg-white/97 cursor-pointer"
                  onClick={closeDetail}
                />
                <div className="w-full h-full overflow-y-auto bg-white/97 border-l border-gray-100/50 pt-0">
                  <ProjectDetailPanel
                    title={selectedProject.titleKo || selectedProject.title}
                    year={selectedProject.year}
                    description={selectedProject.descriptionKo || selectedProject.description}
                    projectNumber={formattedProjectNumber}
                    images={selectedProject.series && selectedProject.series.length > 0 ? selectedProject.series : [selectedProject.image]}
                    onClose={closeDetail}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 4. 중앙 메인 메뉴 바 */}
      {!isDetailView && (
        <div className="pointer-events-none fixed inset-x-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
          {/* 데스크톱(PC) 레이아웃 */}
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

          {/* 모바일 레이아웃 */}
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

      {/* 어바웃 오버레이 */}
      <AboutOverlay open={panel === 'about'} onClose={closeAll} />
    </>
  )
}