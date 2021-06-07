import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Modulos} from "./../Entities/Modulos";

export class ModulosController {

    private moduloscontrollerRepository = getRepository(Modulos);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.moduloscontrollerRepository.find();
    }

    async one(request: Object) {
        return this.moduloscontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
        return this.moduloscontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let moduloscontrollerToRemove = await this.moduloscontrollerRepository.findOne(request.params.id);
        await this.moduloscontrollerRepository.remove(moduloscontrollerToRemove);
    }

}