import { hero, site } from '@/content'
import { useLang } from '@/i18n'
import { Globe } from './Globe'

export function Hero() {
  const { t } = useLang()
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pt-16 md:pb-24">
        <div>
          <p className="mb-4 inline-block rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{t(hero.kicker)}</p>
          <h1 className="font-display text-[3.4rem] leading-[0.95] uppercase sm:text-7xl md:text-8xl">
            {t(hero.titleLine1)}
            <br />
            <span className="text-ocean">{t(hero.titleLine2)}</span>
          </h1>
          <p className="mt-5 max-w-md text-base font-medium sm:text-lg">{t(hero.lead)}</p>
          <p className="mt-2 text-sm font-bold opacity-75">
            📍 {t(site.place)} · {t(site.meeting)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#request" className="rounded-full bg-sun px-6 py-3 font-extrabold shadow-[0_4px_0_#1F3A5F] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none">
              {t(hero.ctaRequest)} →
            </a>
            <a href="#activities" className="rounded-full border-2 border-navy px-6 py-3 font-extrabold transition hover:bg-navy hover:text-white">
              {t(hero.ctaActivities)}
            </a>
          </div>
        </div>
        <Globe className="mx-auto w-64 sm:w-80 md:w-full md:max-w-md" />
      </div>
      <div className="flex h-3">
        <div className="flex-1 bg-leaf" />
        <div className="flex-1 bg-sky" />
        <div className="flex-1 bg-sun" />
        <div className="flex-1 bg-coral" />
      </div>
    </section>
  )
}
