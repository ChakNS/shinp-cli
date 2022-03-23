import tempConfig from '../dist/config.json'
import { ConfigType } from './types'
import { resolve, info, error } from './utils'
import { writeFile } from 'fs'

const config: {[tplName: string]: ConfigType} = tempConfig

export default () => {
  if (!config || !Object.keys(config).length) {
    info('Empty!')
    writeFile(resolve('../dist/config.json'), JSON.stringify({}), 'utf-8', err => err && error(err))
    process.exit()
  }
  console.log(Object.entries(config).map(([name, item]) => `${name}: ${item.url}`))
  console.log('\n')
  process.exit()
}