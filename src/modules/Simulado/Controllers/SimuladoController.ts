import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Simulado} from "./../Entities/Simulado";

export class SimuladoController {

    private simuladocontrollerRepository = getRepository(Simulado);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.simuladocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.simuladocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.simuladocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let simuladocontrollerToRemove = await this.simuladocontrollerRepository.findOne(request.params.id);
        await this.simuladocontrollerRepository.remove(simuladocontrollerToRemove);
    }

}