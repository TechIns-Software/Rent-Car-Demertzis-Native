import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from "../components/form/form";
// import {black} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
function FormScreen(){
    return <View style={styles.container}>
        <Form/>

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

export default FormScreen;