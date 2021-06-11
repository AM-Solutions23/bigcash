import firebase from 'firebase';
import { getRepository } from 'typeorm';
import { Usuario } from './../modules/Usuario/Entities/Usuario';
import { UsuarioPerfis } from './../modules/Usuario/Entities/UsuarioPerfis';
import * as jwt from 'jsonwebtoken';
import {PermissaoController} from './../modules/Permissao/Controllers/PermissaoController';

const firebaseConfig = {
	apiKey: 'AIzaSyDXIuUCb8gcIQYJV2dv-eQT6rwNAHMQ6dE',
	authDomain: 'vast-math-310214.firebaseapp.com',
	databaseURL: 'https://vast-math-310214-default-rtdb.firebaseio.com',
	projectId: 'vast-math-310214',
	storageBucket: 'vast-math-310214.appspot.com',
	messagingSenderId: '1078310793621',
	appId: '1:1078310793621:web:ef84736ececafd3bbd069c',
	measurementId: 'G-JG4RG5PWV2',
};

firebase.initializeApp(firebaseConfig);

export const prepareLoginOrCreate = async (token_id, profile_id) => {
	const firebaseUser = firebase.auth().currentUser;

	if (!checkUserExists(firebaseUser, profile_id)) {
		const credential = firebase.auth.GoogleAuthProvider.credential(token_id);
		const login_resp = await loginOrCreate(credential);
		const user_data = {
			email: login_resp.additionalUserInfo.profile['email'],
			nome: login_resp.additionalUserInfo.profile['name'],
			foto: login_resp.additionalUserInfo.profile['picture'],
			provider: login_resp.additionalUserInfo.providerId,
		};
		return await handleFirebaseDataToDB(user_data);
	} else {
		const user_data = {
			email: firebaseUser.providerData[0].email,
			nome: firebaseUser.providerData[0].displayName,
			foto: firebaseUser.providerData[0].photoURL,
			provider: firebaseUser.providerData[0].providerId
		};
		return await handleFirebaseDataToDB(user_data);
	}
};
export const loginOrCreate = async (credential) => {
	return firebase.auth().signInWithCredential(credential);
};

export const checkUserExists = (firebaseUser, profile_id) => {
	if (firebaseUser) {
		let providerData = firebaseUser.providerData;
		for (let i = 0; i < providerData.length; i++) {
			if (
				providerData[i].providerId ===
					firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
				providerData[i].uid === profile_id
			) {
				return true;
			}
		}
	}
	return false;
};

export const getUser = () => {
	return firebase.auth().currentUser;
};

const handleFirebaseDataToDB = async (user_data) => {
	const usuario = new Usuario();
	const usuario_repo = getRepository(Usuario);
	const usuario_perfis_repo = getRepository(UsuarioPerfis);
	Object.assign(usuario, user_data);
	usuario.permissao = 5;
	const check_user = await usuario_repo.findOne({ email: usuario.email });
	if (check_user && check_user.cpf_cnpj) {
		const permissoes = await new PermissaoController().actions({
			permissao: 5,
		});
		return {status: true, token_: jwt.sign(
			{ id: usuario.id, permissoes: permissoes },
			'aemcli2021_ts_schema@'
		)};
	} else {
		const new_user = check_user || await usuario_repo.save(usuario);
		const perfil_user = {usuario: new_user.id, perfil: 1}
		!check_user && await usuario_perfis_repo.save(Object.assign(new UsuarioPerfis(), perfil_user))
		return {status: false, message:'Novo usuário, complete o cadastro', usuario_id: new_user.id}
	}
};

export const logoutUser = async ()=>{
   await firebase.auth().signOut().then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
}