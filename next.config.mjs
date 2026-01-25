/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESTA LÍNEA ES LA CLAVE para generar la carpeta 'out/'
  output: 'export', 
  // ========================================================
  // Genera menu/index.html en lugar de menu.html (evita conflictos con carpetas del mismo nombre)
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig