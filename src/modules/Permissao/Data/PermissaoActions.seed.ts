import { PermissaoActions } from '../Entities/PermissaoActions';
import { createConnection } from 'typeorm';
import { Actions }  from '../Entities/Actions';
import { isNumber } from 'util';

export default (function () {
	const permissoes = [1, 2, 3, 4, 5];
	let actionsData = [];
	createConnection().then((connec) => {
	  Actions.forEach((action) => {
		action.id &&
		  actionsData.push({
			actionId: action.id,
			permissaoId: permissoes
		  });
	  });
  
	  const actionsControllerRepository = connec.getRepository(PermissaoActions);
	  
	  actionsData.forEach(async (data) => {
		await actionsControllerRepository.save(data);
	  });
	});
	return true;
  })();