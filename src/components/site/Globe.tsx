import { animate, stagger, svg } from 'animejs'
import { useEffect, useRef } from 'react'

/** TISA-style globe mark. Anime.js draws the lines in, then the orbit ring keeps spinning. */
export function Globe({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const draws = animate(svg.createDrawable(root.querySelectorAll('.draw')), {
      draw: ['0 0', '0 1'],
      duration: 1400,
      delay: stagger(140),
      ease: 'inOutQuad',
    })
    const pop = animate(root.querySelectorAll('.dot'), {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(90, { start: 900 }),
      duration: 500,
      ease: 'outBack',
    })
    const orbit = animate(root.querySelector('.orbit')!, {
      rotate: 360,
      duration: 18000,
      loop: true,
      ease: 'linear',
    })
    return () => {
      draws.revert()
      pop.revert()
      orbit.revert()
    }
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 240 240" className={className} role="img" aria-label="TISA globe">
      <circle cx="120" cy="120" r="80" fill="#5BA4E6" />
      {/* continents */}
      <path className="draw" d="M62 98c18-20 46-16 52 4s-14 24-6 46 30 18 34 34" fill="none" stroke="#7BC67E" strokeWidth="16" strokeLinecap="round" />
      <path className="draw" d="M140 52c4 20 26 26 32 48" fill="none" stroke="#7BC67E" strokeWidth="14" strokeLinecap="round" />
      {/* meridians */}
      <ellipse className="draw" cx="120" cy="120" rx="36" ry="80" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
      <path className="draw" d="M40 120h160" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
      {/* orbit ring */}
      <g className="orbit" style={{ transformOrigin: '120px 120px', transformBox: 'view-box' }}>
        <ellipse cx="120" cy="120" rx="112" ry="34" fill="none" stroke="#F5C518" strokeWidth="9" transform="rotate(-18 120 120)" />
        <circle className="dot" cx="226" cy="86" r="9" fill="#F59E8B" />
      </g>
      <circle className="dot" cx="196" cy="186" r="7" fill="#F5C518" />
      <circle className="dot" cx="40" cy="62" r="6" fill="#7BC67E" />
    </svg>
  )
}
