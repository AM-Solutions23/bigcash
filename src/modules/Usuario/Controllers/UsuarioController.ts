import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../Entities/Usuario';
import { UsuarioPerfis } from '../Entities/UsuarioPerfis';
import { hash } from 'bcrypt';

export class UsuarioController {
	private usuarioControllerRepository = getRepository(Usuario);
	private usuarioPerfisControllerRepository = getRepository(UsuarioPerfis);

	async all(request: Request, response: Response, next: NextFunction) {
		response.status(200).json({status: true, message: 'Usuário criado com sucesso!', usuarios: await this.usuarioControllerRepository.find()})
	}

	async one(request: Object) {
		return this.usuarioControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		try {
			const user = await this.usuarioControllerRepository.save(request.body);
			if(request.body.perfil){
				const perfil_user = {usuario: user.id, perfil: request.body.perfil}
				this.usuarioPerfisControllerRepository.save(Object.assign(new UsuarioPerfis(), perfil_user))
			}
			response.status(200).json({status: true, message: 'Usuário criado com sucesso!'})
		} catch (error) {
			response.status(500).json({status: false, message: 'Falha ao criar usuário!'})
			
		}
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
			await this.usuarioControllerRepository.save(request.body)

			return response.status(200).json({
				status: true,
				message: 'Usuário atualizado com sucesso'
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
