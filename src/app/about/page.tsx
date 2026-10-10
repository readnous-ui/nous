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
            What is Nous?
          </h1>
          <p className="font-serif text-2xl text-[#6E686B] italic leading-relaxed">
            Rigorous systems engineering on the outside; contemplative human depth on the inside.
          </p>
        </div>

        <article className="font-serif text-[20px] leading-[1.84] text-[#17181A] space-y-8">
          <p className="first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:leading-none first-letter:text-[#3B1B28]">
            Nous is an independent intellectual journal and digital archive edited by Ahmad Farooq. It exists to publish sustained, rigorous monographs across 60 academic disciplines spanning the mind, the physical universe, computation, ethics, and human agency.
          </p>

          <div className="p-8 my-10 bg-[#FAF8F5] border-l-2 border-[#3B1B28] rounded-[1px] space-y-4 not-italic">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#3B1B28] font-sans font-semibold block">
              Etymology & Meaning
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#17181A] font-normal">
              nous <span className="text-[#6E686B] text-xl font-normal">/naʊs/</span>
            </h2>
            <div className="space-y-4 text-[17px] text-[#17181A] leading-relaxed pt-2">
              <p>
                <strong>In Ancient Philosophy (νοῦς):</strong> Introduced by Anaxagoras and developed extensively by Plato, Aristotle, and Plotinus, <em>nous</em> denotes the highest faculty of the human mind: intuitive intellect. Unlike <em>dianoia</em> (discursive, step-by-step reasoning), <em>nous</em> is the direct perception of first principles, cosmic order, and foundational truth. It is the active spark of consciousness through which reality comprehends itself.
              </p>
              <p>
                <strong>In Modern English:</strong> In everyday idiom, <em>nous</em> signifies common sense, practical judgment, intellectual resourcefulness, and sharp discernment. It is the capacity to cut through pretense, grasp the core of a practical problem, and act with clear discernment.
              </p>
            </div>
          </div>

          <h3 className="font-serif text-2xl text-[#17181A] font-normal pt-4">
            The Convergence
          </h3>

          <p>
            This journal sits at the convergence of both definitions. We believe that modern civilization requires both the contemplative depth of ancient <em>nous</em> and the uncompromising practical judgment of modern <em>nous</em>.
          </p>

          <p>
            Understanding the frontier of machine intelligence, cognitive neuroscience, theoretical physics, or political economy cannot be achieved through superficial summaries or fragmented feeds. It demands patient synthesis, original craftsmanship, and deep conceptual friction.
          </p>

          <p>
            Every Sunday morning, Nous delivers one flagship monograph directly to readers, written to be read with deliberation and preserved in a permanent sovereign archive.
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
