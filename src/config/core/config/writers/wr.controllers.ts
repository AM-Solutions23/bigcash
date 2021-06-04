
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

    async one(request: Object) {
        return this.${this.controller.toLowerCase()}Repository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
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
import {UsuarioController} from './../../Usuario/Controllers/UsuarioController';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class ${this.controller} {

    private ${this.controller.toLowerCase()}Repository = getRepository(${this.entity});

    async login(request: Request, response: Response, next: NextFunction) {
        const user = await (new UsuarioController).one({email: request.body.email})
        if(user && await bcrypt.compare(request.body.senha, user.senha))
            return response.status(200)
            .json({status:true, token_:jwt.sign({id: user.id}, 'aemcli2021_ts_schema@'), message:'Logado com sucesso!'})
        else
            response.status(200).json({status:false, message:'Usuário ou senha incorretos!'})
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        return response.status(200).json({status:true, message:'Deslogado com sucesso!', token_:null})
    }

}`;
        return data;
    }
}