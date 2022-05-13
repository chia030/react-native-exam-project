import { Post } from "../../entities/Post";

export const ADD_POST = 'ADD_POST';
export const SET_OPEN_POST = 'SET_OPEN_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

export const addPost = (post: Post) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        const response = await fetch(
            'https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                post
            )
        });

        if (!response.ok) {
            console.log(response);
        } else {
            const data = await response.json();

            console.log("data from server", data);
            post.id = data.name;

            dispatch({ type: ADD_POST, payload: post })
        }
    };
}

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log("error fetching posts");
            console.log(response)
        } else {
            const data = await response.json();
            let posts: Post[] = []
            for (const key in data) {
                const obj = data[key];
                posts.push(new Post(obj.title, obj.author, obj.content, new Date(obj.timestamp), key))
            }

            console.log("posts", posts);

            dispatch({ type: 'FETCH_POSTS', payload: posts })
        }
    };

}