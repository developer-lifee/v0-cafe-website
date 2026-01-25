import { NextResponse } from 'next/server'

// Mark this route as statically served to satisfy `next export`/static HTML export
export const dynamic = 'force-static'

// Redirect to the static JSON we generated from the PDF. The file lives in `public/menu-from-pdf.json`
export function GET(request: Request) {
  const url = new URL(request.url)
  // Redirect to the public static file so builds/export serve the JSON directly
  return NextResponse.redirect(new URL('/menu-from-pdf.json', url).toString())
}
