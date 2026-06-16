#!/usr/bin/env node
'use strict'

/**
 * Bundle Flyde nodes into build/
 *
 *   node scripts/build.js          → free version (index.free.flyde.js)
 *   node scripts/build.js --full   → full version (index.flyde.js)
 *
 * JSON files (_i18n, _maps) are inlined — no separate data files needed.
 * Peer dependencies stay external (resolved at runtime from node_modules).
 *
 * 出力先フォルダ名は意図的に "dist" を避けている。Flyde拡張のローカルファイル
 * スキャン（default-scan-filter.js）がパスに "dist" を含むファイルを除外するため、
 * ノードメニューに表示されなくなってしまう。
 */

const esbuild = require('esbuild')
const path    = require('path')
const fs      = require('fs')

const ROOT   = path.join(__dirname, '..')
const OUTDIR = path.join(ROOT, 'build')

const isFull  = process.argv.includes('--full')
const entry   = isFull ? 'index.flyde.ts' : 'index.free.flyde.ts'
const outname = isFull ? 'index.flyde.js' : 'index.free.flyde.js'
const label   = isFull ? 'full' : 'free'

fs.mkdirSync(OUTDIR, { recursive: true })

esbuild.build({
  entryPoints : [path.join(ROOT, '_nodes', entry)],
  outfile     : path.join(OUTDIR, outname),
  bundle      : true,
  minify      : true,
  platform    : 'node',
  format      : 'cjs',
  target      : 'node18',
  external    : [
    '@flyde/core',
    'socket-be',
    '@minecraft/vanilla-data',
  ],
}).then(() => {
  const size = (fs.statSync(path.join(OUTDIR, outname)).size / 1024).toFixed(1)
  console.log(`✓ build/${outname}  [${label}]  (${size} KB)`)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
