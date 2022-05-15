import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { changePassword, updateEmail } from '../store/actions/user.actions';

export default function ChangeEmailScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();

    const onSave = () => {
        if (email !== '') {
            dispatch(updateEmail(email));  
        }
    }

    return (
        <View style={styles.container}>
            <Text>Change Email</Text>
            <Input title="Email"
                inputValue={email}
                setText={setEmail}
                error="Email cannot be empty"
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
})