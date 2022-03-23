import co from 'co'
import prompt from 'co-prompt'
import { error, success, info } from './utils'
import listAll from './list'


export default function (this: ShinpCli) {
  const config = this.config
  const list = listAll.bind(this)
  co(function* () {
    const tplName = yield prompt('Which template you want to remove: ')

    if (!tplName) {
      error('Template name missing!')
      process.exit(1)
    }

    if (!config.has(tplName)) {
      error('Template does not exist!')
      process.exit(1)
    }

    try {
      config.delete(tplName)
      success('Template removed!\n')
      info('The last template list is: \n')
      list()
    } catch (err) {
      error(err)
    }

    process.exit()
  })
}