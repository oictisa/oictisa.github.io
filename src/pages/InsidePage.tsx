import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { activitiesPage as p, site } from '@/content'
import { inside } from '@/content-pages'
import { useLang } from '@/i18n'
import { CtaBand } from './EventsPage'

export function InsidePage() {
  const { t } = useLang()
  return (
    <>
      <PageHero kicker={inside.kicker} title={inside.title} lead={inside.lead} color="#7BC67E" emoji="🗓️" />

      {/* weekly meeting */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-[2rem] bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-bold text-sun">{t(inside.meetingTitle)}</p>
              <p className="font-display mt-1 text-3xl uppercase sm:text-4xl">{t(site.meeting)}</p>
              <p className="mt-1 font-medium opacity-85">📍 {t(inside.meetingRoom)}</p>
            </div>
            <span className="text-6xl">☕</span>
          </div>
        </Reveal>
      </section>

      {/* how an event is born */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display mb-8 text-4xl uppercase sm:text-5xl">{t(p.flowTitle)}</h2>
        </Reveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.flow.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <li className="relative h-full rounded-3xl border-2 border-navy bg-white p-6 shadow-[5px_5px_0_#1F3A5F]">
                <span className="absolute -top-4 left-5 grid size-9 place-items-center rounded-full bg-sun font-[Anton] text-lg">{i + 1}</span>
                <div className="mt-2 text-4xl">{s.icon}</div>
                <h3 className="mt-3 text-lg font-extrabold">{t(s.title)}</h3>
                <p className="mt-1 text-sm leading-relaxed">{t(s.text)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* what members do */}
      <section className="bg-cream-deep py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display mb-8 text-4xl uppercase sm:text-5xl">{t(inside.doTitle)}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inside.dos.map((d, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-3xl bg-white p-6">
                  <div className="text-3xl">{d.icon}</div>
                  <h3 className="mt-2 font-extrabold">{t(d.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{t(d.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* join */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="grid gap-6 rounded-[2rem] border-2 border-navy bg-white p-6 shadow-[8px_8px_0_#1F3A5F] sm:p-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-4xl uppercase sm:text-5xl">{t(p.joinTitle)}</h2>
              <p className="mt-4 leading-relaxed font-medium">{t(p.joinText)}</p>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-navy px-6 py-3 font-extrabold text-white">
                {t(p.joinCta)} ↗
              </a>
            </div>
            <ul className="grid content-center gap-3">
              {p.joinPoints.map((x, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 font-bold">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leaf text-white">✓</span>
                  {t(x)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  )
}
