import React, { useState } from 'react';
import {Linking, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    var [modalVisible, setModalVisible] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Username"
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                <Input
                    label="Password"
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />

                <Pressable onPress={() => Linking.openURL('https://aswell.gr/rentcar/publicDocs/appPolicy.pdf')} >
                    <Text style={styles.termsText} >Terms and conditions</Text>
                </Pressable>
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    termsText:{
        color:'#dedcdc',
        fontSize :19,
        textDecorationLine:'underline'
    },    container: {
        flex: 1,

    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "rgba(196,199,199,0.62)",
        height: '70%' ,
        width: '100%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
    },
    text: {
        color: '#293449',
        marginTop: 10,
        fontSize:18
    },
    deleteButtonForm:{
        backgroundColor:'red',
        width:'80%',
        padding:10,
        borderRadius:10,
        marginVertical:5
    },
    deleteButtonText:{
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    buttonsContainer:{
        alignItems:'center',
        width:'100%',
    },
    goBackButton:{
        backgroundColor:'orange',
        width:'80%',
        padding:10,
        borderRadius:10,
        marginVertical:5
    },
    goBackText:{
        color:'black',
        fontSize:20,
        textAlign:'center'
    }
});


