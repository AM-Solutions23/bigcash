import { Permissao } from "./../Entities/Permissao";
import { createConnection } from "typeorm";

export default (function () {
	createConnection().then((connec) => {
		const permissaoData = [
			{
				nome: "Administrador",
			},
			{
				nome: "Criador de conteúdo",
			},
			{
				nome: "Professor",
			},
			{
				nome: "Aluno",
			},
		];

		const permissao_ = connec.getRepository(Permissao);

		permissaoData.forEach(async (permissao) => {
			await permissao_.save(permissao);
		});
	});
	return true;
})();
