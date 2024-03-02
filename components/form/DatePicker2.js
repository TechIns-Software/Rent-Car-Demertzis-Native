import React, {useState} from "react";
import {Button, View, Text, StyleSheet, Pressable} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {RFPercentage} from "react-native-responsive-fontsize";
import {Appearance} from 'react-native';

const DatePicker2 = ({style, label, type, customOnChange, objectKey, everythingOkValue,value }) => {
    const newDate = new Date();

    const [time,setTime] = useState('-------')
    const [date,setDate] = useState('-------')
    const [isDateSet,setIsDateSet] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();

        //
        if (type == 'date') {
            const formatedDate = setFormatDate(date)
            setDate(formatedDate);
            customOnChange(objectKey, formatedDate)
            setIsDateSet(formatedDate);
        } else if (type == 'time') {
            const timemin = String(date.getMinutes()).padStart(2, '0');
            const timeHour = String(date.getHours()).padStart(2, '0');
            const time24 = timeHour + ':' + timemin;
            setTime(time24);
            customOnChange(objectKey, time24);
            setIsDateSet(time24);
        }


    };

    const setFormatDate = (date) => {
        const formatedDate = (String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear()).toString();
        return formatedDate;
    }

    return (
        <View style={style}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={showDatePicker}
                       style={!everythingOkValue ? styles.dateWithoutValue : styles.dateWithValue}>
                {
                    !everythingOkValue ?<Text> {value}</Text> :  <Text>{type === 'date' ? date.toString() : time.toString()}</Text>
                }

            </Pressable>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={type}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={true}
                textColor="white"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    border: {
        borderColor: 'black',
        borderWidth: 1
    },
    label: {
        fontSize: RFPercentage(1.4),
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 4
    },
    buttonContainer: {
        fontSize: 10,
        maxHeight: 50
    },
    styleIosPicker: {
        color: 'black'
    },
    dateWithoutValue: {
        backgroundColor: '#fdb4b4',
        width: '100%',
        borderRadius: 6,
        padding: 8,
        fontSize: 18,
    },
    dateWithValue: {
        backgroundColor: '#a9cafa',
        width: '100%',
        borderRadius: 6,
        padding: 8,
        fontSize: 18,
    }

})

export default DatePicker2;