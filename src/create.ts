import { exec } from 'child_process'
import co from 'co'
import prompt from 'co-prompt'
import tempConfig from '../dist/config.json'
import { ConfigType } from './types'
import { error, success, tips } from './utils'

const config: {[tplName: string]: ConfigType} = tempConfig

export default () => {
  co(function* () {
    const tplName = yield prompt('Template name: ')
    const projectName = yield prompt('Project name: ')

    if (!tplName || !projectName) {
      error('Create info missing!')
      process.exit(1)
    }

    if (!config[tplName]) {
      error('Template does not exist!')
      process.exit(1)
    }

    const { url, branch } = config[tplName]

    const gitCmd = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`

    tips('\n generating...')
    
    exec(gitCmd, (err, stdout, stderr ) => {
      if (err) {
        error(err)
        process.exit(1)
      }
      success('\n Generation completed!')
      success(`\n cd ${projectName} && yarn \n`)
      process.exit()
    })
  })
}