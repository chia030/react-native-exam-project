import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';


export default function OpenChatScreen() {

    const openChat = useSelector((state: any) => state.chat.openChat);
    return (
        <View style={styles.container}>
            <Text>{openChat.title}</Text>
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