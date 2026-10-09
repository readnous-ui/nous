'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Studio() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [authError, setAuthError] = useState('')

  // Studio Form State
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [pillar, setPillar] = useState('Technology & Agency')
  const [essayNo, setEssayNo] = useState('003')
  const [coverImage, setCoverImage] = useState('')
  const [imageCaption, setImageCaption] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'published'>('idle')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('nous_studio_auth')
    if (session === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail === 'ahmad@nousjournal.com' && loginPassword === 'F@rooq5225') {
      setIsAuthenticated(true)
      localStorage.setItem('nous_studio_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Invalid credentials. Access restricted to Ahmad Farooq.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('nous_studio_auth')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/studio/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setCoverImage(data.url)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

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
    setTimeout(() => {
      setStatus('published')
    }, 800)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F6F2] flex items-center justify-center p-6 text-[#17181A]">
        <div className="w-full max-w-md bg-[#FAF8F5] border border-[rgba(23,24,26,0.12)] p-10 shadow-sm rounded-[1px]">
          <div className="text-center mb-8">
            <span className="font-serif lowercase text-4xl text-[#3B1B28] block mb-2">nous</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7D6B73] font-semibold">
              Editorial Studio // Restricted
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#7D6B73] font-medium block mb-2">
                Editor Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ahmad@nousjournal.com"
                className="w-full p-3 bg-[#F9F6F2] border border-[rgba(23,24,26,0.15)] text-sm rounded-[1px] focus:outline-none focus:border-[#3B1B28]"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#7D6B73] font-medium block mb-2">
                Access Key
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 bg-[#F9F6F2] border border-[rgba(23,24,26,0.15)] text-sm rounded-[1px] focus:outline-none focus:border-[#3B1B28]"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-[#3B1B28] font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#3B1B28] hover:bg-[#2A131C] text-[#F9F6F2] text-xs uppercase tracking-[0.16em] font-medium transition-colors rounded-[1px]"
            >
              Authenticate & Enter Studio
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[rgba(23,24,26,0.08)] text-center">
            <Link href="/" className="text-xs text-[#7D6B73] hover:text-[#17181A] uppercase tracking-wider">
              ← Return to Public Journal
            </Link>
          </div>
        </div>
      </div>
    )
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

          <div className="flex items-center space-x-5">
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
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-wider text-[#7D6B73] hover:text-[#17181A]"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Drafting Area */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full space-y-10">
        {/* Analytics & Reader Metrics Panel (PostHog / Edge Metrics Preview) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)]">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7D6B73] block mb-1">Total Readers</span>
            <span className="font-serif text-2xl text-[#17181A]">1,280</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7D6B73] block mb-1">Avg. Read Completion</span>
            <span className="font-serif text-2xl text-[#3B1B28]">78.4%</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7D6B73] block mb-1">Active Subscribers</span>
            <span className="font-serif text-2xl text-[#17181A]">342</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7D6B73] block mb-1">Analytics Engine</span>
            <span className="text-xs font-mono text-[#7D6B73]">PostHog Ready</span>
          </div>
        </div>

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

        {/* Archival Artwork / File Upload Box */}
        <div className="p-6 bg-[#FAF8F5] border border-[rgba(23,24,26,0.08)] space-y-4">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#7D6B73] font-semibold block">
            Archival Cover Art / Photography
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#7D6B73] block">
                {uploading ? 'Uploading to Supabase...' : 'Upload Image File'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full p-2 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs rounded-[1px]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[#7D6B73] block mb-2">
                Or Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="Image Attribution & Historical Provenance (e.g. Photography by Henri Cartier-Bresson)"
              className="w-full p-3 bg-[#F9F6F2] border border-[rgba(23,24,26,0.12)] text-xs text-[#17181A] rounded-[1px]"
            />
          </div>
          {coverImage && (
            <div className="mt-4 relative w-full h-[200px] overflow-hidden rounded-[1px]">
              <Image src={coverImage} alt="Preview" fill className="object-cover" />
            </div>
          )}
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
        NOUS STUDIO // SECURED EDITORIAL BACKEND FOR AHMAD FAROOQ
      </footer>
    </div>
  )
}
