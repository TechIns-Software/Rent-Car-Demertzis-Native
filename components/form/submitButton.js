import * as React from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';

const SubmitButton = ({buttonText,onPress,style,isDisabled = false}) => {


    return (isDisabled ? <Pressable onPress={onPress} disabled={isDisabled}>
            <View style={[styles.disabledStyle, style]}>
                <Text style={styles.text}>{buttonText}</Text>
            </View>
        </Pressable> : <Pressable onPress={onPress} disabled={isDisabled}>
            <View style={[styles.container, style]}>
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
        padding:10,
        marginVertical:15,
        borderRadius:15
    },
    text:{
        textAlign:'center',
        color:'white'
    },
    disabledStyle:{
        backgroundColor:"#716f6f",
        textAlign:'center',
        alignContent:'center',
        paddingVertical:5,
        marginVertical:15,
        borderRadius:15
    }

})
export default SubmitButton;