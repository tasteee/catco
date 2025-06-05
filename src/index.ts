#!/usr/bin/env bun
// src/index.ts

import fs from 'node:fs'
import path from 'node:path'
import { globby } from 'globby'
import clipboard from 'clipboardy'
import { minify } from './minify'
import { input } from './input'

if (input.patterns.length === 0) {
  console.log('[catco] usage: catco [...patterns]')
  console.log('')
  console.log('Examples:')
  console.log('  catco ./')
  console.log('  catco "./src/**/*.ts"')
  console.log('  catco "./src/**/*.{js,ts}"')
  console.log('  catco "./*.js"')
  console.log('  catco "./src/**/index.ts"')
  console.log('  catco "./src/**/*.test.ts"')
  console.log('  catco "./**/*.md"')
  console.log('  catco "./src/utils/*.ts" "./src/components/*.ts"')
  console.log('  catco "./**/*" "!./node_modules"')
  console.log('  catco "./src/**/*" --exclude="./src/**/*.spec.ts"')
  console.log('')
  console.log('Supports multiple patterns and globs. Use quotes for complex patterns.')
  process.exit(1)
}

const createOutputContents = (filePath: string, content: string) => {
  return `/* FILE: ${path.resolve(filePath)} */ ${content} `
}

const catco = async () => {
  const fileContentsList = []
  const options = { ignore: input.ignore }
  const filePaths = await globby(input.patterns, options)
  console.log(`[catco] found ${filePaths.length} files.`)

  for (const filePath of filePaths) {
    const content = await fs.promises.readFile(filePath, 'utf-8')
    const final = createOutputContents(filePath, content)
    fileContentsList.push(final)
  }

  if (fileContentsList.length) {
    const joined = fileContentsList.join('\n')
    const minified = minify(joined)
    await clipboard.write(minified)

    console.log(`[catco] pre-minified length: ${joined.length}`)
    console.log(`[catco] post-minified length: ${minified.length}`)
    console.log(`[catco] all files contents copied to clipboard!`)
  }

  if (!fileContentsList) {
    console.warn(`[catco] no matching files found for patterns: ${input.patterns}`)
  }
}

catco()
