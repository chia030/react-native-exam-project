import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import * as ImagePicker from 'expo-image-picker';
import { updateEmail, updateProfile } from '../store/actions/user.actions';


export default function EditProfileScreen() {

    const dispatch = useDispatch();

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);

    const [photoUrl, setPhotoUrl] = useState(user.photoUrl ? user.photoUrl : '');
    const [displayName, setDisplayName] = useState(user.displayname ? user.displayname : '');

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
        if (photoUrl !== "" || displayName !== "") {
            dispatch(updateProfile(photoUrl, displayName))
        }
    }


    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <View style={styles.updatePictureView}>
                <Image
                    style={styles.photo}
                    source={photoUrl ? {uri:photoUrl} : require('../assets/images/default-avatar.png')}
                />
                <Button title="Update picture" onPress={handlePhoto}/>
            </View>
            <Input title="Display Name"
                inputValue={displayName}
                setText={setDisplayName}
                error="Display Name cannot be empty"
            />
            <Button title="Save" onPress={onSave} />
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
    photo: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
    },
    updatePictureView: {
        alignItems: 'center',
        margin: 10
    }
})