class WriterAMCLI{
    protected name:string;
    protected route:string;
    protected type:string;
    protected entity_options:Array<string>;
    protected pathname:string;
    protected file_name:string;

    constructor(args:any){
        this.type = args['type'];
        this.name = args['name'];
        this.route = args['route'];
        this.file_name = args['file_name'] || args['name'];
        this.entity_options = args['entity_options'];
        this.pathname = `${__dirname}/../../${this.name}`;
    }

    writeDefaultController(){
        const data:String =`import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {${this.type}} from "../Entities/${this.type}";

export class ${this.type}Controller {

    private ${this.module.toLowerCase()}Repository = getRepository(${this.module});

    async all(request: Request, response: Response, next: NextFunction) {
        return this.${this.module.toLowerCase()}Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.${this.module.toLowerCase()}Repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.${this.module.toLowerCase()}Repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let ${this.module.toLowerCase()}ToRemove = await this.${this.module.toLowerCase()}Repository.findOne(request.params.id);
        await this.${this.module.toLowerCase()}Repository.remove(${this.module.toLowerCase()}ToRemove);
    }

}`;
        return data;
    }

    writeDefaultRoute (){
        const data:String = `import {${this.module}Controller} from "../Controllers/${this.module}Controller";

export const Routes = [{
    method: "get",
    route: "/${this.routeURL}",
    controller: ${this.module}Controller,
    action: "all"
}, {
    method: "get",
    route: "/${this.routeURL}/:id",
    controller: ${this.module}Controller,
    action: "one"
}, {
    method: "post",
    route: "/${this.routeURL}",
    controller: ${this.module}Controller,
    action: "save"
}, {
    method: "delete",
    route: "/${this.routeURL}/:id",
    controller: ${this.module}Controller,
    action: "remove"
}];`
        return data;
    }

    writeDefaultEntity (){
        const data:String = `import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ${this.module} {

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