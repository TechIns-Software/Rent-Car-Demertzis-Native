import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext} from "react";
import {FormsContext} from "../store/form-context";


function RecentlyBox({driverName,date,registrationNumber,isSent,id,onPressDelete}) {
    return         <View style={styles.container} >
            <View >
                <Text style={styles.label}>Όνομα Οδηγού: {driverName}</Text>
                <Text style={styles.label}>Ημερομηνία:<Text style={styles.value}>{date} </Text></Text>
                <Text style={styles.label}>Αρ.Κυκλοφορίας: {registrationNumber}</Text>
                {isSent ? <Text style={[styles.successText]}>Έχει ανεβεί</Text> : <Text style={[styles.warningText]}> Δεν έχει ανεβεί</Text>}
            </View>


        <Pressable onPress={onPressDelete} style={({pressed}) => ({
            backgroundColor: pressed
                ? 'rgb(26,76,139)'
                : 'white',
            borderRadius:10,
            justifyContent:'center',
            padding:5

        })}>
            <View style={styles.deleteContainer}>

                <Ionicons name={'ios-trash'} size={35} color={'red'}/>
            </View>
        </Pressable>

        </View>
}

const styles = StyleSheet.create({
    container:{
        padding :12,
        marginVertical :8,
        backgroundColor :'#f8a81b',
        flexDirection :'row',
        justifyContent :'space-between',
        borderRadius : 6,
        /// SHADOW FOR ANDROID AND IOS
        elevation : 3,
        shadowOffset :{width:1,height:1},
        shadowOpacity:0.4
    },
    label :{
        color :'black',
        fontWeight : '500'
    },
    value:{
        color :'rgb(223,10,42)',
        fontWeight : 'bold',
        fontSize : 16
    },
    warningText :{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
        backgroundColor:'#b70707',
        borderRadius :5,
        marginVertical:5,
        padding:2
    },
    successText:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
        backgroundColor:'#11b707',
        borderRadius :5,
        marginVertical:5,
        padding:2

    },
    deleteContainer:{
        borderRadius:10,
        justifyContent:'center',
        padding:10
    }



});

export default RecentlyBox;