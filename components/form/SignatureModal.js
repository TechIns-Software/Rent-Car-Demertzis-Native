import {Modal, Text, View} from "react-native";
import Sign from "./SignatureScreen";
import {useState} from "react";


function SignatureModal({defaultSignature,styles,modalVisible,setModalVisibility,onOK,modalTitle}){

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={setModalVisibility}>

                <View style={styles.generalContainer}>
                    <Text style={styles.titleText}>  {modalTitle}</Text>
                    <Sign onOK={onOK} value={defaultSignature}
                          onBack={setModalVisibility}/>
                </View>
            </Modal>
    )
}

export default SignatureModal;