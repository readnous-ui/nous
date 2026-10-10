import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { supabase } from '@/data/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()

    // 1. Write to Supabase Postgres
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from('subscribers')
          .upsert({ email: cleanEmail, status: 'active' }, { onConflict: 'email' })

        if (dbError) {
          console.warn('Supabase write notice:', dbError.message)
        }
      } catch (err) {
        console.warn('Supabase network notice:', err)
      }
    }

    // 2. Dispatch Welcome Email
    const emailSubject = 'Welcome to Nous: The Weekly Dispatch'

    const emailText = `Welcome to the readership of Nous.

You have joined an independent journal founded on a quiet conviction: that true comprehension requires friction, that judgment cannot be automated, and that original synthesis demands paced craftsmanship.

Every Sunday morning, you will receive one rigorous monograph spanning computation, cognitive neuroscience, complexity, and sovereign human agency. Paced, contemplative, and delivered directly to your inbox.

Our launch inquiry, "The Last Thing We Built Before We Outsourced Thinking", is now live in the journal archive:
https://nousjournal.vercel.app/essay/the-last-thing-we-built-before-we-outsourced-thinking

Edited by Ahmad Farooq
An independent publication across 60 academic disciplines.
Nous Journal: https://nousjournal.vercel.app

You received this email because you subscribed at nousjournal.vercel.app. To unsubscribe, simply reply to this email with "unsubscribe".`

    const emailHtml = `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F9F6F2; color: #17181A; line-height: 1.8;">
        <div style="border-bottom: 2px solid #3B1B28; padding-bottom: 20px; margin-bottom: 30px;">
          <span style="font-size: 32px; color: #3B1B28; font-weight: normal; font-style: italic;">nous</span>
          <span style="float: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #7D6B73; margin-top: 12px;">The Weekly Dispatch</span>
        </div>
        
        <h2 style="font-size: 24px; font-weight: normal; color: #17181A; margin-bottom: 20px;">Welcome to the readership of Nous.</h2>
        
        <p style="font-size: 17px; margin-bottom: 18px;">
          You have joined an independent journal founded on a quiet conviction: that true comprehension requires friction, that judgment cannot be automated, and that original synthesis demands paced craftsmanship.
        </p>
        
        <p style="font-size: 17px; margin-bottom: 18px;">
          Every Sunday morning, you will receive one rigorous monograph spanning computation, cognitive neuroscience, complexity, and sovereign human agency. Paced, contemplative, and delivered directly to your inbox.
        </p>
        
        <p style="font-size: 17px; margin-bottom: 24px;">
          Our launch inquiry, <em>The Last Thing We Built Before We Outsourced Thinking</em>, is now live in the journal archive.
        </p>
        
        <div style="margin: 30px 0;">
          <a href="https://nousjournal.vercel.app/essay/the-last-thing-we-built-before-we-outsourced-thinking" style="background-color: #3B1B28; color: #F9F6F2; padding: 12px 24px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 500; display: inline-block;">
            Read Flagship Monograph &rarr;
          </a>
        </div>
        
        <div style="border-top: 1px solid #D8D1C7; padding-top: 20px; margin-top: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #7D6B73; line-height: 1.6;">
          <p style="margin: 0; font-weight: 500; color: #3B1B28;">Edited by Ahmad Farooq</p>
          <p style="margin: 4px 0 0 0;">An independent publication across 60 academic disciplines.</p>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #9B8E88;">
            You received this email because you subscribed to The Weekly Dispatch at <a href="https://nousjournal.vercel.app" style="color: #3B1B28; text-decoration: underline;">nousjournal.vercel.app</a>. If this was a mistake, reply to this email with &ldquo;unsubscribe&rdquo; to be removed immediately.
          </p>
        </div>
      </div>
    `

    // Strategy A: Direct Gmail SMTP (Works on nousjournal.vercel.app to ANY email address)
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_APP_PASSWORD

    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        })

        await transporter.sendMail({
          from: `"Nous Journal" <${gmailUser}>`,
          replyTo: `"Nous Editorial" <${gmailUser}>`,
          to: cleanEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
          headers: {
            'List-Unsubscribe': `<mailto:${gmailUser}?subject=unsubscribe>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })
      } catch (smtpErr) {
        console.warn('Gmail SMTP notice:', smtpErr)
      }
    } else {
      // Strategy B: Fallback to Resend API
      const resendApiKey = process.env.RESEND_API_KEY
      if (resendApiKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Nous Dispatch <onboarding@resend.dev>',
              reply_to: gmailUser || undefined,
              to: cleanEmail,
              subject: emailSubject,
              text: emailText,
              html: emailHtml,
              headers: {
                'List-Unsubscribe': `<mailto:${gmailUser || 'readnous@gmail.com'}?subject=unsubscribe>`,
              },
            }),
          })
        } catch (resendErr) {
          console.warn('Resend notice:', resendErr)
        }
      }
    }

    // 3. Local JSON Backup
    try {
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
        subscribers.push({ email: cleanEmail, date: new Date().toISOString() })
        fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))
      }
    } catch {
      // Handled silently
    }

    return NextResponse.json({
      success: true,
      message: 'You have joined The Dispatch. An essay is reserved for you every Sunday.',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Unable to subscribe. Please try again.' }, { status: 500 })
  }
}
