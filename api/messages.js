// Serverless API to store/read RSVP messages using a GitHub Gist
// Requires environment variables on Vercel: GIST_ID and GITHUB_TOKEN
const GIST_FILE = 'messages.json'

async function readJsonFromGist(gistId, token) {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json'
    }
  })
  if (!res.ok) throw new Error('fetch_failed')
  const data = await res.json()
  const file = data.files && data.files[GIST_FILE]
  if (!file || !file.content) return []
  try { return JSON.parse(file.content) } catch { return [] }
}

async function writeJsonToGist(gistId, token, arr) {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({ files: { [GIST_FILE]: { content: JSON.stringify(arr, null, 2) } } })
  })
  if (!res.ok) throw new Error('update_failed')
  const data = await res.json()
  const file = data.files && data.files[GIST_FILE]
  if (!file || !file.content) return arr
  try { return JSON.parse(file.content) } catch { return arr }
}

import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const GIST_ID = process.env.GIST_ID
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN

  try {
    if (req.method === 'GET') {
      // If GIST_ID is set, read from gist; otherwise fallback to local public/messages.json
      if (GIST_ID) {
        const messages = await readJsonFromGist(GIST_ID, GITHUB_TOKEN)
        return res.status(200).json(messages)
      }

      try {
        const filePath = path.join(process.cwd(), 'public', 'messages.json')
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, 'utf8')
          const parsed = JSON.parse(raw || '[]')
          return res.status(200).json(Array.isArray(parsed) ? parsed : [])
        }
      } catch (e) {
        console.error('local-read-error', e)
      }

      return res.status(200).json([])
    }

    if (req.method === 'POST') {
      // POST requires a GIST_ID + GitHub token to update the gist
      if (!GIST_ID || !GITHUB_TOKEN) return res.status(501).json({ error: 'POST requires GIST_ID and GITHUB_TOKEN env vars' })

      // parse body robustly (handles string or already-parsed)
      let entry = req.body
      if (!entry) {
        let raw = ''
        for await (const chunk of req) raw += chunk
        try { entry = JSON.parse(raw) } catch (e) { return res.status(400).json({ error: 'invalid_json' }) }
      }
      if (!entry || !entry.id) return res.status(400).json({ error: 'invalid_entry' })

      const existing = await readJsonFromGist(GIST_ID, GITHUB_TOKEN)
      const updated = [entry, ...existing]
      const saved = await writeJsonToGist(GIST_ID, GITHUB_TOKEN, updated)
      return res.status(200).json(saved)
    }

    res.setHeader('Allow', 'GET, POST')
    res.status(405).end('Method Not Allowed')
  } catch (err) {
    console.error('gist-error', err)
    res.status(502).json({ error: 'upstream_error' })
  }
}
