# catco

Glob copy file contents to ya clipboard. Use it to quickly share many files with an AI code assistant.

## Install

```
npm i -g catco
```

## Examples

Tell it what files, and it will concatenate them all and copy them to your clipboard (whitespace minimized) so you can go paste that shit to GPT, Perplexity, Claude, whatever AI to ask for help or whatever.

```
catco src/components/**/*.ts

catco src/components/**/*.ts src/styles/**/*.css

catco src/components/**/*.ts src/styles/**/*.css --ignore *.test.ts
```

## Default Ignore Patterns

```
node_modules
node_modules/**
.git
.git/**
.github
.github/**
dist
dist/**
build
build/**
coverage
coverage/**
.next
.next/**
.vercel
.vercel/**
.turbo
.turbo/**
.DS_Store
*.log
npm-debug.log
yarn-error.log
pnpm-debug.log
.env
.env.*
```
