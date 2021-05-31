import * as fs from 'fs';
import WriterAEMCLI from './writer';
import {InitResponse} from './interfaces/builder_interfaces'

class BuilderAEMCLI extends WriterAEMCLI {
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected entity:string;
    protected controller:string;
    protected middleware:string;
    protected route_file:string;

    constructor(args:any){
        super(args);
        
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.entity = args['entity'];
        this.controller = args['controller'];
        this.middleware = args['middleware'];
        this.route_file = args['route_file'] || 'Routes';
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../modules/${this.name}`;
    }
    init(){
        !fs.existsSync(`${__dirname}/../../modules/`) && 
        fs.mkdir(`${__dirname}/../../modules/`, err =>{if(err)return false});

        let response:InitResponse = {color:'green', message:'', result: true};
        const modules_filter = ['Module', 'Controller', 'Entity', 'Route', 'Auth'];

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

    private createController(auth:boolean = false){
        const controller_pathname = `${this.pathname}/Controllers`;
        this.controller = `${this.controller}${!this.controller.includes('Controller') ?'Controller':''}`;
        try {
            fs.existsSync(controller_pathname) && 
            fs.writeFile(`${controller_pathname}/${this.controller}.ts`, 
                        this.writeController(auth),
                        err =>{ return !err });
            if(!fs.existsSync(`${controller_pathname}/${this.controller}.ts`)) this.createController(auth);
            else return true;
        } catch (error) {
            return false;
        }

    }
    private createRoute(auth:boolean = false){
        const route_pathname = `${this.pathname}/Routes`;
        try {
            fs.existsSync(route_pathname) && 
            fs.writeFile(`${route_pathname}/${this.route_file}.ts`, 
                        this.writeRoute(auth), 
                        err =>{ return !err });
            if(!fs.existsSync(`${route_pathname}/${this.route_file}.ts`))this.createRoute(auth);
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
                        this.writeEntity(), 
                        err =>{ return !err});
            if(!fs.existsSync(`${entity_pathname}/${this.entity}.ts`)) this.createEntity();
            else return true;    
       } catch (error) {
        return false;    
       } 
       
    }
    private createModule(auth:boolean = false, no_middleware = false){
        try {

            !fs.existsSync(this.pathname) && 
            fs.mkdir(this.pathname, err =>{

                if(this.createModuleFolders()){
                    this.createController(auth);
                    this.createRoute(auth);
                    this.createEntity();
                    !no_middleware && this.createMiddleware();
                }
            });
            return true;
        } catch (error) {
            return false;
        }
        
    }
    private createMiddleware(auth:boolean = false){
        const middleware_pathname = `${this.pathname}/Middlewares`;
       try {
            fs.existsSync(middleware_pathname) && 
            fs.writeFile(`${middleware_pathname}/${this.middleware}.ts`, 
            this.writeMiddleware(auth), 
                        err =>{ return !err});
            
            if(!fs.existsSync(`${middleware_pathname}`)) this.createModuleFolders();
            if(!fs.existsSync(`${middleware_pathname}/${this.middleware}.ts`)) this.createMiddleware(auth);
            else return true;    
       } catch (error) {
           return error
        return false;    
       } 

    }
    private createModuleFolders(){
        if(fs.existsSync(this.pathname)){
            !fs.existsSync(`${this.pathname}/Controllers`)&& 
            fs.mkdir(`${this.pathname}/Controllers`, err =>{if(err)return false});

            !fs.existsSync(`${this.pathname}/Entities`)&&
            fs.mkdir(`${this.pathname}/Entities`, err =>{if(err)return false});
            
            !fs.existsSync(`${this.pathname}/Routes`)&&
            fs.mkdir(`${this.pathname}/Routes`, err =>{if(err)return false});
            
            !fs.existsSync(`${this.pathname}/Middlewares`)&&
            fs.mkdir(`${this.pathname}/Middlewares`, err =>{if(err)return false});
        }
        return true;
    }

    private createAuth(){
        try {
            const modules_auth = [
                {
                route:'usuarios',
                name:'Usuario',
                entity:'Usuario',
                controller:'UsuarioController',
                auth:false
                },{
                name:'Permissao',
                route:'permissoes',
                entity:'Permissao',
                controller:'PermissaoController',
                auth:false
                },{
                name:'Auth',
                route:'auth',
                entity:'Log',
                middleware: this.middleware,
                controller:'AuthController',
                auth:true
                }
            ]
            modules_auth.forEach(module => {
                this.handleAuthCreation(module); 
            });    

            return true;
        } catch (error) {
            
        }
    }

    private handleAuthCreation(module){
        const module_instance = new BuilderAEMCLI(module);
        module_instance.createModule(module.auth, true);
        if(module.name === 'Auth') module_instance.createMiddleware(true);
        this.setProperties(module);
    }
    
}

export default BuilderAEMCLI;
