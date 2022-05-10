import { Chatroom, Status } from "../../entities/Chatroom";

export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const SET_OPEN_CHAT = 'SET_OPEN_CHAT';
export const DELETE_CHAT = 'DELETE_CHAT';

export const addChatroom = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
        const response = await fetch(
            'https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                chatroom
            )
        });

        // console.log(await response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            // let chatrooms = []
            // for (const key in data) {
            //     console.log(data[key].name)​
            // }

            console.log("data from server", data);
            chatroom.id = data.name;

            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
    };
}

export const setOpenChat = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        if (chatroom.status !== Status.READ) {

            chatroom.status = Status.READ;

            //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
            const response = await fetch(
                `https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}/status.json?auth=` + token, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    Status.READ
                )
            });

            if (!response.ok) {
                //There was a problem..
                //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
            } else {
                const data = await response.json(); // json to javascript
                // let chatrooms = []
                // for (const key in data) {
                //     console.log(data[key].name)​
                // }
                console.log("data from server", data);

            }
        }
        
        dispatch({ type: SET_OPEN_CHAT, payload: chatroom })
    };
}

export const deleteChat = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        console.log(token);
        const response = await fetch(
            `https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json?auth=` + token, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(
            //     Status.READ
            // )
        });

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            // let chatrooms = []
            // for (const key in data) {
            //     console.log(data[key].name)​
            // }
            console.log("data from server", data);
        }
        dispatch({ type: DELETE_CHAT, payload: chatroom.id })
        dispatch(fetchChatrooms());
    };

}

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // console.log(await response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: FETCH_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            let chatrooms: Chatroom[] = []
            for (const key in data) {
                // create Chatroom objects and push them into the array chatrooms.
                const obj = data[key];
                chatrooms.push(new Chatroom(obj.title, obj.status, obj.message, new Date(obj.timestamp), key))
            }

            console.log("chatrooms", chatrooms);

            // console.log("data from server", data);
            //chatroom.id = data.name;

            dispatch({ type: 'FETCH_CHATROOMS', payload: chatrooms })
        }
    };
}
