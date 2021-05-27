import * as fs from 'fs';
import DefaultFiles from './default_files';

class BuilderCLI extends DefaultFiles{
    private name:string;
    private route:string;
    private type:string;
    private entity_options:Array<string>;
    private pathname:string;

    constructor(args:Array<any>){
        super(args['name'], args['route'] || '');

        this.name = args['name'];
        this.route = args['route'];
        this.type = args['type'];
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../${this.name}`;
    }

    createController(){

    }
}

// !fs.existsSync(pathname_module) && fs.mkdir(pathname_module, err =>{
//     if(!err){
//         fs.mkdir(`${pathname_module}/Controllers`,err=>{
//             !err && fs.writeFile(`${pathname_module}/Controllers/${moduleName}Controller.ts`,
//                                 writer_file.writeDefaultController() ,
//                                 err =>{
//                                     console.log(` ${err ? 'Falha' : 'Sucesso'} ao criar ${moduleName}Controller.ts`)
//                                 })
//             err && console.log(`${pathname_module}/Controllers`)
//         })

//         fs.mkdir(`${pathname_module}/Entities`,err=>{
//             !err && fs.writeFile(`${pathname_module}/Entities/${moduleName}.ts`,
//                                 writer_file.writeDefaultEntity() ,
//                                 err =>{
//                                     console.log(` ${err ? 'Falha' : 'Sucesso'} ao criar ${moduleName}.ts`)
//                                 })
//         })

//         fs.mkdir(`${pathname_module}/Routes`,err=>{
//             !err && fs.writeFile(`${pathname_module}/Routes/Routes.ts`,
//                                 writer_file.writeDefaultRoute() ,
//                                 err =>{
//                                     console.log(` ${err ? 'Falha' : 'Sucesso'} ao criar Routes.ts`)
//                                 })

//         })

//     }else console.log('Erro ao criar o módulo', err)
// })