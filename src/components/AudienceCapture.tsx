'use client'

import { useState } from 'react'

export function AudienceCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You have joined The Dispatch.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe.')
      }
    } catch {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <section id="dispatch" className="border-t border-[rgba(23,24,26,0.08)] py-24 bg-[#F1ECE4]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#3B1B28] font-semibold block mb-4">
          The Weekly Dispatch
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#17181A] mb-5 font-normal tracking-tight">
          Read with deliberation.
        </h2>
        <p className="font-serif text-xl text-[#6E686B] mb-10 leading-relaxed italic max-w-lg mx-auto">
          Every Sunday, one rigorous inquiry into natural philosophy, computation, and human agency. No algorithmic noise. Delivered direct.
        </p>

        {status === 'success' ? (
          <div className="p-5 bg-[#FAF8F5] border border-[#3B1B28] text-[#17181A] font-serif text-base">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              disabled={status === 'loading'}
              className="flex-1 px-5 py-3.5 bg-[#FAF8F5] border border-[rgba(23,24,26,0.15)] text-sm focus:outline-none focus:border-[#3B1B28] text-[#17181A] placeholder:text-[#6E686B] rounded-[1px]"
              required
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="px-6 py-3.5 bg-[#3B1B28] hover:bg-[#2A131C] text-[#F9F6F2] text-xs uppercase tracking-[0.16em] font-medium transition-colors rounded-[1px] disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-xs text-[#3B1B28]">{message}</p>
        )}
      </div>
    </section>
  )
}
