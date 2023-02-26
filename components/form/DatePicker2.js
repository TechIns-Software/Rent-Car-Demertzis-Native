import React, { useState } from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {RFPercentage} from "react-native-responsive-fontsize";

const Example = ({style,label,type,customOnChange,objectKey}) => {
    const newDate = new Date();

    const [time,setTime] = useState('-------')
    const [date,setDate] = useState('-------')
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
        if (type == 'date'){
            const formatedDate = setFormatDate(date)
            setDate(formatedDate);
            customOnChange(objectKey,formatedDate)
        }else if (type == 'time') {
            const timemin = String(date.getMinutes()).padStart(2, '0');
            const timeHour = String(date.getHours()).padStart(2, '0');
            const time24 = timeHour+':'+timemin;
            setTime(time24);
            customOnChange(objectKey,time24)
        }


    };

    const setFormatDate = (date)=>{
     const  formatedDate =  (date.getFullYear()+'-'+String(date.getMonth() + 1).padStart(2, '0')+'-'+String(date.getDate() ).padStart(2, '0')).toString() ;
        return formatedDate;
    }

    return (
        <View style={style}>
            <Text style={styles.label}>{label}</Text>
            <Button title={type === 'date' ? date.toString() : time.toString()} onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={type}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}

            />
        </View>
    );
};
const  styles = StyleSheet.create({
    inputContainer :{
        marginHorizontal :4,
        marginVertical : 16,

    },
    label :{
        fontSize: RFPercentage(1.4),
        color:'#000000',
        fontWeight :'bold',
        marginBottom :4
    },
    buttonContainer:{
        fontSize:10,
        maxHeight:50
    }
})

export default Example;