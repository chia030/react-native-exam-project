import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function BlogPostScreen() {

    const openPost = useSelector((state: any) => state.posts.openPost);

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{openPost.title}</Text>
                <Text style={styles.authorText}>Author: {openPost.author}</Text>
            </View>
            <Text>{openPost.content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})