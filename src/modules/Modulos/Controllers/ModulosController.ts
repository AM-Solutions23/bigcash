import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Modulos } from '../Entities/Modulos';

export class ModulosController {
	private modulosControllerRepository = getRepository(Modulos);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.modulosControllerRepository.find();
	}

	async one(request: Object) {
		return this.modulosControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		request.body.usuario = request.body.usuario || request.params.usuario_id;
		return this.modulosControllerRepository.save(request.body);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const modulo = await this.modulosControllerRepository.findOneOrFail(
				request.params.id
			);
			request.body.id = modulo.id;

			return response.status(200).json({
				status: true,
				modulos: await this.modulosControllerRepository.save(request.body),
			});
		} catch (err) {
			console.log(err);
			return response
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
