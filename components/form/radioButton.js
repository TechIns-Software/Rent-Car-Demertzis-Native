import React, { useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Text, View} from "react-native";

 function RadioButtonCustom ({label}) {

    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Αποδέχομαι',
            value: 'yes'
        },
        {
            id: '2',
            label: 'Δεν Δέχομαι',
            value: 'no'
        }
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    return (
        <View>
            <Text> {label}</Text>
        <RadioGroup
            layout={'row'}
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
        />
        </View>
    );

}
export default RadioButtonCustom;