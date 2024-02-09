import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from "../components/form/form";
import {FormsContext} from "../store/form-context";
import {useContext} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function EditFormScreen({route,navigation}){
    const { idForm} = route.params;
    const formCtx = useContext(FormsContext) ;
    const formInputs = formCtx.getForm(idForm);
    return <View style={styles.container}>
        <Form  idForm={idForm} />
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