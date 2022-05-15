import { Post } from "../../entities/Post";
import { SET_OPEN_POST, FETCH_POSTS } from '../actions/post.actions';


interface ReduxState {
    posts: Post[]
    openPost: Post
    counter: number
}

const initialState: ReduxState = {
    posts: [],
    openPost: new Post('', '', '', new Date(), false),
    counter: 0
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Post
}

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {

        case SET_OPEN_POST: //payload: post
            console.log(action.payload);
            return { ...state, openPost: action.payload}

        case FETCH_POSTS:
            return { ...state, posts: action.payload }

        default:
            return state;
    }
};

export default postReducer;
