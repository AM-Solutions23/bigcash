import firebase from 'firebase';
import { getRepository } from 'typeorm';
import { Usuario } from './../modules/Usuario/Entities/Usuario';
import * as jwt from 'jsonwebtoken';

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
		const pedro = await loginOrCreate(credential);
		const user_data = {
			email: pedro.additionalUserInfo.profile['email'],
			nome: pedro.additionalUserInfo.profile['name'],
			provider: pedro.additionalUserInfo.providerId,
		};
		return await handleFirebaseDataToDB(user_data);
	} else {
		return { status: true, message: 'usuário já está logado!' };
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
	usuario.name = user_data.nome;
	usuario.email = user_data.email;
	usuario.provider = user_data.provider;
	usuario.permissao = 1;
	const check_user = await usuario_repo.findOne({ email: usuario.email });
	if (check_user) {
		return jwt.sign({ id: check_user['id'] }, 'aemcli2021_ts_schema@');
	} else {
		const new_user = await usuario_repo.save(usuario);
		return jwt.sign({ id: new_user['id'] }, 'aemcli2021_ts_schema@');
	}
};

export const logoutUser = async ()=>{
   await firebase.auth().signOut().then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
}