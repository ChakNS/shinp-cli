import co from 'co'
import prompt from 'co-prompt'
import { error, success, isYes } from './utils'

export default function (this: ShinpCli) {
  const config = this.config
  co(function* () {
    const flag = yield prompt('Whether cleared, this action is irreversible?(y/n)')

    if (!isYes(flag)) {
      process.exit()
    }

    try {
      config.clear()
      config.all = {}
      success('Template has been clear!\n')
    } catch (err) {
      error(err)
    }

    process.exit()
  })
}