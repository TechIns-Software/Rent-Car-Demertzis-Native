import * as React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonCustom = () => {
    const [checked, setChecked] = React.useState('first');

    return (
        <View style={styles.container}>
            <Text> Αποδέχομαι</Text>
            <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            />
            <Text> Δεν Αποδέχομαι</Text>
            <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    }
})
export default RadioButtonCustom;