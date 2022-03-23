
import co from 'co'
import prompt from 'co-prompt'
import { DEFAULT } from './shinp'
import { isYes, info, error, success } from './utils'
import listAll from './list'

export default function (this: ShinpCli) {
  const config = this.config
  const list = listAll.bind(this)
  co(function* () {
    const flag = yield prompt('Whether reseted, this action is irreversible?(y/n)')

    if (!isYes(flag)) {
      process.exit()
    }

    try {
      config.clear()
      config.all = DEFAULT
      success('Template has been reset!\n')
      info('The last template list is: \n')
      list()
    } catch (err) {
      error(err)
    }

    process.exit()
  })
}