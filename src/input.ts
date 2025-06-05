import { DEFAULT_ANTI_PATTERNS } from './constants'

const argv = process.argv.slice(2)

const getInput = () => {
  let hasIgnorePassed = false
  const patterns = []
  const ignorePatterns = []

  for (const value of argv) {
    if (value === '--ignore') {
      hasIgnorePassed = true
      continue
    }

    if (hasIgnorePassed) ignorePatterns.push(value)
    if (!hasIgnorePassed) patterns.push(value)
  }

  const ignore = ignorePatterns.length ? ignorePatterns : DEFAULT_ANTI_PATTERNS
  return { patterns, ignore }
}

export const input = getInput()
