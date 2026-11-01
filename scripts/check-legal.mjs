// Controllo prima della pubblicazione: fallisce se in src/ restano segnaposto legali da completare.
// Uso: npm run check:legal
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const MARKER = /todo\(\s*'([^']+)'/g
const found = []

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (/\.(ts|tsx)$/.test(entry.name)) {
      const text = await readFile(path, 'utf8')
      for (const m of text.matchAll(MARKER)) found.push(`${path}: ${m[1]}`)
    }
  }
}

await walk(join(process.cwd(), 'src'))
if (found.length) {
  console.error(`Dati legali ancora da completare (${found.length}):\n` + found.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log('Nessun segnaposto legale: ok')
