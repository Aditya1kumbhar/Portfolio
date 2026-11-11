export interface SocialLink {
  label: string
  url: string
}

export interface Profile {
  first_name: string
  last_name: string
  hero_line_1: string
  hero_line_2: string
  role: string
  tagline: string
  bio_short: string
  bio_long: string
  location: string
  email: string
  availability: string
  portrait: string
  portrait_alt: string
  resume_button_label: string
  resume_file: string
  socials: SocialLink[]
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  index: string
  name: string
  subtitle: string
  category: string
  year: string
  description: string
  image: string
  stack: string[]
  links: ProjectLink[]
}

export interface ExpertiseItem {
  index: string
  title: string
  tag: string
  description: string
  tools: string[]
}

export interface Achievement {
  index: string
  title: string
  body: string
  date: string
}

export interface CertificateItem {
  title: string
  issuer: string
  year: string
  image: string
  verify_url: string | null
}

export interface CertificatesData {
  items: CertificateItem[]
}

export interface ExperienceEntry {
  role: string
  organisation: string
  period: string
  note: string
}

export interface Education {
  degree: string
  institution: string
  period: string
  detail: string
}

export interface Language {
  name: string
  level: string
}

export interface SiteConfig {
  canonicalUrl: string
  title: string
  description: string
  ogImage: string
}

export const SITE_CONFIG: SiteConfig = {
  canonicalUrl: 'https://adityakumbhar.vercel.app',
  title: 'Aditya Kumbhar - Full-Stack Developer and AI/ML Builder, Pune',
  description: 'Portfolio of Aditya Kumbhar, a Pune-based full-stack developer and AI/ML builder. Creator of ORCA Tarang, VitalGuard C3, SevaCare, and RateIT. Open to internships.',
  ogImage: '/images/og.jpg',
}

export const profile: Profile = {
  first_name: 'Aditya',
  last_name: 'Kumbhar',
  hero_line_1: 'ADITYA',
  hero_line_2: 'KUMBHAR',
  role: 'Full-Stack Developer and AI/ML Builder',
  tagline: 'Building software that takes care of people.',
  bio_short: 'Third-year B.Sc. Computer Applications student at Sarhad College, Pune (SPPU), graduating 2028. I design, build, and ship complete products on my own: an Edge AI health band, an offline-first elderly care app, a multi-agent marine safety system used for fishing harbours, and a verified local reviews platform. Four products, all live in production.',
  bio_long: "I am a builder first. My work sits where software meets care: VitalGuard C3 watches over elderly people with on-device fall detection, SevaCare helps caregivers work without internet, and ORCA Tarang tells fishing crews when the sea is not safe, in ten Indian languages. I lead Team RISE-A2S1, serve as a Student Representative on my college Technical Club, and presented a research paper at an international interdisciplinary conference while still an undergraduate. My next step is a Master's in Software Engineering in Germany in 2028, and internships that let me ship real product until then.",
  location: 'Pune, India',
  email: 'adityakumbhar038@gmail.com',
  availability: 'Open to Internships',
  portrait: '/images/portrait.jpg',
  portrait_alt: 'Portrait of Aditya Kumbhar',
  resume_button_label: 'Download Resume',
  resume_file: '/resume.pdf',
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/adityakumbhar',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/Aditya1kumbhar',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/adii.dmg',
    },
    {
      label: 'X',
      url: 'https://x.com/aadityakumbhar7',
    },
    {
      label: 'Email',
      url: 'mailto:adityakumbhar038@gmail.com',
    },
  ],
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'ORCA / Tarang',
    subtitle: 'Multi-Agent Marine Safety System',
    category: 'AI for Climate Change, SDG 13',
    year: '2026',
    description: 'A 7-agent system that tells fishing crews whether it is safe to sail. A deterministic circuit breaker computes the safety index from wave height, wind, swell, and storm energy, and locks the verdict before any AI writes a word. The writer, an open model domain-aligned on the Nugen platform with our own marine corpus, then explains the verdict in 10 Indian languages. Built by Team RISE-A2S1, which I lead, for PCCOE IGC 2026 Indradhanu: Round 1 cleared, Round 2 prototype film submitted.',
    image: '/images/project-tarang.jpg',
    stack: [
      'FastAPI',
      'React',
      'Python',
      'Multi-Agent Systems',
      'Nugen',
      'Open-Meteo',
      'NOAA ERDDAP',
    ],
    links: [
      {
        label: 'Live App',
        url: 'https://tarang-0v0t.onrender.com',
      },
      {
        label: 'Watch the Film',
        url: 'https://youtu.be/vCWhOiF7k-4',
      },
      {
        label: 'Code',
        url: 'https://github.com/Aditya1kumbhar/Tarang',
      },
    ],
  },
  {
    index: '02',
    name: 'VitalGuard C3',
    subtitle: 'Screenless Edge AI Wristband for Elderly Care',
    category: 'Edge AI, Healthcare',
    year: '2026',
    description: 'A screenless wristband that detects falls and monitors heart rate and SpO2, with every computation running on the device itself. No cloud, no subscription, no data leaving the band. My final-year project and my entry to the electronica India Tech Challenge 2026.',
    image: '/images/project-vitalguard.jpg',
    stack: [
      'ESP32',
      'C++',
      'MAX30102',
      'MPU6050',
      'scikit-learn',
      'On-Device ML',
    ],
    links: [
      {
        label: 'Live Dashboard',
        url: 'https://vitalguard-c3.vercel.app',
      },
      {
        label: 'Code',
        url: 'https://github.com/Aditya1kumbhar/vitalguard-c3',
      },
    ],
  },
  {
    index: '03',
    name: 'SevaCare',
    subtitle: 'Offline-First Elderly Care PWA',
    category: 'Healthcare, PWA',
    year: '2026',
    description: 'A progressive web app for elderly care that works fully offline and syncs when a connection returns, designed for real care homes with unreliable internet. Piloted at an old-age home in Pune.',
    image: '/images/project-sevacare.jpg',
    stack: [
      'Next.js',
      'Supabase',
      'Dexie / IndexedDB',
      'PWA',
    ],
    links: [
      {
        label: 'Live App',
        url: 'https://seva-care-db.vercel.app',
      },
      {
        label: 'Code',
        url: 'https://github.com/Aditya1kumbhar/SevaCare',
      },
    ],
  },
  {
    index: '04',
    name: 'RateIT',
    subtitle: 'Hyperlocal Verified Review Platform',
    category: 'Consumer Platform',
    year: '2025',
    description: 'Reviews you can trust because they are verified twice: a GPS check-in proves you were there, and photo EXIF data proves the photo is real. Built for the places students actually argue about: hostels, messes, cafes, and services near campus.',
    image: '/images/project-rateit.jpg',
    stack: [
      'Next.js',
      'Prisma',
      'PostgreSQL',
      'Supabase Auth',
    ],
    links: [
      {
        label: 'Live App',
        url: 'https://rateit-platform.vercel.app',
      },
      {
        label: 'Code',
        url: 'https://github.com/Aditya1kumbhar/rateit-platform',
      },
    ],
  },
]

