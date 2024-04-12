import {Modal, Text, View} from "react-native";
import Sign from "./SignatureScreen";
import {useState} from "react";
import {front_left1} from "./data";


function DamageModal({defaultDamage,styles,modalVisible,setModalVisibility,
                         onOK,modalTitle,bgImage,hasDamage,onchangeRadioButton}){

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={setModalVisibility}>

            <View style={styles.generalContainer}>
                <Text style={styles.titleText}> {modalTitle}</Text>
                <Sign onOK={onOK}
                      bgImage={bgImage}
                      value={defaultDamage}
                      onBack={setModalVisibility}
                      hasDamage={hasDamage}
                      onchangeRadioButton={onchangeRadioButton}
                />

            </View>
        </Modal>
    )
}

export default DamageModal;