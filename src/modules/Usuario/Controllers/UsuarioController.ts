import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Usuario} from "../Entities/Usuario";

export class UsuarioController {

    private usuariocontrollerRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.usuariocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.usuariocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
        return this.usuariocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let usuariocontrollerToRemove = await this.usuariocontrollerRepository.findOne(request.params.id);
        await this.usuariocontrollerRepository.remove(usuariocontrollerToRemove);
    }

}