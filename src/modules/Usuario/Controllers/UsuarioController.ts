import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../Entities/Usuario';
import { hash } from 'bcrypt';

export class UsuarioController {
	private usuarioControllerRepository = getRepository(Usuario);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.usuarioControllerRepository.find();
	}

	async one(request: Object) {
		return this.usuarioControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.usuarioControllerRepository.save(request.body);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const usuario = await this.usuarioControllerRepository.findOneOrFail(
				request.params.id
			);
			request.body.id = usuario.id;
			if (request.body.senha !== undefined) {
				request.body.senha = await hash(request.body.senha, 10);
			}

			return response.status(200).json({
				status: true,
				usuarios: await this.usuarioControllerRepository.save(request.body),
			});
		} catch (err) {
			console.log(err);
			return response
				.status(500)
				.json({ status: false, message: 'Erro ao atualizar' });
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let usuariocontrollerToRemove =
			await this.usuarioControllerRepository.findOne(request.params.id);
		await this.usuarioControllerRepository.remove(usuariocontrollerToRemove);
	}
}
