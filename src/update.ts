import co from 'co'
import prompt from 'co-prompt'
import tempConfig from '../dist/config.json'
import { ConfigType, PropertyType } from './types'
import { writeFile } from 'fs'
import { resolve, error, success, info } from './utils'
import list from './list'

const config: {[tplName: string]: ConfigType} = tempConfig

export default () => {
  co(function* () {
    const tplName = yield prompt('Which template do you want to update: ')

    if (!tplName) {
      error('Template name missing!')
      process.exit(1)
    }

    if (!config[tplName]) {
      error('Template does not exist!')
      process.exit(1)
    }

    const property = yield prompt('Which property (url or branch) do you want to update: ')

    if (!['url', 'branch'].includes(property)) {
      error('The property is not supported')
      process.exit(1)
    }

    let result = yield prompt('Modify to: ')

    if (property === 'url') {
      result = result.replace(/[\u0000-\u0019]/g, '')
    }
    config[tplName][property as PropertyType] = result

    writeFile(resolve('../dist/config.json'), JSON.stringify(config), 'utf-8', err => {
      if (err) error(err)
      success('Template updated!\n')
      info('The last template list is: \n')
      list()
    })
  })
}