import { about, activities, footer, site } from '@/content'
import { explore, pages } from '@/content-pages'
import { useLang } from '@/i18n'
import { EventCard } from './EventCard'
import { Reveal } from './Reveal'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display mb-8 text-4xl uppercase sm:text-5xl">{children}</h2>
}

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <Reveal>
        <SectionTitle>{t(about.title)}</SectionTitle>
        <p className="max-w-3xl text-lg leading-relaxed font-medium">{t(about.body)}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {about.points.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="h-full rounded-3xl border-2 border-navy bg-white p-6 shadow-[6px_6px_0_#1F3A5F]">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 text-lg font-extrabold">{t(p.title)}</h3>
              <p className="mt-1 text-sm leading-relaxed">{t(p.text)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Four big cards that link to the sub-pages. */
export function Explore() {
  const { t } = useLang()
  return (
    <section id="explore" className="scroll-mt-20 bg-cream-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle>{t(explore.title)}</SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {explore.cards.map((c, i) => (
            <Reveal key={c.to} delay={(i % 2) * 0.08}>
              <a href={c.to} className="group flex h-full items-center gap-5 rounded-3xl border-2 border-navy bg-white p-5 shadow-[6px_6px_0_#1F3A5F] transition hover:-translate-y-1 hover:shadow-[8px_10px_0_#1F3A5F] sm:p-6">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl text-4xl transition group-hover:rotate-6" style={{ background: c.color }}>
                  {c.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-extrabold">{t(c.title)}</span>
                  <span className="mt-1 block text-sm leading-relaxed">{t(c.text)}</span>
                </span>
                <span className="text-2xl font-bold transition group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Latest 3 events + link to the events page. */
export function RecentEvents() {
  const { t } = useLang()
  const latest = [...activities.events].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section id="activities" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <Reveal>
        <SectionTitle>{t(activities.title)}</SectionTitle>
        <p className="-mt-4 mb-8 max-w-2xl text-lg font-medium">{t(activities.lead)}</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((e, i) => (
          <Reveal key={e.date} delay={i * 0.08}>
            <EventCard e={e} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a href="#/events" className="mt-8 inline-block rounded-full border-2 border-navy px-6 py-3 font-extrabold transition hover:bg-navy hover:text-white">
          {t(activities.seeAll)} →
        </a>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  const links = [
    { href: '#/inside', label: pages.inside },
    { href: '#/events', label: pages.events },
    { href: '#/life', label: pages.life },
    { href: '#/team', label: pages.team },
    { href: '#request', label: pages.request },
  ]
  return (
    <footer className="bg-navy py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-[Anton] text-2xl tracking-wide">OIC TISA</div>
          <p className="mt-1 text-sm opacity-80">
            {t(site.place)} · {t(site.meeting)}
          </p>
        </div>
        <nav className="grid content-start gap-1 text-sm font-bold">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-85 hover:opacity-100 hover:underline">
              {t(l.label)}
            </a>
          ))}
        </nav>
        <div>
          <p className="text-sm">{t(footer.join)}</p>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-2 inline-block rounded-full bg-sun px-5 py-2 font-extrabold text-navy">
            Instagram {site.instagramHandle} ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
