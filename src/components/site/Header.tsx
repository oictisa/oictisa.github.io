import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pages } from '@/content-pages'
import { useLang } from '@/i18n'
import { useRoute } from '@/router'

const links = [
  { href: '#/inside', page: 'inside', label: pages.inside },
  { href: '#/events', page: 'events', label: pages.events },
  { href: '#/life', page: 'life', label: pages.life },
  { href: '#/team', page: 'team', label: pages.team },
]

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="relative flex shrink-0 rounded-full bg-navy p-1 text-xs font-bold text-white" role="group" aria-label="Language">
      {(['en', 'ja'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className="relative z-10 rounded-full px-3 py-1 transition-colors" style={{ color: lang === l ? '#1F3A5F' : '#fff' }}>
          {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-sun" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
          {l === 'en' ? 'EN' : '日本語'}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const { page } = useRoute()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [page])

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#/" className="flex items-center gap-2 font-[Anton] text-xl tracking-wide">
          <img src="favicon.svg" alt="" className="size-7" />
          OIC TISA
        </a>
        <nav className="hidden items-center gap-5 text-sm font-bold lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={page === l.page ? 'page' : undefined} className={`relative py-1 hover:text-ocean ${page === l.page ? 'text-ocean' : ''}`}>
              {t(l.label)}
              {page === l.page && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-ocean" />}
            </a>
          ))}
          <a href="#request" className="rounded-full bg-sun px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-md">
            {t(pages.request)}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" className="rounded-full border-2 border-navy px-3 py-1 text-xs font-bold lg:hidden">
            {open ? `✕ ${t(pages.close)}` : `☰ ${t(pages.menu)}`}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy/10 lg:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
              {links.map((l) => (
                <a key={l.href} href={l.href} className={`rounded-2xl px-4 py-3 font-extrabold ${page === l.page ? 'bg-navy text-white' : 'hover:bg-white'}`}>
                  {t(l.label)}
                </a>
              ))}
              <a href="#request" onClick={() => setOpen(false)} className="mt-1 rounded-2xl bg-sun px-4 py-3 font-extrabold">
                {t(pages.request)} →
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
