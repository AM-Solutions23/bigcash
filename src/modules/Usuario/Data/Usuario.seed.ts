import { Usuario } from '../Entities/Usuario';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const usuarioData = [
			{
				nome:"BigCashme",
				login:"bigcash",
				cpf_cnpj:"123.312.321-32",
				permissao:5
			}
		];

		const usuario = connec.getRepository(Usuario);

		usuarioData.forEach(async data => {
			const entity = Object.assign(new Usuario(), data);
			await usuario.save(entity);
		});
	});
	return true;
})();
