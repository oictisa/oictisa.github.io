import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { submitRequest, type RequestInput } from '@/api'
import { form as f, type T } from '@/content'
import { useLang } from '@/i18n'
import { Reveal } from './Reveal'

const empty = {
  name: '',
  contactType: 'email' as 'email' | 'instagram',
  contact: '',
  studentType: '',
  faculty: '',
  year: '',
  eventTags: [] as string[],
  eventDetail: '',
  timing: '',
  nationality: '',
  website: '',
}

type Errors = Partial<Record<'name' | 'contact' | 'studentType' | 'faculty' | 'year' | 'event' | 'consent', string>>

const inputCls =
  'w-full rounded-2xl border-2 border-navy/20 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean focus:ring-4 focus:ring-sky/25 aria-[invalid=true]:border-coral'

function Field({ label, optional, error, children, htmlFor }: { label: string; optional?: string; error?: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-extrabold">
        {label} {optional && <span className="font-medium opacity-60">({optional})</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm font-bold text-[#C2410C]">{error}</p>}
    </div>
  )
}

function Chips({ options, value, onChange, multi, t }: { options: { value: string; label: T }[]; value: string | string[]; onChange: (v: string) => void; multi?: boolean; t: (x: T) => string }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? 'group' : 'radiogroup'}>
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o.value) : value === o.value
        return (
          <button
            type="button"
            key={o.value}
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${on ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white hover:border-navy'}`}
          >
            {t(o.label)}
          </button>
        )
      })}
    </div>
  )
}

export function RequestForm() {
  const { t, lang } = useLang()
  const [v, setV] = useState(empty)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const set = <K extends keyof typeof empty>(k: K, val: (typeof empty)[K]) => setV((p) => ({ ...p, [k]: val }))

  function validate(): Errors {
    const e: Errors = {}
    const req = t(f.required)
    if (!v.name.trim()) e.name = req
    if (!v.contact.trim()) e.contact = req
    else if (v.contactType === 'email' && !/^\S+@\S+\.\S+$/.test(v.contact.trim())) e.contact = req
    if (!v.studentType) e.studentType = req
    if (!v.faculty) e.faculty = req
    if (!v.year) e.year = req
    if (!v.eventTags.length && !v.eventDetail.trim()) e.event = t(f.needEvent)
    if (!consent) e.consent = t(f.needConsent)
    return e
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setState('sending')
    try {
      const payload: RequestInput = { ...v, name: v.name.trim(), contact: v.contact.trim(), lang }
      await submitRequest(payload)
      setState('done')
      setV(empty)
      setConsent(false)
    } catch {
      setState('error')
    }
  }

  return (
    <section id="request" className="scroll-mt-20 bg-sun/90 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl uppercase sm:text-5xl">{t(f.title)}</h2>
          <p className="mt-3 text-lg font-medium">{t(f.lead)}</p>
        </Reveal>

        <div className="mt-8 rounded-[2rem] border-2 border-navy bg-cream p-5 shadow-[8px_8px_0_#1F3A5F] sm:p-8">
          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-10 text-center" role="status">
                <div className="font-display text-4xl">{t(f.doneTitle)}</div>
                <p className="mt-3 font-medium">{t(f.doneText)}</p>
                <button onClick={() => setState('idle')} className="mt-6 rounded-full border-2 border-navy px-5 py-2 font-extrabold hover:bg-navy hover:text-white">
                  {t(f.another)}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-6">
                {/* honeypot: hidden from people, bots fill it */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} className="hidden" aria-hidden="true" />

                <div id="f-name">
                  <Field label={t(f.name)} error={errors.name} htmlFor="name">
                    <input id="name" className={inputCls} value={v.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} autoComplete="nickname" />
                  </Field>
                </div>

                <div id="f-contact">
                  <Field label={t(f.contactType)} error={errors.contact} htmlFor="contact">
                    <div className="mb-2">
                      <Chips
                        t={t}
                        value={v.contactType}
                        onChange={(x) => set('contactType', x as 'email' | 'instagram')}
                        options={[
                          { value: 'email', label: f.contactEmail },
                          { value: 'instagram', label: f.contactInstagram },
                        ]}
                      />
                    </div>
                    <input
                      id="contact"
                      className={inputCls}
                      type={v.contactType === 'email' ? 'email' : 'text'}
                      placeholder={t(v.contactType === 'email' ? f.contactPlaceholderEmail : f.contactPlaceholderInstagram)}
                      value={v.contact}
                      onChange={(e) => set('contact', e.target.value)}
                      aria-invalid={!!errors.contact}
                    />
                  </Field>
                </div>

                <div id="f-studentType">
                  <Field label={t(f.studentType)} error={errors.studentType}>
                    <Chips t={t} options={f.studentTypes} value={v.studentType} onChange={(x) => set('studentType', x)} />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div id="f-faculty">
                    <Field label={t(f.faculty)} error={errors.faculty} htmlFor="faculty">
                      <select id="faculty" className={inputCls} value={v.faculty} onChange={(e) => set('faculty', e.target.value)} aria-invalid={!!errors.faculty}>
                        <option value="">—</option>
                        {f.faculties.map((o) => (
                          <option key={o.value} value={o.value}>
                            {t(o.label)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div id="f-year">
                    <Field label={t(f.year)} error={errors.year} htmlFor="year">
                      <select id="year" className={inputCls} value={v.year} onChange={(e) => set('year', e.target.value)} aria-invalid={!!errors.year}>
                        <option value="">—</option>
                        {f.years.map((o) => (
                          <option key={o.value} value={o.value}>
                            {t(o.label)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>

                <div id="f-event">
                  <Field label={t(f.event)} error={errors.event} htmlFor="event">
                    <p className="-mt-1 mb-2 text-sm opacity-70">{t(f.eventHint)}</p>
                    <div className="mb-3">
                      <Chips
                        multi
                        t={t}
                        options={f.eventTags}
                        value={v.eventTags}
                        onChange={(x) => setV((p) => ({ ...p, eventTags: p.eventTags.includes(x) ? p.eventTags.filter((y) => y !== x) : [...p.eventTags, x] }))}
                      />
                    </div>
                    <textarea id="event" rows={4} className={inputCls} placeholder={t(f.eventPlaceholder)} value={v.eventDetail} onChange={(e) => set('eventDetail', e.target.value)} aria-invalid={!!errors.event} />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label={t(f.timing)} optional={t(f.optional)} htmlFor="timing">
                    <input id="timing" className={inputCls} placeholder={t(f.timingPlaceholder)} value={v.timing} onChange={(e) => set('timing', e.target.value)} />
                  </Field>
                  <Field label={t(f.nationality)} optional={t(f.optional)} htmlFor="nationality">
                    <input id="nationality" className={inputCls} placeholder={t(f.nationalityPlaceholder)} value={v.nationality} onChange={(e) => set('nationality', e.target.value)} />
                  </Field>
                </div>

                <div id="f-consent">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4 text-sm font-medium">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 accent-[#1F3A5F]" />
                    <span>{t(f.consent)}</span>
                  </label>
                  {errors.consent && <p className="mt-1 text-sm font-bold text-[#C2410C]">{errors.consent}</p>}
                </div>

                {state === 'error' && (
                  <p className="rounded-2xl bg-coral/30 p-3 text-sm font-bold" role="alert">
                    {t(f.error)}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="justify-self-start rounded-full bg-navy px-8 py-4 text-lg font-extrabold text-white shadow-[0_5px_0_#F5C518] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-60"
                >
                  {state === 'sending' ? t(f.sending) : `${t(f.submit)} →`}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
