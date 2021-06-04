import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Aula} from "./../Entities/Aula";
import {AulaDocumentos} from "./../Entities/AulaDocumentos";
import HelperAEMCLI from "@helper";

export class AulaController {

    private aulacontrollerRepository = getRepository(Aula);
    private aulaDocumentoscontrollerRepository = getRepository(AulaDocumentos);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.aulacontrollerRepository.find();
    }

    async one(request: Object) {
        return this.aulacontrollerRepository.findOne(request);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.usuario = request.body.usuario || request.params.usuario_id;
        try {
            const aula = await this.aulacontrollerRepository.save(request.body);
            if(aula.id && request.files){
                request.files.forEach(async file => {
                    let file_:AulaDocumentos = {
                        id:null,
                        url: HelperAEMCLI.saveFile('Permissao', file),
                        nome: request.file.filename,
                        aula: aula.id,
                        usuario: aula.usuario,
                        created_at:null,
                        updated_at:null,
                    }
                    await this.aulaDocumentoscontrollerRepository.save(file_);
                });
            }
            return response.status(200).json({status:true, message:'Aula criada com sucesso!'})
        } catch (error) {
            return response.status(500).json({status:false, message:'Falha ao criar aula!'})
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let aulacontrollerToRemove = await this.aulacontrollerRepository.findOne(request.params.id);
        await this.aulacontrollerRepository.remove(aulacontrollerToRemove);
    }

}