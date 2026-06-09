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
