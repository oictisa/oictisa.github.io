import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { isDemo, listRequests, markReplied, updateRequest, type RequestRow, type Status } from '@/api'
import { form, replyTemplates, type T } from '@/content'
import { useLang } from '@/i18n'

const L = {
  title: { en: 'TISA admin', ja: 'TISA 管理ページ' },
  password: { en: 'Password', ja: 'パスワード' },
  login: { en: 'Log in', ja: 'ログイン' },
  logout: { en: 'Log out', ja: 'ログアウト' },
  wrong: { en: 'Wrong password, or the server could not be reached.', ja: 'パスワードが違うか、サーバーに接続できません。' },
  demo: { en: 'Demo mode: data is saved only in this browser. See README for the demo password and backend setup.', ja: 'デモモード：データはこのブラウザにだけ保存されます。デモ用パスワードと本番設定はREADMEを参照。' },
  all: { en: 'All', ja: 'すべて' },
  empty: { en: 'No requests yet.', ja: 'まだリクエストはありません。' },
  refresh: { en: 'Refresh', ja: '更新' },
  sheet: { en: 'Open Google Sheet', ja: 'スプレッドシートを開く' },
  pick: { en: 'Select a request to see details.', ja: 'リクエストを選ぶと詳細が表示されます。' },
  status: { en: 'Status', ja: 'ステータス' },
  note: { en: 'Staff note', ja: 'スタッフメモ' },
  save: { en: 'Save note', ja: 'メモを保存' },
  reply: { en: 'Reply', ja: '返信' },
  template: { en: 'Template', ja: 'テンプレート' },
  language: { en: 'Language', ja: '言語' },
  subject: { en: 'Subject', ja: '件名' },
  send: { en: 'Send email', ja: 'メールを送信' },
  copy: { en: 'Copy message', ja: '文面をコピー' },
  copied: { en: 'Copied!', ja: 'コピーしました' },
  openIg: { en: 'Open Instagram profile', ja: 'Instagramを開く' },
  markDone: { en: 'Mark as replied', ja: '返信済みにする' },
  replied: { en: 'Replied', ja: '返信済み' },
  notReplied: { en: 'Not replied', ja: '未返信' },
  sent: { en: 'Done.', ja: '完了しました。' },
  failed: { en: 'Failed. Try again.', ja: '失敗しました。もう一度試してください。' },
} satisfies Record<string, T>

const STATUS: { value: Status; label: T; color: string }[] = [
  { value: 'new', label: { en: 'New', ja: '新着' }, color: '#F5C518' },
  { value: 'reviewing', label: { en: 'Reviewing', ja: '検討中' }, color: '#5BA4E6' },
  { value: 'confirmed', label: { en: 'Confirmed', ja: '開催決定' }, color: '#7BC67E' },
  { value: 'onhold', label: { en: 'On hold', ja: '保留' }, color: '#C9C2B0' },
]
const statusOf = (s: Status) => STATUS.find((x) => x.value === s) ?? STATUS[0]

const SHEET_URL = import.meta.env.VITE_SHEET_URL as string | undefined
const PW_KEY = 'tisa-admin-pw'

function labelFrom(list: { value: string; label: T }[], v: string, t: (x: T) => string) {
  const hit = list.find((o) => o.value === v)
  return hit ? t(hit.label) : v
}
const tagLabels = (tags: string, t: (x: T) => string) =>
  tags
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => labelFrom(form.eventTags, s, t))
    .join(' ')

