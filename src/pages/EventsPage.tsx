import { EventCard } from '@/components/site/EventCard'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { activities, activitiesPage as p } from '@/content'
import { pages } from '@/content-pages'
import { useLang } from '@/i18n'

export function EventsPage() {
  const { t } = useLang()
  const events = [...activities.events].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHero kicker={pages.events} title={p.title} lead={p.lead} color="#F5C518" emoji="🎉" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display mb-8 text-4xl uppercase sm:text-5xl">{t(p.typesTitle)}</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.types.map((x, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="flex h-full gap-4 rounded-3xl border-2 border-navy bg-white p-5 shadow-[5px_5px_0_#1F3A5F]">
                <span className="text-4xl">{x.icon}</span>
                <div>
                  <h3 className="font-extrabold">{t(x.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{t(x.text)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-deep py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display mb-8 text-4xl uppercase sm:text-5xl">{t(p.eventsTitle)}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <Reveal key={e.date + i} delay={(i % 3) * 0.08}>
                <EventCard e={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

/** "Have an idea? Request an event" band used at the bottom of sub-pages. */
export function CtaBand() {
  const { t } = useLang()
  return (
    <section className="bg-navy py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display text-3xl uppercase sm:text-4xl">{t({ en: 'Got an idea for an event?', ja: 'やってみたいイベントはある？' })}</p>
        <a href="#request" className="rounded-full bg-sun px-6 py-3 font-extrabold text-navy shadow-[0_4px_0_#fff] transition hover:-translate-y-0.5">
          {t(p.requestCta)} →
        </a>
      </div>
    </section>
  )
}
