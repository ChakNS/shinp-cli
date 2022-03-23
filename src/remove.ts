import co from 'co'
import prompt from 'co-prompt'
import tempConfig from '../dist/config.json'
import { ConfigType } from './types'
import { writeFile } from 'fs'
import { resolve, error, success, info } from './utils'
import list from './list'

const config: {[tplName: string]: ConfigType} = tempConfig

export default () => {
  co(function* () {
    const tplName = yield prompt('Which template you want to remove: ')

    if (!tplName) {
      error('Template name missing!')
      process.exit(1)
    }

    if (!config[tplName]) {
      error('Template does not exist!')
      process.exit(1)
    }

    delete config[tplName]

    writeFile(resolve('../dist/config.json'), JSON.stringify(config), 'utf-8', err => {
      if (err) error(err)
      success('Template removed!\n')
      info('The last template list is: \n')
      list()
    })
  })
}