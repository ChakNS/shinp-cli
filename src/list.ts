import { info } from './utils'

export default function (this: ShinpCli) {
  const all: AllType = this.config.all
  if (!all || !Object.keys(all).length) {
    info('Empty!')
    process.exit()
  }
  console.log(Object.entries(all).map(([name, item]) => `${name}: ${item.branch} | ${item.url}`).join('\n'))
  console.log('\n')
  process.exit()
}