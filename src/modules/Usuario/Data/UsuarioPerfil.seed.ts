import { UsuarioPerfis } from '../Entities/UsuarioPerfis';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const usuarioPerfilData = [
			{
				perfil: 1,
				usuario: 1,
			},
			{
				perfil: 2,
				usuario: 1,
			}
		];

		const usuarioPerfil = connec.getRepository(UsuarioPerfis);

		usuarioPerfilData.forEach(async data => {
			const entity = Object.assign(new UsuarioPerfis(), data);
			await usuarioPerfil.save(entity);
		});
	});
	return true;
})();
