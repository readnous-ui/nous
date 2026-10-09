'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [savedCount, setSavedCount] = useState(0)
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false)
  const [savedSlugs, setSavedSlugs] = useState<string[]>([])

  useEffect(() => {
    const updateSaved = () => {
      try {
        const list = JSON.parse(localStorage.getItem('nous_saved_essays') || '[]')
        setSavedSlugs(list)
        setSavedCount(list.length)
      } catch {
        setSavedCount(0)
      }
    }
    updateSaved()
    window.addEventListener('storage', updateSaved)
    window.addEventListener('nous_bookmark_changed', updateSaved)
    return () => {
      window.removeEventListener('storage', updateSaved)
      window.removeEventListener('nous_bookmark_changed', updateSaved)
    }
  }, [])

  const categories = [
    { name: "Mind & Consciousness", slug: "mind-consciousness" },
    { name: "Physical Universe", slug: "physical-universe-complexity" },
    { name: "Technology & Agency", slug: "technology-ai-agency" },
    { name: "Society & History", slug: "society-history" },
    { name: "Culture & Aesthetics", slug: "culture-aesthetics" },
    { name: "Philosophy of Life", slug: "philosophy-transcendence" },
  ]

  return (
    <>
      {/* Top Quiet Banner */}
      <div className="border-b border-[rgba(23,24,26,0.06)] bg-[#F9F6F2] px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#6E686B]">
          <span>An Independent Journal of Ideas & Human Depth</span>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#3B1B28] transition-colors">
              About
            </Link>
            <span className="hidden sm:inline">Edited by Ahmad Farooq</span>
          </div>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <header className="sticky top-0 z-40 bg-[#F9F6F2]/95 backdrop-blur-md border-b border-[rgba(23,24,26,0.08)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Menu Trigger */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex items-center space-x-2 text-[12px] uppercase tracking-[0.16em] font-medium text-[#17181A] hover:text-[#3B1B28] transition-colors py-2"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Menu</span>
            </button>
          </div>

          {/* Center: Iconic Lower-case nous Wordmark */}
          <div className="text-center">
            <Link href="/" className="font-serif text-[46px] tracking-[-0.04em] text-[#3B1B28] font-normal lowercase select-none leading-none hover:opacity-90 transition-opacity">
              nous
            </Link>
          </div>

          {/* Right: Bookmarks & Newsletter CTA */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setSavedDrawerOpen(true)}
              className="text-[12px] uppercase tracking-[0.14em] text-[#6E686B] hover:text-[#17181A] flex items-center space-x-1.5 transition-colors"
              title="Saved reading list"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center text-[10px] w-4 h-4 rounded-full bg-[#3B1B28] text-[#F9F6F2]">
                  {savedCount}
                </span>
              )}
            </button>

            <a
              href="#dispatch"
              className="text-[12px] uppercase tracking-[0.16em] font-medium text-[#F9F6F2] bg-[#3B1B28] hover:bg-[#2A131C] px-4 py-2 transition-all rounded-[1px]"
            >
              The Dispatch
            </a>
          </div>
        </div>

        {/* Minimal Category Strip */}
        <div className="border-t border-[rgba(23,24,26,0.05)] overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-6 h-11 flex items-center space-x-8 text-[12px] uppercase tracking-[0.14em] font-medium text-[#6E686B] whitespace-nowrap">
            <Link href="/" className="text-[#3B1B28] border-b border-[#3B1B28] pb-0.5">
              Essays
            </Link>
            {categories.map((c) => (
              <Link 
                key={c.slug} 
                href={`/pillar/${c.slug}`} 
                className="hover:text-[#17181A] transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Full-Screen Aeon-Style Slide-Out Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F9F6F2] flex flex-col justify-between p-8 sm:p-14 overflow-y-auto">
          <div>
            <div className="max-w-7xl mx-auto flex items-center justify-between pb-12 border-b border-[rgba(23,24,26,0.08)]">
              <span className="font-serif lowercase text-3xl text-[#3B1B28]">nous</span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 text-[12px] uppercase tracking-[0.18em] text-[#6E686B] hover:text-[#17181A]"
              >
                <span>Close</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Giant Academic Pillars List */}
            <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#7D6B73] font-semibold block mb-6">
                  Disciplines & Pillars
                </span>
                {categories.map((c) => (
                  <div key={c.slug}>
                    <Link 
                      href={`/pillar/${c.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17181A] hover:text-[#3B1B28] transition-colors leading-[1.2] block font-normal"
                    >
                      {c.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[rgba(23,24,26,0.08)] pt-8 lg:pt-0 lg:pl-12 space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#7D6B73] font-semibold block mb-4">
                    The Publication
                  </span>
                  <ul className="space-y-3 font-serif text-2xl text-[#17181A]">
                    <li><Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#3B1B28]">Essays</Link></li>
                    <li><Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#3B1B28]">About the Journal</Link></li>
                    <li><a href="#dispatch" onClick={() => setMenuOpen(false)} className="hover:text-[#3B1B28]">The Dispatch</a></li>
                  </ul>
                </div>

                <div className="pt-8 border-t border-[rgba(23,24,26,0.08)]">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#7D6B73] font-semibold block mb-2">
                    Masthead
                  </span>
                  <p className="font-serif text-base text-[#6E686B] leading-relaxed">
                    Edited by Ahmad Farooq.<br />
                    Autodidact, systems engineer, and contemplative essayist.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full pt-8 border-t border-[rgba(23,24,26,0.08)] flex flex-col sm:flex-row items-center justify-between text-xs tracking-[0.14em] text-[#6E686B]">
            <span>NOUS // AN INDEPENDENT JOURNAL OF IDEAS</span>
            <span>PUBLISHED WEEKLY</span>
          </div>
        </div>
      )}

      {/* Saved Reading Drawer */}
      {savedDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#F9F6F2] h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(23,24,26,0.08)]">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#3B1B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <h3 className="font-serif text-2xl text-[#17181A]">Reading List</h3>
                </div>
                <button 
                  onClick={() => setSavedDrawerOpen(false)}
                  className="text-xs uppercase tracking-wider text-[#6E686B] hover:text-[#17181A]"
                >
                  Close
                </button>
              </div>

              <div className="py-8 space-y-4">
                {savedSlugs.length === 0 ? (
                  <p className="font-serif text-base text-[#6E686B] italic">
                    You have no saved essays yet. Click the bookmark icon on any monograph to save it for later reading.
                  </p>
                ) : (
                  savedSlugs.map((slug) => (
                    <div key={slug} className="p-4 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)]">
                      <Link 
                        href={`/essay/${slug}`} 
                        onClick={() => setSavedDrawerOpen(false)}
                        className="font-serif text-lg text-[#17181A] hover:text-[#3B1B28] leading-snug block mb-2"
                      >
                        {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Link>
                      <span className="text-[11px] uppercase tracking-wider text-[#7D6B73]">
                        Saved in Browser
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cloud Sync Upsell */}
            <div className="pt-6 border-t border-[rgba(23,24,26,0.08)] bg-[#F1ECE4]/50 p-4">
              <span className="text-[11px] uppercase tracking-wider text-[#3B1B28] font-semibold block mb-1">
                Cloud Sync
              </span>
              <p className="text-xs text-[#6E686B] mb-3 leading-relaxed">
                Sync your saved list across devices via passwordless magic link.
              </p>
              <a 
                href="#dispatch" 
                onClick={() => setSavedDrawerOpen(false)}
                className="inline-block text-xs uppercase tracking-wider text-[#3B1B28] font-semibold hover:underline"
              >
                Subscribe to The Dispatch →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
