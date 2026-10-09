import Link from 'next/link'
import { Header } from '@/components/Header'
import { AudienceCapture } from '@/components/AudienceCapture'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-20 flex-1">
        <div className="space-y-6 border-b border-[rgba(23,24,26,0.08)] pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#3B1B28] font-semibold block">
            About the Publication
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#17181A] font-normal tracking-tight">
            An Independent Journal of Ideas, Philosophy & Complexity
          </h1>
          <p className="font-serif text-2xl text-[#6E686B] italic leading-relaxed">
            Rigorous systems engineering on the outside; contemplative human depth on the inside.
          </p>
        </div>

        <article className="font-serif text-[21px] leading-[1.84] text-[#17181A] space-y-7">
          <p className="first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:leading-none first-letter:text-[#3B1B28]">
            Nous is an independent digital publication and intellectual journal edited by Ahmad Farooq. It exists to produce uncompromising, dense, long-form inquiries across 60 academic disciplines spanning the mind, the physical universe, technology, history, and human meaning.
          </p>
          <p>
            In an era dominated by algorithmic velocity, rented attention, and zero-marginal-cost content generation, Nous operates on the opposing conviction: that true epistemic agency requires friction, that comprehension cannot be downloaded, and that deep intellectual work demands paced craftsmanship.
          </p>
          <p>
            We publish one flagship monograph every Sunday. No clickbait, no algorithmic optimization, and no rented platform dependencies.
          </p>
        </article>

        <div className="mt-16 pt-8 border-t border-[rgba(23,24,26,0.08)] flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#6E686B]">
          <Link href="/" className="text-[#3B1B28] hover:underline font-semibold">
            ← Return to Essays
          </Link>
          <span>AHMAD FAROOQ // EDITOR</span>
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
