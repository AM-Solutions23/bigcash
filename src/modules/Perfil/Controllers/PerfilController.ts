import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Perfil} from "../Entities/Perfil";

export class PerfilController {

    private perfilcontrollerRepository = getRepository(Perfil);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.perfilcontrollerRepository.find();
    }

    async one(request: Object) {
        return this.perfilcontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
        return this.perfilcontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let perfilcontrollerToRemove = await this.perfilcontrollerRepository.findOne(request.params.id);
        await this.perfilcontrollerRepository.remove(perfilcontrollerToRemove);
    }

}