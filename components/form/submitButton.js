import * as React from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';

const SubmitButton = ({buttonText,onPress}) => {


    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{buttonText}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#3156ff",
        textAlign:'center',
        alignContent:'center',
        paddingVertical:15,
        margin:10,
        borderRadius:15
    },
    text:{
        textAlign:'center',
        color:'white'
    }

})
export default SubmitButton;