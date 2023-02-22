import {Text, TextInput, View,StyleSheet} from "react-native";

function Input({label,style,TextInputConfig,name,onChangeText,inputStyle,onSubmit,editable=true,value}){

    const inputStyles = [styles.input];

    if (TextInputConfig && TextInputConfig.multiline ){
        inputStyles.push(styles.inputMultiline);
    }

    return <View style={[styles.inputContainer,style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput value={value} style={[inputStyles,inputStyle]} editable={editable} name={name} onChangeText={onChangeText} {...TextInputConfig}  />
    </View>
}
const  styles = StyleSheet.create({
    inputContainer :{
        marginHorizontal :4,
        marginVertical : 16,

    },
    label :{
        fontSize : 14,
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
    }
})
export default Input