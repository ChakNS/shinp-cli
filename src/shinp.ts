import configStore from 'configstore'
import list from './list'
import add from './add'
import update from './update'
import remove from './remove'
import create from './create'
import clear from './clear'
import reset from './reset'
import { success } from './utils'

const DEFAULT = {
  qiankun: {
    url: 'https://github.com/ChakNS/shinp-qiankun-template',
    branch: 'master'
  }
}

class ShinpCli {
  config: configStore
  list: () => void
  add: () => void
  update: () => void
  remove: () => void
  create: () => void
  clear: () => void
  reset: () => void
  path: () => void
  constructor() {
    this.config = new configStore('shinp-cli')
    if (!this.config.all) {
      this.config.all = DEFAULT
    }
    this.list = list.bind(this)
    this.add = add.bind(this)
    this.update = update.bind(this)
    this.remove = remove.bind(this)
    this.create = create.bind(this)
    this.clear = clear.bind(this)
    this.reset = reset.bind(this)
    this.path = () => {
      success(this.config.path)
      process.exit()
    }
  }
}

export { ShinpCli, DEFAULT }
export default new ShinpCli()