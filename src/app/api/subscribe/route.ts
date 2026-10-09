import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { supabase } from '@/data/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()

    // 1. Supabase Persistence (if credentials configured)
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from('subscribers')
          .upsert({ email: cleanEmail, status: 'active' }, { onConflict: 'email' })

        if (dbError) {
          console.error('Supabase write error:', dbError)
        }
      } catch (err) {
        console.error('Supabase connection error:', err)
      }
    }

    // 2. Sovereign Local Fallback (Guarantees zero subscriber loss)
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const subscribersFile = path.join(dataDir, 'subscribers.json')
    let subscribers: { email: string; date: string }[] = []

    if (fs.existsSync(subscribersFile)) {
      try {
        subscribers = JSON.parse(fs.readFileSync(subscribersFile, 'utf-8'))
      } catch {
        subscribers = []
      }
    }

    if (!subscribers.some((s) => s.email === cleanEmail)) {
      subscribers.push({
        email: cleanEmail,
        date: new Date().toISOString(),
      })
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))
    }

    return NextResponse.json({
      success: true,
      message: 'You have joined the salon. An entry is reserved for you every Sunday.',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Unable to subscribe. Please try again.' }, { status: 500 })
  }
}
