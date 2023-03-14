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
    var [RecentlyId,setRecentlyId] = useState(99);
    var [RecentlyIsSent,setRecentlyIsSent] = useState(false);
    const [allFormsSaved, setAllFormsSaved] = useState([]);
    const formsCtx = useContext(FormsContext);

    function renderApplications(applications){

        return <RecentlyBox
            driverName={applications.item.driverFullName}
            registrationNumber={applications.item.registrationNumber}
            id={Number(applications.index + 1)}
            date={applications.item.date}
            isSent={applications.item.isSent}
            onPressDelete = {OnDeleteForm.bind(this,{id:Number(applications.index + 1) ,isSent:applications.item.isSent})}
        />

    }

    function OnDeleteForm(formInfos){
        setRecentlyId(formInfos.id)
        setRecentlyIsSent(formInfos.isSent)
        setModalVisible(!modalVisible)
    }

    async function deleteForm(formid){
      await  formsCtx.deleteForm(formid)
        // setModalVisible(!modalVisible)
    }




    useEffect(()=>{
        function  getAllForms(){

        formsCtx.allForms().then((res) => {
            if (res == null){
                setAllFormsSaved([]);
            } else {
                const newObj = [];
                for (const [key, value] of Object.entries(res)) {
                    var tempInnerObj = {};

                    tempInnerObj.id = key
                    tempInnerObj.driverFullName = value.data.driverFullName
                    tempInnerObj.registrationNumber = value.data.registrationNumber
                    tempInnerObj.isSent = value.isUploaded;
                    tempInnerObj.date = value.date;
                    // alreadyKeys.push(key);
                    newObj.push(tempInnerObj);
                }
                setAllFormsSaved(newObj);

            }
        });
        }
        getAllForms();
    },[formsCtx.numberOfForms])


    return <View style={styles.container} >
        {allFormsSaved.length > 0 ?      <FlatList
            data={allFormsSaved}
            renderItem={renderApplications}
            keyExtractor={(item) =>  item.id}
        /> :<Text style={styles.text}>Δεν υπάρχει καμία αίτηση</Text> }


        <Modal
            animationType = {"fade"}
            transparent = {false}
            visible = {modalVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            <View style = {styles.modal}>
                {/*{View1 When form is uploaded}*/}
                {RecentlyIsSent == true ?  <Text style = {styles.text}>Είσαι σίγουρος οτι θέλεις να διαγράψεις την φόρμα με id {RecentlyId} ? </Text> :
                <Text style = {styles.text}>Η φόρμα με αριθμό :{RecentlyId} έχει αποθηκευτεί μόνο τοπικά. Θέλετε σίγουρα να το διαγράψετε ? </Text>}

                <View style={styles.buttonsContainer}>
                    <Pressable onPress={deleteForm.bind(this,RecentlyId)} style={styles.deleteButtonForm} >
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