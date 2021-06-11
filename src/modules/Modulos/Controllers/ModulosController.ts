import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Modulos } from '../Entities/Modulos';

export class ModulosController {
	private modulosControllerRepository = getRepository(Modulos);

	async all(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(200).json({status: true, message: 'Usuários listados com sucesso!', usuarios: await this.modulosControllerRepository.find()})
		} catch (error) {
			response.status(500).json({status: false, message: 'Falha ao listar usuários'})
		}
	}

	async one(request: Object) {
		return this.modulosControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		request.body.usuario = request.body.usuario || request.params.usuario_id;
		try {
			await this.modulosControllerRepository.save(request.body);
			response.status(200).json({status: true, message: 'Módulo criado com sucesso!'})
		} catch (error) {
			response.status(500).json({status: false, message: 'Falha ao criar módulo!'})
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const modulo = await this.modulosControllerRepository.findOneOrFail(
				request.params.id
			);
			request.body.id = modulo.id;
			await this.modulosControllerRepository.save(request.body)	
			response.status(200).json({
				status: true,
				message:'Módulo atualizado com sucesso!'
			});
		} catch (err) {
			console.log(err);
			response
				.status(500)
				.json({ status: false, message: 'Erro ao atualizar' });
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let modulosControllerToRemove =
			await this.modulosControllerRepository.findOne(request.params.id);
		await this.modulosControllerRepository.remove(modulosControllerToRemove);
	}
}
