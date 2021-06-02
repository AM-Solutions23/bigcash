import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import {ArgsInterface} from './interfaces/builder_interfaces'
import BuilderAEMCLI from './builder';
import questionsConfig from './config/questions';

let args:ArgsInterface = {
  type:'',
  name:''
};

inquirer.prompt(questionsConfig).then(res =>{
    const builder = (new BuilderAEMCLI(res)).init();
    console.log(`${chalk[builder.color](builder.message)}`)
});

