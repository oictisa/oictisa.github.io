import { useEffect, useState } from 'react'

// Hash routing (works on GitHub Pages):
//   #/          home        #/events  exchange events
//   #/inside    inside TISA #/life    life support
//   #/team      team        #/admin   admin page
//   #request    home, scrolled to the section with id="request"
export type Route = { page: string; anchor: string | null }

export function parseHash(hash: string): Route {
  if (hash.startsWith('#/')) return { page: hash.slice(2).split(/[?#]/)[0] || 'home', anchor: null }
  return { page: 'home', anchor: hash.slice(1) || null }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(location.hash))
  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
