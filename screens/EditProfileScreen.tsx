import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';

export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [displayName, setDisplayName] = useState(user.displayname ? user.displayname : '');
    const [email, setEmail] = useState(user.email);
    const [studyProgram, setStudyProgram] = useState('None')
    // photoUrl

    const onSave = () => {
        if (email !== ''  /* && other inputs are not empty */) {
            // save the data to the server
        } else {
            //Show error message
        }
    }

    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
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

            <Button title="Save" onPress={() => console.log("Setup saving to server...")} />
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
})