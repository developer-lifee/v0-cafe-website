'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sparkles, Coffee, ShoppingBag, RotateCw, Check, Star, Flame } from 'lucide-react'

const ModelViewer = dynamic(() => import('./ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] bg-secondary/30 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-border">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-semibold text-foreground">Cargando preparación...</p>
    </div>
  )
})

export default function Breakfast3DShowcase() {
  const [ordered, setOrdered] = useState(false)

  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-20 border-b border-border">
      {/* Red Ambient Glow matching ScratchUp Primary Theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* TÍTULO Y CABECERA POR ENCIMA DE LA IMAGEN 3D */}
        <div className="space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Especialidad Gastronómica de la Casa</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            Pancakes Gourmet & <br />
            <span className="text-primary">Café de Especialidad</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Pancakes artesanales recién dorados con fresas del campo, arándanos orgánicos y miel pura. Acompañado de nuestro café espresso de origen seleccionado.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs pt-1">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-foreground">4.9 / 5</span>
            <span className="text-muted-foreground">• El desayuno preferido en ScratchUp</span>
          </div>
        </div>

        {/* VISUALIZADOR 3D CENTRADO */}
        <div className="relative max-w-3xl mx-auto mb-10">
          <div className="w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-border bg-card shadow-2xl relative backdrop-blur-xl transition-all duration-300">
            
            {/* Badge discreto 360° */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/80 backdrop-blur-md border border-border text-foreground text-xs font-semibold shadow-md">
              <RotateCw className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '12s' }} />
              <span>Vista 360° Interactiva</span>
            </div>

            {/* Tag de Precio */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs shadow-md">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>$24.000 COP</span>
            </div>

            {/* Componente 3D Canvas de Pancakes.glb */}
            <ModelViewer modelUrl="/models/pancakes.glb" />

            {/* Pie de foto instructivo */}
            <div className="absolute bottom-3 left-4 right-4 z-10 text-center pointer-events-none">
              <span className="text-[11px] text-muted-foreground bg-background/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-border shadow-sm">
                Gira o amplía el plato para apreciar los detalles de la preparación
              </span>
            </div>
          </div>
        </div>

        {/* BENEFICIOS Y ACCIONES DE PEDIDO POR DEBAJO */}
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="grid sm:grid-cols-2 gap-3 text-left bg-card/60 p-4 rounded-2xl border border-border">
            {[
              'Ingredientes 100% frescos preparados al instante',
              'Incluye bebida caliente de la barra de especialidad',
              'Opción de masa tradicional o proteica / avena',
              'Espacio de trabajo & Wi-Fi de alta velocidad'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setOrdered(true)}
              className={`w-full sm:w-auto min-w-[240px] py-4 px-8 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-95 ${
                ordered
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary hover:opacity-90 text-primary-foreground shadow-primary/20'
              }`}
            >
              {ordered ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Agregado a tu Pedido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ordenar Desayuno ($24.000)</span>
                </>
              )}
            </button>

            <a
              href="#coworking"
              className="w-full sm:w-auto min-w-[200px] py-4 px-8 rounded-2xl border border-border hover:border-primary text-foreground font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary"
            >
              <Coffee className="w-5 h-5 text-primary" />
              <span>Reservar Mesa</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}
