import Controllers from './config/writers/wr.controllers';
import Entities from './config/writers/wr.entities';
import Routes from './config/writers/wr.routes';
import Middlewares from './config/writers/wr.middlewares';
class WriterAEMCLI{
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected entity:string;
    protected controller:string;
    protected middleware:string;

    constructor(args:any){
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.entity = args['entity'];
        this.controller = args['controller'];
        this.middleware = args['middleware'];
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../modules/${this.name}`;
    }

    writeController(auth = false){
        const controller_data = new Controllers(this);
        return auth ? controller_data.controllerDataAuth() : controller_data.controllerData()
    }
    writeRoute (auth = false){
        const routes_data = new Routes(this);
        return auth && this.middleware ? routes_data.routesDataAuth() : routes_data.routesData()
    }
    writeEntity (){
        return (new Entities(this)).EntitiesData();

    }
    writeMiddleware(auth = false){ 
        const middlewares_data = new Middlewares(this);
        return auth ? middlewares_data.middlewareDataAuth() : middlewares_data.middlewareData()
    }
    setProperties(args){
        this.type = args['type'] || this.type;
        this.name = args['name'] || this.name;
        this.route = args['route'] || this.route;
        this.entity = args['entity'] || this.entity;
        this.controller = args['controller'] || this.controller;
        this.middleware = args['middleware'] || this.middleware;
        this.entity_options = args['entity_options'] || this.entity_options;
        this.pathname = `${__dirname}/../../modules/${this.name}`;
    }
}

export default WriterAEMCLI;