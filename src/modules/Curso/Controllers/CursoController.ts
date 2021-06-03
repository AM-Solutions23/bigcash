import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Curso} from "./../Entities/Curso";

export class CursoController {

    private cursocontrollerRepository = getRepository(Curso);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.cursocontrollerRepository.find();
    }

    async one(request: Object) {
        return this.cursocontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.cursocontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let cursocontrollerToRemove = await this.cursocontrollerRepository.findOne(request.params.id);
        await this.cursocontrollerRepository.remove(cursocontrollerToRemove);
    }

}