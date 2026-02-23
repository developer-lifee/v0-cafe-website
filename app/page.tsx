'use client'

import { useState } from 'react'
import { Menu, X, Wifi, Monitor, Coffee, MapPin, Phone, Mail, Check, ChevronLeft, ChevronRight, Gift, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CaféPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHours, setSelectedHours] = useState([])
  const pricePerHour = 15000

  const [loyaltyPurchases, setLoyaltyPurchases] = useState(0)
  const [loyaltyTotal, setLoyaltyTotal] = useState(0)

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const toggleHour = (hour) => {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort((a, b) => a - b)
    )
  }

  const calculateTotal = () => {
    return selectedHours.length * pricePerHour
  }

  const calculateLoyaltyAverage = () => {
    if (loyaltyPurchases === 0) return 0
    return Math.round(loyaltyTotal / loyaltyPurchases)
  }

  const changeMonth = (offset) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + offset)
    setSelectedDate(newDate)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate)
    const firstDay = getFirstDayOfMonth(selectedDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isPast = date < new Date() && !isToday

      days.push(
        <button
          key={day}
          disabled={isPast}
          className={`h-10 rounded flex items-center justify-center text-sm font-medium transition ${isToday
              ? 'bg-primary text-primary-foreground'
              : isPast
                ? 'text-muted-foreground cursor-not-allowed opacity-50'
                : 'border border-border hover:border-primary'
            }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="SCRATCH UP Logo"
              width={32}
              height={40}
              className="w-8 h-10"
            />
            <span className="text-2xl font-bold">SCRATCH UP</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="#about" className="hover:text-primary transition">
              Sobre Nosotros
            </Link>
            <Link href="/menu" className="hover:text-primary transition font-semibold text-primary">
              Menú
            </Link>
            <Link href="#loyalty" className="hover:text-primary transition">
              Fidelidad
            </Link>
            <Link href="#coworking" className="hover:text-primary transition">
              Coworking
            </Link>
            <Link href="#contact" className="hover:text-primary transition">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-secondary border-t border-border px-4 py-4 flex flex-col gap-4">
            <Link href="#about" className="hover:text-primary transition">
              Sobre Nosotros
            </Link>
            <Link href="/menu" className="hover:text-primary transition font-semibold text-primary">
              Menú
            </Link>
            <Link href="#loyalty" className="hover:text-primary transition">
              Fidelidad
            </Link>
            <Link href="#coworking" className="hover:text-primary transition">
              Coworking
            </Link>
            <Link href="#contact" className="hover:text-primary transition">
              Contacto
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="mb-6 flex justify-center md:justify-start">
                <Image
                  src="/images/logo.png"
                  alt="SCRATCH UP"
                  width={80}
                  height={104}
                  className="w-20 h-26"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-primary">SCRATCH UP</span><br />
                Café Especializado
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Un espacio donde emprendedores y creativos pueden trabajar, conectar y disfrutar del mejor café artesanal. Ubicado en Engativá, Bogotá.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="https://maps.google.com/?q=SCRATCH+UP+Engativá+Bogotá"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition transform hover:scale-105"
                >
                  <MapPin className="w-5 h-5" />
                  Cómo Llegar
                </a>
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center bg-secondary text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/80 border border-border transition"
                >
                  Ver Menú
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="order-1 md:order-2 w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/images/fachada-final.jpeg"
                alt="Fachada de SCRATCH UP"
                fill
                className="object-cover hover:scale-105 transition duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Sobre SCRATCH UP</h2>
            <p className="text-lg text-muted-foreground mb-4">
              SCRATCH UP es el lugar perfecto para que emprendedores, startups y profesionales creativos desarrollen sus ideas mientras disfrutan de café artesanal de las mejores regiones colombianas.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Nuestros espacios están diseñados para que tu proyecto crezca, sin importar de dónde vengas ni cuán pequeño comiences. Ofrecemos WiFi premium, tecnología moderna y, por supuesto, el mejor café de la zona.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Café artesanal de especialidad</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Espacios diseñados para trabajar</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Comunidad de emprendedores</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Programa de fidelización</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-2 rounded-lg border border-border overflow-hidden">
            <Image
              src="/logo.png"
              alt="SCRATCH UP Café"
              width={500}
              height={400}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Loyalty Section */}
      <section id="loyalty" className="max-w-7xl mx-auto px-4 py-24">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center">Programa de Fidelización</h2>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Cada 9 compras, la décima bebida es gratis. Calculamos el promedio de tus 9 compras anteriores y esa bebida corre por nuestra cuenta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Loyalty Tracker */}
          <div className="bg-secondary border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Tu Progreso
            </h3>

            <div className="bg-background p-6 rounded-lg mb-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Compras realizadas</p>
                <p className="text-5xl font-bold text-primary">{loyaltyPurchases}/9</p>
              </div>

              {loyaltyPurchases > 0 && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total gastado</p>
                  <p className="text-xl font-bold mb-2">${loyaltyTotal.toLocaleString('es-CO')} COP</p>
                  <p className="text-sm text-muted-foreground mb-2">Promedio por compra</p>
                  <p className="text-lg font-bold text-primary">${calculateLoyaltyAverage().toLocaleString('es-CO')} COP</p>
                  {loyaltyPurchases === 9 && (
                    <div className="mt-4 p-3 bg-primary text-primary-foreground rounded-lg text-center font-bold">
                      ¡Tu próxima bebida es GRATIS por ${calculateLoyaltyAverage().toLocaleString('es-CO')} COP!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add Purchase Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-semibold mb-3">Registra tu compra</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Monto en COP"
                  id="purchase-amount"
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <button
                  onClick={() => {
                    const amount = parseInt(document.getElementById('purchase-amount').value)
                    if (amount > 0 && loyaltyPurchases < 9) {
                      setLoyaltyPurchases(loyaltyPurchases + 1)
                      setLoyaltyTotal(loyaltyTotal + amount)
                      document.getElementById('purchase-amount').value = ''
                    }
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Agregar
                </button>
              </div>
              {loyaltyPurchases > 0 && (
                <button
                  onClick={() => {
                    setLoyaltyPurchases(0)
                    setLoyaltyTotal(0)
                  }}
                  className="w-full mt-2 border border-border px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition"
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Cómo Funciona
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Realiza 9 compras</p>
                    <p className="text-sm opacity-90">Compra cualquier bebida o producto</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Calculamos el promedio</p>
                    <p className="text-sm opacity-90">Promediamos el valor de tus compras</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Bebida gratis</p>
                    <p className="text-sm opacity-90">Tu décima bebida es totalmente gratis</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Repite el ciclo</p>
                    <p className="text-sm opacity-90">Comienza nuevamente y sigue disfrutando</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <p className="text-sm">
                Este programa existe para recompensarte por tu lealtad y ayudarnos a llenar nuestros espacios con clientes como tú.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coworking Section */}
      <section id="coworking" className="max-w-7xl mx-auto px-4 py-24">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center">Espacios de Coworking</h2>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Selecciona las horas que necesitas y calcula el precio. Crecemos juntos llenando nuestros espacios con ideas brillantes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar and Hour Selection */}
          <div className="lg:col-span-2 bg-secondary border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Reserva tus Horas</h3>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-background rounded transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h4 className="text-lg font-semibold">
                {selectedDate.toLocaleString('es-CO', { month: 'long', year: 'numeric' })}
              </h4>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-background rounded transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-background p-4 rounded-lg mb-8">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </div>

            {/* Hours Selection */}
            <div>
              <h4 className="font-semibold mb-4">Selecciona tus Horas</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((hour) => (
                  <button
                    key={hour}
                    onClick={() => toggleHour(hour)}
                    className={`py-2 px-2 rounded text-sm font-medium transition ${selectedHours.includes(hour)
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border hover:border-primary'
                      }`}
                  >
                    {hour}:00
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary and Services */}
          <div className="flex flex-col gap-8">
            {/* Price Summary */}
            <div className="bg-primary text-primary-foreground p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Resumen</h3>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span>Horas seleccionadas:</span>
                  <span className="font-bold">{selectedHours.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio por hora:</span>
                  <span className="font-bold">$15.000 COP</span>
                </div>
                <div className="border-t border-primary-foreground pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">
                    ${calculateTotal().toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>
              <button className="w-full bg-primary-foreground text-primary py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Reservar Ahora
              </button>
            </div>

            {/* Services Included */}
            <div className="bg-secondary border border-border p-6 rounded-lg">
              <h3 className="font-bold mb-4">Servicios Incluidos</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">WiFi Premium</span>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Tecnología Moderna</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Café Premium Incluido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-lg text-muted-foreground">
            Estamos ubicados en el corazón del barrio Lituania. Visítanos hoy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-secondary border border-border p-8 rounded-lg text-center hover:border-primary transition">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Ubicación</h3>
            <p className="text-muted-foreground">
              Barrio Lituania<br />
              Engativá, Bogotá
            </p>
          </div>
          <div className="bg-secondary border border-border p-8 rounded-lg text-center hover:border-primary transition">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Teléfono</h3>
            <p className="text-muted-foreground">+57 310 794 6794</p>
          </div>
          <div className="bg-secondary border border-border p-8 rounded-lg text-center hover:border-primary transition">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-muted-foreground">hola@scratchup.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 SCRATCH UP. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
