import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from "../components/form/form";
function FormScreen(){
    return <View style={styles.container}>
        <Text style={styles.title} >Δημιουργία Αίτησης </Text>
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
        fontSize : 25
    }
})

export default FormScreen;