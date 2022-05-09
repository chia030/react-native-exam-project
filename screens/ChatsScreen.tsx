import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, setOpenChat } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chats"
>

export default function ChatsScreen() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');

    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    const dispatch = useDispatch()

    useEffect(() => { 
        dispatch(fetchChatrooms())
    }, [])

    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, '', new Date());
        dispatch(addChatroom(chatroom));
    }
    const renderChatroom = ({ item }: { item: any }) => (
        <Button title={item.title} onPress={() => handleOpenChat(item)} />
    );
    const handleOpenChat = (item: Chatroom ) => {
        dispatch(setOpenChat(item));
        navigation.navigate("OpenChat");
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
            />

            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />
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
})