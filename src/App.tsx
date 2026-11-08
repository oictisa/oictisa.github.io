import { useEffect, useState } from 'react'
import { Header } from '@/components/site/Header'
import { Hero } from '@/components/site/Hero'
import { RequestForm } from '@/components/site/RequestForm'
import { About, Activities, Footer, Numbers } from '@/components/site/Sections'
import { LangProvider } from '@/i18n'
import { Admin } from '@/pages/Admin'

// The admin page lives at  …/#/admin  (hash routing works on GitHub Pages).
function useIsAdmin() {
  const [admin, setAdmin] = useState(() => location.hash.startsWith('#/admin'))
  useEffect(() => {
    const on = () => setAdmin(location.hash.startsWith('#/admin'))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return admin
}

export default function App() {
  const admin = useIsAdmin()
  return (
    <LangProvider>
      {admin ? (
        <Admin />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Activities />
            <Numbers />
            <RequestForm />
          </main>
          <Footer />
        </>
      )}
    </LangProvider>
  )
}
