import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Aula} from "./../Entities/Aula";

export class AulaController {

    private aulacontrollerRepository = getRepository(Aula);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.aulacontrollerRepository.find();
    }

    async one(request: Object) {
        return this.aulacontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.aulacontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let aulacontrollerToRemove = await this.aulacontrollerRepository.findOne(request.params.id);
        await this.aulacontrollerRepository.remove(aulacontrollerToRemove);
    }

}