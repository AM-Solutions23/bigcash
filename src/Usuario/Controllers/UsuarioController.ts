import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../Entities/Usuario";

export class UsuarioController {

    private usuarioRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let usuarioToRemove = await this.usuarioRepository.findOne(request.params.id);
        await this.usuarioRepository.remove(usuarioToRemove);
    }

}