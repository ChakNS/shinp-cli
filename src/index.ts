#!/usr/bin/env node

import { program } from 'commander'
import { version } from '../package.json'
import ShinpCli from './shinp'

console.log()
process.on('exit', () => console.log())

program.version(version)

program.usage('<command>')

const { list, add, update, remove, create, clear, reset, path } = ShinpCli

program.command('list').description('List all the template').alias('l').action(list)
program.command('add').description('Add a new template').alias('a').action(add)
program.command('update').description('Update a template').alias('u').action(update)
program.command('remove').description('Remove a template').alias('r').action(remove)
program.command('create').description('Create a project').alias('c').action(create)
program.command('clear').description('Clear store').alias('cr').action(clear)
program.command('reset').description('Reset store').alias('rs').action(reset)
program.command('path').description('Store path').alias('p').action(path)

program.parse(process.argv)

!program.args.length && program.help()

