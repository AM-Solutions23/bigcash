import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Log, LogType } from "./../Entities/Log";
import { UsuarioController } from "./../../Usuario/Controllers/UsuarioController";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {
	private authcontrollerRepository = getRepository(Log);

	async login(request: Request, response: Response, next: NextFunction) {
		const user = await new UsuarioController().one({
			email: request.body.email,
		});
		if (user && (await bcrypt.compare(request.body.senha, user.senha))) {
			const log = new Log();
			log.usuario = user.id;
			log.tipo = LogType.LOGIN;
			log.user_ip = request.connection.remoteAddress;
			log.user_coordenadas = "-25.4409845,-49.2795593";
			log.action_key = "login";
			log.user_device = "Chrome";

            await this.authcontrollerRepository.save(log);
			
            return response
				.status(200)
				.json({
					status: true,
					token_: jwt.sign({ id: user.id }, "aemcli2021_ts_schema@"),
					message: "Logado com sucesso!",
				});
		} else
			response
				.status(200)
				.json({ status: false, message: "Usuário ou senha incorretos!" });
	}

	async logout(request: Request, response: Response, next: NextFunction) {

        const log = new Log();
			log.usuario = request.params.usuario_id;
			log.tipo = LogType.LOGOUT;
			log.user_ip = request.connection.remoteAddress;
			log.user_coordenadas = "-25.4409845,-49.2795593";
			log.action_key = "login";
			log.user_device = "Chrome";

            await this.authcontrollerRepository.save(log);


		return response
			.status(200)
			.json({ status: true, message: "Deslogado com sucesso!", token_: null });
	}
}
