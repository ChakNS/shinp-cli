#!/usr/bin/env node

import { program } from 'commander'
import { version } from '../package.json'
import list from './list'
import add from './add'
import update from './update'
import remove from './remove'
import create from './create'

console.log()
process.on('exit', () => console.log())

program.version(version)

program.usage('<command>')

program.command('list').description('List all the template').alias('l').action(list)
program.command('add').description('Add a new template').alias('a').action(add)
program.command('update').description('Update a template').alias('u').action(update)
program.command('remove').description('Remove a template').alias('r').action(remove)
program.command('create').description('Create a project').alias('c').action(create)

program.parse(process.argv)

!program.args.length && program.help()

