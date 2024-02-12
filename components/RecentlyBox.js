import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext} from "react";
import {FormsContext} from "../store/form-context";


function RecentlyBox({driverName,date,registrationNumber,isSent,id,onPressDelete,onUploadForm,onEdit}) {
    return <View style={styles.container}>
        <View style={styles.editContainer}>
        {!isSent ? <Text onPress={onEdit} ><Ionicons name={'create'}  size={25} color={'red'}/></Text> : '' }
        </View>

        <View style={styles.info}>
            <Text style={styles.label}>Driver Name: {driverName}</Text>
            <Text style={styles.label}>Date:<Text style={styles.value}>{date} </Text></Text>
            <Text style={styles.label}>Registration No: {registrationNumber}</Text>
            <Text style={styles.label}>Upload Status:  {isSent ? <Text style={[styles.successText]}>Uploaded</Text> :
                <Text style={[styles.warningText]}>  Not uploaded</Text>}</Text>
        </View>
        <View style={styles.buttonsContainer}>
            { !isSent ?
                <Pressable onPress={onUploadForm} style={({pressed}) => ({
                    backgroundColor: pressed
                        ? '#3b8fff'
                        : '#0e5ec5',
                    borderRadius: 10,
                    justifyContent: 'center',
                    padding: 5,
                    marginVertical:3,

                })}>
                    <View  >
                     <Text style={{color:'white',fontWeight:'bold',    textAlign:'center'}}>Upload Form</Text>
                    </View>
                </Pressable> :''
            }

            <Pressable onPress={onPressDelete} style={({pressed}) => ({
                backgroundColor: pressed
                    ? '#ff1616'
                    : '#b20303',
                borderRadius: 10,
                justifyContent: 'center',
                padding: 5,
                marginVertical:3,

            })}>
                <View >
                    <Text style={{color:'white',fontWeight:'bold', textAlign:'center'}}>Delete Form From Device</Text>
                </View>
            </Pressable>


        </View>

    </View>
}

const styles = StyleSheet.create({
    container:{
        padding :12,
        marginVertical :8,
        backgroundColor :'rgba(39,143,229,0.53)',
        flexDirection :'column',
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
        fontSize:16,
        color:'#b70707',
        fontWeight:'bold',
        marginVertical:5,
    },
    successText:{
        fontSize:16,
        color:'#11b707',
        fontWeight:'bold',
        marginVertical:5,
    },
    uploadContainer:{
        backgroundColor:'blue',
        borderRadius:10,
        justifyContent:'center',
        padding:3
    },
    deleteContainer:{
        backgroundColor:'red',
        borderRadius:10,
        justifyContent:'center',
        padding:3
    },
    buttonsContainer:{
        display:"flex",
        flexDirection :'column',
        justifyContent :'space-between',
        borderRadius : 6,
    },
    editContainer :{
        display:"flex",
        flexDirection :'row',
        justifyContent :'flex-end',
    }



});

export default RecentlyBox;