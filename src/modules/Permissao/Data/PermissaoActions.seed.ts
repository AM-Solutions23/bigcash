import { PermissaoActions } from '../Entities/PermissaoActions';
import { createConnection } from 'typeorm';
import Routes from './../../../routes';

export default (function () {
	const permissoes = [1, 2, 3, 4, 5];
	let permissaoActionsData = [];
	createConnection().then(connec => {
		permissoes.forEach(permissao => {
			Routes.forEach(route => {
				
				route.action_key && permissaoActionsData.push({
					permissao: permissao,
					action: route.action_key,
				});
			});
		});
		console.log(permissaoActionsData);
		const permissaoActions = connec.getRepository(PermissaoActions);

		permissaoActionsData.forEach(async data => {
			await permissaoActions.save(data);
		});
	});
	return true;
})();
