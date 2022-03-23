import chalk from 'chalk'
import path from 'path'

export const error = (err: unknown) => {
  console.log(chalk.red('💔' + err))
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