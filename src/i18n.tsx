import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, T } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (x: T) => string }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('tisa-lang')
    if (saved === 'en' || saved === 'ja') return saved
  } catch {
    /* storage blocked */
  }
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('tisa-lang', lang)
    } catch {
      /* storage blocked */
    }
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang, t: (x) => x[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
