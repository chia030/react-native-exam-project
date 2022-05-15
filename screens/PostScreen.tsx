import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function PostScreen() {

    const openPost = useSelector((state: any) => state.posts.openPost);

    return (
        <View style={styles.container}>
            {openPost.isEvent && (
                <View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{openPost.title}</Text>
                        <Text style={styles.authorText}>Organizer: {openPost.author}</Text>
                        <Text>{new Date(openPost.timestamp).toLocaleString("en-GB")}</Text>
                    </View>
                    <Text style={styles.contentText}>{openPost.content}</Text>
                </View>
                
            )}
            {!openPost.isEvent && (
                <View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{openPost.title}</Text>
                        <Text style={styles.authorText}>Author: {openPost.author}</Text>
                    </View>
                    <Text style={styles.contentText}>{openPost.content}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleView: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:20
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    authorText: {
        marginTop: 5
    },
    contentText: {
        textAlign: 'center'
    }
})