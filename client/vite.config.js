import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function deploymentAssets() {
  return {
    name: 'deployment-assets',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      for (const file of ['CNAME', 'robots.txt', 'sitemap.xml', 'manifest.webmanifest']) {
        fs.copyFileSync(path.join(projectRoot, file), path.join(dist, file))
      }
      fs.cpSync(path.join(projectRoot, 'video'), path.join(dist, 'video'), { recursive: true })
      fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))

      // GitHub Pages SPA: rotas físicas com status 200 (404.html sozinho não basta em custom domain)
      const spaRoutes = ['artigo', 'especial', 'sobre', 'contato']
      for (const route of spaRoutes) {
        const dir = path.join(dist, route)
        fs.mkdirSync(dir, { recursive: true })
        fs.copyFileSync(path.join(dist, 'index.html'), path.join(dir, 'index.html'))
        // Compatibilidade com URLs legadas *.html
        fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, `${route}.html`))
      }

      // Compatibilidade com paths antigos /imgs/*
      const imgsDir = path.join(dist, 'imgs')
      fs.mkdirSync(imgsDir, { recursive: true })
      for (const asset of ['logo_Neymar.png', 'perfil.jpeg']) {
        const src = path.join(dist, asset)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(imgsDir, asset))
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), deploymentAssets()],
  publicDir: path.resolve(__dirname, '../imgs'),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/video': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
