export type Category = 'design' | 'photography'

export const categoryLabels: Record<Category, { ko: string; en: string }> = {
  design: { ko: '그래픽 디자인', en: 'Graphic Design' },
  photography: { ko: '사진', en: 'Photography' },
}

export type Project = {
  slug: string
  title: string
  titleKo: string
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
  { maxWidth: 980, aspectRatio: '3 / 4' },
  { maxWidth: 1120, aspectRatio: '5 / 4' },
]

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = [
  {
    slug: 'form-and-counterform',
    title: 'Form & Counterform',
    titleKo: '형과 여백',
    category: 'design',
    year: '2026',
    description:
      'A typographic poster series exploring the tension between letterform and negative space, printed in two spot colours for a group exhibition in Seoul.',
    descriptionKo: '글자의 형태와 여백 사이의 긴장을 탐구한 타이포그래피 포스터 연작.',
    image: '/projects/typographic-poster.png',
    alt: 'Typographic posters with red and blue geometric shapes hung on a concrete wall',
  },
  {
    slug: 'evening-euljiro',
    title: 'Evening, Euljiro',
    titleKo: '을지로의 저녁',
    category: 'photography',
    year: '2025',
    description:
      'Quiet hours in the old printing district — a study of lamplight, rain, and the solitary figures who move through the alleys after dusk.',
    descriptionKo: '오래된 인쇄 골목의 조용한 시간, 불빛과 비, 그리고 홀로 걷는 사람들.',
    image: '/projects/seoul-dusk.png',
    alt: 'A lone figure with an umbrella in a Seoul alley lit by warm shop lights at dusk',
  },
  {
    slug: 'dawon-tea-house',
    title: 'Dawon Tea House',
    titleKo: '다원 찻집',
    category: 'design',
    year: '2025',
    description:
      'Complete identity for a specialty tea house: logotype, stationery, and packaging drawn from the textures of hand-pressed paper and fired clay.',
    descriptionKo: '한지와 도자기의 질감에서 출발한 찻집의 브랜드 아이덴티티.',
    image: '/projects/brand-identity.png',
    alt: 'Flat lay of tea house brand identity with business cards, packaging, and letterhead',
  },
  {
    slug: 'basalt',
    title: 'Basalt',
    titleKo: '현무암',
    category: 'photography',
    year: '2024',
    description:
      'Long exposures along the volcanic coastline of Jeju, where black stone meets water in slow, repeating gestures.',
    descriptionKo: '검은 돌과 물이 천천히 만나는 제주 해안의 장노출 사진.',
    image: '/projects/jeju-coast.png',
    alt: 'Black volcanic rocks along a turquoise coastline at golden hour',
  },
  {
    slug: 'still-season',
    title: 'Still Season',
    titleKo: '고요한 계절',
    category: 'design',
    year: '2024',
    description:
      'Editorial design for a 240-page artist monograph — a restrained grid, generous margins, and plates given room to breathe.',
    descriptionKo: '절제된 그리드와 넉넉한 여백으로 구성한 240쪽 작가 모노그래프.',
    image: '/projects/monograph-book.png',
    alt: 'Open monograph book showing a photograph of yellow flowers beside a text page',
  },
  {
    slug: 'hands-of-clay',
    title: 'Hands of Clay',
    titleKo: '흙의 손',
    category: 'photography',
    year: '2023',
    description:
      'Portraits of ceramic artists in their studios, made in natural light over a single winter.',
    descriptionKo: '한 겨울 동안 자연광 아래에서 기록한 도예가들의 작업실 초상.',
    image: '/projects/studio-portrait.png',
    alt: 'Ceramic artist in her workshop holding a glazed blue bowl',
  },
]

export const projects: Project[] = projectData.map((project, i) => ({
  ...project,
  ...LAYOUTS[i % LAYOUTS.length],
}))

/** Eight-home-slide loop for the narrow-width carousel. */
export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)
