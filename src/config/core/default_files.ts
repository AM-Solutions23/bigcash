class DefaultFiles{
    private module:string
    private routeURL:string

    constructor(module:string, routeURL:string){
        this.module = module;
        this.routeURL = routeURL;
    }

    writeDefaultController(){
        const data:String =`import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {${this.module}} from "../Entities/${this.module}";

export class ${this.module}Controller {

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

export default DefaultFiles;
