import { NextFunction, Request, Response } from 'express';
import { UsuarioController } from '../../Usuario/Controllers/UsuarioController';
import * as jwt from 'jsonwebtoken';
import * as firebaseService from '../../../services/firebase';
import { PermissaoController } from '../../Permissao/Controllers/PermissaoController';

export class AuthController {
	async login(request: Request, response: Response, next: NextFunction) {
		const userController = new UsuarioController();
		const credenciado = await userController.one({
			login: request.body.login,
		});
		const check_perfil_credenciado = await new UsuarioController().getPerfils(credenciado.id);
		check_perfil_credenciado
		// if (
			
		// ) {
		// 	const permissoes = await new PermissaoController().actions({
		// 		permissao: user.permissao,
		// 	});
		// 	return response.status(200).json({
		// 		status: true,
		// 		token_: jwt.sign(
		// 			{ id: user.id, permissoes: permissoes },
		// 			'aemcli2021_ts_schema@'
		// 		),
		// 		message: 'Logado com sucesso!',
		// 	});
		// } else
		// 	response
		// 		.status(200)
		// 		.json({ status: false, message: 'Usuário ou senha incorretos!' });
	}

	async logout(request: Request, response: Response, next: NextFunction) {
		await firebaseService.logoutUser();
		return response
			.status(200)
			.json({ status: true, message: 'Deslogado com sucesso!', token_: null });
	}
	async loginGoogle(request: Request, response: Response, next: NextFunction) {
		try {
			const firebase_handle_response_ =
				await firebaseService.prepareLoginOrCreate(
					request.body.token_id,
					request.body.profile_id
				);
			return response.status(200).json(firebase_handle_response_);
		} catch (error) {
			return response
				.status(500)
				.json({ status: false, message: 'Falha ao fazer login' });
		}
	}
	formatFone(fone) {
		return fone.trim().replace(')', '').replace('(', '').replace('-', '');
	}
}
