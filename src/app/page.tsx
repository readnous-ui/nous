import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { AudienceCapture } from '@/components/AudienceCapture'
import { BookmarkButton } from '@/components/BookmarkButton'
import { essays } from '@/data/essays'

export default function Home() {
  const featured = essays[0]
  const upcoming = essays.slice(1)

  return (
    <>
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 flex-1">
        {/* Flagship Hero Feature (Aeon Style Full-Width Hero) */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Vast Hero Typography */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.16em] text-[#7D6B73] font-medium">
                <Link href={`/pillar/${featured.pillarSlug}`} className="text-[#3B1B28] font-semibold hover:underline">
                  {featured.pillar}
                </Link>
                <span>•</span>
                <span>ESSAY {featured.essayNo}</span>
              </div>

              <Link href={`/essay/${featured.slug}`} className="group block">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] text-[#17181A] group-hover:text-[#3B1B28] transition-colors leading-[1.12] tracking-[-0.02em] font-normal">
                  {featured.title}
                </h1>
              </Link>

              <p className="font-serif text-2xl text-[#6E686B] leading-relaxed italic">
                {featured.subtitle}
              </p>

              <p className="font-serif text-[18px] text-[#17181A]/80 leading-relaxed pt-2">
                {featured.excerpt}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-[rgba(23,24,26,0.08)]">
                <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.12em] text-[#6E686B]">
                  <span className="text-[#3B1B28] font-semibold">{featured.readTime}</span>
                  <span>•</span>
                  <span>BY AHMAD FAROOQ</span>
                </div>
                <BookmarkButton slug={featured.slug} />
              </div>
            </div>

            {/* Right: Expansive Cinematic Hero Image */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Link href={`/essay/${featured.slug}`} className="group block overflow-hidden rounded-[1px] relative aspect-[16/10] bg-[#F1ECE4]">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </Link>
              <p className="mt-3 text-right text-[11px] text-[#7D6B73] font-serif italic">
                {featured.imageCaption}
              </p>
            </div>
          </div>
        </section>

        {/* Clean Editorial Divider */}
        <div className="border-t border-[rgba(23,24,26,0.08)] mb-20"></div>

        {/* The 6 Pillars Philosophy Section */}
        <section className="mb-24 max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#3B1B28] font-semibold block mb-4">
            Curriculum & Scope
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17181A] font-normal leading-tight mb-6">
            Rigorous systems engineering on the outside.<br />
            <span className="italic">Contemplative human depth on the inside.</span>
          </h2>
          <p className="font-serif text-xl text-[#6E686B] leading-relaxed max-w-2xl mx-auto">
            An independent publication surveying 60 academic fields across mind, physical complexity, computation, and sovereignty.
          </p>
        </section>

        {/* Upcoming Issues Grid (Psyche/Aeon Secondary Monograph Grid) */}
        <section className="mb-24">
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(23,24,26,0.08)] mb-12">
            <span className="text-xs uppercase tracking-[0.16em] text-[#17181A] font-semibold">
              Volume I Index
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-[#7D6B73]">
              Archival Registry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {upcoming.map((essay) => (
              <div key={essay.slug} className="group">
                <div className="relative aspect-[16/10] bg-[#F1ECE4] mb-6 overflow-hidden rounded-[1px]">
                  <Image
                    src={essay.coverImage}
                    alt={essay.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#7D6B73] mb-3">
                  <span className="text-[#3B1B28] font-semibold">{essay.pillar}</span>
                  <span>{essay.readTime}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#17181A] group-hover:text-[#3B1B28] transition-colors mb-3 leading-snug">
                  {essay.title}
                </h3>
                <p className="font-serif text-base text-[#6E686B] italic leading-relaxed mb-6">
                  {essay.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AudienceCapture />

      <footer className="border-t border-[rgba(23,24,26,0.08)] py-16 bg-[#F9F6F2] text-xs tracking-[0.12em] text-[#6E686B]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="font-serif lowercase text-3xl text-[#3B1B28]">nous</span>
            <span className="uppercase text-[11px]">Edited by Ahmad Farooq</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#17181A]">About</Link>
            <Link href="/studio" className="hover:text-[#17181A]">Studio</Link>
            <a href="#dispatch" className="hover:text-[#17181A]">The Dispatch</a>
          </div>
          <span>© 2026 SOVEREIGN DOMAIN</span>
        </div>
      </footer>
    </>
  )
}
