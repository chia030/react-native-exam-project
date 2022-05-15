import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { usePostPost } from '../hooks/posts';
import { User } from '../entities/User';
import { useQueryClient } from 'react-query';


export default function AddPostScreen() {

    const queryClient = useQueryClient();
    const { mutate: createPost } = usePostPost();

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const [eventTitle, setEventTitle] = React.useState('');
    const [eventDesc, setEventDesc] = React.useState('');
    const [dateText, setDateText] = React.useState('');
    const [date, setDate] = React.useState(new Date());

    const user: User = useSelector((state: any) => state.user.loggedInUser);

    const handleAddPost = () => {
        const post: Post = new Post(title, user.email, content, new Date(), false);
        createPost(post, { onSuccess: () => queryClient.invalidateQueries('posts') })
        setTitle('')
        setContent('')
    }

    const handleAddEvent = () => {
        // try {
            setDate(new Date(dateText))
        // }catch(error: any) {console.log(error)}

        const post: Post = new Post(eventTitle, user.email, eventDesc, date, true);
        createPost(post, { onSuccess: () => queryClient.invalidateQueries('posts') })
        setEventTitle('')
        setEventDesc('')
        setDateText('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.createView}>
                <Text>Add new blog post: </Text>
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
                <Button title="Create post" onPress={handleAddPost} />
            </View>
            <View style={styles.createView}>
                <Text>Add new event: </Text>
                <TextInput
                    onChangeText={setEventTitle}
                    value={eventTitle}
                    placeholder="Event Title..."
                />
                <TextInput
                    onChangeText={setEventDesc}
                    value={eventDesc}
                    placeholder="Description and location..."
                />
                <TextInput
                    onChangeText={setDateText}
                    value={dateText}
                    placeholder="year-month-dateThours: minutes: seconds"
                />
                <Button title="Create event" onPress={handleAddEvent} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    createView: {
        margin: 20,
        alignItems: 'center'
    }
})