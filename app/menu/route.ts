import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

// Mark this route as statically served to satisfy `next export`/static HTML export
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Read the menu JSON file from public directory
    const menuPath = path.join(process.cwd(), 'public', 'menu.json')
    const menuData = await fs.readFile(menuPath, 'utf-8')
    const menu = JSON.parse(menuData)
    return NextResponse.json(menu)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load menu' },
      { status: 500 }
    )
  }
}
