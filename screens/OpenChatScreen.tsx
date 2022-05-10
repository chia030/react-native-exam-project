import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { deleteChat, fetchChatrooms } from '../store/actions/chat.actions';
import { useNavigation } from '@react-navigation/native';


export default function OpenChatScreen() {

    const navigation = useNavigation();

    const openChat = useSelector((state: any) => state.chat.openChat);
    const dispatch = useDispatch();

    const handleDeleteChat = () => {
        navigation.goBack();
        dispatch(deleteChat(openChat));
    }

    return (
        <View style={styles.container}>
            <Text>Message:</Text>
            <Text>{openChat.message}</Text>
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
})  