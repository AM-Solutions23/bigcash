import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Permissao} from "./../Entities/Permissao";

export class PermissaoController {

    private permissaocontrollerRepository = getRepository(Permissao);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.permissaocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.permissaocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
        return this.permissaocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let permissaocontrollerToRemove = await this.permissaocontrollerRepository.findOne(request.params.id);
        await this.permissaocontrollerRepository.remove(permissaocontrollerToRemove);
    }

}