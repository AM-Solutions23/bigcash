import { PermissaoActions } from '../Entities/PermissaoActions';
import { createConnection } from 'typeorm';
import { Actions }  from '../Entities/Actions';
import { isNumber } from 'util';

export default (function () {
	const permissoes = [1, 2, 3, 4, 5];
	let permissaoActionsData = [];
	createConnection().then(connec => {
        const idActions = connec.getRepository(Actions)
        .find()
		
		permissoes.forEach(permissao => {
			idActions.forEach (action => {
				action.action_key &&
					permissaoActionsData.push({
						permissao: permissao,
						actionId: idActions
					});
			});
		});
		const permissaoActions = connec.getRepository(PermissaoActions);

		permissaoActionsData.forEach(async data => {
			await permissaoActions.save(data);
		});
	});
	return true;
})();