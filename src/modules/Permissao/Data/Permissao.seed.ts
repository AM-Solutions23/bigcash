import { Permissao } from './../Entities/Permissao';
import { getRepository } from 'typeorm';

const seederUsuario = () => {
	const permissaoData = [
		{
			nome: 'Administrador',
		},
		{
			nome: 'Criador de conteúdo',
		},
		{
			nome: 'Professor',
		},
		{
			nome: 'Aluno',
		},
	];

	const permissao_ = getRepository(Permissao);

	permissaoData.forEach(async permissao => {
		console.log(await permissao_.save(permissao));
	});
};

export default seederUsuario;
