import {Text, TextInput, View, StyleSheet} from "react-native";

function FormTextInput({label, style, TextInputConfig}) {

    return <View>
        <Text style={styles.titleText}> ONE TIME OFFLINE BANK CARD CHARGE AUTHORIZATION FORM</Text>
        <Text>
            Sign this form to authorise SUPERISE MYKONOS IKE to make s one-time charge to your bank card listed below to
            restore the rental vehicle in the same condition as it was delivered to you. By signing this form you
            authorise SUPERISE MYKONOS IKE to charge your bank card offline for the amount indicated on or after the
            indicated date and time, this authorisation is for a single transaction only
        </Text>

        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>I am </Text>
            <TextInput style={styles.input} {...TextInputConfig}/>
            <Text style={styles.label}>and authorise SUPERISE MYKONOS IKE to charge offline my bank card with number and
                expiry on or after</Text>
            <TextInput style={styles.input} {...TextInputConfig}/>
            <Text style={styles.label}>This office charge is to recover the cost of restoring the rental vehicle with
                registration </Text>
            <TextInput style={styles.input} {...TextInputConfig}/>
            <Text style={styles.label}>in the same contidion as it was deliverd to me </Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignSelf: 'center'

    },
    label: {
        flexDirection: 'row',
        fontSize: 13,
        color: 'rgba(0,0,0,0.71)',
        fontWeight: 'bold',

    },
    input: {
        backgroundColor: '#a9cafa',
        minWidth: 100,
        borderRadius: 6,
        fontSize: 15,
        color: 'black',
        marginHorizontal: 2,
        marginBottom: 10
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    titleText: {
        alignSelf :'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical :25
    },
})
export default FormTextInput