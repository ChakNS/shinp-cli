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
    const tplName = yield prompt('Template name: ')
    const url = yield prompt('Git https link: ')
    const branch = yield prompt('Git branch: ')

    if (!tplName || !url || !branch) {
      error('Template info missing!')
      process.exit(1)
    }

    if (config[tplName]) {
      error('Template has already existed!')
      process.exit(1)
    }

    config[tplName] = { url: url.replace(/[\u0000-\u0019]/g, ''), branch }

    writeFile(resolve('../dist/config.json'), JSON.stringify(config), 'utf-8', err => {
      if (err) error(err)
      success('New template added!\n')
      info('The last template list is: \n')
      list()
    })
  })
}