import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {CursoModulos} from "./../Entities/CursoModulos";

export class CursoModulosController {

    private cursomoduloscontrollerRepository = getRepository(CursoModulos);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.cursomoduloscontrollerRepository.find();
    }

    async one(request: Object) {
        return this.cursomoduloscontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.cursomoduloscontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let cursomoduloscontrollerToRemove = await this.cursomoduloscontrollerRepository.findOne(request.params.id);
        await this.cursomoduloscontrollerRepository.remove(cursomoduloscontrollerToRemove);
    }

}