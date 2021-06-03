
export default class Routes{
    private route:string;
    private controller:string;
    private middleware:string;
    constructor(fragments){
        this.route = fragments.route;
        this.middleware = fragments.middleware;
        this.controller = fragments.controller;
    }
    public routesData(){
        let has_midd;
        if(this.middleware) has_midd = `import {${this.middleware}} from "../Middlewares/${this.middleware}";`
        else{
            this.middleware = 'auth'
            has_midd = `import {auth} from "../../Auth/Middlewares/auth";`    
        }
        const data:String = `import {${this.controller}} from "../Controllers/${this.controller}";
${has_midd}
export const Routes = [{
    method: "get",
    route: "/${this.route}",
    controller: ${this.controller},
    action: "all",
    middleware: ${this.middleware},
    action_key: "all_${this.route}"
}, {
    method: "get",
    route: "/${this.route}/:id",
    controller: ${this.controller},
    middleware: ${this.middleware},
    action: "one",
    action_key: "one_${this.route}"
}, {
    method: "post",
    route: "/${this.route}",
    controller: ${this.controller},
    middleware: ${this.middleware},
    action: "save",
    action_key: "save_${this.route}"
}, {
    method: "delete",
    route: "/${this.route}/:id",
    controller: ${this.controller},
    middleware: ${this.middleware},
    action: "remove",
    action_key: "remove_${this.route}"
}];`
        return data;
    }
    public routesDataAuth(){
        const data:String = `import {${this.controller}} from "../Controllers/${this.controller}";
import {${this.middleware}} from "./../Middlewares/${this.middleware}";
export const Routes = [{
    method: "post",
    route: "/${this.route}/login",
    controller: ${this.controller},
    action: "login",
    middleware: ${this.middleware},
    action_key: "all_${this.route}"
}, {
    method: "get",
    route: "/${this.route}/logout",
    controller: ${this.controller},
    action: "logout",
    middleware: ${this.middleware},
    action_key: "one_${this.route}"
}];`
        return data;
    }
}