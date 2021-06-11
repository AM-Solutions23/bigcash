import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import Routes from './routes';
import * as LogService from './services/log';

createConnection().then(connection => {
	const app = express();
	app.use(bodyParser.json());
	app.use(express.urlencoded({ extended: true }));
	// register express routes from defined application routes
	Routes.forEach(route => {
		(app as any)[route.method](
			route.route,
			route['middleware'](route.action_key),
			(req: Request, res: Response, next: Function) => {
				const result = new (route.controller as any)()[route.action](
					req,
					res,
					next
				);
				if (result instanceof Promise) {
					result.then(result =>{
						if(result !== null && result !== undefined){
							const log = {
								action_key: route.action_key,
								usuario: req.params.usuario_id,
								tipo: '',
								user_ip: req.body.user_ip,
								user_coordenadas:req.headers.user_coordenadas,
								user_device: req.headers.user_device,
								module: route.module,
								status: true,
								erro: null
							}
							// LogService.createLOG(log);
							result
						}
					});
				} else if (result !== null && result !== undefined) {
					const log = {
						action_key: route.action_key,
						usuario: req.params.usuario_id,
						tipo: '',
						user_ip: req.headers.user_ip,
						user_coordenadas:req.headers.user_coordenadas,
						user_device: req.headers.user_device,
						module: route.module,
						status: false,
						erro: result
					}
					// LogService.createLOG(log);
					result
				}
			}
		);
	});
	app.listen(3001, () => console.log(`Server started on port 3000`));
});
