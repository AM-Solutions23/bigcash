
export default class Controllers{
    private controller:string;
    private entity:string;
    constructor(fragments){
        this.entity = fragments.entity;
        this.controller = fragments.controller;
    }
    public controllerData(){
        const data:String =`import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {${this.entity}} from "./../Entities/${this.entity}";

export class ${this.controller} {

    private ${this.controller.toLowerCase()}Repository = getRepository(${this.entity});

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
    public controllerDataAuth(){
        const data:String =`import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {${this.entity}} from "./../Entities/${this.entity}";

export class ${this.controller} {

    private ${this.controller.toLowerCase()}Repository = getRepository(${this.entity});

    async login(request: Request, response: Response, next: NextFunction) {
        // do stuff
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        // do stuff
    }

}`;
        return data;
    }
}