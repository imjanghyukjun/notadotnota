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

// 새로 정리된 파일명과 시리즈(`d3`, `d7`, `d9`) 구조 반영
const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  // 01번: 디자인 메인 d0.jpg
  { filename: 'd0.jpg', category: 'design' },
  // 02번: 홈페이지 메인 배경 이미지 vadsc.jpg
  { filename: 'vadsc.jpg', category: 'photography' },

  // --- 3번 이후 사진 및 디자인(시리즈 포함) 교차 배치 ---
  { filename: 'd1.jpg', category: 'design' },
  { filename: '3f.jpg', category: 'photography' },
  { filename: 'd2.jpg', category: 'design' },
  { filename: '666.jpg', category: 'photography' },
  { series: ['d3.jpg', 'd3_2.jpg'], category: 'design' },
  { filename: '1.jpg', category: 'photography' },
  { filename: 'd4.jpg', category: 'design' },
  { filename: 'vdvs.jpg', category: 'photography' },
  { filename: 'd5.jpg', category: 'design' },
  { filename: 'ccc.jpg', category: 'photography' },
  { filename: 'd6.jpg', category: 'design' },
  { filename: '_5.jpg', category: 'photography' },
  { series: ['d7_1.jpg', 'd7_2.jpg'], category: 'design' },
  { filename: 'gd.jpg', category: 'photography' },
  { filename: 'd8.jpg', category: 'design' },
  { filename: 'vscd.jpg', category: 'photography' },
  { series: ['d9_1.jpg', 'd9_2.jpg'], category: 'design' },
  { filename: '3.jpg', category: 'photography' },
  { filename: 'd10.jpg', category: 'design' },
  { filename: 'cvdccc.jpg', category: 'photography' },
  { filename: 'd11.jpg', category: 'design' },
  { filename: '2.jpg', category: 'photography' },
  { filename: 'dds.jpg', category: 'design' },
  { filename: 'f.jpg', category: 'photography' },
  { filename: 'v.jpg', category: 'photography' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'vddd.jpg', category: 'photography' },
  { series: ['fdsv.jpg', 'vdsdcsa.jpg'], category: 'photography' },
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

export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)