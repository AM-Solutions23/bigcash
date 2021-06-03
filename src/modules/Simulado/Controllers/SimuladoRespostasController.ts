import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {SimuladoRespostas} from "./../Entities/SimuladoRespostas";

export class SimuladoRespostasController {

    private simuladorespostascontrollerRepository = getRepository(SimuladoRespostas);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.simuladorespostascontrollerRepository.find();
    }

    async one(request: Object) {
        return this.simuladorespostascontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.simuladorespostascontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let simuladorespostascontrollerToRemove = await this.simuladorespostascontrollerRepository.findOne(request.params.id);
        await this.simuladorespostascontrollerRepository.remove(simuladorespostascontrollerToRemove);
    }

}