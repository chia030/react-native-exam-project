import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import { StackParamList } from "./../typings/navigations";
import ChatsScreen from '../screens/ChatsScreen';
import OpenChatScreen from '../screens/OpenChatScreen';
import LoginScreen from '../screens/LoginScreen';
import ChangePasswordScreen from '../screens/ChangePassword';
import FeedScreen from '../screens/FeedScreen';
import BlogPostScreen from '../screens/PostScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ChangeEmailScreen from '../screens/ChangeEmail';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
    const openPost = useSelector((state:any) => state.posts.openPost);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: 'Add Post' }} />
            <Stack.Screen name="Post" component={BlogPostScreen} options={{ title: 'Post' }} />
        </Stack.Navigator>
    )
}

function ChatStackNavigator() {
    const openChat = useSelector((state: any) => state.chat.openChat);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chats" component={ChatsScreen} options={{ title: 'Chats' }} />
            <Stack.Screen name="OpenChat" component={OpenChatScreen} options={{ title: `${openChat.title}` }} />
        </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ title: 'Change Email' }} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
        </Stack.Navigator>
    )
}


export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)

    return (
        <NavigationContainer>
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeStackNavigator} />
                    <Tab.Screen name="Chat" component={ChatStackNavigator} />
                    <Tab.Screen name="Menu" component={ProfileStackNavigator} />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}