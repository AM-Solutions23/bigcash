import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Anotacao} from "./../Entities/Anotacao";

export class AnotacaoController {

    private anotacaocontrollerRepository = getRepository(Anotacao);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.anotacaocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.anotacaocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.anotacaocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let anotacaocontrollerToRemove = await this.anotacaocontrollerRepository.findOne(request.params.id);
        await this.anotacaocontrollerRepository.remove(anotacaocontrollerToRemove);
    }

}