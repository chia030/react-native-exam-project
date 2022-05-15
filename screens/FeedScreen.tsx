import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { StackParamList } from "../typings/navigations";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useGetPosts, usePostPost } from '../hooks/posts';
import { User } from '../entities/User';
import { useQueryClient } from 'react-query';
import { setOpenPost } from '../store/actions/post.actions';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Feed"
>

export default function FeedScreen() {

    const navigation = useNavigation<ScreenNavigationType>()

    const dispatch = useDispatch();

    const handleOpenPost = (item: Post) => {
        dispatch(setOpenPost(item));
        navigation.navigate("Post");
    }

    const { isLoading, isError, posts, error } = useGetPosts();

    const renderPost = ({ item }: { item: any }) => (
        <TouchableOpacity 
            onPress={() => handleOpenPost(item)} 
            style={styles.touchable}
        >
            {item.isEvent && (
                <View style={styles.touchableView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text>Organizer: {item.author}</Text>
                    <Text>{new Date(item.timestamp).toLocaleString("en-GB")} </Text>
                    <Text style={styles.contentText}>{item.content === item.content.slice(0, 100) ? item.content : `${item.content.slice(0, 100)}...`}</Text>
                </View>
            )}
            {!item.isEvent && (
                <View style={styles.touchableView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text>Author: {item.author}</Text>
                    <Text style={styles.contentText}>{item.content === item.content.slice(0, 100) ? item.content : `${item.content.slice(0, 100)}...`}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPost}
            />
            <Button
                title='+ New post'
                onPress={() => navigation.navigate("AddPost")}
            />
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
    touchable: {
        // marginTop:10,
        // marginBottom:10,
        margin:10
    },
    touchableView: {
        flex:1,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    contentText: {
        textAlign: 'center'
    }
})