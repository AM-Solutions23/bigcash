import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UsuarioController } from '../../Usuario/Controllers/UsuarioController';
import * as jwt from 'jsonwebtoken';
import * as firebaseService from '../../../services/firebase';
import { PermissaoController } from '../../Permissao/Controllers/PermissaoController';
import { Usuario } from '../../Usuario/Entities/Usuario';

export class AuthController {
	
	private ususarioRepo = getRepository(Usuario);
	private usuarioController = new UsuarioController();

	async login(request: Request, response: Response, next: NextFunction) {
		const atual_user = await this.usuarioController.one({ telefone: this.formatFone(request.body.senha) })
		const credenciado = await this.usuarioController.one({ login: request.body.login });

		if (!credenciado) return response.status(500).logandjson({status:false, message:'Crendenciado não encontrado'})
		
		if ((await this.usuarioController.getPerfils(credenciado.id)).includes(2) && atual_user	) {
			const permissoes = await new PermissaoController().actions({
				permissao: atual_user.permissao,
			});
			const token_ = jwt.sign(
				{ id: atual_user.id, permissoes: permissoes },
				'aemcli2021_ts_schema@'
			);
			atual_user.token_session = token_;
			await this.ususarioRepo.save(atual_user)
			return response.status(200).logandjson({
				status: true,
				token_,
				message: 'Logado com sucesso!',
			}, {id: atual_user.id});
		} else response
				.status(200)
				.logandjson({ status: false, message: 'Login ou senha incorretos!' });
	}

	async logout(request: Request, response: Response, next: NextFunction) {
		await firebaseService.logoutUser();
		const usuario = await this.usuarioController.one({ id: request.params.usuario_id })
		if (!usuario) response.status(500).logandjson({ status: false, message: 'Usuário não encontrado' });
		usuario.token_session = null;
		await this.ususarioRepo.save(usuario);
		return response
			.status(200)
			.logandjson({ status: true, message: 'Deslogado com sucesso!', token_: null });
	}
	async loginGoogle(request: Request, response: Response, next: NextFunction) {
		try {
			const firebase_handle_response_ =
				await firebaseService.prepareLoginOrCreate(
					request.body.token_id,
					request.body.profile_id
				);
			return response.status(200).logandjson(firebase_handle_response_.response, firebase_handle_response_.extra_params);
		} catch (error) {
			return response
				.status(500)
				.logandjson({ status: false, message: 'Falha ao fazer login' });
		}
	}
	formatFone(fone) {
		return fone.trim().replace(')', '').replace('(', '').replace('-', '');
	}
}
