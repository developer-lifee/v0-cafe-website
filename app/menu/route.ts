import { NextResponse } from 'next/server'

const menu = {
  categories: [
    {
      id: 'bebidas',
      title: 'Bebidas',
      items: [
        { name: 'Espresso', desc: 'Café intenso y concentrado, extracción perfecta', price: '$2.500' },
        { name: 'Cappuccino', desc: 'Espresso con leche vaporizada y espuma', price: '$3.200' },
        { name: 'Latte', desc: 'Espresso con abundante leche cremosa', price: '$4.500' },
        { name: 'Americano', desc: 'Doble espresso diluido en agua caliente', price: '$4.000' },
        { name: 'Bebidas con Jugos Naturales', desc: 'Jugos frescos naturales del día', price: '$3.500' },
        { name: 'Bebidas Gasificadas', desc: 'Refrescantes opciones con gas', price: '$2.800' },
      ],
    },
    {
      id: 'comida',
      title: 'Comida',
      items: [
        { name: 'Empanadas Horneadas', desc: 'Receta casera, horneadas al momento', price: '$4.000' },
        { name: 'Tortas de Chocolate', desc: 'Deliciosa torta de chocolate artesanal', price: '$3.000' },
        { name: 'Combo Espresso + Torta', desc: 'Combo perfecto: Espresso + Torta de Chocolate', price: '$5.000' },
      ],
    },
  ],
}

export function GET() {
  return NextResponse.json(menu)
}
