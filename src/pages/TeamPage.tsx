import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { team } from '@/content-pages'
import { useLang } from '@/i18n'
import { CtaBand } from './EventsPage'

export function TeamPage() {
  const { t } = useLang()
  return (
    <>
      <PageHero kicker={team.kicker} title={team.title} lead={team.lead} color="#F59E8B" emoji="👋" />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m, i) => {
            const filled = !!m.name
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <article className="h-full overflow-hidden rounded-3xl border-2 border-navy bg-white shadow-[5px_5px_0_#1F3A5F]">
                  <div className="flex aspect-[4/3] items-center justify-center" style={{ background: m.color }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="size-full object-cover" loading="lazy" />
                    ) : (
                      <span className="grid size-28 place-items-center rounded-full bg-white/60 font-[Anton] text-5xl">{filled ? m.name.slice(0, 1).toUpperCase() : '?'}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="inline-block rounded-full bg-navy px-3 py-0.5 text-xs font-extrabold text-white">{t(m.role)}</p>
                    {filled ? (
                      <>
                        <h3 className="mt-2 text-xl font-extrabold">{m.name}</h3>
                        <p className="text-sm opacity-70">{[t(m.faculty), t(m.from)].filter(Boolean).join(' · ')}</p>
                        {t(m.message) && <p className="mt-2 text-sm leading-relaxed">“{t(m.message)}”</p>}
                      </>
                    ) : (
                      <p className="mt-2 font-bold opacity-50">{t(team.comingSoon)}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>
      <CtaBand />
    </>
  )
}
