import { NextFunction, Request, Response } from 'express';
import { Log, LogType } from '../Entities/Log';
import { UsuarioController } from '../../Usuario/Controllers/UsuarioController';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as firebaseService from '../../../services/firebase';

export class AuthController {
	async login(request: Request, response: Response, next: NextFunction) {
		const user = await new UsuarioController().one({
			email: request.body.email,
		});
		if (user && (await bcrypt.compare(request.body.senha, user.senha))) {
			return response.status(200).json({
				status: true,
				token_: jwt.sign({ id: user.id }, 'aemcli2021_ts_schema@'),
				message: 'Logado com sucesso!',
			});
		} else
			response
				.status(200)
				.json({ status: false, message: 'Usuário ou senha incorretos!' });
	}

	async logout(request: Request, response: Response, next: NextFunction) {
		await firebaseService.logoutUser();
		return response
			.status(200)
			.json({ status: true, message: 'Deslogado com sucesso!', token_: null });
	}
	async loginGoogle(request: Request, response: Response, next: NextFunction) {
		try {
			const access_token_ = await firebaseService.prepareLoginOrCreate(
				request.body.token_id,
				request.body.profile_id
			);
			return response.status(200).json({
				status: true,
				token_: access_token_,
				message: 'Logado com sucesso!',
			});
		} catch (error) {
			return response
				.status(500)
				.json({ status: false, message: 'Falha ao fazer login' });
		}
	}
}
