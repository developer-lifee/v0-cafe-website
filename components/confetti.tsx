"use client"

import { useEffect, useState } from "react"

type Confetti = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  color: string
  emoji?: string
}

const COLORS = ["#ff4d6d", "#ff8fa3", "#ffb3c1", "#ffd166", "#ff70a6", "#fff0f3"]
const EMOJIS = ["❤️", "💖", "💕", "✨", "🌹", "💗"]

export function Confetti() {
  const [pieces, setPieces] = useState<Confetti[]>([])

  useEffect(() => {
    const arr: Confetti[] = Array.from({ length: 90 }, (_, i) => {
      const isEmoji = Math.random() > 0.55
      return {
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        emoji: isEmoji ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined,
      }
    })
    setPieces(arr)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: p.emoji ? `${p.size + 6}px` : undefined,
            width: p.emoji ? undefined : `${p.size}px`,
            height: p.emoji ? undefined : `${p.size * 0.6}px`,
            backgroundColor: p.emoji ? undefined : p.color,
            borderRadius: p.emoji ? undefined : "2px",
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
