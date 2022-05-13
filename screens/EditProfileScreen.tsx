import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { launchImageLibraryAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../store/actions/user.actions';

// import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';
// import * as DefaultAvatar from '../assets/images/default-avatar.png';

export default function EditProfileScreen() {

    const dispatch = useDispatch();

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);

    const [photoUrl, setPhotoUrl] = useState(user.photoUrl !== '' && user.photoUrl ? user.photoUrl : '');
    const [displayName, setDisplayName] = useState(user.displayname !== '' && user.displayname ? user.displayname : '');
    const [email, setEmail] = useState(user.email);
    const [studyProgram, setStudyProgram] = useState(user.studyProgram !== '' && user.studyProgram ? user.studyProgram : '');

    const handlePhoto = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });
            console.log(result);

            if (!result.cancelled) {
                setPhotoUrl(result.uri);
            }
    }

    const onSave = () => {
        if (email !== ''  /* && other inputs are not empty */) {
            dispatch(updateProfile(photoUrl, displayName, email, studyProgram));
        } else {
            console.log('error');
        }
    }


    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Image
                style={styles.photo}
                source={{uri:photoUrl !== '' ? photoUrl : '../assets/images/default-avatar.png'}}
                // {uri:'asset:/images/default-avatar.png'}
                // C:\Users\Chiara\OneDrive\Desktop\React Native\ExamProject\assets\images\default-avatar.png
            />
            <Button title="Update picture" onPress={handlePhoto}/>
            <Input title="Display Name"
                inputValue={displayName}
                setText={setDisplayName}
                error="Display Name cannot be empty"
            />
            <Input title="Email"
                inputValue={email}
                setText={setEmail}
                error="Email cannot be empty"
            />
            <Input title="Study programme"
                inputValue={studyProgram}
                setText={setStudyProgram}
                error="Study programme cannot be empty" />

            <Button title="Save" onPress={onSave} />
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
        width: 60,
        height: 60,
        resizeMode: 'cover',
    }
})