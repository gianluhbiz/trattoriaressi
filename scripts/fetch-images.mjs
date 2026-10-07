// Scarica le foto originali da trattoriaressi.com in public/images (solo quelle mancanti).
// Uso: npm run images   (parte anche da solo prima di npm run dev / npm run build)
import { mkdir, access, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = 'https://www.trattoriaressi.com/wp-content/uploads/'
const IMAGES = {
  'cena-tavola.jpg': '2025/01/59120996_880100932328472_6165849771622793216_o-1.jpg',
  'sala.jpg': '2025/01/sala-trattoria.jpg',
  'via-ressi.jpg': '2025/01/52426201_837841289887770_1803928582632767488_n.jpg',
  'sala-scrivania.jpg': '2024/11/29354306_620375121634389_4450702063880503474_o.jpg',
  'black-cod.jpg': '2025/01/filetto-di-black-code.jpg',
  'risotto-zafferano.jpg': '2025/01/risotto-cernia-zafferano-ed-arancia.jpeg',
  'risotto-barbabietola.jpg': '2025/01/WhatsApp-Image-2022-01-22-at-14.21.24-1.jpeg',
  'agnello.jpg': '2025/01/costolette-di-agnello.jpg',
  'ravioli.jpg': '2025/01/IMG_20220604_190115_727-scaled-1.jpg',
  'polpo.jpg': '2025/01/IMG_20220613_135104_860-scaled-1.jpg',
  'carthusia.jpg': '2025/01/amaro-carthusia.jpg',
  'sala-finestre.jpg': '2025/01/31945980_637845769887324_7754805182277353472_n.jpg',
  'sala-arco.jpg': '2025/01/30442711_624612314544003_8726596860766060544_n-1.jpg',
  'sala-luce.jpg': '2024/11/122963512_1330622920609602_424780740360344102_n.jpg',
  'ingresso.jpg': '2024/11/28424263_602449543426947_416910098046667630_o.jpg',
  'insegna.png': '2024/11/cropped-logo-270x270.png',
}

const dir = join(process.cwd(), 'public', 'images')
await mkdir(dir, { recursive: true })
let fetched = 0
for (const [name, path] of Object.entries(IMAGES)) {
  const out = join(dir, name)
  try {
    await access(out)
    continue
  } catch {
    /* manca: la scarico */
  }
  try {
    const res = await fetch(BASE + path, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    await writeFile(out, Buffer.from(await res.arrayBuffer()))
    fetched++
    console.log(`+ ${name}`)
  } catch (err) {
    console.warn(`! ${name}: ${err.message}`)
  }
}
console.log(fetched ? `Scaricate ${fetched} immagini in public/images` : 'Immagini già presenti')
