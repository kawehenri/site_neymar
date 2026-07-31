import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const here = path.dirname(fileURLToPath(import.meta.url))
const sourceDir = path.resolve(here, '../../imgs/editorial')
const outputDir = path.resolve(here, '../../imgs/generated')

const assets = [
  { name: 'hero-home-desktop', file: 'hero-home-desktop.png', widths: [960, 1440, 1920], ratio: [16, 9] },
  { name: 'hero-home-mobile', file: 'hero-home-mobile.png', widths: [480, 720, 960], ratio: [3, 4] },
  { name: 'career-santos', file: 'career-santos.png', widths: [400, 600, 800], ratio: [3, 4] },
  { name: 'timeline-2016', file: 'timeline-2016.png', widths: [480, 720, 960], ratio: [4, 3] },
  { name: 'hero-artigo', file: 'hero-artigo.png', widths: [960, 1440, 1920], ratio: [16, 9] },
  { name: 'especial-arte-01', file: 'especial-arte-01.png', widths: [400, 600, 800], ratio: [3, 4] },
  { name: 'especial-arte-02', file: 'especial-arte-02.png', widths: [400, 600, 800], ratio: [3, 4] },
  { name: 'especial-arte-03', file: 'especial-arte-03.png', widths: [400, 600, 800], ratio: [3, 4] },
]

await mkdir(outputDir, { recursive: true })

for (const asset of assets) {
  for (const width of asset.widths) {
    const height = Math.round(width * asset.ratio[1] / asset.ratio[0])
    const input = path.join(sourceDir, asset.file)
    const base = path.join(outputDir, `${asset.name}-${width}`)
    const pipeline = sharp(input).resize(width, height, {
      fit: 'cover',
      position: sharp.strategy.attention,
      withoutEnlargement: true,
    })

    await pipeline.clone().avif({ quality: 58 }).toFile(`${base}.avif`)
    await pipeline.clone().webp({ quality: 80 }).toFile(`${base}.webp`)
    await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(`${base}.jpg`)
  }
}

console.log(`Generated ${assets.length * 9} responsive image variants.`)
