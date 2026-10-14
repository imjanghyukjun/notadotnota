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

// vadsc.jpg를 메인(01번)으로 설정하고 나머지는 무작위 순서로 조합
const rawImageList: { filename: string; category: Category }[] = [
  { filename: 'vadsc.jpg', category: 'photography' }, // 메인
  { filename: '666.jpg', category: 'design' },
  { filename: '3f.jpg', category: 'photography' },
  { filename: 'vdvs.jpg', category: 'design' },
  { filename: '1.jpg', category: 'photography' },
  { filename: 'ccc.jpg', category: 'design' },
  { filename: '4.jpg', category: 'photography' },
  { filename: '_5.jpg', category: 'photography' },
  { filename: 'gd.jpg', category: 'design' },
  { filename: 'vsdc.jpg', category: 'photography' },
  { filename: '3.jpg', category: 'photography' },
  { filename: 'cvdccc.jpg', category: 'design' },
  { filename: '2.jpg', category: 'photography' },
  { filename: 'f.jpg', category: 'design' },
  { filename: 'v.jpg', category: 'photography' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'dds.jpg', category: 'design' },
  { filename: 'vddd.jpg', category: 'photography' },
  { filename: 'vsdcsa.jpg', category: 'photography' },
  { filename: 'fdsv.jpg', category: 'design' },
]

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const numStr = String(idx + 1).padStart(2, '0')
  return {
    slug: `project-${numStr}`,
    title: numStr,
    titleKo: numStr,
    number: numStr,
    category: item.category,
    year: '2026',
    description: '',
    descriptionKo: '',
    image: `/projects/img/${item.filename}`,
    alt: `Project ${numStr}`,
  }
})

export const projects: Project[] = projectData.map((project, i) => ({
  ...project,
  ...LAYOUTS[i % LAYOUTS.length],
}))

/** Eight-home-slide loop for the narrow-width carousel. */
export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)