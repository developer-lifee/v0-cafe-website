/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESTA LÍNEA ES LA CLAVE para generar la carpeta 'out/'
  output: 'export', 
  // ========================================================
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig