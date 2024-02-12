import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from "../components/form/form";
import {FormsContext} from "../store/form-context";
import {useContext} from "react";


function EditFormScreen({route,navigation}){
    const { idForm} = route.params;
    const formCtx = useContext(FormsContext);
    return <View style={styles.container}>
        <Form navigation={navigation}  idForm={idForm} />
    </View>
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor :'rgba(164,164,164,0.07)'
    },
    title:{
        fontWeight :'bold',
        fontSize : 25,
        borderColor: 'orange',
        borderWidth: 4,
        borderStyle: 'solid'
    }
})

export default EditFormScreen;