"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Heart, X, Eye, Sparkles, MessageCircle, Plane, MapPin, Utensils } from "lucide-react"
import { Confetti } from "@/components/confetti"

type Card = {
  id: string
  tag: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  text: string
  emoji: string
}

const CARDS: Card[] = [
  {
    id: "match",
    tag: "Es un match",
    icon: Sparkles,
    title: "Todo empezó en Badoo",
    text: "Un swipe en 2022 y de todos los perfiles del mundo, te encontré a ti. El mejor match de mi vida.",
    emoji: "💫",
  },
  {
    id: "eyes",
    tag: "Lo que amo",
    icon: Eye,
    title: "Tus ojos café avellana",
    text: "Esos que cambian de color cuando les da el sol. Podría perderme en ellos todo el día.",
    emoji: "👀",
  },
  {
    id: "tattoos",
    tag: "Lo que amo",
    icon: Sparkles,
    title: "Cada uno de tus tatuajes",
    text: "Amo cada historia dibujada en tu piel. Cada línea me cuenta un pedacito más de ti.",
    emoji: "🌹",
  },
  {
    id: "cooking",
    tag: "Lo que me encanta",
    icon: Utensils,
    title: "Tus huevos con chile",
    text: "Verte cocinar en videollamada siempre me da hambre. Muero por probar tus huevos con chile y desayunar juntos.",
    emoji: "🍳🌶️",
  },
  {
    id: "distance",
    tag: "Nosotros",
    icon: Plane,
    title: "Daly City y Colombia",
    text: "Tú mexicana en California, yo en Colombia. Sé que he estado ocupado, pero hago todo por sacar el tiempo para ti.",
    emoji: "✈️",
  },
  {
    id: "lucky",
    tag: "Detalle tuyo",
    icon: Sparkles,
    title: "Tu número es el 87",
    text: "Sí, me acuerdo. Pongo atención hasta en lo más pequeño de ti, porque cada detalle tuyo es mi favorito también.",
    emoji: "🍀",
  },
  {
    id: "now",
    tag: "Hoy",
    icon: MessageCircle,
    title: "Te elijo, aquí y ahora",
    text: "Después de todo este camino, solo me queda una pregunta para ti. Desliza una más...",
    emoji: "💍",
  },
]

const NOPE_TAUNTS = [
  "Jajaja, por ahí no",
  "El 'nel' no existe aquí",
  "Solo se puede a la derecha, mi amor",
  "Nice try, desliza a la derecha",
]

