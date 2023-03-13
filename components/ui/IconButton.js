import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useContext, useState} from "react";
import {AuthContext} from "../../store/auth-context";

function IconButton({ icon, color, size, onPress }) {
  const authCtx = useContext(AuthContext);
  var [modalVisible, setModalVisible] = useState(false);
  return (<>
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={() => setModalVisible(!modalVisible)}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  <Modal
      animationType = {"slide"}
      transparent = {false}
      visible = {modalVisible}
      onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
    {/*All views of Modal*/}
    <View style = {styles.modal}>
      {/*{View1 When form is uploaded}*/}
      <View style={styles.textContainer}>
      <Text style = {styles.text}>Είσαι σίγουρος οτι θέλεις να κάνεις αποσύνδεση απο την εφαρμογή ?</Text>
      <Text style = {styles.text}>Οταν γίνεται αποσύνδεση απο την εφαρμογή, η φόρμες διαγράφονται αυτόματα απο την συσκεύη</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.deleteButtonForm}    onPress={authCtx.logout}>
          <Text style={styles.deleteButtonText}>Αποσύνδεση </Text>
        </Pressable>

        <Pressable style={styles.goBackButton} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.goBackText}> Πήγαινε Πίσω </Text>
        </Pressable>

      </View>

    </View>
  </Modal>
      </>

  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
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
  },
  textContainer:{
    textAlign:'center'
  }
});