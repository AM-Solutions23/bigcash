import { Perfil } from '../Entities/Perfil';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const perfilData = [
			{
				nome: 'Empreendedor',
				status: true,
			},
			{
				nome: 'Credenciado',
				status: true,
			},
			{
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
