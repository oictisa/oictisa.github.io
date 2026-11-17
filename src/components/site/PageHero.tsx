import type { T } from '@/content'
import { useLang } from '@/i18n'
import { Reveal } from './Reveal'

/** Top banner for sub-pages. */
export function PageHero({ kicker, title, lead, color = '#F5C518', emoji }: { kicker: T; title: T; lead: T; color?: string; emoji?: string }) {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden border-b-2 border-navy" style={{ background: color }}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal>
          <p className="mb-4 inline-block rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{t(kicker)}</p>
          <h1 className="font-display max-w-3xl text-5xl leading-[0.95] uppercase sm:text-6xl md:text-7xl">{t(title)}</h1>
          <p className="mt-5 max-w-2xl text-base font-medium sm:text-lg">{t(lead)}</p>
        </Reveal>
      </div>
      {emoji && (
        <span aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 text-[11rem] opacity-25 select-none sm:text-[15rem]">
          {emoji}
        </span>
      )}
    </section>
  )
}
