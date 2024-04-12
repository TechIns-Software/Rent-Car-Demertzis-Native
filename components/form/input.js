import {Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

function Input({label,style,TextInputConfig,name,onChangeText,inputStyle,onSubmit,editable=true,value}){

    const inputStyles = [styles.input];

    if (TextInputConfig && TextInputConfig.multiline ){
        inputStyles.push(styles.inputMultiline);
    }

    return     <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
    <View style={[styles.inputContainer,style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput value={value} style={[inputStyles,inputStyle]} editable={editable} name={name} onChangeText={onChangeText} {...TextInputConfig}  />
    </View>
    </KeyboardAvoidingView>
}
const  styles = StyleSheet.create({
    inputContainer :{
        marginHorizontal :4,
        marginVertical : 16,

    },
    label :{
        fontSize: RFPercentage(1.4),
        color:'#000000',
        fontWeight :'bold',
        marginBottom :4
    },
    input :{
        backgroundColor : '#a9cafa',
        padding :6,
        borderRadius :6,
        fontSize :18,
        color :'black'
    },
    inputMultiline:{
        minHeight :100,
        textAlignVertical :'top'
    },
    container: {
        flex: 1,
    },
})
export default Input