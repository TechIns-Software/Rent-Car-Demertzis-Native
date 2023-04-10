import * as React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonCustom = ({onPress, label, value,option1,option2}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.row}>
                <View style={styles.radioRow}>
                    <Text onPress={() => {
                        onPress(true)
                    }}
                    > {option1}</Text>
                    <RadioButton
                        value="true"
                        status={value ? 'checked' : 'unchecked'}
                        onPress={() => {
                            onPress(true)
                        }}

                    />
                </View>
                <View style={styles.radioRow}>
                    <Text onPress={() => {
                        onPress(false)
                    }}
                    > {option2}</Text>
                    <RadioButton
                        value="false"
                        status={!value ? 'checked' : 'unchecked'}
                        onPress={() => {
                            onPress(false)
                        }}

                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
    },
    radioRow:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10
    },
    label: {
        fontWeight: "bold",
        marginBottom: 10
    },
    row:{
        display:'flex',
        justifyContent:'space-evenly',
        alignContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',

    }
})
export default RadioButtonCustom;