#!/usr/bin/env node
'use strict'

/**
 * Switch the active locale.
 *
 *   node scripts/set-lang.js ja_JP
 *   node scripts/set-lang.js en_US
 *   node scripts/set-lang.js ko_KR
 *
 * Rewrites:
 *   _nodes/index.flyde.ts       _i18n/{locale}.json import
 *   _nodes/utils/_catalog.ts    _maps/{locale}.json import + locale constant
 */

const fs   = require('fs')
const path = require('path')

const to = process.argv[2]
if (!to || !/^\w+_\w+$/.test(to)) {
  console.error('Usage: node set-lang.js <locale>')
  console.error('  e.g. ja_JP, en_US, ko_KR, zh_CN, zh_TW ...')
  process.exit(1)
}

const ROOT = path.join(__dirname, '..')

// 現在の locale を index.flyde.ts から読む
const indexPath    = path.join(ROOT, '_nodes/index.flyde.ts')
const indexContent = fs.readFileSync(indexPath, 'utf8')
const fromMatch    = indexContent.match(/_i18n\/(\w+)\.json/)
const from         = fromMatch ? fromMatch[1] : null

if (!from) {
  console.error('Could not detect current locale from _nodes/index.flyde.ts.')
  process.exit(1)
}

if (from === to) {
  console.log(`Already ${to}.`)
  process.exit(0)
}

function replaceAll(filePath, fromStr, toStr) {
  if (!fs.existsSync(filePath)) return false
  const content = fs.readFileSync(filePath, 'utf8')
  const next    = content.split(fromStr).join(toStr)
  if (next === content) return false
  fs.writeFileSync(filePath, next, 'utf8')
  return true
}

// index.flyde.ts
const c1 = replaceAll(path.join(ROOT, '_nodes/index.flyde.ts'),    `_i18n/${from}.json`, `_i18n/${to}.json`)
// _catalog.ts（_maps の import 行 + locale 定数を両方書き換え）
const c3 = replaceAll(path.join(ROOT, '_nodes/utils/_catalog.ts'), from, to)

if (c1) console.log(`✓ index.flyde.ts  → ${to}`)
if (c3) console.log(`✓ _catalog.ts     → ${to}`)
console.log('Reload the VSCode window to apply changes (Ctrl+Shift+P → "Reload Window").')
