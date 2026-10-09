'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Studio() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [pillar, setPillar] = useState('Technology & Agency')
  const [essayNo, setEssayNo] = useState('003')
  const [coverImage, setCoverImage] = useState('')
  const [imageCaption, setImageCaption] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'published'>('idle')

  const pillars = [
    "Mind & Consciousness",
    "Physical Universe",
    "Technology & Agency",
    "Society & History",
    "Culture & Aesthetics",
    "Philosophy of Life"
  ]

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))

  const handlePublish = async () => {
    setStatus('saving')
    // Simulating save to Supabase / local data
    setTimeout(() => {
      setStatus('published')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] text-[#17181A] flex flex-col justify-between">
      {/* Studio Top Command Bar */}
      <header className="border-b border-[rgba(23,24,26,0.08)] bg-[#FAF8F5] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-serif lowercase text-3xl text-[#3B1B28]">
              nous
            </Link>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#7D6B73] font-medium border-l border-[rgba(23,24,26,0.1)] pl-4">
              Editorial Studio // Ahmad Farooq
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-wider text-[#6E686B]">
              {wordCount} Words • ~{readTimeMinutes} Min Read
            </span>
            <button
              onClick={handlePublish}
              disabled={status === 'saving'}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#F9F6F2] bg-[#3B1B28] hover:bg-[#2A131C] px-5 py-2.5 transition-all rounded-[1px] disabled:opacity-50"
            >
              {status === 'saving' ? 'Publishing...' : status === 'published' ? 'Published ✓' : 'Publish & Broadcast'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Drafting Area */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full space-y-10">
        {/* Metadata Controls Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)]">
          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block mb-2">
              Academic Pillar
            </label>
            <select
              value={pillar}
              onChange={(e) => setPillar(e.target.value)}
              className="w-full p-2.5 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
            >
              {pillars.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block mb-2">
              Monograph Number
            </label>
            <input
              type="text"
              value={essayNo}
              onChange={(e) => setEssayNo(e.target.value)}
              placeholder="e.g. 003"
              className="w-full p-2.5 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block mb-2">
              Reading Metric
            </label>
            <div className="p-2.5 bg-[#F1ECE4] border border-[rgba(23,24,26,0.08)] text-xs font-serif text-[#3B1B28] italic">
              {readTimeMinutes} Min Read ({wordCount} words)
            </div>
          </div>
        </div>

        {/* Editorial Title & Subtitle Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monograph Headline..."
            className="w-full font-serif text-3xl sm:text-5xl text-[#17181A] placeholder:text-[#6E686B]/40 bg-transparent border-b border-[rgba(23,24,26,0.12)] pb-4 focus:outline-none focus:border-[#3B1B28]"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Sub-deck / Philosophical claim..."
            className="w-full font-serif text-xl sm:text-2xl italic text-[#6E686B] placeholder:text-[#6E686B]/40 bg-transparent border-b border-[rgba(23,24,26,0.08)] pb-3 focus:outline-none focus:border-[#3B1B28]"
          />
        </div>

        {/* Archival Artwork / Hero Photo Input */}
        <div className="p-6 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)] space-y-4">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block">
            Archival Cover Art / Photography
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Cover Image URL (e.g. Unsplash or Supabase Storage)"
              className="p-3 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
            />
            <input
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="Image Attribution & Historical Provenance"
              className="p-3 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
            />
          </div>
        </div>

        {/* Deep Prose Canvas */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block">
            Prose Body (Markdown / Roman Numeral Acts)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={24}
            placeholder="I. THE HOLLOW PODIUM&#10;&#10;Write the unhurried opening sentence here..."
            className="w-full p-6 bg-[#FAF8F5] border border-[rgba(23,24,26,0.12)] font-serif text-[19px] leading-[1.8] text-[#17181A] placeholder:text-[#6E686B]/40 focus:outline-none focus:border-[#3B1B28] rounded-[1px]"
          />
        </div>
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-[rgba(23,24,26,0.08)] py-6 text-center text-xs tracking-wider text-[#7D6B73] bg-[#FAF8F5]">
        NOUS STUDIO // EDITORIAL ENGINE POWERED BY SUPABASE POSTGRESQL
      </footer>
    </div>
  )
}
