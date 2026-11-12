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

export interface ProofItem {
  value: string
  label: string
}

export interface CaseStudy {
  role: string
  lede: string
  problem: string[]
  built: string[]
  proof: ProofItem[]
}

export interface Project {
  index: string
  slug: string
  name: string
  subtitle: string
  category: string
  year: string
  description: string
  image: string
  stack: string[]
  links: ProjectLink[]
  caseStudy: CaseStudy
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
  ogImage: '/og-cover.jpg',
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
    slug: 'orca-tarang',
    name: 'ORCA / Tarang',
    subtitle: 'Multi-Agent Marine Safety System',
    category: 'AI for Climate Change, SDG 13',
    year: '2026',
    description: 'A 7-agent system that tells fishing crews whether it is safe to sail. A deterministic circuit breaker computes the safety index from wave height, wind, swell, and storm energy, and locks the verdict before any AI writes a word. The writer, an open model domain-aligned on the Nugen platform with our own marine corpus, then explains the verdict in 10 Indian languages. Built by Team RISE-A2S1, which I lead, for PCCOE IGC 2026 Indradhanu: Round 1 cleared, Round 2 prototype film submitted.',
    image: '/images/project-tarang.webp',
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
    caseStudy: {
      role: 'Team Leader, RISE-A2S1 (team of 3)',
      lede: 'A 7-agent system that tells fishing crews whether it is safe to sail, and explains why, in 10 Indian languages.',
      problem: [
        'Small-scale fishing crews still decide whether to sail on gut feel and harbour gossip. Sea state can turn lethal within hours, and a wrong call costs boats, gear, and lives.',
        'Weather apps do not solve this. They show raw wave and wind numbers and leave a crew to interpret them at 4 in the morning. What a crew actually needs is a verdict they can trust: go, caution, or do not sail, with the reason stated plainly in their own language.',
      ],
      built: [
        'A deterministic safety engine computes the index from wave height (35%), wind (25%), swell (20%) and storm energy (CAPE, 20%). A circuit breaker can force the index into the danger zone and lock the verdict before any AI writes a word.',
        'Seven agents share one typed state: a planner, three parallel specialists for weather hazard, ocean analytics and fishing productivity, a geospatial agent, the safety circuit breaker, and a synthesis agent that explains the locked verdict.',
        'The synthesis writer runs a deterministic template first, then an open model (Qwen 2.5 1.5B Instruct) domain-aligned on the Nugen platform with our own marine corpus, then Gemini, with the template as the final fallback. No writer can change the verdict, only explain it.',
        'Live data comes from Open-Meteo marine and forecast APIs and NOAA ERDDAP potential fishing zone data (sea surface temperature and chlorophyll). When a feed fails, the app falls back to a clearly labelled climatology snapshot, never a silent fake.',
        'Access is Google sign-in plus an email allowlist. The app serves 12 Indian harbours and explains every verdict in 10 Indian languages.',
      ],
      proof: [
        { value: '7', label: 'Agents in one pipeline' },
        { value: '119', label: 'Automated tests passing' },
        { value: '20/20', label: 'Benchmark answers verified by the team' },
        { value: '10', label: 'Indian languages supported' },
      ],
    },
  },
  {
    index: '02',
    slug: 'vitalguard-c3',
    name: 'VitalGuard C3',
    subtitle: 'Screenless Edge AI Wristband for Elderly Care',
    category: 'Edge AI, Healthcare',
    year: '2026',
    description: 'A screenless wristband that detects falls and monitors heart rate and SpO2, with every computation running on the device itself. No cloud, no subscription, no data leaving the band. My final-year project and my entry to the electronica India Tech Challenge 2026.',
    image: '/images/project-vitalguard.webp',
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
    caseStudy: {
      role: 'Solo build, final-year project',
      lede: 'A screenless wristband that detects falls and watches heart rate and SpO2, with every computation running on the band itself.',
      problem: [
        'An elderly person living alone who falls can lie undiscovered for hours. The products meant to help ask too much of them: smartwatches need daily charging, a touchscreen, an account and a subscription, and pendant alarms only work if the wearer is conscious enough to press the button.',
        'VitalGuard C3 is designed around the opposite idea: no screen to operate, no phone to pair, no cloud account, nothing to remember. The band watches quietly and raises the alarm itself.',
      ],
      built: [
        'Hardware: a Seeed XIAO ESP32-C3-class board with a MAX30102 optical sensor for heart rate and SpO2, an MPU6050 for motion, a buzzer and LED for local alerts, and a 400 mAh LiPo cell.',
        'Fall detection runs in three stages on the device: a free-fall below 0.4g, an impact above 2.5g, then a stillness check. Only a sequence that matches a real fall raises the alarm, which keeps false alerts down.',
        'A heart-rate-variability check watches for irregular heart patterns between the fall checks.',
        'Models are trained in Python with scikit-learn and LightGBM and converted for on-device inference. An optional Web Bluetooth dashboard shows live telemetry to family or caregivers nearby.',
        'There is deliberately no cloud backend. Vitals never leave the band and the wearer\'s home.',
      ],
      proof: [
        { value: '0', label: 'Cloud services. Everything runs on the band' },
        { value: '3', label: 'Stages in the fall check: free-fall, impact, stillness' },
        { value: '2', label: 'Sensors: MAX30102 vitals, MPU6050 motion' },
        { value: '2026', label: 'electronica India Tech Challenge entry' },
      ],
    },
  },
  {
    index: '03',
    slug: 'sevacare',
    name: 'SevaCare',
    subtitle: 'Offline-First Elderly Care PWA',
    category: 'Healthcare, PWA',
    year: '2026',
    description: 'A progressive web app for elderly care that works fully offline and syncs when a connection returns, designed for real care homes with unreliable internet. Piloted at an old-age home in Pune.',
    image: '/images/project-sevacare.webp',
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
    caseStudy: {
      role: 'Solo build',
      lede: 'An offline-first care log for elderly care homes, piloted in a real old-age home in Pune.',
      problem: [
        'Care homes run on paper registers and staff memory. Shift handovers leak information, records get lost, and there is no single place to see how a resident is doing today.',
        'Most software makes it worse, because it assumes good internet. In a real care facility the connection is unreliable, and a tool that stops working offline stops being used at all.',
      ],
      built: [
        'A progressive web app built with Next.js and Supabase, with Dexie and IndexedDB holding a full local copy of the data on the device.',
        'Every workflow works offline: resident census, care log entries for meals and medication, personnel on duty, and active alerts. When a connection returns, the app syncs on its own.',
        'The facility overview puts the four numbers a manager needs on one screen: residents, log entries, personnel active, and alerts that need attention.',
        'Log entries carry simple status markers (optimal, fair, poor) so a handover takes seconds to scan.',
      ],
      proof: [
        { value: '1', label: 'Real old-age home pilot, Pune' },
        { value: '0', label: 'Connection needed for daily logging' },
        { value: '4', label: 'Facility stats on one screen' },
        { value: '2', label: 'Layers: local IndexedDB, Supabase sync' },
      ],
    },
  },
  {
    index: '04',
    slug: 'rateit',
    name: 'RateIT',
    subtitle: 'Hyperlocal Verified Review Platform',
    category: 'Consumer Platform',
    year: '2025',
    description: 'Reviews you can trust because they are verified twice: a GPS check-in proves you were there, and photo EXIF data proves the photo is real. Built for the places students actually argue about: hostels, messes, cafes, and services near campus.',
    image: '/images/project-rateit.webp',
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
    caseStudy: {
      role: 'Solo build',
      lede: 'A review platform where a review only counts if you physically went there.',
      problem: [
        'Students pick hostels, messes and cafes from ratings they cannot trust. Paid reviews and drive-by fakes flood every platform, and the places students argue about most, the ones near campus, are the worst affected.',
        'RateIT changes the rule: a review is only accepted when the platform can prove the reviewer was actually there, twice over.',
      ],
      built: [
        'Full-stack Next.js 14 with Prisma and PostgreSQL, Supabase Auth, API routes, rate limiting and Cloudflare Turnstile against bots.',
        'First proof: a GPS check-in inside a 200 metre geofence of the place. Second proof: the photo\'s EXIF data must agree. Both checks must pass before a review can be posted.',
        'Rankings use Bayesian shrinkage, so a place with two five-star reviews cannot outrank a place with two hundred honest ones.',
        'Built for the hubs students actually live in: FC Road cafes, Kothrud coaching, Hinjewadi PGs and Viman Nagar.',
      ],
      proof: [
        { value: '200m', label: 'GPS geofence radius' },
        { value: '2', label: 'Proofs per review: GPS and EXIF' },
        { value: '4', label: 'Pune student hubs covered' },
        { value: 'Live', label: 'Deployed and public' },
      ],
    },
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