function CardFace({ card, dim }: { card: Card; dim?: boolean }) {
  const Icon = card.icon
  return (
    <div
      className={`flex h-full w-full flex-col justify-between rounded-[2rem] border border-primary/15 bg-card p-7 shadow-xl shadow-primary/10 ${
        dim ? "opacity-90" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
          <Icon className="size-3.5" /> {card.tag}
        </span>
        <span className="text-3xl" aria-hidden="true">
          {card.emoji}
        </span>
      </div>

      <div className="py-6">
        <h3 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {card.title}
        </h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {card.text}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" /> Badoo · 2022
        </span>
        <span className="font-script text-lg text-primary">desliza →</span>
      </div>
    </div>
  )
}

export function SwipeDeck() {
  const [index, setIndex] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null)
  const [taunt, setTaunt] = useState<string | null>(null)
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 })
  const startRef = useRef<{ x: number; y: number } | null>(null)

  const isLast = index === CARDS.length - 1
  const current = CARDS[index]

  const reset = useCallback(() => {
    setDrag({ x: 0, y: 0 })
    setDragging(false)
    startRef.current = null
  }, [])

  const commitRight = useCallback(() => {
    setLeaving("right")
    setTaunt(null)
    window.setTimeout(() => {
      if (isLast) {
        setAccepted(true)
      } else {
        setIndex((i) => i + 1)
      }
      setLeaving(null)
      reset()
    }, 320)
  }, [isLast, reset])

  const rejectLeft = useCallback(() => {
    // Left swipe is not allowed — the card springs back and teases.
    setTaunt(NOPE_TAUNTS[index % NOPE_TAUNTS.length])
    reset()
  }, [index, reset])

  const onPointerDown = (e: React.PointerEvent) => {
    if (leaving) return
    startRef.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !startRef.current) return
    setDrag({
      x: e.clientX - startRef.current.x,
      y: (e.clientY - startRef.current.y) * 0.35,
    })
  }

  const onPointerUp = () => {
    if (!dragging) return
    const threshold = 110
    if (drag.x > threshold) {
      commitRight()
    } else if (drag.x < -threshold) {
      rejectLeft()
    } else {
      reset()
    }
  }

  useEffect(() => {
    if (!taunt) return
    const t = window.setTimeout(() => setTaunt(null), 1800)
    return () => window.clearTimeout(t)
  }, [taunt])

  useEffect(() => {
    setNoButtonOffset({ x: 0, y: 0 })
  }, [index])

  const handleNoHover = () => {
    // Flee to a random offset within bounds
    const randomX = (Math.random() - 0.5) * 240
    const randomY = (Math.random() - 0.5) * 160
    setNoButtonOffset({ x: randomX, y: randomY })
  }

  if (accepted) {
    return (
      <>
        <Confetti />
        <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-4 text-center">
          <div className="flex items-center gap-3 text-4xl sm:text-6xl">
            <span aria-hidden="true">🇲🇽</span>
            <span className="text-5xl sm:text-7xl" style={{ animation: "heartbeat 1.3s ease-in-out infinite" }}>
              ❤️
            </span>
            <span aria-hidden="true">🇨🇴</span>
          </div>
          <h2
            className="mt-6 font-script text-5xl text-primary sm:text-7xl"
            style={{ animation: "pop-in 0.6s ease-out" }}
          >
            ¡Finalmente Novios! 💖
          </h2>
          <p className="mt-5 text-pretty font-serif text-base leading-relaxed text-foreground sm:text-lg">
            Ruby, después de tantas risas en videollamada, de platicar a la distancia
            y de quedarme con las ganas de probar tus deliciosos huevos con chile,
            ¡por fin es oficial! No importa la distancia que separa a Colombia de Daly City:
            tú y yo hoy empezamos la etapa más bonita de nuestra historia.
          </p>
          <div className="mt-8 rounded-3xl border border-primary/20 bg-card/70 px-6 py-5 shadow-sm backdrop-blur-sm">
            <p className="font-script text-3xl text-primary sm:text-4xl">Te amo con todo mi corazón, Ruby Ramírez</p>
            <p className="mt-1 text-sm text-muted-foreground">Tuyo, desde Colombia hasta Daly City — hoy y siempre 👩‍❤️‍👨</p>
          </div>
        </div>
      </>
    )
  }

  const rotation = drag.x / 18
  const likeOpacity = Math.max(0, Math.min(1, drag.x / 90))
  const nopeOpacity = Math.max(0, Math.min(1, -drag.x / 90))

  const leavingTransform =
    leaving === "right"
      ? "translateX(140%) rotate(22deg)"
      : leaving === "left"
        ? "translateX(-140%) rotate(-22deg)"
        : null

  return (
    <div className="relative z-10 flex w-full max-w-md flex-col items-center px-2">
      <div className="mb-6 text-center">
        <p className="font-script text-3xl text-primary sm:text-4xl">Para Ruby Ramírez</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Desliza las cartas a la <span className="font-semibold text-primary">derecha</span> para revivir lo nuestro
        </p>
      </div>

      {/* Deck */}
      <div className="relative h-[26rem] w-full select-none sm:h-[28rem]">
        {/* Next card peeking behind */}
        {index + 1 < CARDS.length && (
          <div className="absolute inset-0 scale-[0.94] translate-y-3" aria-hidden="true">
            <CardFace card={CARDS[index + 1]} dim />
          </div>
        )}

        {/* Active card */}
        <div
          key={current.id}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          style={{
            transform: leavingTransform ?? `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`,
            transition: dragging ? "none" : "transform 0.32s cubic-bezier(0.22,1,0.36,1)",
            animation: !dragging && !leaving && drag.x === 0 ? "card-enter 0.4s ease-out" : undefined,
          }}
        >
          {/* LIKE stamp */}
          <div
            className="pointer-events-none absolute left-5 top-6 z-10 rounded-xl border-4 border-primary px-3 py-1 text-2xl font-extrabold uppercase tracking-wider text-primary"
            style={{ opacity: likeOpacity, transform: "rotate(-16deg)" }}
          >
            Me gusta
          </div>
          {/* NOPE stamp */}
          <div
            className="pointer-events-none absolute right-5 top-6 z-10 rounded-xl border-4 border-muted-foreground px-3 py-1 text-2xl font-extrabold uppercase tracking-wider text-muted-foreground"
            style={{ opacity: nopeOpacity, transform: "rotate(16deg)" }}
          >
            Nel
          </div>

          <CardFace card={current} />
        </div>
      </div>

      {/* Taunt when trying to swipe left */}
      <p
        className="mt-4 h-6 text-sm font-medium text-primary"
        style={{ animation: taunt ? "hint-nudge 0.5s ease" : undefined }}
      >
        {taunt}
      </p>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-6 relative min-h-[4.5rem] w-full">
        {isLast ? (
          <>
            <button
              onClick={commitRight}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 z-10"
              style={{ animation: "heartbeat 1.6s ease-in-out infinite" }}
            >
              <Heart className="size-5 fill-current" /> ¡Sí!
            </button>
            <button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={handleNoHover}
              className="absolute flex items-center justify-center rounded-full border border-border bg-card px-8 py-4 text-lg font-bold text-muted-foreground shadow-md transition-all duration-200"
              style={{
                transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                left: noButtonOffset.x || noButtonOffset.y ? undefined : '55%',
              }}
            >
              No
            </button>
          </>
        ) : (
          <>
            <button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={rejectLeft}
              aria-label="Deslizar a la izquierda (no permitido)"
              className="absolute flex size-14 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-all duration-200"
              style={{
                transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                left: noButtonOffset.x || noButtonOffset.y ? undefined : '20%',
              }}
            >
              <X className="size-6" />
            </button>

            <button
              onClick={commitRight}
              aria-label="Deslizar a la derecha (me gusta)"
              className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 z-10"
              style={{
                left: '55%',
              }}
            >
              <Heart className="size-7 fill-current" />
            </button>
          </>
        )}
      </div>

      {/* Progress */}
      <div className="mt-6 flex items-center gap-2">
        {CARDS.map((c, i) => (
          <span
            key={c.id}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-primary" : i < index ? "w-2 bg-primary/50" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
