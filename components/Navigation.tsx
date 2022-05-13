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
import BlogPostScreen from '../screens/BlogPostScreen';
import EventScreen from '../screens/EventScreen';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="BlogPost" component={BlogPostScreen} options={{ title: 'Post' }} />
            <Stack.Screen name="Event" component={EventScreen} />
        </Stack.Navigator>
    )
}

function ChatStackNavigator() {
    const openChat = useSelector((state: any) => state.chat.openChat);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chats" component={ChatsScreen} options={{ title: 'Chats' }} />
            <Stack.Screen name="OpenChat" component={OpenChatScreen} options={{ title: `${openChat.title}` }} />
            {/* <Stack.Screen name="Screen3" component={Screen3} /> */}
        </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
        </Stack.Navigator>
    )
}


export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)

    return (
        <NavigationContainer>
            {/* Move navigation related code to a seperate component that is used here */}
            {/* Determine if the user is logged in and display:
        A stack navigator (only) with signup and login
        Our "normal" app with tabs navigation */}
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeStackNavigator} />
                    {/* <Tab.Screen name="Discover" component={DiscoverScreen} /> */}
                    <Tab.Screen name="Chat" component={ChatStackNavigator} />
                    <Tab.Screen name="Menu" component={ProfileStackNavigator} />
                </Tab.Navigator>
            ) : (
                // show a stack navigator with only signup and login screens.
                <Stack.Navigator>
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
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