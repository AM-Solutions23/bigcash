import * as fs from 'fs';
import DefaultFiles from './default_files';

const routeURL = process.argv[process.argv.length-1];
const moduleName = process.argv[process.argv.length-2];
const writer_file = new DefaultFiles(moduleName, routeURL);
const pathname_module = `${__dirname}/../../${moduleName}`;

!fs.existsSync(pathname_module) && fs.mkdir(pathname_module, err =>{
    if(!err){
        fs.mkdir(`${pathname_module}/Controllers`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Controllers/${moduleName}Controller.ts`,writer_file.writeDefaultController() ,err =>{
                    if (err) throw err;
                })
            }
        })
        fs.mkdir(`${pathname_module}/Entities`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Entities/${moduleName}.ts`,writer_file.writeDefaultEntity() ,err =>{
                    if (err) throw err;
                })
            }
        })
        fs.mkdir(`${pathname_module}/Routes`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Routes/Routes.ts`,writer_file.writeDefaultRoute() ,err =>{
                    if (err) throw err;
                })
            }
        })

    }else{
        console.log('Erro ao criar o módulo', err)
    }
})