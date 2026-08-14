"use client"

import { useEffect, useState } from "react"

type Particle = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
  emoji: string
}

const SYMBOLS = ["❤️", "🧡", "🇲🇽", "🇨🇴", "✨", "🤍", "💛", "🌻", "🕊️"]

function createParticle(id: number): Particle {
  return {
    id,
    left: Math.random() * 100,
    size: 14 + Math.random() * 26,
    duration: 9 + Math.random() * 10,
    delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 120,
    opacity: 0.5 + Math.random() * 0.45,
    emoji: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  }
}

export function HeartParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(Array.from({ length: count }, (_, i) => createParticle(i)))
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom props
            "--drift": `${p.drift}px`,
            "--o": p.opacity,
            "--s": 1,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
