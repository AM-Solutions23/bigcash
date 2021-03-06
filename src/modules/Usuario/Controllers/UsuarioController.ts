import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../Entities/Usuario';
import { UsuarioPerfis } from '../Entities/UsuarioPerfis';

export class UsuarioController {
	private usuarioControllerRepository = getRepository(Usuario);
	private usuarioPerfisControllerRepository = getRepository(UsuarioPerfis);

	async all(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(200).logandjson({
				status: true,
				message: 'Usuários listados com sucesso!',
				usuarios: await this.usuarioControllerRepository.find(),
			});
		} catch (error) {
			response
				.status(500)
				.logandjson({ status: false, message: 'Falha ao listar usuários' });
		}
	}

	async one(request: Object) {
		return this.usuarioControllerRepository.findOne(request);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		try {
			const check_ = await this.checkBeforeInsert(request.body);
			if (!check_) {
				if (!(await this.one({ id: request.body.credenciado })))
					return response
						.status(500)
						.logandjson({ status: false, message: 'Credenciado não encontrado' });
				const user = await this.usuarioControllerRepository.save(request.body);

				if (request.body.perfil) {
					const perfil_user = { usuario: user.id, perfil: request.body.perfil };
					this.usuarioPerfisControllerRepository.save(
						Object.assign(new UsuarioPerfis(), perfil_user)
					);
				}
				response
					.status(200)
					.logandjson({ status: true, message: 'Usuário criado com sucesso!' });
			} else {
				const field_ = check_['login'] ? 'Login' : 'CPF/CNPJ';
				response
					.status(500)
					.logandjson({ status: false, message: `Telefone já cadastrado!` });
			}
		} catch (error) {
			response.status(500).logandjson({ status: false, message: 'Falha ao cadastrar cadastrado!' });
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const usuario = await this.usuarioControllerRepository.findOneOrFail(
				request.params.id
			);
			if (!usuario) return response.status(404).logandjson({status:true, message:'Usuário não encontrado!'})
			request.body.id = usuario.id;
			
			await this.usuarioControllerRepository.save(Object.assign(new Usuario(),request.body));
			if (request.body.perfil) {
				const perfils = await this.usuarioPerfisControllerRepository.find({
					where: { usuario: usuario.id }
				});
				await this.usuarioPerfisControllerRepository.remove(perfils);
				request.body.perfil.forEach(perfil => {
					this.usuarioPerfisControllerRepository.save(Object.assign(new UsuarioPerfis(), {usuario: usuario.id, perfil}))
				});
			}
			return response.status(200).logandjson({
				status: true,
				message: 'Usuário atualizado com sucesso',
			});
		} catch (err) {
			return response
				.status(500)
				.logandjson({ status: false, message: 'Erro ao atualizar' });
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let usuariocontrollerToRemove =
			await this.usuarioControllerRepository.findOne(request.params.id);
		await this.usuarioControllerRepository.remove(usuariocontrollerToRemove);
	}

	async checkBeforeInsert(params) {
		return await this.usuarioControllerRepository
			.createQueryBuilder('usuario')
			.where(
				`usuario.telefone = "${params['telefone']}"`
			)
			.getOne();
	}

	async getPerfils(usuario) {
		let perfis = []
		const perfis_ = await this.usuarioPerfisControllerRepository.find({
			where: [{ usuario }],
			select: ['perfil'],
		});
		perfis_.forEach(perfil => {
			perfis.push(perfil.perfil);
		})
		return perfis;
	} 
}
