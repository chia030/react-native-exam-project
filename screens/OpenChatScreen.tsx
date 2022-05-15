import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { deleteChat, fetchChatrooms } from '../store/actions/chat.actions';
import { useNavigation } from '@react-navigation/native';
import { useGetChatMessages, useGetChatrooms, usePostChatmessage, usePostChatroom } from '../hooks/chats';
import { useQueryClient } from 'react-query';


export default function OpenChatScreen() {

    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [message, setMessage] = React.useState('');

    const openChat = useSelector((state: any) => state.chat.openChat);
    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
    const { mutate: createChatmessage } = usePostChatmessage(openChat.id)

    const { isLoading, isError, chatmessages, error } = useGetChatMessages(openChat.id);

    const handleDeleteChat = () => {
        navigation.goBack();
        dispatch(deleteChat(openChat));
    }

    const handleMessage = () => {
        const msg = { title: message, user: loggedInUser }
        console.log("Saving message", msg);
        createChatmessage(msg, { onSuccess: () => queryClient.invalidateQueries('chatmessages') })
    }

    const renderMessages = ({ item }: { item: any }) => (
        <View style={styles.message}>
            <Text>{item.user.email}:</Text>
            <Text>{item.title}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text>Chatroom Message:</Text>
            <Text>{openChat.message}</Text>
            <FlatList
                data={chatmessages}
                renderItem={renderMessages}
            />
            <TextInput
                onChangeText={setMessage}
                value={message}
                placeholder="New Message..."
            />
            <Button title="Send new message" onPress={handleMessage} />
            <Button title="Delete Chat" onPress={handleDeleteChat}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin:3

    }
})  