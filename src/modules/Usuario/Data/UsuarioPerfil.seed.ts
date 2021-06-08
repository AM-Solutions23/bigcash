import { UsuarioPerfis } from '../Entities/UsuarioPerfis';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const usuarioPerfilData = [
			{
				id: 1,
				perfil: 1,
				usuario: 6,
			},
			{
				id: 2,
				perfil: 2,
				usuario: 7,
			},
			{
				id: 3,
				perfil: 3,
				usuario: 8,
			},
		];

		const usuarioPerfil = connec.getRepository(UsuarioPerfis);

		usuarioPerfilData.forEach(async data => {
			const entity = Object.assign(new UsuarioPerfis(), data);
			await usuarioPerfil.save(entity);
		});
	});
	return true;
})();
