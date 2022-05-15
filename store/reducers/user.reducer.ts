import { User } from "../../entities/User";
import { LOGIN, LOGOUT, REHYDRATE_USER, SIGNUP, CHANGE_PASSWORD, UPDATE_EMAIL, UPDATE_PROFILE, REFRESH_TO_ID_TOKEN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: null,
    idToken: undefined
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case LOGIN: 
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case LOGOUT:
            return { ...state, loggedInUser: null, idToken: undefined }
        case REHYDRATE_USER:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case REFRESH_TO_ID_TOKEN:
            return { ...state, idToken: action.payload.idToken }
        case SIGNUP:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case CHANGE_PASSWORD: 
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case UPDATE_EMAIL:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case UPDATE_PROFILE:
            return { ...state, loggedInUser: action.payload.user }
        default:
            return state;
    }
};

export default userReducer;