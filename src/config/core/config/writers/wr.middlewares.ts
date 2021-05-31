
export default class Middlewares{
    private middleware:string;
    private controller:string;
    constructor(fragments){
        this.middleware = fragments.middleware;
        this.controller = fragments.controller;
    }
    public middlewareData(){
        const data:String = `import express from 'express';
import {${this.controller}} from './../Controllers/${this.controller}'

export const ${this.middleware} = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) =>{
        // do stuff here
};`;
        return data;
    }
    public middlewareDataAuth(){
        const data:String = `import express from 'express';
import {UsuarioController} from './../../Usuario/Controllers/UsuarioController'
import {PermissaoController} from './../../Permissao/Controllers/PermissaoController'

export const ${this.middleware} = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) =>{
        // do stuff here
        return next();
};`;
        return data;
    }
}