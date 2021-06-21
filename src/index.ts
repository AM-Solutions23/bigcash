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
	Routes.forEach(route => {
		(app as any)[route.method](
			route.route,
			route['middleware'](route.action_key),
			async (req: Request, res: Response, next: Function) => {
				res.logandjson = (json_, extra_params = {}) => {
					LogService.createLOG({
						action_key: route.action_key,
						usuario: extra_params['id'] ||req.params.usuario_id || null,
						tipo: '',
						user_ip: req.headers.user_ip || null,
						user_coordenadas:req.headers.user_coordenadas|| null,
						user_device: req.headers.user_device || null,
						module: route.module,
						status:'1',
						message: json_.message instanceof Object ? JSON.stringify(json_.message) : json_.message
					});
					res.json(json_);
				}
				const result = new (route.controller as any)()[route.action](
					req,
					res,
					next
				);
				if (result instanceof Promise) {
					result.then(result => {
						result !== null && result !== undefined && result;
					});
				} else if (result !== null && result !== undefined) result
			}
		);
	});
	app.listen(3001, () => console.log(`Server started on port 3001`));
});
