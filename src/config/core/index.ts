import * as yargs from 'yargs';
import BuilderAMCLI from './builder';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer'
// settings options cli
// const args = yargs.options({
//     'type': { type: 'string', demandOption: true, alias: 't' },
//     'route': { type: 'string', demandOption: false, alias: 'r' },
//     'name': { type: 'string', demandOption: true, alias: 'n' },
//     'file_name': { type: 'string', demandOption: false, alias: 'fn' },
//     'entity_options': { type: 'array', demandOption: false, alias: 'eo' },
//   }).argv;
inquirer.prompt([
  {
      type: 'input',
      name: 'todo',
      message: 'Qual é o seu to-do?'
  }
]).then(res =>{
  console.log(res);
})
  

// const builder = (new BuilderAMCLI(args)).init();
// console.log(`${chalk[builder.color](builder.message)}`)
