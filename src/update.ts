import co from 'co'
import prompt from 'co-prompt'
import { error, success, info } from './utils'
import listAll from './list'

export default function (this: ShinpCli) {
  const config = this.config
  const list = listAll.bind(this)
  co(function* () {
    const tplName = yield prompt('Which template do you want to update: ')

    if (!tplName) {
      error('Template name missing!')
      process.exit(1)
    }

    if (!config.has(tplName)) {
      error('Template does not exist!')
      process.exit(1)
    }

    const property = yield prompt('Which property (tplName | url | branch) do you want to update: ')

    if (!['tplName', 'url', 'branch'].includes(property)) {
      error('The property is not supported')
      process.exit(1)
    }

    let result = yield prompt('Modify to: ')

    if (property === 'tplName') {
      try {
        config.set(result, config.get(tplName))
        config.delete(tplName)
        success('Template updated!\n')
        info('The last template list is: \n')
        list()
      } catch (err) {
        error(err)
      }

      process.exit()
    }

    if (property === 'url') {
      result = result.replace(/[\u0000-\u0019]/g, '')
    }

    try {
      config.set(tplName, { ...config.get(tplName), [property as PropertyType]: result })
      success('Template updated!\n')
      info('The last template list is: \n')
      list()
    } catch (err) {
      error(err)
    }

    process.exit()
  })
}