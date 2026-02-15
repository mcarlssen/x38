import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const recipient = process.env.NOTIFICATION_EMAIL
  if (!recipient) {
    return res.status(500).json({
      error: 'NOTIFICATION_EMAIL environment variable is not set',
    })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'RESEND_API_KEY environment variable is not set',
    })
  }

  const timestamp = new Date().toISOString()

  const { data, error } = await resend.emails.send({
    from: 'm@x38.dev <m@x38.dev>',
    to: [recipient],
    subject: 'proof of life',
    html: `
      <p>Your Rails app sent a proof-of-life ping to x38.dev.</p>
      <p><strong>Received at:</strong> ${timestamp}</p>
      <p>The webhook at <code>/proofoflife</code> was hit successfully.</p>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true, id: data?.id })
}