export function Admin() {
  const { t, lang, setLang } = useLang()
  const [pw, setPw] = useState(() => {
    try {
      return sessionStorage.getItem(PW_KEY) || ''
    } catch {
      return ''
    }
  })
  const [authed, setAuthed] = useState(false)
  const [rows, setRows] = useState<RequestRow[]>([])
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  async function load(password = pw) {
    setLoading(true)
    try {
      const r = await listRequests(password)
      setRows(r)
      setAuthed(true)
      setLoginError(false)
      try {
        sessionStorage.setItem(PW_KEY, password)
      } catch {
        /* ignore */
      }
    } catch {
      setAuthed(false)
      setLoginError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pw) load(pw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function logout() {
    try {
      sessionStorage.removeItem(PW_KEY)
    } catch {
      /* ignore */
    }
    setPw('')
    setAuthed(false)
    setRows([])
  }

  const counts = useMemo(() => Object.fromEntries(STATUS.map((s) => [s.value, rows.filter((r) => r.status === s.value).length])), [rows])
  const visible = filter === 'all' ? rows : rows.filter((r) => r.status === filter)
  const current = rows.find((r) => r.id === selected) ?? null
  const patchRow = (id: string, patch: Partial<RequestRow>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))

  const langToggle = (
    <div className="flex rounded-full bg-navy p-1 text-xs font-bold text-white">
      {(['en', 'ja'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 ${lang === l ? 'bg-sun text-navy' : ''}`}>
          {l === 'en' ? 'EN' : '日本語'}
        </button>
      ))}
    </div>
  )

  if (!authed) {
    return (
      <main className="flex min-h-svh items-center justify-center px-4">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault()
            load(pw)
          }}
          className="w-full max-w-sm rounded-[2rem] border-2 border-navy bg-white p-8 shadow-[8px_8px_0_#1F3A5F]"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl uppercase">{t(L.title)}</h1>
            {langToggle}
          </div>
          <label className="mt-6 block text-sm font-extrabold" htmlFor="pw">
            {t(L.password)}
          </label>
          <input id="pw" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1 w-full rounded-2xl border-2 border-navy/20 px-4 py-3 outline-none focus:border-ocean" />
          {loginError && <p className="mt-2 text-sm font-bold text-[#C2410C]">{t(L.wrong)}</p>}
          <button disabled={loading || !pw} className="mt-5 w-full rounded-full bg-navy py-3 font-extrabold text-white disabled:opacity-50">
            {loading ? '…' : t(L.login)}
          </button>
          {isDemo && <p className="mt-4 rounded-xl bg-sun/40 p-3 text-xs font-medium">{t(L.demo)}</p>}
          <a href="#" className="mt-4 block text-center text-sm underline">
            ← OIC TISA
          </a>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-svh">
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <h1 className="font-display text-2xl uppercase">{t(L.title)}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            {SHEET_URL && (
              <a href={SHEET_URL} target="_blank" rel="noreferrer" className="rounded-full border-2 border-navy px-3 py-1.5">
                📊 {t(L.sheet)}
              </a>
            )}
            <button onClick={() => load()} className="rounded-full border-2 border-navy px-3 py-1.5">
              ↻ {t(L.refresh)}
            </button>
            <button onClick={logout} className="rounded-full px-3 py-1.5 underline">
              {t(L.logout)}
            </button>
            {langToggle}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {isDemo && <p className="mb-4 rounded-xl bg-sun/40 p-3 text-sm font-medium">{t(L.demo)}</p>}

        <div className="mb-5 flex flex-wrap gap-2">
          {[{ value: 'all' as const, label: L.all, color: '#1F3A5F' }, ...STATUS].map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold ${filter === s.value ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white'}`}
            >
              <span className="size-2.5 rounded-full" style={{ background: s.color }} />
              {t(s.label)}
              <span className="opacity-70">{s.value === 'all' ? rows.length : counts[s.value]}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <ul className="grid content-start gap-2">
            {visible.length === 0 && <li className="rounded-2xl bg-white p-6 text-center font-medium opacity-70">{t(L.empty)}</li>}
            {visible.map((r) => {
              const s = statusOf(r.status)
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setSelected(r.id)}
                    className={`w-full rounded-2xl border-2 bg-white p-4 text-left transition hover:border-navy ${selected === r.id ? 'border-navy shadow-[4px_4px_0_#1F3A5F]' : 'border-transparent'}`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-bold">
                      <span className="rounded-full px-2 py-0.5" style={{ background: s.color }}>
                        {t(s.label)}
                      </span>
                      <span className="opacity-60">{new Date(r.createdAt).toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US')}</span>
                    </div>
                    <div className="mt-2 font-extrabold">{r.name}</div>
                    <div className="line-clamp-2 text-sm opacity-80">{[tagLabels(r.eventTags, t), r.eventDetail].filter(Boolean).join(' · ')}</div>
                    <div className="mt-1 text-xs font-bold">{r.repliedAt ? `✅ ${t(L.replied)}` : `✉️ ${t(L.notReplied)}`}</div>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <Detail row={current} pw={pw} onPatch={(p) => patchRow(current.id, p)} />
                </motion.div>
              ) : (
                <div className="rounded-3xl border-2 border-dashed border-navy/30 p-10 text-center font-medium opacity-70">{t(L.pick)}</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  )
}

function Detail({ row, pw, onPatch }: { row: RequestRow; pw: string; onPatch: (p: Partial<RequestRow>) => void }) {
  const { t, lang } = useLang()
  const [note, setNote] = useState(row.note)
  const [tplId, setTplId] = useState(replyTemplates[0].id)
  const [replyLang, setReplyLang] = useState<'en' | 'ja'>(row.lang === 'ja' ? 'ja' : 'en')
  const tpl = replyTemplates.find((x) => x.id === tplId)!
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setBody(tpl[replyLang].replaceAll('{name}', row.name))
    setSubject(replyLang === 'ja' ? '【TISA】イベントリクエストについて' : '[TISA] About your event request')
  }, [tplId, replyLang, row.name, tpl])

  const flash = (m: string) => {
    setMsg(m)
    setTimeout(() => setMsg(''), 2500)
  }

  async function changeStatus(s: Status) {
    onPatch({ status: s })
    try {
      await updateRequest(pw, row.id, { status: s })
    } catch {
      flash(t(L.failed))
    }
  }

  async function saveNote() {
    try {
      await updateRequest(pw, row.id, { note })
      onPatch({ note })
      flash(t(L.sent))
    } catch {
      flash(t(L.failed))
    }
  }

  async function doReply(sendEmail: boolean) {
    setBusy(true)
    try {
      const repliedAt = await markReplied(pw, row.id, sendEmail ? { subject, body } : undefined)
      onPatch({ repliedAt })
      flash(t(L.sent))
    } catch {
      flash(t(L.failed))
    } finally {
      setBusy(false)
    }
  }

  const igHandle = row.contact.replace(/^@/, '').trim()
  const info: [string, string][] = [
    [t(form.contactType), `${row.contactType === 'email' ? '📧' : '📷'} ${row.contact}`],
    [t(form.studentType), labelFrom(form.studentTypes, row.studentType, t)],
    [t(form.faculty), labelFrom(form.faculties, row.faculty, t)],
    [t(form.year), labelFrom(form.years, row.year, t)],
    [t(form.event), [tagLabels(row.eventTags, t), row.eventDetail].filter(Boolean).join('\n')],
    [t(form.timing), row.timing || '—'],
    [t(form.nationality), row.nationality || '—'],
  ]

  return (
    <div className="grid gap-4 rounded-3xl border-2 border-navy bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-2xl font-extrabold">{row.name}</h2>
          <p className="text-xs opacity-60">
            #{row.id} · {new Date(row.createdAt).toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US')} · site: {row.lang.toUpperCase()}
          </p>
        </div>
        <span className="text-sm font-bold">{row.repliedAt ? `✅ ${t(L.replied)} ${new Date(row.repliedAt).toLocaleDateString()}` : `✉️ ${t(L.notReplied)}`}</span>
      </div>

      <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        {info.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-extrabold opacity-70">{k}</dt>
            <dd className="whitespace-pre-wrap">{v}</dd>
          </div>
        ))}
      </dl>

      <div>
        <div className="mb-1.5 text-sm font-extrabold">{t(L.status)}</div>
        <div className="flex flex-wrap gap-2">
          {STATUS.map((s) => (
            <button
              key={s.value}
              onClick={() => changeStatus(s.value)}
              className={`rounded-full border-2 px-3 py-1.5 text-sm font-bold ${row.status === s.value ? 'border-navy' : 'border-transparent opacity-70'}`}
              style={{ background: s.color }}
            >
              {t(s.label)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-extrabold" htmlFor="note">
          {t(L.note)}
        </label>
        <textarea id="note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-2xl border-2 border-navy/20 px-3 py-2 text-sm outline-none focus:border-ocean" />
        <button onClick={saveNote} className="mt-1 rounded-full border-2 border-navy px-3 py-1 text-sm font-bold">
          {t(L.save)}
        </button>
      </div>

      <div className="rounded-2xl bg-cream p-4">
        <div className="mb-2 font-extrabold">💬 {t(L.reply)}</div>
        <div className="mb-2 flex flex-wrap gap-2 text-sm">
          <select value={tplId} onChange={(e) => setTplId(e.target.value)} className="rounded-full border-2 border-navy/20 bg-white px-3 py-1.5 font-bold" aria-label={t(L.template)}>
            {replyTemplates.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
          <select value={replyLang} onChange={(e) => setReplyLang(e.target.value as 'en' | 'ja')} className="rounded-full border-2 border-navy/20 bg-white px-3 py-1.5 font-bold" aria-label={t(L.language)}>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        {row.contactType === 'email' && (
          <input value={subject} onChange={(e) => setSubject(e.target.value)} aria-label={t(L.subject)} className="mb-2 w-full rounded-xl border-2 border-navy/20 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-ocean" />
        )}
        <textarea rows={7} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-xl border-2 border-navy/20 bg-white px-3 py-2 text-sm outline-none focus:border-ocean" />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {row.contactType === 'email' ? (
            <button disabled={busy} onClick={() => doReply(true)} className="rounded-full bg-navy px-5 py-2 font-extrabold text-white disabled:opacity-50">
              📧 {t(L.send)}
            </button>
          ) : (
            <>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(body)
                  flash(t(L.copied))
                }}
                className="rounded-full bg-navy px-4 py-2 font-extrabold text-white"
              >
                📋 {t(L.copy)}
              </button>
              <a href={`https://www.instagram.com/${encodeURIComponent(igHandle)}/`} target="_blank" rel="noreferrer" className="rounded-full border-2 border-navy px-4 py-2 font-extrabold">
                📷 {t(L.openIg)}
              </a>
              <button disabled={busy} onClick={() => doReply(false)} className="rounded-full bg-sun px-4 py-2 font-extrabold disabled:opacity-50">
                ✅ {t(L.markDone)}
              </button>
            </>
          )}
          {msg && <span className="text-sm font-bold" role="status">{msg}</span>}
        </div>
      </div>
    </div>
  )
}
