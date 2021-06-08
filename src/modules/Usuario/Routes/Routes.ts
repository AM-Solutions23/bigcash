import { UsuarioController } from '../Controllers/UsuarioController';
import { auth } from '../../Auth/Middlewares/auth';
export const Routes = [
	{
		method: 'get',
		route: '/usuarios',
		controller: UsuarioController,
		action: 'all',
		middleware: auth,
		action_key: 'all_usuarios',
	},
	{
		method: 'get',
		route: '/usuarios/:id',
		controller: UsuarioController,
		middleware: auth,
		action: 'one',
		action_key: 'one_usuarios',
	},
	{
		method: 'post',
		route: '/usuarios',
		controller: UsuarioController,
		middleware: auth,
		action: 'save',
		action_key: 'save_usuarios',
	},
	{
		method: 'put',
		route: '/usuarios/:id',
		controller: UsuarioController,
		middleware: auth,
		action: 'update',
		action_key: 'update_usuarios',
	},
	{
		method: 'delete',
		route: '/usuarios/:id',
		controller: UsuarioController,
		middleware: auth,
		action: 'remove',
		action_key: 'remove_usuarios',
	},
];
