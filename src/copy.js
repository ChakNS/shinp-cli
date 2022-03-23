const { writeFile } = require('fs')
const path = require('path')
const chalk = require('chalk')

writeFile(path.resolve(__dirname, '../dist/config.json'), JSON.stringify({}), err => {
  if (err) console.log(chalk.red(err))
  console.log(chalk.green('Build successful!\n'))
  process.exit()
})