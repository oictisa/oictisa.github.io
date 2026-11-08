import { Bar } from '@/components/charts/bar'
import { BarChart } from '@/components/charts/bar-chart'
import { BarXAxis } from '@/components/charts/bar-x-axis'
import { about, activities, footer, numbers, site } from '@/content'
import { useLang } from '@/i18n'
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

export function Activities() {
  const { t } = useLang()
  return (
    <section id="activities" className="scroll-mt-20 bg-cream-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle>{t(activities.title)}</SectionTitle>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {activities.items.map((a, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1}>
              <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex aspect-[16/9] items-center justify-center overflow-hidden" style={{ background: a.color }}>
                  {a.photo ? (
                    <img src={a.photo} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <span className="text-7xl transition duration-500 group-hover:scale-110 group-hover:rotate-6">{a.emoji}</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold">{t(a.title)}</h3>
                  <p className="mt-1 leading-relaxed">{t(a.text)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Numbers() {
  const { t } = useLang()
  return (
    <section id="numbers" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-3">
          <SectionTitle>{t(numbers.title)}</SectionTitle>
          {numbers.isSample && <span className="-mt-6 rounded-full bg-coral/30 px-3 py-1 text-xs font-bold">{t(numbers.sampleNote)}</span>}
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="grid gap-4">
          {numbers.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-3xl bg-navy p-5 text-white">
                <div className="font-[Anton] text-5xl text-sun">{s.value}</div>
                <div className="mt-1 text-sm font-bold">{t(s.label)}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border-2 border-navy bg-white p-5">
            <h3 className="font-extrabold">{t(numbers.chartTitle)}</h3>
            <BarChart data={numbers.chart} xDataKey="name" aspectRatio="16 / 10" margin={{ top: 36, right: 12, bottom: 32, left: 12 }} barGap={0.35}>
              <Bar dataKey="participants" fill="#5BA4E6" lineCap={12} showValue valueLabelColor="#1F3A5F" />
              <BarXAxis />
            </BarChart>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-navy py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="font-[Anton] text-2xl tracking-wide">OIC TISA</div>
          <p className="mt-1 text-sm opacity-80">
            {t(site.place)} · {t(site.meeting)}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm">{t(footer.join)}</p>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-2 inline-block rounded-full bg-sun px-5 py-2 font-extrabold text-navy">
            Instagram {site.instagramHandle} ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
