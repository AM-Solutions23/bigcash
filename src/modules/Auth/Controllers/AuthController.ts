import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Log} from "./../Entities/Log";
import {UsuarioController} from './../../Usuario/Controllers/UsuarioController';
import {PermissaoController} from './../../Permissao/Controllers/PermissaoController';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {

    private authcontrollerRepository = getRepository(Log);

    async login(request: Request, response: Response, next: NextFunction) {
        const user = await (new UsuarioController).one({email: request.body.email})
        if(user && await bcrypt.compare(request.body.senha, user.senha)){
            const permissoes = (new PermissaoController).actions({permissao: user.permissao})
            return response.status(200)
            .json({status:true, token_:jwt.sign({id: user.id, permissoes:permissoes}, 'aemcli2021_ts_schema@'), message:'Logado com sucesso!'})
        }else
            response.status(200).json({status:false, message:'Usuário ou senha incorretos!'})
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        return response.status(200).json({status:true, message:'Deslogado com sucesso!', token_:null})
    }

}