// Talks to the Google Apps Script backend (see apps-script/Code.gs).
// If VITE_API_URL is not set, a local demo mode stores data in this browser only.

export type Status = 'new' | 'reviewing' | 'confirmed' | 'onhold'

export type RequestInput = {
  name: string
  contactType: 'email' | 'instagram'
  contact: string
  studentType: string
  faculty: string
  year: string
  eventTags: string[]
  eventDetail: string
  timing: string
  nationality: string
  lang: 'en' | 'ja'
  website?: string // honeypot: must stay empty
}

export type RequestRow = Omit<RequestInput, 'eventTags' | 'website'> & {
  id: string
  createdAt: string
  eventTags: string
  status: Status
  repliedAt: string
  note: string
}

const API_URL = import.meta.env.VITE_API_URL as string | undefined
export const isDemo = !API_URL

async function call<R>(body: Record<string, unknown>): Promise<R> {
  // text/plain avoids a CORS preflight, which Apps Script cannot answer.
  const res = await fetch(API_URL!, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body) })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Request failed')
  return data as R
}

// ── demo mode (no backend) ────────────────────────────────────
const DEMO_KEY = 'tisa-demo-requests'
export const DEMO_PASSWORD = 'tisa-demo'
function demoLoad(): RequestRow[] {
  try {
    return JSON.parse(localStorage.getItem(DEMO_KEY) || '[]')
  } catch {
    return []
  }
}
function demoSave(rows: RequestRow[]) {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(rows))
  } catch {
    /* ignore */
  }
}
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ── public ────────────────────────────────────────────────────
export async function submitRequest(input: RequestInput): Promise<void> {
  if (!isDemo) {
    await call({ action: 'submit', ...input })
    return
  }
  await wait(600)
  const rows = demoLoad()
  rows.unshift({
    ...input,
    eventTags: input.eventTags.join(', '),
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
    status: 'new',
    repliedAt: '',
    note: '',
  })
  demoSave(rows)
}

// ── admin ─────────────────────────────────────────────────────
export async function listRequests(password: string): Promise<RequestRow[]> {
  if (!isDemo) return (await call<{ rows: RequestRow[] }>({ action: 'list', password })).rows
  await wait(300)
  if (password !== DEMO_PASSWORD) throw new Error('Wrong password')
  return demoLoad()
}

export async function updateRequest(password: string, id: string, patch: { status?: Status; note?: string }): Promise<void> {
  if (!isDemo) {
    await call({ action: 'update', password, id, ...patch })
    return
  }
  demoSave(demoLoad().map((r) => (r.id === id ? { ...r, ...patch } : r)))
}

/** Sends the reply email (email contacts) or just marks as replied (Instagram contacts). */
export async function markReplied(password: string, id: string, reply?: { subject: string; body: string }): Promise<string> {
  if (!isDemo) return (await call<{ repliedAt: string }>({ action: 'reply', password, id, ...reply })).repliedAt
  await wait(400)
  const repliedAt = new Date().toISOString()
  demoSave(demoLoad().map((r) => (r.id === id ? { ...r, repliedAt } : r)))
  return repliedAt
}
