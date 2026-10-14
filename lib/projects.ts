export type Category = 'design' | 'photography'

export const categoryLabels: Record<Category, { ko: string; en: string }> = {
  design: { ko: '그래픽 디자인', en: 'Graphic Design' },
  photography: { ko: '사진', en: 'Photography' },
}

export type Project = {
  slug: string
  title: string
  titleKo: string
  number: string
  category: Category
  year: string
  description: string
  descriptionKo: string
  image: string
  series?: string[] // 시리즈 이미지 목록 지원
  alt: string
  maxWidth: number
  aspectRatio: string
}

const LAYOUTS: Pick<Project, 'maxWidth' | 'aspectRatio'>[] = [
  { maxWidth: 1120, aspectRatio: '4 / 5' },
  { maxWidth: 1240, aspectRatio: '3 / 2' },
  { maxWidth: 1040, aspectRatio: '1 / 1' },
  { maxWidth: 1180, aspectRatio: '16 / 10' },
]

// vadsc.jpg를 메인(01번)으로 설정
const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  { filename: 'vadsc.jpg', category: 'photography' }, // 01 (메인)
  { filename: '666.jpg', category: 'design' },        // 02
  { filename: '3f.jpg', category: 'photography' },    // 03
  { filename: 'vdvs.jpg', category: 'design' },       // 04
  { filename: '1.jpg', category: 'photography' },     // 05
  { filename: 'ccc.jpg', category: 'design' },        // 06
  { filename: '4.jpg', category: 'photography' },     // 07
  { filename: '_5.jpg', category: 'photography' },    // 08
  { filename: 'gd.jpg', category: 'design' },         // 09
  { filename: 'vscd.jpg', category: 'photography' },   // 10
  { filename: '3.jpg', category: 'photography' },     // 11
  { filename: 'cvdccc.jpg', category: 'design' },     // 12
  { filename: '2.jpg', category: 'photography' },     // 13
  { filename: 'f.jpg', category: 'design' },          // 14
  { filename: 'v.jpg', category: 'photography' },     // 15
  { filename: '6.jpg', category: 'photography' },     // 16
  { filename: 'dds.jpg', category: 'design' },        // 17
  { filename: 'vddd.jpg', category: 'photography' },  // 18
  // 19번: 시리즈 작업 (첫 사진: 기존 20번 fdsv.jpg, 두번째: 기존 19번 vdsdcsa.jpg)
  { series: ['fdsv.jpg', 'vdsdcsa.jpg'], category: 'design' }, // 19
]

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const numStr = String(idx + 1).padStart(2, '0')
  const isSeries = Boolean(item.series && item.series.length > 0)
  const mainImage = isSeries ? `/projects/img/${item.series![0]}` : `/projects/img/${item.filename}`
  const seriesImages = isSeries ? item.series!.map((f) => `/projects/img/${f}`) : undefined

  return {
    slug: `project-${numStr}`,
    title: numStr,
    titleKo: numStr,
    number: numStr,
    category: item.category,
    year: '2026',
    description: '',
    descriptionKo: '',
    image: mainImage,
    series: seriesImages,
    alt: `Project ${numStr}`,
  }
})

export const projects: Project[] = projectData.map((project, i) => ({
  ...project,
  ...LAYOUTS[i % LAYOUTS.length],
}))

/** Eight-home-slide loop for the narrow-width carousel. */
export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)