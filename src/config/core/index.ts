import * as yargs from 'yargs';

// settings options cli
const args = yargs.options({
    'type': { type: 'string', demandOption: true, alias: 't' },
    'route': { type: 'string', demandOption: false, alias: 'r' },
    'name': { type: 'string', demandOption: true, alias: 'n' },
    'entity_options': { type: 'array', demandOption: false, alias: 'eo' },
  }).argv;
  