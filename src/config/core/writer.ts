class WriterAMCLI{
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected entity:string;
    protected controller:string;

    constructor(args:any){
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.entity = args['entity'];
        this.controller = args['controller'];
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../${this.name}`;
    }

    writeDefaultController(){
        const data:String =`import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {${this.entity}} from "../Entities/${this.entity}";

export class ${this.controller} {

    private ${this.controller.toLowerCase()}Repository = getRepository(${this.controller});

    async all(request: Request, response: Response, next: NextFunction) {
        return this.${this.controller.toLowerCase()}Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.${this.controller.toLowerCase()}Repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.${this.controller.toLowerCase()}Repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let ${this.controller.toLowerCase()}ToRemove = await this.${this.controller.toLowerCase()}Repository.findOne(request.params.id);
        await this.${this.controller.toLowerCase()}Repository.remove(${this.controller.toLowerCase()}ToRemove);
    }

}`;
        return data;
    }

    writeDefaultRoute (){
        const data:String = `import {${this.controller}} from "../Controllers/${this.controller}";

export const Routes = [{
    method: "get",
    route: "/${this.route}",
    controller: ${this.controller},
    action: "all"
}, {
    method: "get",
    route: "/${this.route}/:id",
    controller: ${this.controller},
    action: "one"
}, {
    method: "post",
    route: "/${this.route}",
    controller: ${this.controller},
    action: "save"
}, {
    method: "delete",
    route: "/${this.route}/:id",
    controller: ${this.controller},
    action: "remove"
}];`
        return data;
    }

    writeDefaultEntity (){
        const data:String = `import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ${this.entity} {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    column1: string;

    @Column()
    column2: string;

} `;
        return data;
    }
}

export default WriterAMCLI;