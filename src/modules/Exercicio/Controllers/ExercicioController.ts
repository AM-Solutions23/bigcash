import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Exercicio} from "./../Entities/Exercicio";

export class ExercicioController {

    private exerciciocontrollerRepository = getRepository(Exercicio);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.exerciciocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.exerciciocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.exerciciocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let exerciciocontrollerToRemove = await this.exerciciocontrollerRepository.findOne(request.params.id);
        await this.exerciciocontrollerRepository.remove(exerciciocontrollerToRemove);
    }

}