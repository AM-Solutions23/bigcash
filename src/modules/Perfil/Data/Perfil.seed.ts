import { Perfil } from '../Entities/Perfil';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const perfilData = [
			{
				id:1,
				nome: 'Empreendedor',
				status: true,
			},
			{
				id:2,
				nome: 'Credenciado',
				status: true,
			},
			{
				id:3,
				nome: 'Parceiro',
				status: true,
			},
		];

		const permissao = connec.getRepository(Perfil);

		perfilData.forEach(async data => {
			const entity = Object.assign(new Perfil(), data);
			await permissao.save(entity);
		});
	});
	return true;
})();
