import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { AudienceCapture } from '@/components/AudienceCapture'
import { BookmarkButton } from '@/components/BookmarkButton'
import { essays } from '@/data/essays'

export function generateStaticParams() {
  const pillars = [
    'mind-consciousness',
    'physical-universe-complexity',
    'technology-ai-agency',
    'society-history',
    'culture-aesthetics',
    'philosophy-transcendence',
  ]
  return pillars.map((slug) => ({ slug }))
}

const pillarMetadata: Record<string, { title: string; subtitle: string; description: string }> = {
  'mind-consciousness': {
    title: 'Mind & Consciousness',
    subtitle: 'Qualia, neural circuits, and the phenomenology of being',
    description: 'Inquiries into cognitive neuroscience, synaptic plasticity, optogenetics, and the hard problem of consciousness.'
  },
  'physical-universe-complexity': {
    title: 'Physical Universe & Complexity',
    subtitle: 'Cosmology, entropy, nonlinear dynamics, and deep time',
    description: 'Investigating emergent phenomena, information thermodynamics, and the fundamental structures of reality.'
  },
  'technology-ai-agency': {
    title: 'Technology & AI Agency',
    subtitle: 'Computation, cognitive outsourcing, and the agency moat',
    description: 'Explorations into the boundary between biological judgment and synthetic generation in an automated world.'
  },
  'society-history': {
    title: 'Society & History',
    subtitle: 'Institutions, power, material history, and social order',
    description: 'Historical investigations into state formation, civilizational architecture, and economic incentives.'
  },
  'culture-aesthetics': {
    title: 'Culture & Aesthetics',
    subtitle: 'Form, literary theory, acoustics, and the ontology of art',
    description: 'Essays on the philosophy of art, spatial architecture, language, and cultural transmission.'
  },
  'philosophy-transcendence': {
    title: 'Philosophy of Life & Transcendence',
    subtitle: 'Epistemology, normative ethics, and existential grounding',
    description: 'Deliberations on ancient wisdom, truth criteria, metaphysics, and the search for sovereign meaning.'
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params
  const meta = pillarMetadata[slug]

  if (!meta) {
    notFound()
  }

  const pillarEssays = essays.filter((e) => e.pillarSlug === slug)

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24 flex-1">
        {/* Pillar Masthead */}
        <div className="border-b border-[rgba(23,24,26,0.08)] pb-14 mb-16 max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#3B1B28] font-semibold block mb-4">
            Academic Discipline & Pillar
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17181A] font-normal leading-[1.12] mb-6 tracking-tight">
            {meta.title}
          </h1>
          <p className="font-serif text-2xl text-[#6E686B] italic mb-6">
            {meta.subtitle}
          </p>
          <p className="font-serif text-lg text-[#17181A]/80 leading-relaxed max-w-2xl mx-auto">
            {meta.description}
          </p>
        </div>

        {/* Essays Registry */}
        {pillarEssays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {pillarEssays.map((essay) => (
              <div key={essay.slug} className="group">
                <Link href={`/essay/${essay.slug}`} className="block relative w-full h-[280px] sm:h-[340px] bg-[#F1ECE4] mb-6 overflow-hidden rounded-[1px]">
                  <Image
                    src={essay.coverImage}
                    alt={essay.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                </Link>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#7D6B73] mb-3">
                  <span className="text-[#3B1B28] font-semibold">ESSAY {essay.essayNo}</span>
                  <span>{essay.readTime}</span>
                </div>
                <Link href={`/essay/${essay.slug}`}>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#17181A] group-hover:text-[#3B1B28] transition-colors mb-3 leading-snug">
                    {essay.title}
                  </h3>
                </Link>
                <p className="font-serif text-base text-[#6E686B] italic leading-relaxed mb-6">
                  {essay.subtitle}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(23,24,26,0.06)]">
                  <span className="text-xs uppercase tracking-[0.12em] text-[#7D6B73]">By Ahmad Farooq</span>
                  <BookmarkButton slug={essay.slug} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-20 p-8 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)]">
            <h3 className="font-serif text-2xl text-[#17181A] mb-3">
              Monographs in Preparation
            </h3>
            <p className="font-serif text-base text-[#6E686B] italic leading-relaxed mb-6">
              New inquiries under this pillar are currently undergoing primary research extraction and drafting. Published weekly.
            </p>
            <a 
              href="#dispatch"
              className="inline-block text-xs uppercase tracking-[0.16em] font-medium text-[#F9F6F2] bg-[#3B1B28] px-5 py-2.5 rounded-[1px]"
            >
              Subscribe to The Dispatch
            </a>
          </div>
        )}
      </main>

      <AudienceCapture />

      <footer className="border-t border-[rgba(23,24,26,0.08)] py-16 bg-[#F9F6F2] text-xs tracking-[0.12em] text-[#6E686B]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="font-serif lowercase text-3xl text-[#3B1B28]">nous</span>
            <span className="uppercase text-[11px]">Edited by Ahmad Farooq</span>
          </div>
          <span>© 2026 SOVEREIGN DOMAIN</span>
        </div>
      </footer>
    </>
  )
}
