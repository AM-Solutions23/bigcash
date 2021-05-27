import * as fs from 'fs';

const moduleName = process.argv[process.argv.length-1];
const pathname_module = `${__dirname}/${moduleName}`
!fs.existsSync(pathname_module) && fs.mkdir(pathname_module, err =>{
    if(!err){
        fs.mkdir(`${pathname_module}/Controllers`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Controllers/${moduleName}Controller.ts`,'w' ,err =>{
                    if (err) throw err;
                })
            }
        })
        fs.mkdir(`${pathname_module}/Entities`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Entities/${moduleName}.ts`,'w' ,err =>{
                    if (err) throw err;
                })
            }
        })
        fs.mkdir(`${pathname_module}/Routes`,err=>{
            if(!err){
                fs.writeFile(`${pathname_module}/Routes/Routes.ts`,'w' ,err =>{
                    if (err) throw err;
                })
            }
        })

    }else{
        console.log('Erro ao criar o módulo', err)
    }
})