import { ModulosController } from '../Controllers/ModulosController';
import { auth } from '../../Auth/Middlewares/auth';
export const Routes = [
	{
		method: 'get',
		route: '/modulos',
		controller: ModulosController,
		action: 'all',
		middleware: auth,
		action_key: 'all_modulos',
		module: 'Modulo'
	},
	{
		method: 'get',
		route: '/modulos/:id',
		controller: ModulosController,
		middleware: auth,
		action: 'one',
		action_key: 'one_modulos',
		module: 'Modulo'
	},
	{
		method: 'post',
		route: '/modulos',
		controller: ModulosController,
		middleware: auth,
		action: 'save',
		action_key: 'save_modulos',
		module: 'Modulo'
	},
	{
		method: 'put',
		route: '/modulos/:id',
		controller: ModulosController,
		middleware: auth,
		action: 'update',
		action_key: 'update_modulos',
		module: 'Modulo'
	},
	{
		method: 'delete',
		route: '/modulos/:id',
		controller: ModulosController,
		middleware: auth,
		action: 'remove',
		action_key: 'remove_modulos',
		module: 'Modulo'
	},
];
