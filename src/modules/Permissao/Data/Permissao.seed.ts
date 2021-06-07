import { Permissao } from "../Entities/Permissao";
import { createConnection } from "typeorm";

export default (function () {
	createConnection().then((connec) => {
		const permissaoData = [
			{
				nome: "User",
			},
			{
				nome: "Support",
			},
			{
				nome: "Manager",
			},
			{
				nome: "Admin",
			},
			{
				nome: "Root",
			},
		];

		const permissao_ = connec.getRepository(Permissao);

		permissaoData.forEach(async (permissao) => {
			await permissao_.save(permissao);
		});
	});
	return true;
})();
