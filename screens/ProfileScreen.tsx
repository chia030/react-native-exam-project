import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { User } from '../entities/User';
import { RootState } from '../App';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const navigation = useNavigation<ScreenNavigationType>();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Image
                style={styles.photo}
                source={{uri:user.photoUrl !== '' && user.photoUrl ? user.photoUrl : '../assets/images/default-avatar.png'}}
            />
            <Text>{`Name: ${user.displayname}`}</Text>
            <Text>{`Email: ${user.email}`}</Text>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
            <Button title="Change password" onPress={() => navigation.navigate("ChangePassword")} />
            <Button title="Logout" onPress={() => dispatch(logout())} />
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
    photo: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    }
})