export const expertise: ExpertiseItem[] = [
  {
    index: '01',
    title: 'Full-Stack Web Development',
    tag: 'Core craft',
    description: 'Complete web products from database to interface: responsive frontends, typed APIs, auth, and production deployment.',
    tools: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Supabase',
      'Tailwind CSS',
    ],
  },
  {
    index: '02',
    title: 'AI and Machine Learning',
    tag: 'Applied AI',
    description: 'Practical ML and multi-agent systems that run in production: risk scoring, fall detection models, and language models aligned on domain data.',
    tools: [
      'Python',
      'scikit-learn',
      'LightGBM',
      'FastAPI',
      'Multi-Agent Systems',
      'LLM Integration',
      'Nugen Domain Alignment',
    ],
  },
  {
    index: '03',
    title: 'Edge AI and IoT',
    tag: 'On-device',
    description: 'Intelligence that runs fully on the device, with no cloud dependency: sensor fusion, on-device inference, and low-power wearable design.',
    tools: [
      'ESP32',
      'MAX30102',
      'MPU6050',
      'C / C++',
      'Sensor Fusion',
      'On-Device Inference',
    ],
  },
  {
    index: '04',
    title: 'Product Engineering',
    tag: 'Ship and harden',
    description: 'Offline-first architecture, security hardening, and the unglamorous work that keeps a live product trustworthy.',
    tools: [
      'Offline-First PWAs',
      'IndexedDB / Dexie',
      'Security Headers',
      'Vercel',
      'Render',
      'Git and GitHub',
    ],
  },
]

export const achievements: Achievement[] = [
  {
    index: '01',
    title: 'Runner-Up, 2nd Place',
    body: 'Smart India Hackathon 2025, College Level',
    date: '2025',
  },
  {
    index: '02',
    title: 'Round 2 Submitted, Round 1 Cleared',
    body: 'PCCOE IGC 2026, Indradhanu, Team RISE-A2S1',
    date: 'Nov 2026',
  },
  {
    index: '03',
    title: 'Selected Representative',
    body: 'Avishkar Innovation Competition, for RateIT',
    date: '2025-26',
  },
  {
    index: '04',
    title: 'Research Paper Presented',
    body: '26th International Interdisciplinary Conference (BRICS World of Traditions), held at Pune',
    date: 'Feb 2025',
  },
]

export const certificates: CertificatesData = {
  items: [
    {
      title: 'Research Paper Presentation: Analyzing the Journey of Gukesh Dommaraju in Chess',
      issuer: 'BRICS World of Traditions (Moscow), with Sarhad and Snehavardhan Research Institute, Pune',
      year: '2025',
      image: '/images/cert-brics.jpg',
      verify_url: null,
    },
  ],
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Team Leader',
    organisation: 'Team RISE-A2S1, PCCOE IGC 2026',
    period: 'Jun 2026 - Present',
    note: 'Leading the ORCA / Tarang build and the team\'s competition run.',
  },
  {
    role: 'Student Representative',
    organisation: 'Technical Club, Sarhad College',
    period: '2026 - Present',
    note: 'Committee role for the college technical community.',
  },
  {
    role: 'Project Developer (Independent)',
    organisation: 'VitalGuard C3, SevaCare, ORCA / Tarang',
    period: 'Sep 2026 - Present',
    note: 'Self-directed product builds, designed, built, deployed, and maintained solo.',
  },
]

export const education: Education = {
  degree: 'B.Sc. Computer Applications (Honours with Research)',
  institution: 'Sarhad College, Savitribai Phule Pune University',
  period: '2024 - 2028',
  detail: 'CGPA 8.62 through Semester 4. Final year completed as Honours with Research under NEP.',
}

export const languages: Language[] = [
  {
    name: 'English',
    level: 'Professional working',
  },
  {
    name: 'Hindi',
    level: 'Native',
  },
  {
    name: 'Marathi',
    level: 'Native',
  },
  {
    name: 'German',
    level: 'Elementary, A1 in progress',
  },
]

export const statsMarquee: string[] = [
  '4 Live Products',
  '8.62 CGPA',
  '7-Agent AI System Built',
  'Full-Stack and AI/ML Builder',
  '1 Research Paper Presented',
  'Team Leader, RISE-A2S1',
]
