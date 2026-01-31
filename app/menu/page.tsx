'use client'

import { useState, useEffect } from 'react'
import { X, ChevronDown, Trash2, MessageCircle, ArrowLeft, Droplets } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

// Componente para mostrar imagen de bebida desde JSON
const BeverageImage = ({ imageUrl, name }: any) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="w-full h-48 bg-secondary/30 overflow-hidden relative group p-2">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          onLoad={() => setLoading(false)}
          onError={(e: any) => {
            e.currentTarget.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(name)}`
            setLoading(false)
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
          <Droplets className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  )
}

export default function MenuPage() {
  const { cart, addToCart, removeFromCart } = useCart()
  const [menuData, setMenuData] = useState(null)
  const [selectedItems, setSelectedItems] = useState({})
  const [expandedItem, setExpandedItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      const offset = 140 // Adjust for header + sticky nav height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleOptionSelect = (itemId, groupId, optionId, multiselect = false) => {
    setSelectedItems(prev => {
      const current = prev[itemId]?.[groupId] || (multiselect ? [] : null)

      if (multiselect) {
        const updatedArray = Array.isArray(current) ? [...current] : []
        const index = updatedArray.indexOf(optionId)
        if (index > -1) {
          updatedArray.splice(index, 1)
        } else {
          updatedArray.push(optionId)
        }
        return {
          ...prev,
          [itemId]: {
            ...prev[itemId],
            [groupId]: updatedArray
          }
        }
      } else {
        return {
          ...prev,
          [itemId]: {
            ...prev[itemId],
            [groupId]: optionId
          }
        }
      }
    })
  }

  const calculateItemPrice = (item) => {
    let total = item.price || 0
    const itemSelections = selectedItems[item.id] || {}

    if (item.optionGroups) {
      item.optionGroups.forEach(group => {
        const selectedValues = itemSelections[group.id]

        if (group.multiselect && Array.isArray(selectedValues)) {
          selectedValues.forEach(optionId => {
            const selectedOption = group.options.find(o => o.id === optionId)
            if (selectedOption && selectedOption.price) {
              total += selectedOption.price
            }
          })
        } else if (!group.multiselect && selectedValues) {
          const selectedOption = group.options.find(o => o.id === selectedValues)
          if (selectedOption && selectedOption.price) {
            total += selectedOption.price
          }
        }
      })
    }
    return total
  }

  const calculateCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  const formatCartItemForWhatsApp = (item, selections) => {
    let message = `• ${item.name}`

    if (item.optionGroups && Object.keys(selections).length > 0) {
      item.optionGroups.forEach(group => {
        const selected = selections[group.id]
        if (selected) {
          if (group.multiselect && Array.isArray(selected)) {
            const optionNames = selected.map(optId =>
              group.options.find(o => o.id === optId)?.name
            ).filter(Boolean)
            if (optionNames.length > 0) {
              message += `\n  - ${group.name}: ${optionNames.join(', ')}`
            }
          } else if (!group.multiselect) {
            const optionName = group.options.find(o => o.id === selected)?.name
            if (optionName) {
              message += `\n  - ${group.name}: ${optionName}`
            }
          }
        }
      })
    }
    return message
  }

  const sendToWhatsApp = (orderItems) => {
    const phoneNumber = '573107946794'
    let message = 'Mi pedido:\n\n'

    orderItems.forEach(item => {
      message += formatCartItemForWhatsApp(item.item, item.selections) + `\n${item.price.toLocaleString('es-CO')} COP\n\n`
    })

    message += `Total: ${orderItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('es-CO')} COP`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleAddToCart = (item) => {
    const itemSelections = selectedItems[item.id] || {}
    const itemPrice = calculateItemPrice(item)

    addToCart({
      item,
      selections: itemSelections,
      price: itemPrice,
      id: `${item.id}-${Date.now()}`
    })

    setSelectedItems(prev => {
      const updated = { ...prev }
      delete updated[item.id]
      return updated
    })
    setExpandedItem(null)
    setShowAddModal(true)
  }

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch((err) => console.error('Error cargando menú:', err))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-2xl font-bold">SCRATCH UP - Menú</span>
          </Link>

          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition relative"
            >
              <span>Ver Carrito</span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            </button>
          )}
        </nav>
      </header>

      {/* Category Navigation */}
      <div className="sticky top-[64px] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex items-center gap-4 py-3 whitespace-nowrap min-w-full">
            {menuData?.categories?.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-secondary hover:text-primary border border-transparent hover:border-border"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestro Menú Completo</h2>

          {!menuData && (
            <p className="text-center text-muted-foreground">Cargando menú...</p>
          )}

          {menuData?.categories?.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-32 mb-12">
              <h3 className="text-2xl font-bold mb-8 text-primary">{cat.title}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background border border-border rounded-lg overflow-hidden hover:border-primary transition hover:shadow-xl hover:scale-105 transform duration-300"
                  >
                    {/* Imagen del producto */}
                    <div className="h-48 bg-gradient-to-br from-secondary to-secondary/50 overflow-hidden">
                      <BeverageImage imageUrl={item.imageUrl} name={item.name} />
                    </div>

                    {/* Item Header */}
                    <div
                      className="p-5 cursor-pointer hover:bg-secondary/50 transition border-b border-border"
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                          {item.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                          )}
                        </div>
                        {item.optionGroups && item.optionGroups.length > 0 && (
                          <ChevronDown
                            className={`w-5 h-5 text-primary transition-transform flex-shrink-0 mt-1 ${expandedItem === item.id ? 'rotate-180' : ''
                              }`}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-primary">
                          ${calculateItemPrice(item).toLocaleString('es-CO')}
                        </p>
                        <Droplets className="w-4 h-4 text-primary/60" />
                      </div>
                    </div>

                    {/* Options Section */}
                    {expandedItem === item.id && item.optionGroups && item.optionGroups.length > 0 && (
                      <div className="border-t border-border p-5 bg-secondary/30">
                        {item.optionGroups.map((group) => (
                          <div key={group.id} className="mb-6 last:mb-0">
                            <label className="text-sm font-semibold mb-3 block">
                              {group.name}
                              {group.required && <span className="text-primary">*</span>}
                            </label>
                            <div className="space-y-2">
                              {group.options.map((option) => {
                                const isSelected = group.multiselect
                                  ? Array.isArray(selectedItems[item.id]?.[group.id]) && selectedItems[item.id][group.id].includes(option.id)
                                  : selectedItems[item.id]?.[group.id] === option.id

                                return (
                                  <label
                                    key={option.id}
                                    className="flex items-center gap-3 p-2 rounded hover:bg-background cursor-pointer transition"
                                  >
                                    {group.multiselect ? (
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleOptionSelect(item.id, group.id, option.id, true)}
                                        className="w-4 h-4"
                                      />
                                    ) : (
                                      <input
                                        type="radio"
                                        name={group.id}
                                        checked={isSelected}
                                        onChange={() => handleOptionSelect(item.id, group.id, option.id, false)}
                                        className="w-4 h-4"
                                      />
                                    )}
                                    <span className="flex-1">
                                      {option.name}
                                      {option.price > 0 && (
                                        <span className="text-sm text-primary ml-2">
                                          +${option.price.toLocaleString('es-CO')}
                                        </span>
                                      )}
                                    </span>
                                  </label>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition">
                          Agregar al carrito
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal: Add to Cart Confirmation */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6 animate-in slide-in-from-bottom-4">
            <h3 className="text-xl font-bold mb-2">Producto agregado</h3>
            <p className="text-muted-foreground mb-6">¿Qué deseas hacer?</p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (cart.length > 0) {
                    sendToWhatsApp(cart)
                  }
                  setShowAddModal(false)
                }}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Pedido
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-border py-3 rounded-lg font-semibold hover:bg-secondary transition"
              >
                Agregar Otro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Shopping Cart */}
      {showCart && cart.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Tu Carrito</h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-secondary rounded transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 p-6 space-y-4">
              {cart.map((cartItem) => (
                <div key={cartItem.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{cartItem.item.name}</h4>

                      {Object.keys(cartItem.selections).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {cartItem.item.optionGroups.map(group => {
                            const selected = cartItem.selections[group.id]
                            if (!selected) return null

                            return (
                              <div key={group.id} className="text-xs text-muted-foreground">
                                {group.multiselect && Array.isArray(selected) ? (
                                  <p>{group.name}: {selected.map(optId =>
                                    group.options.find(o => o.id === optId)?.name
                                  ).filter(Boolean).join(', ')}</p>
                                ) : !group.multiselect ? (
                                  <p>{group.name}: {group.options.find(o => o.id === selected)?.name}</p>
                                ) : null}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="p-2 hover:bg-secondary rounded transition flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    ${cartItem.price.toLocaleString('es-CO')}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-background border-t border-border p-6 space-y-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ${calculateCartTotal().toLocaleString('es-CO')}
                </span>
              </div>
              <button
                onClick={() => {
                  sendToWhatsApp(cart)
                  setShowCart(false)
                }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
