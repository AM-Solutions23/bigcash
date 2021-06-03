import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Permissao} from "./../Entities/Permissao";
import {PermissaoActions} from "./../Entities/PermissaoActions";

export class PermissaoController {

    private permissaocontrollerRepository = getRepository(Permissao);
    private PermissaoActionscontrollerRepository = getRepository(PermissaoActions);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.permissaocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.permissaocontrollerRepository.findOne(request);
    }

    async actions(request: Object) {
        return this.PermissaoActionscontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.permissaocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let permissaocontrollerToRemove = await this.permissaocontrollerRepository.findOne(request.params.id);
        await this.permissaocontrollerRepository.remove(permissaocontrollerToRemove);
    }

}