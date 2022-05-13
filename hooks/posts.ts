import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { Post } from "../entities/Post"

const baseUrl = 'https://react-native-exam-f9e6f-default-rtdb.europe-west1.firebasedatabase.app/'

export const useGetPosts = () => {
    const token = useSelector((state: any) => state.user.idToken)

    const fetchPosts = async () => {
        return await axios.get(baseUrl + '/posts.json?auth=' + token)
    }

    const { isLoading, isError, data, error } = useQuery('posts', fetchPosts)
    let posts: Post[] = [];
    for (const key in data?.data) {
        const post = data?.data[key];
        posts.push(new Post(post.title, post.author, post.content, new Date(post.timestamp), key))
    }

    return { isLoading, isError, posts, error };
}

export const usePostPost = () => {
    const token = useSelector((state: any) => state.user.idToken)
    return useMutation((newPost: Post) => {
        return axios.post(baseUrl + '/posts.json?auth=' + token, newPost);
    })
}