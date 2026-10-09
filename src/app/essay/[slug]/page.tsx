import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { AudienceCapture } from '@/components/AudienceCapture'
import { BookmarkButton } from '@/components/BookmarkButton'
import { essays } from '@/data/essays'

export function generateStaticParams() {
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) {
    notFound()
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-28 flex-1">
        {/* Monograph Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.16em] text-[#7D6B73] font-medium">
            <Link href={`/pillar/${essay.pillarSlug}`} className="text-[#3B1B28] font-semibold hover:underline">
              {essay.pillar}
            </Link>
            <span>•</span>
            <span>ESSAY {essay.essayNo}</span>
            <span>•</span>
            <span>{essay.readTime}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#17181A] tracking-[-0.025em] leading-[1.12] font-normal">
            {essay.title}
          </h1>

          <p className="font-serif text-2xl sm:text-3xl text-[#6E686B] leading-relaxed italic max-w-2xl mx-auto">
            {essay.subtitle}
          </p>

          <div className="flex items-center justify-center space-x-6 pt-4 text-xs uppercase tracking-[0.14em] text-[#6E686B]">
            <span>By Ahmad Farooq</span>
            <span>•</span>
            <time>{essay.publishedDate}</time>
            <span>•</span>
            <BookmarkButton slug={essay.slug} />
          </div>
        </div>

        {/* Cinematic Wide Cover Image */}
        {essay.coverImage && (
          <div className="mb-20">
            <div className="relative w-full h-[360px] sm:h-[500px] overflow-hidden rounded-[1px] bg-[#F1ECE4]">
              <Image
                src={essay.coverImage}
                alt={essay.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            {essay.imageCaption && (
              <p className="mt-3 text-right text-xs text-[#7D6B73] font-serif italic">
                {essay.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Deep Prose Column */}
        <article className="max-w-2xl mx-auto space-y-16">
          {essay.sections.map((section, sIndex) => (
            <section key={sIndex} className="space-y-7">
              {section.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#17181A] font-normal border-b border-[rgba(23,24,26,0.08)] pb-3 mt-14 tracking-tight">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, pIndex) => {
                const isFirst = sIndex === 0 && pIndex === 0
                return (
                  <p 
                    key={pIndex} 
                    className={`font-serif text-[21px] sm:text-[22px] leading-[1.86] text-[#17181A] ${
                      isFirst ? "first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:leading-none first-letter:text-[#3B1B28]" : ""
                    }`}
                  >
                    {para}
                  </p>
                )
              })}
            </section>
          ))}
        </article>

        {/* Monograph Closing Sign-Off */}
        <div className="max-w-2xl mx-auto mt-24 pt-10 border-t border-[rgba(23,24,26,0.08)] flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#6E686B]">
          <Link href="/" className="text-[#3B1B28] hover:underline font-semibold">
            ← Return to Index
          </Link>
          <div className="flex items-center space-x-4">
            <BookmarkButton slug={essay.slug} />
            <span>FIN // ESSAY {essay.essayNo}</span>
          </div>
        </div>
      </main>

      <AudienceCapture />

      <footer className="border-t border-[rgba(23,24,26,0.08)] py-12 text-center text-xs tracking-[0.12em] text-[#6E686B]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="font-serif lowercase text-2xl text-[#3B1B28]">nous</span>
          <span>SOVEREIGN ARCHIVE</span>
        </div>
      </footer>
    </>
  )
}
