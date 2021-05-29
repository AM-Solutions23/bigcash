import * as fs from 'fs';
import WriterAMCLI from './writer';
import {InitResponse} from './interfaces/builder_interfaces'

class BuilderAMCLI extends WriterAMCLI{
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected file_name:string;

    constructor(args:any){
        super(args);
        
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.file_name = args['file_name'] || args['name'];
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../${this.name}`;
    }
    init(){
        let response:InitResponse = {color:'green', message:'', result: true};
        const modules_filter = ['Module', 'Controller', 'Entity', 'Route'];
        
        if(modules_filter.includes(this.type)){
            this[`create${this.type}`]();
            response.message = `${this.type} criado com sucesso!`;
        }else{
            response.color = 'red';
            response.message = 'Módulo escolhido não encontrado! [Module, Controller, Entity, Route]';
            response.result = false
        }
          return response;
    }

    private createController(){
        const controller_pathname = `${this.pathname}/Controllers`;
        try {
            fs.existsSync(controller_pathname) && 
            fs.writeFile(`${controller_pathname}/${this.file_name}${!this.file_name.includes('Controller') ?'Controller':''}.ts`, 
                        this.writeDefaultController(),
                        err =>{ return !err });
            return true;
        } catch (error) {
            return false;
        }

    }
    private createRoute(){
        const route_pathname = `${this.pathname}/Routes`;
        this.file_name = this.type == 'module' ? 'Routes' : this.file_name;
        try {
            fs.existsSync(route_pathname) && 
            fs.writeFile(`${route_pathname}/${this.file_name}.ts`, 
                        this.writeDefaultRoute(), 
                        err =>{ return !err });
            return true;
        } catch (error) {
            return false;
            
        }

    }
    private createEntity(){
        const entity_pathname = `${this.pathname}/Entities`;
       try {
            fs.existsSync(entity_pathname) && 
            fs.writeFile(`${entity_pathname}/${this.file_name}.ts`, 
                        this.writeDefaultEntity(), 
                        err =>{ return !err });
            return true;    
       } catch (error) {
        return false;    
       } 
       
    }
    private createModule(){
        try {
            !fs.existsSync(this.pathname) && 
            fs.mkdir(this.pathname, err =>{
                if(this.createModuleFolders()){
                    this.createEntity();
                    this.createController();
                    this.createRoute();
                }
            });
            return true;
        } catch (error) {
            return false;
        }
        
    }
    private createModuleFolders(){
        if(fs.existsSync(this.pathname)){
            fs.mkdir(`${this.pathname}/Controllers`, err =>{if(err)return false});
            fs.mkdir(`${this.pathname}/Entities`, err =>{if(err)return false});
            fs.mkdir(`${this.pathname}/Routes`, err =>{if(err)return false});
        }
        return true;
    }
}

export default BuilderAMCLI;
