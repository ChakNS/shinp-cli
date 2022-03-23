import { exec } from 'child_process'
import co from 'co'
import prompt from 'co-prompt'
import { error, success, tips } from './utils'

export default function (this: ShinpCli) {
  const config = this.config
  co(function* () {
    const tplName = yield prompt('Template name: ')
    if (!config.has(tplName)) {
      error('Template does not exist!')
      process.exit(1)
    }

    const projectName = yield prompt('Project name: ')
    if (!projectName) {
      error('Create info missing!')
      process.exit(1)
    }

    const { url, branch } = config.get(tplName)

    const gitCmd = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`

    tips('\n generating...')
    
    exec(gitCmd, err => {
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