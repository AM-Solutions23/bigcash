import * as yargs from 'yargs';
import BuilderAMCLI from './builder';
import * as chalk from 'chalk';
// settings options cli
const args = yargs.options({
    'type': { type: 'string', demandOption: true, alias: 't' },
    'route': { type: 'string', demandOption: false, alias: 'r' },
    'name': { type: 'string', demandOption: true, alias: 'n' },
    'file_name': { type: 'string', demandOption: false, alias: 'fn' },
    'entity_options': { type: 'array', demandOption: false, alias: 'eo' },
  }).argv;

const builder = (new BuilderAMCLI(args)).init();
console.log(`${chalk[builder.color](builder.message)}`)
