// Rewrite maps/index.json: every .damap file's name and git blob id.
//
//   node tools/make-index.mjs
//
// The DaMaps Editor's "Get latest maps" reads index.json to see which maps
// changed. Lichborne doesn't need it (it downloads the whole folder as a zip).
// The GitHub workflow runs this on every push, so you don't have to.
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'maps')
const maps = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.damap')).sort().map(name => {
  const buf = fs.readFileSync(path.join(dir, name))
  return { name, sha: createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex') }
})
const out = path.join(dir, 'index.json')
const next = JSON.stringify({ about: 'Written by tools/make-index.mjs; read by the DaMaps Editor.', maps }, null, 1) + '\n'
const prev = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : ''
if (prev === next) console.log(`index.json is up to date (${maps.length} maps)`)
else { fs.writeFileSync(out, next); console.log(`wrote index.json (${maps.length} maps)`) }
