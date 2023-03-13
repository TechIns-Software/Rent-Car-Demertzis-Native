import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import RecentlyBox from '../components/RecentlyBox';
import {DUMMY_CONTNENT} from "../store/auth-context";
import {getFormattedDate} from "../util/date";
import React, {createContext, useContext, useEffect, useState} from "react";
import {FormsContext} from "../store/form-context";
import Sign from "../components/form/SignatureScreen";






function RecentlyApplications(){
    var [modalVisible, setModalVisible] = useState(false);

    function renderApplications(applications){

        return <RecentlyBox
            id={applications.index}
            // type={applications.item.data.vehicleType}
            // date={applications.item.date}
            isSent={applications.item.isSent}
            onPressDelete = {OnDeleteForm.bind(this,[applications.index,applications.item.isSent])}
        />

    }

    function OnDeleteForm(formId){

        setModalVisible(!modalVisible)

    }



    const [allFormsSaved, setAllFormsSaved] = useState(DUMMY_CONTNENT);
    const formsCtx = useContext(FormsContext);
    useEffect(()=>{
        function  getAllForms(){
        formsCtx.allForms().then((res) => {
            if (res == null){
                setAllFormsSaved([    {
                    id : -55,
                    data : {
                        driverFullName: 'sad',
                        vehicleType : 'sad'
                    },
                    isSent: 1,
                    date : new Date('2022-11-19'),

                },]);
            } else {
                const newObj = [];
                var alreadyKeys = [];
                for (const [key, value] of Object.entries(res)) {
                    var tempInnerObj = {};
                    // if (alreadyKeys.includes(key)) {
                    //     continue;
                    // }

                    tempInnerObj.id = value.id;
                    tempInnerObj.data = value.data;
                    tempInnerObj.isSent = value.isUploaded;
                    tempInnerObj.date = value.date;
                    // alreadyKeys.push(key);
                    newObj.push(tempInnerObj);
                }
                // console.log(newObj);
                // AsyncStorage.removeItem(3);
                setAllFormsSaved(newObj);
                // console.log(res);

            }
        });
        }
        getAllForms();
    },[formsCtx.numberOfForms])


    return <View style={styles.container} >
        <FlatList
            data={allFormsSaved}
            renderItem={renderApplications}
            // keyExtractor={(item) => item.id }
        />

        <Modal
            animationType = {"fade"}
            transparent = {false}
            visible = {modalVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            <View style = {styles.modal}>
                {/*{View1 When form is uploaded}*/}
                <Text style = {styles.text}>Είσαι σίγουρος οτι θέλεις να διαγράψεις την φόρμα ?</Text>
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.deleteButtonForm} >
                        <Text style={styles.deleteButtonText}>Διαγραφή Φόρμας</Text>
                    </Pressable>

                    <Pressable style={styles.goBackButton} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.goBackText}> Πήγαινε Πίσω </Text>
                    </Pressable>

                </View>

            </View>
        </Modal>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "rgba(196,199,199,0.62)",
        height: '70%' ,
        width: '100%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
        fontSize:28
    },
    deleteButtonForm:{
        backgroundColor:'red',
        width:'80%',
        padding:10,
        borderRadius:10,
        marginVertical:5
    },
    deleteButtonText:{
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    buttonsContainer:{
        alignItems:'center',
        width:'100%',
    },
    goBackButton:{
        backgroundColor:'orange',
        width:'80%',
        padding:10,
        borderRadius:10,
        marginVertical:5
    },
    goBackText:{
        color:'black',
        fontSize:20,
        textAlign:'center'
    }
});

export default RecentlyApplications;