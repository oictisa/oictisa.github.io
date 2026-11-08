import { motion } from 'motion/react'
import { nav } from '@/content'
import { useLang } from '@/i18n'

export function Header() {
  const { lang, setLang, t } = useLang()
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-[Anton] text-xl tracking-wide">
          <img src="favicon.svg" alt="" className="size-7" />
          OIC TISA
        </a>
        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          {(['about', 'activities', 'numbers'] as const).map((k) => (
            <a key={k} href={`#${k}`} className="hover:text-ocean">
              {t(nav[k])}
            </a>
          ))}
          <a href="#request" className="rounded-full bg-sun px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-md">
            {t(nav.request)}
          </a>
        </nav>
        <div className="relative flex rounded-full bg-navy p-1 text-xs font-bold text-white" role="group" aria-label="Language">
          {(['en', 'ja'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className="relative z-10 rounded-full px-3 py-1 transition-colors"
              style={{ color: lang === l ? '#1F3A5F' : '#fff' }}
            >
              {lang === l && (
                <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-sun" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
              )}
              {l === 'en' ? 'EN' : '日本語'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
