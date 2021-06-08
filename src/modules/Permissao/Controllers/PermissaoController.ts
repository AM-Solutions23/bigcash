import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Permissao } from '../Entities/Permissao';

export class PermissaoController {
	private permissaoControllerRepository = getRepository(Permissao);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.permissaoControllerRepository.find();
	}

	async one(request: Object) {
		return this.permissaoControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.permissaoControllerRepository.save(request.body);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const permissao = await this.permissaoControllerRepository.findOneOrFail(
				request.params.id
			);
			request.body.id = permissao.id;

			return response.status(200).json({
				status: true,
				permissao: await this.permissaoControllerRepository.save(request.body),
			});
		} catch (err) {
			console.log(err);
			return response
				.status(500)
				.json({ status: false, message: 'Erro ao atualizar' });
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let permissaoControllerToRemove =
			await this.permissaoControllerRepository.findOne(request.params.id);
		await this.permissaoControllerRepository.remove(
			permissaoControllerToRemove
		);
	}
}
