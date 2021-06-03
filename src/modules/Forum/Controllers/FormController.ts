import {getRepository} from "typeorm";
        import {NextFunction, Request, Response} from "express";
import {Forum} from "./../Entities/Forum";

export class FormController {

    private formcontrollerRepository = getRepository(Forum);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.formcontrollerRepository.find();
    }

    async one(request: Object) {
        return this.formcontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.formcontrollerRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let formcontrollerToRemove = await this.formcontrollerRepository.findOne(request.params.id);
        await this.formcontrollerRepository.remove(formcontrollerToRemove);
    }

}