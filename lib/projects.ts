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
  { filename: 'vadsc.jpg', category: 'photography' }, // 01 (메인)
  { filename: '666.jpg', category: 'design' },        // 02
  { filename: '3f.jpg', category: 'photography' },    // 03
  { filename: 'vdvs.jpg', category: 'design' },       // 04
  { filename: '1.jpg', category: 'photography' },     // 05
  { filename: 'ccc.jpg', category: 'design' },        // 06
  { filename: '4.jpg', category: 'photography' },     // 07
  { filename: '_5.jpg', category: 'photography' },    // 08
  { filename: 'gd.jpg', category: 'design' },         // 09
  { filename: 'vscd.jpg', category: 'photography' },   // 10 (파일명 수정: vsdc -> vscd)
  { filename: '3.jpg', category: 'photography' },     // 11
  { filename: 'cvdccc.jpg', category: 'design' },     // 12
  { filename: '2.jpg', category: 'photography' },     // 13
  { filename: 'f.jpg', category: 'design' },          // 14
  { filename: 'v.jpg', category: 'photography' },     // 15
  { filename: '6.jpg', category: 'photography' },     // 16
  { filename: 'dds.jpg', category: 'design' },        // 17
  { filename: 'vddd.jpg', category: 'photography' },  // 18
  { filename: 'vdsdcsa.jpg', category: 'photography' },// 19 (파일명 수정: vsdcsa -> vdsdcsa)
  { filename: 'fdsv.jpg', category: 'design' },       // 20
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