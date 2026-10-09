import { NextResponse } from 'next/server'
import { supabase } from '@/data/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // 1. Try Supabase Storage bucket 'publication-assets'
    if (supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('publication-assets')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: true,
          })

        if (!error && data) {
          const { data: pubData } = supabase.storage
            .from('publication-assets')
            .getPublicUrl(data.path)

          return NextResponse.json({ url: pubData.publicUrl })
        }
      } catch (err) {
        console.warn('Supabase storage upload notice:', err)
      }
    }

    // Fallback: Base64 data URL for instant standalone preview without remote storage setup
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
    return NextResponse.json({ url: base64 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
