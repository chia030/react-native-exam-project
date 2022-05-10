import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { changePassword } from '../store/actions/user.actions';

export default function ChangePasswordScreen() {
    // const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const [successText, setSuccessText] = useState('');

    const dispatch = useDispatch();

    const onSave = () => {
        if (oldPassword !== '' && newPassword !== '' && repeatNewPassword !=='' && oldPassword !== newPassword && newPassword === repeatNewPassword) {
            dispatch(changePassword(newPassword));
            setSuccessText("Password changed successfully!") //it should wait for a 200 response before displaying this message.
        } else {
            if(oldPassword === newPassword) {
                setSuccessText("The new password can't be the same as the old password!");
            }
            else if(newPassword !== repeatNewPassword) {
                setSuccessText("The new passwords don't match.")
            }
            else {
                setSuccessText("Something went wrong...")
            }            
        }
    }

    return (
        <View style={styles.container}>
            <Text>Change Password</Text>
            <Input title="Old Password"
                inputValue={oldPassword}
                setText={setOldPassword}
                error="Old Password cannot be empty"
            />
            <Input title="New Password"
                inputValue={newPassword}
                setText={setNewPassword}
                error="New Password cannot be empty"
            />
            <Input title="Repeat New Password"
                inputValue={repeatNewPassword}
                setText={setRepeatNewPassword}
                error="The new passwords don't match"
            />
            <Button title="Save" onPress={onSave} />
            <Text>{successText}</Text>
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