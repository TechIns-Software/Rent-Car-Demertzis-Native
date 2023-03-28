import * as React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonCustom = ({onPress, label, value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.radioRow}>
            <Text onPress={() =>{
                onPress(true)
            }}
            > Agree</Text>
            <RadioButton
                value="true"
                status={ value  ? 'checked' : 'unchecked' }
                onPress={() =>{
                    onPress(true)
                }}

            />
            </View>
            <View style={styles.radioRow}>
            <Text onPress={() =>{
                onPress(false)
            }}
            > Not Agree</Text>
            <RadioButton
                value="false"
                status={ !value  ? 'checked' : 'unchecked' }
                onPress={() =>{
                    onPress(false)
                }}

            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    radioRow:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10
    },
    label: {
        fontWeight: "bold",
        marginBottom: 10
    }
})
export default RadioButtonCustom;