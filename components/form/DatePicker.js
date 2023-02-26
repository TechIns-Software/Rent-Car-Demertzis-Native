import {Text, View, StyleSheet, Button, Modal, Platform} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";
import {RFPercentage} from "react-native-responsive-fontsize";


function  CustomDatePicker({ customOnChange, label,style,objectKey,type='date'}){
    // const todayDate = new Date();
    // const minutes = String(todayDate.getMinutes()).padStart(2, '0');
    // const hours = String(todayDate.getHours()).padStart(2, '0');
    // const timeNow = hours+':'+minutes;


    const [date, setDate] = useState(null);
    // const [date, setDate] = useState(todayDate);
    // const [time, setTime] = useState(timeNow);
    const [time, setTime] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (type == 'date'){
            setDate(selectedDate);
            customOnChange(objectKey,selectedDate);
        } else {
            const timemin = String(selectedDate.getMinutes()).padStart(2, '0');
            const timeHour = String(selectedDate.getHours()).padStart(2, '0');
            const time24 = timeHour+':'+timemin;
            setTime(time24.toString());
            customOnChange(objectKey,time24)
        }

    };

    const showMode = (currentMode) => {
        // if (Platform.OS === 'android') {
        //     setShow(false);
        //     // for iOS, add a button that closes the picker
        // }else  if(Platform.OS === 'ios'){
        //
        // }
        setShow(true);
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
            <View style={styles.buttonContainer}>
                { type == 'date' ?<Button   color={'#2f77d5'}  onPress={showDatepicker} title={ date ? (date.getFullYear()+'-'+String(date.getMonth() + 1).padStart(2, '0')+'-'+String(date.getDate() ).padStart(2, '0')).toString() : '----'} />:
                    <Button onPress={showTimepicker} title={time ? time.toString() : '----'}/>            }

            </View>
            {/*<Text>selected: {date.toLocaleString()}</Text>*/}
            {show && (<DateTimePicker
                    style={{backgroundColor:'#2f77d5',flex: 1}}
                    testID="dateTimePicker"
                    value={(date ?? new Date())}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}   />

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

export  default CustomDatePicker;