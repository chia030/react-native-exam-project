import { Chatroom, Status } from "../../entities/Chatroom";
import { ADD_CHATROOM, SET_OPEN_CHAT, DELETE_CHAT, FETCH_CHATROOMS } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    openChat: Chatroom
    counter: number
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    openChat: new Chatroom("default", Status.UNREAD, '', new Date()),
    counter: 0,
    name: "Default"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log(action.payload);
            return { ...state, chatrooms: [...state.chatrooms, action.payload] }
            // state.chatrooms.push(chatroom) // mutating state. Not allowed

        case SET_OPEN_CHAT: //payload: chatroom
            console.log(action.payload);
            return { ...state, openChat: action.payload} 
        
        case DELETE_CHAT: //payload: chatroom.id
            console.log(action.payload);
            let chatrooms: Chatroom[] = state.chatrooms.slice();
            chatrooms = chatrooms.filter((element) => {element.id !== action.payload})            
            return { ...state, openChat: initialState.openChat, chatrooms} 

        case FETCH_CHATROOMS:
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, chatrooms: action.payload }

        default:
            return state;
    }
};

export default chatReducer;