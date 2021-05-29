import * as fs from 'fs';
import WriterAMCLI from './writer';
import {InitResponse} from './interfaces/builder_interfaces'

class BuilderAMCLI extends WriterAMCLI{
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected entity:string;
    protected controller:string;
    protected route_file:string;

    constructor(args:any){
        super(args);
        
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.entity = args['entity'];
        this.controller = args['controller'];
        this.route_file = args['route_file'];
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
        this.controller = `${this.controller}${!this.controller.includes('Controller') ?'Controller':''}`;
        try {
            fs.existsSync(controller_pathname) && 
            fs.writeFile(`${controller_pathname}/${this.controller}.ts`, 
                        this.writeDefaultController(),
                        err =>{ return !err });
            if(!fs.existsSync(`${controller_pathname}/${this.controller}.ts`)) this.createController();
            else return true;
        } catch (error) {
            return false;
        }

    }
    private createRoute(){
        const route_pathname = `${this.pathname}/Routes`;
        try {
            fs.existsSync(route_pathname) && 
            fs.writeFile(`${route_pathname}/${this.route_file}.ts`, 
                        this.writeDefaultRoute(), 
                        err =>{ return !err });
            if(!fs.existsSync(`${route_pathname}/${this.route_file}.ts`))this.createRoute();
            else return true;
        
        } catch (error) {
            return false;
        }

    }
    private createEntity(){
        const entity_pathname = `${this.pathname}/Entities`;
       try {
            fs.existsSync(entity_pathname) && 
            fs.writeFile(`${entity_pathname}/${this.entity}.ts`, 
                        this.writeDefaultEntity(), 
                        err =>{ return !err});
            if(!fs.existsSync(entity_pathname)) this.createEntity();
            else return true;    
       } catch (error) {
        return false;    
       } 
       
    }
    private createModule(){
        try {

            !fs.existsSync(this.pathname) && 
            fs.mkdir(this.pathname, err =>{

                if(this.createModuleFolders()){
                    this.createController();
                    this.createRoute();
                    this.createEntity();
                }
            });
            return true;
        } catch (error) {
            return false;
        }
        
    }
    private async createModuleFolders(){
        if(fs.existsSync(this.pathname)){
            fs.mkdir(`${this.pathname}/Controllers`, err =>{if(err)return false});
            fs.mkdir(`${this.pathname}/Entities`, err =>{if(err)return false});
            fs.mkdir(`${this.pathname}/Routes`, err =>{if(err)return false});
        }
        return true;
    }
}

export default BuilderAMCLI;
