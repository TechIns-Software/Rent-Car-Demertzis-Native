import * as React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonCustom = ({onPress}) => {
    const [checked, setChecked] = React.useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.radioRow}>
            <Text> Αποδέχομαι</Text>
            <RadioButton
                value="true"
                status={ checked  ? 'checked' : 'unchecked' }
                onPress={() =>{
                    setChecked(true),
                        onPress(true)
                }}

            />
            </View>
            <View style={styles.radioRow}>
            <Text> Δεν Αποδέχομαι</Text>
            <RadioButton
                value="false"
                status={ !checked  ? 'checked' : 'unchecked' }
                onPress={() =>{
                    setChecked(false),onPress(false)
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
    }
})
export default RadioButtonCustom;