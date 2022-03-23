import co from 'co'
import prompt from 'co-prompt'
import { error, success, info } from './utils'
import listAll from './list'

export default function (this: ShinpCli) {
  const config = this.config
  const list = listAll.bind(this)
  co(function* () {
    const tplName = yield prompt('Template name: ')
    if (config.has(tplName)) {
      error('Template has already existed!')
      process.exit(1)
    }

    const url = yield prompt('Git https link: ')
    const branch = yield prompt('Git branch: ')
    if (!url || !branch) {
      error('Template info missing!')
      process.exit(1)
    }

    try {
      config.set(tplName, { url: url.replace(/[\u0000-\u0019]/g, ''), branch })
      success('New template added!\n')
      info('The last template list is: \n')
      list()
    } catch (err) {
      error(err)
    }

    process.exit()
  })
}