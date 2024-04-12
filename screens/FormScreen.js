import { StyleSheet, Text, View } from 'react-native';
import ExpenseForm from "../components/form/form";
function FormScreen({navigation}){
    return <View style={styles.container}>
        <ExpenseForm navigation={navigation}/>
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