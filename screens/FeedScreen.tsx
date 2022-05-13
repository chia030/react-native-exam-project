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

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Feed"
>

export default function FeedScreen() {
    const queryClient = useQueryClient()
    const navigation = useNavigation<ScreenNavigationType>()

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const dispatch = useDispatch();
    // const posts: Post[] = useSelector((state: any) => state.posts.postsList);
    const user: User = useSelector((state: any) => state.user.loggedInUser);
    const { mutate: createPost } = usePostPost();

    const handleAddPost = () => {
        const post: Post = new Post(title, user.email, content, new Date());
        createPost(post, { onSuccess: () => queryClient.invalidateQueries('posts') })
        setTitle('')
        setContent('')
    }


    const { isLoading, isError, posts, error } = useGetPosts();

    const renderPost = ({ item }: { item: any }) => (
        <TouchableOpacity 
            onPress={() => handleOpenPost(item)} 
            style={styles.touchable}
        >
            <View>
                <Text>{item.title}</Text>
                <Text>Author: {item.author}</Text>
                <Text>Content: {item.content}</Text>
            </View>
        </TouchableOpacity>
    );
    const handleOpenPost = (item: Post) => {
        // dispatch(setOpenChat(item));
        navigation.navigate("BlogPost");
        // dispatch(fetchChatrooms());
    }

    return (
        <View style={styles.container}>
            <Text>Feed Screen</Text>
            <FlatList
                data={posts}
                renderItem={renderPost}
            />
            <TextInput
                onChangeText={setTitle}
                value={title}
                placeholder="Post Title..."
            />
            <TextInput
                onChangeText={setContent}
                value={content}
                placeholder="Content..."
            />
            <Button title="Create new post" onPress={handleAddPost} />
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
        marginTop:5,
        marginBottom:5
    }
})