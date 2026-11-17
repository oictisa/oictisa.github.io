import { useEffect, type ReactNode } from 'react'
import { Header } from '@/components/site/Header'
import { Hero } from '@/components/site/Hero'
import { RequestForm } from '@/components/site/RequestForm'
import { About, Explore, Footer, RecentEvents } from '@/components/site/Sections'
import { LangProvider } from '@/i18n'
import { Admin } from '@/pages/Admin'
import { EventsPage } from '@/pages/EventsPage'
import { InsidePage } from '@/pages/InsidePage'
import { LifePage } from '@/pages/LifePage'
import { TeamPage } from '@/pages/TeamPage'
import { useRoute } from '@/router'

const subPages: Record<string, () => ReactNode> = {
  inside: InsidePage,
  events: EventsPage,
  life: LifePage,
  team: TeamPage,
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Explore />
      <RecentEvents />
      <RequestForm />
    </>
  )
}

function Site() {
  const { page, anchor } = useRoute()

  // New page → top. "#request" style anchor → scroll to that section once it exists.
  useEffect(() => {
    if (!anchor) {
      window.scrollTo({ top: 0 })
      return
    }
    // wait a moment so the home page has laid out before jumping
    const id = setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 80)
    return () => clearTimeout(id)
  }, [page, anchor])

  if (page === 'admin') return <Admin />
  const Page = subPages[page] ?? Home
  return (
    <>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
