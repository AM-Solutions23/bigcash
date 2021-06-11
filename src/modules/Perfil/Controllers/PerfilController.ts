import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Perfil } from '../Entities/Perfil';

export class PerfilController {
	private perfilControllerRepository = getRepository(Perfil);

	async all(request: Request, response: Response, next: NextFunction) {
		try {
			response
				.status(200)
				.json({
					status: true,
					message: 'Usuários listados com sucesso!',
					usuarios: await this.perfilControllerRepository.find(),
				});
		} catch (error) {
			response
				.status(500)
				.json({ status: false, message: 'Falha ao listar usuários' });
		}
	}

	async one(request: Object) {
		return this.perfilControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		try {
			await this.perfilControllerRepository.save(request.body);
			response
				.status(200)
				.json({ status: true, message: 'Perfil criado com sucesso!' });
		} catch (error) {
			response
				.status(500)
				.json({ status: false, message: 'Falha ao criar perfil!' });
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const perfil = await this.perfilControllerRepository.findOneOrFail(
				request.params.id
			);
			request.body.id = perfil.id;

			return response.status(200).json({
				status: true,
				perfis: await this.perfilControllerRepository.save(request.body),
			});
		} catch (err) {
			console.log(err);
			return response
				.status(500)
				.json({ status: false, message: 'Erro ao atualizar' });
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let perfilControllerToRemove =
			await this.perfilControllerRepository.findOne(request.params.id);
		await this.perfilControllerRepository.remove(perfilControllerToRemove);
	}
}
