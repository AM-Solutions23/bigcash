import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import {ArgsInterface} from './interfaces/builder_interfaces'
import BuilderAMCLI from './builder';
import HelperAMCLI from './helper';


const awnsers_config = HelperAMCLI.buildAwnserConfig(require('./config/awnsers.json'));
let args:ArgsInterface = {
  type:'',
  name:''
};

inquirer.prompt(awnsers_config).then(res =>{
  console.log(res);
  
    const builder = (new BuilderAMCLI(res)).init();
    console.log(`${chalk[builder.color](builder.message)}`)
});

