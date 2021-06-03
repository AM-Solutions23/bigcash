import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {ExercicioRespostas} from "./../Entities/ExercicioRespostas";

export class ExercicioRespostasController {

    private exerciciorespostascontrollerRepository = getRepository(ExercicioRespostas);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.exerciciorespostascontrollerRepository.find();
    }

    async one(request: Object) {
        return this.exerciciorespostascontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.exerciciorespostascontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let exerciciorespostascontrollerToRemove = await this.exerciciorespostascontrollerRepository.findOne(request.params.id);
        await this.exerciciorespostascontrollerRepository.remove(exerciciorespostascontrollerToRemove);
    }

}