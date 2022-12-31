// import { database } from "config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

export const actionUserName = () => (dispatch) => {
	setTimeout(() => {
		return dispatch({type: 'CHANGE_USER', value: 'asdfasdf'})
	}, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		const auth = getAuth();
		dispatch({ type: 'CHANGE_LOADING', value: true });
		createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
			// Signed in 
			// const user = userCredential.user;
			dispatch({ type: 'CHANGE_LOADING', value: false });
			resolve(true);
		}).catch((error) => {
			// const errorCode = error.code;
			// const errorMessage = error.message;
			dispatch({ type: 'CHANGE_LOADING', value: false });
			reject(false)
		})
	})
}
export const loginUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		const auth = getAuth();
		dispatch({ type: 'CHANGE_LOADING', value: true });
		signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			const dataUser = {
				email: user.email,
				emailVerified: user.emailVerified,
				uid: user.uid,
				refreshToken: user.refreshToken,
			}
			dispatch({ type: 'CHANGE_LOADING', value: false });
			dispatch({ type: 'CHANGE_ISLOGIN', value: true });
			dispatch({ type: 'CHANGE_USER', value: dataUser });
			resolve(dataUser);
		}).catch((error) => {
			// const errorCode = error.code;
			// const errorMessage = error.message;
			// console.log('error: ', errorCode, errorMessage);
			dispatch({ type: 'CHANGE_LOADING', value: false });
			dispatch({ type: 'CHANGE_ISLOGIN', value: false });
			reject(false);
		})
	})
}

export const addDataToAPI = (data) => (dispatch) => {
	const db = getDatabase();
  push(ref(db, 'notes/' + data.userId), {
    title: data.title,
		desc: data.desc,
		date: data.date,
  });
}

export const getDataFromAPI = (userId) => (dispatch) => {
	const db = getDatabase();
	const urlNotes = ref(db, 'notes/' + userId);
	return new Promise((resolve, reject) => {
		onValue(urlNotes, (snapshot) => {
			// console.log('get data: ', snapshot.val());
			const data = [];
			Object.keys(snapshot.val()).map(key => {
				return data.push({
					id: key,
					data: snapshot.val()[key],
				})
			})
			// console.log(data);
			dispatch({type: 'SET_NOTES', value: data})
			resolve(snapshot.val());
		});
	})
}

export const updateDataFromAPI = (data) => (dispatch) => {
	const db = getDatabase();
	return new Promise((resolve, reject) => {
		set(ref(db, 'notes/' + data.userId + '/' + data.noteId), {
			title: data.title,
			desc: data.desc,
			date: data.date,
		}, (err) => {
			if(err) {
				reject(false);
			}else{
				resolve(true);
			}
		})
	})
}

export const removeDataFromAPI = (data) => (dispatch) => {
	const db = getDatabase();
	return new Promise((resolve, reject) => {
		remove(ref(db, 'notes/' + data.userId + '/' + data.noteId))
	})
}