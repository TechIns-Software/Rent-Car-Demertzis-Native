import {Text, View, StyleSheet, Alert, ScrollView} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";

function expenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    return <View style={styles.generalContainer}>
        <ScrollView style={styles.form}>

            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Ονοματεπώνυμο και Πατρώνυμο οδηγού'} TextInputConfig={{}}/>
                <Input style={styles.rowInput} label={'Ημερ.Γενήσεως'}
                       TextInputConfig={{placeholder: 'YYY-MM-DD', maxLength: 10,}}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Διεύθυνση Κατοικίας'} TextInputConfig={{
                    keyboardType: 'decimal-pad',
                }}/>
                <Input style={styles.rowInput} label={'Χώρα'}/>
                <Input style={styles.rowInput} label={'Τηλ.'}
                       TextInputConfig={{keyboardType: 'number-pad', placeholder: '+30 6980999416'}}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Διαβ.No'} TextInputConfig={{
                    keyboardType: 'decimal-pad',
                }}/>
                <Input style={styles.rowInput} label={'Ημερ Εκδοσης'}/>
                <Input style={styles.rowInput} label={'Λήξη'}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Αρ.Αδείας Οδηγού'} TextInputConfig={{
                    keyboardType: 'decimal-pad',
                }}/>
                <Input style={styles.rowInput} label={'Ημερ Εκδοσης'}/>
                <Input style={styles.rowInput} label={'Λήξη'}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Μισθωτής'}/>
                <Input style={styles.rowInput} label={'ΑΦΜ'}/>
                <Input style={styles.rowInput} label={'Δ.Ο.Υ'}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Διεύθυνση Κατοικίας'}/>
                <Input style={styles.rowInput} label={'Πόλη'}/>
                <Input style={styles.rowInput} label={'Τηλ'}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Ονοματεπώνυμο Επιπλέον Οδηγού'}/>
                <Input style={styles.rowInput} label={'Ημερ Γέννησης'}/>
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput} label={'Αρ.Αδείας Επιπλέον Οδηγού'} TextInputConfig={{
                    keyboardType: 'decimal-pad',
                }}/>
                <Input style={styles.rowInput} label={'Χώρα'}/>
                <Input style={styles.rowInput} label={'Ημερ Έκδοσης'}/>
                <Input style={styles.rowInput} label={'Λήξη'}/>
            </View>
            <Input label={'Email'} TextInputConfig={{multiline: true,}}/>
            <View style={styles.containerBorder}>
                <Text style={styles.titleText}>Επιπλέον Πληροφορίες</Text>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Αρ. Κυκλοφορίας'} TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput} label={'Τύπος'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Hμ Παράδοσης'} TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput} label={'Ωρα'}/>
                    <Input style={styles.rowInput} label={'Station'}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Επιστροφή'} TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput} label={'Ωρα'}/>
                    <Input style={styles.rowInput} label={'Station'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Παρετάθη διά'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Παρεδόθη εις'}/>
                    <Input style={styles.rowInput} label={'Παραλαβή από'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Χρεώσεις €'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Ημέρες'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Recommended By'}/>
                    <Input style={styles.rowInput} label={'Rate Code'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Sub-Total'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'C.M.D Μερική Απαλλαγή Ζημιών'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'TOTAL - Σύνολο'}/>
                </View>

                <View style={styles.inputRow}>
                   <RadioButtonCustom label={"Αποδέχεσαι C.D.W."} />
                </View>

            </View>

        </ScrollView>


    </View>
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1
    },
    form: {
        marginTop: 20,

    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    containerBorder: {
        borderRadius: 10,
        borderColor: '#ea7f29',
        borderStyle: 'solid',
        borderWidth: 1
    },
    warningText:{
        fontSize : 130,
        color :"#979797",
        fontWeight :200
    }

})
export default expenseForm
