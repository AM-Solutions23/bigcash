import express from "express";
import { UsuarioController } from "../../Usuario/Controllers/UsuarioController";
import * as jwt from "jsonwebtoken";

export const auth = (action_key: string) => {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		if (!req.headers['token_'])
			return res
				.status(500)
				.json({ status: false, message: 'Token de acesso não fornecido!' });
		const token_info = jwt.decode(req.headers['token_']);
		const actions = token_info['permissoes'].map(({ action }) => action);
		if (actions.includes(action_key)) {
			req.params.usuario_id = token_info['id'];
			return next();
		} else res.status(500).json({ status: false, message: 'Sem autorização' });
	};
};
