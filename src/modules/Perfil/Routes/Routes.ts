import { PerfilController } from '../Controllers/PerfilController';
import { auth } from '../../Auth/Middlewares/auth';
export const Routes = [
	{
		method: 'get',
		route: '/perfis',
		controller: PerfilController,
		action: 'all',
		middleware: auth,
		action_key: 'all_perfis',
		module: 'Perfil'
	},
	{
		method: 'get',
		route: '/perfis/:id',
		controller: PerfilController,
		middleware: auth,
		action: 'one',
		action_key: 'one_perfis',
		module: 'Perfil'
	},
	{
		method: 'post',
		route: '/perfis',
		controller: PerfilController,
		middleware: auth,
		action: 'save',
		action_key: 'save_perfis',
		module: 'Perfil'
	},
    {
		method: 'put',
		route: '/perfis/:id',
		controller: PerfilController,
		middleware: auth,
		action: 'update',
		action_key: 'update_perfis',
	},
	{
		method: 'delete',
		route: '/perfis/:id',
		controller: PerfilController,
		middleware: auth,
		action: 'remove',
		action_key: 'remove_perfis',
		module: 'Perfil'
	},
];
