import { PermissaoController } from '../Controllers/PermissaoController';
import { auth } from '../../Auth/Middlewares/auth';
export const Routes = [
	{
		method: 'get',
		route: '/permissoes',
		controller: PermissaoController,
		action: 'all',
		middleware: auth,
		action_key: 'all_permissoes',
	},
	{
		method: 'get',
		route: '/permissoes/:id',
		controller: PermissaoController,
		middleware: auth,
		action: 'one',
		action_key: 'one_permissoes',
	},
	{
		method: 'post',
		route: '/permissoes',
		controller: PermissaoController,
		middleware: auth,
		action: 'save',
		action_key: 'save_permissoes',
	},
    {
		method: 'put',
		route: '/permissoes/:id',
		controller: PermissaoController,
		middleware: auth,
		action: 'update',
		action_key: 'update_permissoes',
	},
	{
		method: 'delete',
		route: '/permissoes/:id',
		controller: PermissaoController,
		middleware: auth,
		action: 'remove',
		action_key: 'remove_permissoes',
	},
];
