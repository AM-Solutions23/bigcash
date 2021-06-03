import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Materia} from "./../Entities/Materia";

export class MateriaController {

    private materiacontrollerRepository = getRepository(Materia);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.materiacontrollerRepository.find();
    }

    async one(request: Object) {
        return this.materiacontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.materiacontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let materiacontrollerToRemove = await this.materiacontrollerRepository.findOne(request.params.id);
        await this.materiacontrollerRepository.remove(materiacontrollerToRemove);
    }

}