import chalk from 'chalk'
import path from 'path'
import { readdirSync, statSync, unlinkSync, rmdirSync } from 'fs'

export const error = (err: unknown) => {
  console.log(chalk.red('💔' + err))
}

export const warn = (warn: unknown) => {
  console.log(chalk.yellow('🧐' + warn))
}

export const success = (msg: string) => {
  console.log(chalk.green('🉐' + msg))
}

export const info = (msg: string) => {
  console.log(chalk.grey('🐛' + msg))
}

export const tips = (msg: string) => {
  console.log(chalk.white('🐾' + msg))
}

export const resolve = (p: string) => path.resolve(__dirname, p)

export const isYes = (flag: string) => ['y', 'yes'].includes(flag.toLowerCase())

const emptyDir = (path: string) => {
  const files = readdirSync(path)
  files.forEach(file => {
    const filePath = `${path}/${file}`
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
    } else {
      unlinkSync(filePath)
    }
  })
}

const rmAllEmptyDir = (path: string, level = 0) => {
  const files = readdirSync(path)
  if (!files.length) {
    level !==0 && rmdirSync(path)
    return
  }

  let count = 0
  files.forEach(file => {
    count++
    rmAllEmptyDir(`${path}/${file}`, 1)
  })
  if (count === files.length && level !== 0) rmdirSync(path)
}

export const rmdir = (path: string) => {
  emptyDir(path)
  rmAllEmptyDir(path)
  rmdirSync(path)
}