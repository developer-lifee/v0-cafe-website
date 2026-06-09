import type { Metadata } from 'next'
import { Fraunces, Caveat } from 'next/font/google'
import { HeartParticles } from "@/components/heart-particles"
import { SwipeDeck } from "@/components/swipe-deck"

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: 'Para Ruby ❤️',
  description: 'Una pregunta importante para ti, Ruby Ramirez',
}

export default function Page() {
  return (
    <main 
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background px-5 py-12 ${fraunces.variable} ${caveat.variable}`}
      style={{
        '--font-script': caveat.style.fontFamily,
        '--font-serif': fraunces.style.fontFamily,
        '--background': 'oklch(0.96 0.022 75)',
        '--foreground': 'oklch(0.3 0.05 40)',
        '--card': 'oklch(0.99 0.012 80)',
        '--card-foreground': 'oklch(0.3 0.05 40)',
        '--primary': 'oklch(0.58 0.16 35)',
        '--primary-foreground': 'oklch(0.99 0.01 80)',
        '--secondary': 'oklch(0.91 0.04 80)',
        '--secondary-foreground': 'oklch(0.38 0.07 45)',
        '--muted': 'oklch(0.93 0.025 78)',
        '--muted-foreground': 'oklch(0.5 0.05 50)',
        '--accent': 'oklch(0.62 0.1 175)',
        '--accent-foreground': 'oklch(0.98 0.01 80)',
        '--border': 'oklch(0.86 0.03 70)',
        '--ring': 'oklch(0.58 0.16 35)',
      } as React.CSSProperties}
    >
      {/* We apply a wrapper class to resolve fonts locally */}
      <div 
        className="w-full flex justify-center"
        style={{
          '--font-script': caveat.style.fontFamily,
          '--font-serif': fraunces.style.fontFamily,
          fontFamily: fraunces.style.fontFamily,
        } as React.CSSProperties}
      >
        <HeartParticles count={28} />
        <SwipeDeck />
      </div>
    </main>
  )
}
