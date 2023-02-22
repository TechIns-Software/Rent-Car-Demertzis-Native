import {Text, View, StyleSheet, Button, Modal, Platform} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";


function  CustomDatePicker({ customOnChange, label,style,objectKey,type='date'}){
    const todayDate = new Date();
    const timeNow = todayDate.getHours()+':'+todayDate.getMinutes();


    const [date, setDate] = useState(todayDate);
    const [time, setTime] = useState(timeNow);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        if (type == 'date'){
            setDate(currentDate);
            const formatTodayDate = (currentDate.getFullYear()+'-'+String(date.getMonth() + 1).padStart(2, '0')+'-'+String(date.getDate() ).padStart(2, '0')).toString();
            customOnChange(objectKey,formatTodayDate)
        }else{
            const time24 = currentDate.getHours()+':'+currentDate.getMinutes()
            setTime(time24.toString());
            customOnChange(objectKey,time24)
        }

    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={[styles.inputContainer,style]}>
            <Text style={styles.label}>{label}</Text>
            <View>
                { type == 'date' ?<Button color={'#2f77d5'}  onPress={showDatepicker} title={date.toDateString()} />:
                    <Button onPress={showTimepicker} title={time.toString()}/>            }

            </View>
            {/*<Text>selected: {date.toLocaleString()}</Text>*/}
            {show && (<DateTimePicker

                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}  />

            )}
        </View>
    );
}
const  styles = StyleSheet.create({
    inputContainer :{
        marginHorizontal :4,
        marginVertical : 16,

    },
    label :{
        fontSize : 14,
        color:'#000000',
        fontWeight :'bold',
        marginBottom :4
    }
})

export  default CustomDatePicker;