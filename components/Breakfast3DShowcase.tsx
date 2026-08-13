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
    <section className="relative overflow-hidden bg-background py-12 md:py-16 border-b border-border">
      {/* Red Ambient Glow matching ScratchUp Primary Theme */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Product Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LADO IZQUIERDO: Modelo 3D del Plato con los Colores de Marca */}
          <div className="lg:col-span-7 relative">
            
            {/* Contenedor del Visualizador 3D */}
            <div className="w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-border bg-card shadow-2xl relative backdrop-blur-xl transition-all duration-300">
              
              {/* Badge discreto 360° */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/80 backdrop-blur-md border border-border text-foreground text-xs font-semibold shadow-md">
                <RotateCw className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '12s' }} />
                <span>Vista 360° Interactiva</span>
              </div>

              {/* Tag de Precio */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs shadow-md">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>$24.000 COP</span>
              </div>

              {/* Componente 3D Canvas de Pancakes.glb */}
              <ModelViewer modelUrl="/models/pancakes.glb" />

              {/* Pie de foto instructivo */}
              <div className="absolute bottom-3 left-4 right-4 z-10 text-center pointer-events-none">
                <span className="text-[11px] text-muted-foreground bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border">
                  Gira o amplía el plato para apreciar los detalles de la preparación
                </span>
              </div>
            </div>

          </div>

          {/* LADO DERECHO: Copywriting Elegante & Colores Originales (Rojo ScratchUp / Blanco / Negro) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Especialidad de la Casa</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Pancakes Gourmet & <br />
                <span className="text-primary">Café de Especialidad</span>
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Pancakes artesanales recién dorados con fresas del campo, arándanos orgánicos y miel pura. Acompañado de nuestro café espresso de origen seleccionado.
              </p>
            </div>

            {/* Valoración y Garantía */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9 / 5</span>
              <span className="text-muted-foreground">• El desayuno preferido en ScratchUp</span>
            </div>

            {/* Puntos destacados con colores corporativos */}
            <div className="space-y-2 pt-1 border-t border-border">
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

            {/* Acciones de Pedido */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOrdered(true)}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                  ordered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-primary hover:opacity-90 text-primary-foreground'
                }`}
              >
                {ordered ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a tu Pedido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ordenar Desayuno ($24.000)</span>
                  </>
                )}
              </button>

              <a
                href="#coworking"
                className="px-5 py-3.5 rounded-xl border border-border hover:border-primary text-foreground font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary"
              >
                <Coffee className="w-4 h-4 text-primary" />
                <span>Reservar Mesa</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
