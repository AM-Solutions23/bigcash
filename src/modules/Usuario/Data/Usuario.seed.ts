import { Usuario } from '../Entities/Usuario';
import { createConnection } from 'typeorm';

export default (function () {
	createConnection().then(connec => {
		const usuarioData = [
			{
				nome: 'Root',
				email: 'root@bigcash.com',
				senha: 'root@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-11',
				permissao: 1,
			},
			{
				nome: 'Admin',
				email: 'admin@bigcash.com',
				senha: 'admin@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-12',
				permissao: 2,
			},
			{
				nome: 'Manager',
				email: 'manager@bigcash.com',
				senha: 'manager@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-13',
				permissao: 3,
			},
			{
				nome: 'Support',
				email: 'support@bigcash.com',
				senha: 'support@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-14',
				permissao: 4,
			},
			{
				nome: 'User',
				email: 'user@bigcash.com',
				senha: 'user@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-15',
				permissao: 5,
			},
			{
				nome: 'Empreendedor',
				email: 'empreendedor@bigcash.com',
				senha: 'empreendedor@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-16',
				permissao: 5,
			},
			{
				nome: 'Credenciado',
				email: 'credenciado@bigcash.com',
				senha: 'credenciado@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-17',
				permissao: 5,
			},
			{
				nome: 'Parceiro',
				email: 'parceiro@bigcash.com',
				senha: 'parceiro@bigcash.com',
				provider: '',
				cpf_cnpj: '123.123.123-18',
				permissao: 5,
			},
		];

		const usuario = connec.getRepository(Usuario);

		usuarioData.forEach(async data => {
			const entity = Object.assign(new Usuario(), data);
			await usuario.save(entity);
		});
	});
	return true;
})();
