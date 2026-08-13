'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sparkles, Utensils, Coffee, ShoppingBag, Eye, RotateCw, CheckCircle, Star, Heart, Flame } from 'lucide-react'

const ModelViewer = dynamic(() => import('./ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] bg-amber-950/20 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-amber-500/20">
      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-semibold text-amber-200">Cargando Modelo 3D Interactivo...</p>
      <span className="text-xs text-amber-400/80 mt-1">Plato Estrella: Pancakes Gourmet ScratchUp</span>
    </div>
  )
})

export default function Breakfast3DShowcase() {
  const [ordered, setOrdered] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null)

  const ingredients = [
    { name: 'Pancakes Artesanales', desc: 'Masa dorada y esponjosa hecha al momento', icon: '🥞' },
    { name: 'Miel de Abejas Pura', desc: 'Recolectada de apicultores locales colombianos', icon: '🍯' },
    { name: 'Frutos Rojos Frescos', desc: 'Fresas y arándanos de cultivo orgánico', icon: '🍓' },
    { name: 'Café de Especialidad', desc: 'Espresso doble con notas a cacao y avellanas', icon: '☕' }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-950/40 via-background to-background py-16 md:py-24 border-b border-border/50">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Header Badge */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Experiencia Gastronómica 3D Interactiva</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Nuestro Desayuno Estrella en <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 bg-clip-text text-transparent">
              Modelo 3D Interactivo
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explora nuestro famoso <strong className="text-foreground">Desayuno Gourmet ScratchUp</strong> en 360° antes de realizar tu pedido. Pancakes artesanales, miel de origen y café recién colado.
          </p>
        </div>

        {/* Grid de Presentación 3D + Información del Producto */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LADO IZQUIERDO: Visualizador 3D Interactivo */}
          <div className="lg:col-span-7 relative group">
            
            {/* Contenedor Marco 3D */}
            <div className="w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-stone-900/90 to-amber-950/80 shadow-2xl relative backdrop-blur-xl transition-all duration-300 group-hover:border-amber-500/50">
              
              {/* Badge Flotante 3D */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-semibold shadow-lg">
                <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>Gira 360° e Interactúa</span>
              </div>

              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 text-black font-extrabold text-xs shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>$24.000 COP</span>
              </div>

              {/* Componente 3D Canvas con Pancakes.glb */}
              <ModelViewer modelUrl="/models/pancakes.glb" />

              {/* Overlay Inferior de Ayuda */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-amber-200/90">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Arrastra con el ratón o dedo para rotar el plato</span>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-amber-400/80">RENDER 3D WEBGL</span>
              </div>
            </div>

            {/* Chips de Ingredientes Interactivos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              {ingredients.map((ing, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIngredient(selectedIngredient === ing.name ? null : ing.name)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                    selectedIngredient === ing.name
                      ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg scale-105'
                      : 'bg-card/60 hover:bg-card border-border text-foreground hover:border-amber-500/40'
                  }`}
                >
                  <div className="text-lg mb-1">{ing.icon}</div>
                  <div className="text-xs font-bold truncate">{ing.name}</div>
                  <div className="text-[10px] opacity-80 line-clamp-1">{ing.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* LADO DERECHO: Tarjeta de Detalles & Compra */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-muted-foreground">(4.9/5 de 180+ valoraciones)</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Pancakes Gourmet & Combo Café Especial
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Preparados diariamente con masa de avena y banana, coronados con fresas frescas, arándanos orgánicos, miel de abejas pura y acompañados de tu café favorito.
              </p>
            </div>

            {/* Beneficios Incluidos */}
            <div className="space-y-2.5 pt-2">
              {[
                'Incluye Café de Especialidad (Americano, Latte o Cappuccino)',
                '100% Granos Seleccionados de Finca Colombiana',
                'Opción de Masa Tradicional o Fit / Proteica',
                'Espacio de Trabajo & Wi-Fi de alta velocidad incluido'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Precio & Botón de Pedido */}
            <div className="p-5 rounded-2xl bg-card border border-amber-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground d-block">Precio Especial de Desayuno:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-amber-400">$24.000</span>
                    <span className="text-xs text-muted-foreground">COP</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  Disponible Hoy
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => setOrdered(true)}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                    ordered
                      ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/25'
                  }`}
                >
                  {ordered ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>¡Desayuno Agregado a la Mesa!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ordenar Desayuno 3D</span>
                    </>
                  )}
                </button>

                <a
                  href="#coworking"
                  className="px-5 py-3.5 rounded-xl border border-border hover:border-amber-500/40 text-foreground font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:bg-secondary"
                >
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Reservar Mesa</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
