import * as SecureStore from 'expo-secure-store';
import { FirebaseSigninSuccess } from '../../entities/FirebaseSigninSuccess';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { FirebaseUpdateProfileSuccess } from '../../entities/FirebaseUpdateProfileSuccess';
import { User } from '../../entities/User';


export const SIGNUP = 'SIGNUP';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const REFRESH_TO_ID_TOKEN = 'REFRESH_TO_ID_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const refreshTokenToIdToken = (refreshToken: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })            
        });

        if (!response.ok) {
            // ...
        } else {
            const data: any = await response.json(); 
            console.log("data from server", data);

            await SecureStore.setItemAsync('idToken', data.idToken);

            dispatch({ type: REFRESH_TO_ID_TOKEN, payload: { idToken: data.idToken } })
        }

    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-uLXO1Pu8wqjMLUyNtHefWZTEWYdYEPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            // ...
        } else {
            const data: FirebaseSigninSuccess = await response.json(); 
            console.log("data from server", data);

            const user = new User(data.email, data.displayName, '', data.profilePicture); //email, displayname, studyProgram, photoUrl

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user));
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
        const idToken = getState().user.idToken; 

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

        if (!response.ok) {
            console.log(response.json())

        } else {
            const data: FirebaseSignupSuccess = await response.json();
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user));

            dispatch({ type: CHANGE_PASSWORD, payload: { user, idToken: data.idToken } })
        }
    };
};

export const updateProfile = (photoUrl: string, displayname: string, email: string, studyProgram: string) => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken;

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
            body = undefined;
        }

        console.log("body: ", body)

        if (body) {
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
                const data: FirebaseUpdateProfileSuccess = await response.json();
                console.log("data from server", data);

                const user = new User(data.email, data.displayName, studyProgram, data.photoUrl);

                await dispatch(refreshTokenToIdToken(data.refreshToken));
                // await SecureStore.setItemAsync('idToken', JSON.stringify(data.idToken)); //the new token is set in refreshTokeToIdToken();
                await SecureStore.setItemAsync('user', JSON.stringify(user)); 

                dispatch({ type: UPDATE_PROFILE, payload: { user } })
            }
        }
    };
}
