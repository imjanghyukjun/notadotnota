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
  series?: string[]
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

const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  { filename: 'd0.jpg', category: 'design' },
  { filename: 'vadsc.jpg', category: 'photography' },
  { filename: '3f.jpg', category: 'photography' },
  { filename: 'd2.jpg', category: 'design' },
  { filename: '1.jpg', category: 'photography' },
  { series: ['d3.jpg', 'd3_2.jpg'], category: 'design' },
  { filename: '666.jpg', category: 'photography' },
  { filename: 'd5.jpg', category: 'design' },
  { filename: 'vdvs.jpg', category: 'photography' },
  { filename: 'd1.jpg', category: 'design' },
  { filename: '_5.jpg', category: 'photography' },
  { filename: 'd4.jpg', category: 'design' },
  // 이 항목이 원래 d.13이었던 항목이며, 카테고리만 사진으로 변경했습니다.
  { filename: 'ccc.jpg', category: 'photography' },
  { series: ['d7_1.jpg', 'd7_2.jpg'], category: 'design' },
  { filename: 'vscd.jpg', category: 'photography' },
  { filename: 'd6.jpg', category: 'design' },
  { filename: '3.jpg', category: 'photography' },
  { filename: 'd8.jpg', category: 'design' },
  { filename: 'cvdccc.jpg', category: 'photography' },
  { series: ['d9_1.jpg', 'd9_2.jpg'], category: 'design' },
  { filename: '2.jpg', category: 'photography' },
  { filename: 'd10.jpg', category: 'design' },
  { filename: 'f.jpg', category: 'photography' },
  { filename: 'd11.jpg', category: 'design' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'dds.jpg', category: 'design' },
  { filename: 'v.jpg', category: 'photography' },
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