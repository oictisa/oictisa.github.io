import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { site, type T } from '@/content'
import { life, type Guide } from '@/content-pages'
import { useLang } from '@/i18n'

function List({ title, items, ordered }: { title: T; items: T[]; ordered?: boolean }) {
  const { t } = useLang()
  if (!items.length) return null
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <div>
      <h4 className="mb-2 text-sm font-extrabold tracking-wide uppercase opacity-70">{t(title)}</h4>
      <Tag className="grid gap-2">
        {items.map((x, i) => (
          <li key={i} className="flex gap-3 leading-relaxed">
            <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-extrabold ${ordered ? 'bg-navy text-white' : 'bg-sun'}`}>{ordered ? i + 1 : '•'}</span>
            <span>{t(x)}</span>
          </li>
        ))}
      </Tag>
    </div>
  )
}

function GuideCard({ g, n, open, onToggle }: { g: Guide; n: number; open: boolean; onToggle: () => void }) {
  const { t } = useLang()
  return (
    <article id={`guide-${g.id}`} className="scroll-mt-24 overflow-hidden rounded-3xl border-2 border-navy bg-white shadow-[6px_6px_0_#1F3A5F]">
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-4 p-5 text-left sm:p-6">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: g.color }}>
          {g.icon}
        </span>
        <span className="flex-1">
          <span className="text-xs font-extrabold opacity-60">STEP {n}</span>
          <span className="block text-xl font-extrabold sm:text-2xl">{t(g.title)}</span>
          <span className="mt-1 block leading-relaxed">{t(g.summary)}</span>
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-navy text-xl font-bold">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid gap-6 border-t-2 border-dashed border-navy/20 p-5 sm:p-6 md:grid-cols-2">
              <List title={life.bringTitle} items={g.bring} />
              <List title={life.stepsTitle} items={g.steps} ordered />
              <div className="md:col-span-2">
                <div className="rounded-2xl bg-cream p-4">
                  <List title={life.tipsTitle} items={g.tips} />
                </div>
              </div>
              {g.links.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="mb-2 text-sm font-extrabold tracking-wide uppercase opacity-70">{t(life.linksTitle)}</h4>
                  <div className="flex flex-wrap gap-2">
                    {g.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="rounded-full border-2 border-navy px-4 py-2 text-sm font-extrabold hover:bg-navy hover:text-white">
                        {t(l.label)} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export function LifePage() {
  const { t } = useLang()
  const [open, setOpen] = useState<string | null>(life.guides[0].id)

  const jump = (id: string) => {
    setOpen(id)
    requestAnimationFrame(() => document.getElementById(`guide-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <PageHero kicker={life.kicker} title={life.title} lead={life.lead} color="#5BA4E6" emoji="🧭" />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <Reveal>
          <h2 className="font-display mb-5 text-3xl uppercase sm:text-4xl">{t(life.orderTitle)}</h2>
          <ol className="flex flex-wrap items-center gap-2">
            {life.guides.map((g, i) => (
              <li key={g.id} className="flex items-center gap-2">
                <button onClick={() => jump(g.id)} className="flex items-center gap-2 rounded-full border-2 border-navy bg-white px-4 py-2 font-extrabold transition hover:-translate-y-0.5" style={{ boxShadow: `0 3px 0 ${g.color}` }}>
                  <span className="font-[Anton]">{i + 1}</span> {g.icon} {t(g.title)}
                </button>
                {i < life.guides.length - 1 && <span aria-hidden className="font-bold opacity-40">→</span>}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm font-medium opacity-75">💡 {t(life.orderNote)}</p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {life.guides.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.05}>
              <GuideCard g={g} n={i + 1} open={open === g.id} onToggle={() => setOpen(open === g.id ? null : g.id)} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 rounded-2xl border-2 border-dashed border-navy/30 p-4 text-sm leading-relaxed">⚠️ {t(life.disclaimer)}</p>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-3xl uppercase sm:text-4xl">{t(life.stuckTitle)}</p>
            <p className="mt-1 font-medium opacity-85">{t(life.stuckText)}</p>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-sun px-6 py-3 font-extrabold text-navy">
            Instagram {site.instagramHandle} ↗
          </a>
        </div>
      </section>
    </>
  )
}
