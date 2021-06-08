import { Permissao } from '../Entities/Permissao';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const permissaoData = [
			{
				id: 1,
				nome: 'Root',
			},
			{
				id: 2,
				nome: 'Admin',
			},
			{
				id: 3,
				nome: 'Manager',
			},
			{
				id: 4,
				nome: 'Support',
			},
			{
				id: 5,
				nome: 'User',
			},
		];

		const permissao_ = connec.getRepository(Permissao);

		permissaoData.forEach(async permissao => {
			await permissao_.save(permissao);
		});
	});
	return true;
})();
