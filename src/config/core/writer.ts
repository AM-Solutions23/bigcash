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
import {${this.name}} from "../Entities/${this.name}";

export class ${this.file_name} {

    private ${this.name.toLowerCase()}Repository = getRepository(${this.name});

    async all(request: Request, response: Response, next: NextFunction) {
        return this.${this.name.toLowerCase()}Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.${this.name.toLowerCase()}Repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.${this.name.toLowerCase()}Repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let ${this.name.toLowerCase()}ToRemove = await this.${this.name.toLowerCase()}Repository.findOne(request.params.id);
        await this.${this.name.toLowerCase()}Repository.remove(${this.name.toLowerCase()}ToRemove);
    }

}`;
        return data;
    }

    writeDefaultRoute (){
        const data:String = `import {${this.file_name}} from "../Controllers/${this.file_name}";

export const Routes = [{
    method: "get",
    route: "/${this.route}",
    controller: ${this.file_name},
    action: "all"
}, {
    method: "get",
    route: "/${this.route}/:id",
    controller: ${this.file_name},
    action: "one"
}, {
    method: "post",
    route: "/${this.route}",
    controller: ${this.file_name},
    action: "save"
}, {
    method: "delete",
    route: "/${this.route}/:id",
    controller: ${this.file_name},
    action: "remove"
}];`
        return data;
    }

    writeDefaultEntity (){
        const data:String = `import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ${this.name} {

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