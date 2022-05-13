import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';


export const SIGNUP = 'SIGNUP';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const login = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json
            dispatch({ type: LOGIN, payload: { user, idToken: data.idToken } })
        }
    };
};

export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}

export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
            console.log(response.json())
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: SIGNUP, payload: { user, idToken: data.idToken } })
        }
    };
};

export const changePassword = (password: string) => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken; // if you have a reducer named user(from combineReducers) with a token variable​
        // console.log(idToken)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: idToken,
                password: password,
                returnSecureToken: true
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
            console.log(response.json())

        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: CHANGE_PASSWORD, payload: { user, idToken: data.idToken } })
        }
    };
};

export const updateProfile = (photoUrl: string, displayname: string, email: string, studyProgram: string) => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken; // if you have a reducer named user(from combineReducers) with a token variable​

        let body;

        if (photoUrl !== '' &&  displayname !== '') {
            body = {
                idToken: idToken,
                displayName: displayname,
                photoUrl: photoUrl,
                returnSecureToken: true
            }
        }
        else if (photoUrl === '' && displayname !== '') {
            body = {
                idToken: idToken,
                displayName: displayname,
                returnSecureToken: true
            }
        }
        else if (photoUrl !== '' && displayname === '') {
            body = {
                idToken: idToken,
                photoUrl: photoUrl,
                returnSecureToken: true
            }
        }
        else {
            body = {
                idToken: idToken,
                returnSecureToken: true
            }
        }

        console.log(body)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log(response.json())

        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, displayname, studyProgram, photoUrl);

            //TODO: where is the new token????

            await SecureStore.setItemAsync('idToken', JSON.stringify(data.idToken)).catch(e => { console.log("id token error:"); console.log(e)});
            await SecureStore.setItemAsync('user', JSON.stringify(user)).catch(e => { console.log("user error:"); console.log(e); }); // convert user js-obj. to json

            dispatch({ type: UPDATE_PROFILE, payload: { user, idToken: data.idToken } })
        }
    };
}
