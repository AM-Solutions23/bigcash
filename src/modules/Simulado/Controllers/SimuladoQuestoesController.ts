import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {SimuladoQuestoes} from "./../Entities/SimuladoQuestoes";

export class SimuladoQuestoesController {

    private simuladoquestoescontrollerRepository = getRepository(SimuladoQuestoes);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.simuladoquestoescontrollerRepository.find();
    }

    async one(request: Object) {
        return this.simuladoquestoescontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.simuladoquestoescontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let simuladoquestoescontrollerToRemove = await this.simuladoquestoescontrollerRepository.findOne(request.params.id);
        await this.simuladoquestoescontrollerRepository.remove(simuladoquestoescontrollerToRemove);
    }

}