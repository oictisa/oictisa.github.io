import { activities, type EventItem } from '@/content'
import { useLang } from '@/i18n'

const today = () => new Date().toISOString().slice(0, 10)

export function EventCard({ e }: { e: EventItem }) {
  const { t, lang } = useLang()
  const upcoming = e.date >= today()
  const date = new Date(e.date + 'T00:00:00').toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden" style={{ background: e.color }}>
        {e.photo ? (
          <img src={e.photo} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <span className="text-7xl transition duration-500 group-hover:scale-110 group-hover:rotate-6">{e.emoji}</span>
        )}
        {upcoming && <span className="absolute top-3 left-3 rounded-full bg-navy px-3 py-1 text-xs font-extrabold text-sun">★ {t(activities.upcoming)}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-extrabold opacity-60">
          {date} · 📍 {t(e.place)}
        </p>
        <h3 className="mt-1 text-xl font-extrabold">{t(e.title)}</h3>
        <p className="mt-2 flex-1 leading-relaxed">{t(e.text)}</p>
        <a href={e.link} target="_blank" rel="noreferrer" className="mt-4 self-start text-sm font-extrabold text-ocean underline-offset-4 hover:underline">
          {t(activities.more)}
        </a>
      </div>
    </article>
  )
}
