'use client'

import { useState, useEffect } from 'react'

export function BookmarkButton({ slug }: { slug: string }) {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('nous_saved_essays') || '[]')
      setIsSaved(list.includes(slug))
    } catch {
      setIsSaved(false)
    }
  }, [slug])

  const toggleSave = () => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem('nous_saved_essays') || '[]')
      let updated: string[]
      if (list.includes(slug)) {
        updated = list.filter((s) => s !== slug)
        setIsSaved(false)
      } else {
        updated = [...list, slug]
        setIsSaved(true)
      }
      localStorage.setItem('nous_saved_essays', JSON.stringify(updated))
      window.dispatchEvent(new Event('nous_bookmark_changed'))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <button
      onClick={toggleSave}
      className={`p-2 transition-all rounded-[1px] flex items-center space-x-1.5 text-xs uppercase tracking-wider ${
        isSaved 
          ? 'text-[#3B1B28] bg-[#3B1B28]/10 font-medium' 
          : 'text-[#6E686B] hover:text-[#17181A] hover:bg-black/5'
      }`}
      title={isSaved ? "Saved to reading list" : "Save to read later"}
      aria-label="Save essay"
    >
      <svg 
        className="w-4 h-4" 
        fill={isSaved ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  )
}
