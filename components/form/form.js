import {Text, View, StyleSheet, Alert, ScrollView} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import {useState} from "react";

function expenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [formInputs, setFormInputs] = useState({
        fullName: "",
        birthDate: "",
        driverAddress: "",
        driverCountry: "",
        driverPhone: "",
        driverPassport: "",
        driverPassportDateIssue: "",
        driverPassportDateExp: "",
        driverLicenceNumber: "",
        driverLicenceDateIssue: "",
        driverLicenceDateExp: "",
        renter :"",
        afm :"",
        doy :"",
        renterAddress :"",
        renterCity :"",
        renterPhone :"",
        secondDriverFullName : "",
        secondDriverbirthDate: "",
        secondDriverLicenceNumber: "",
        secondDriverLicenceDateIssue : "",
        secondDriverLicenceDateExp :"",
    })

    function changeHandlerInputs(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        })

    }

    function checkInputs(){
        var isEmptyInput = true;
        Object.keys(formInputs).forEach(function (key){
            isEmptyInput = formInputs[key].trim().length > 0 ;
        })

        if (!isEmptyInput){
            Alert.alert('Πρόβλημα με τα στοιχεία','Όλα τα πεδία είναι υποχρεωτικά')
        }
    }

    return <View style={styles.generalContainer}>
        <ScrollView style={styles.form}>
            <View style={styles.clientBox}>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Ονοματεπώνυμο και Πατρώνυμο οδηγού'}
                           onChangeText={changeHandlerInputs.bind(this, 'fullName')}
                           TextInputConfig={{}}/>
                    <Input style={styles.rowInput}
                           label={'Ημερ.Γενήσεως'}
                           onChangeText={changeHandlerInputs.bind(this, 'birthDate')}
                           TextInputConfig={{placeholder: 'YYY-MM-DD', maxLength: 10,}}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διεύθυνση Κατοικίας'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverAddress')}
                           TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverCountry')}
                           label={'Χώρα'}/>
                    <Input style={styles.rowInput} label={'Τηλ.'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPhone')}
                           TextInputConfig={{keyboardType: 'number-pad',
                               placeholder: '+30 6980999416'}}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διαβ.No'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassport')}
                           TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateIssue')}
                           label={'Ημερ Εκδοσης'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateExp')}
                           label={'Λήξη'}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceNumber')}
                           label={'Αρ.Αδείας Οδηγού'}
                           TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateIssue')}
                           label={'Ημερ Εκδοσης'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateExp')}
                           label={'Λήξη'}/>
                </View>
            </View>

            <View style={styles.clientBox}>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renter')}
                           label={'Μισθωτής'}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'afm')}
                           label={'ΑΦΜ'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'doy')}
                           label={'Δ.Ο.Υ'}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterAddress')}
                           label={'Διεύθυνση Κατοικίας'}/>

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterCity')}
                           label={'Πόλη'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterPhone')}
                           label={'Τηλ'}
                           TextInputConfig={{keyboardType: 'number-pad',
                        placeholder: '+30 6980999416'}}/>
                </View>

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
                    <RadioButtonCustom label={"Αποδέχεσαι C.D.W."}/>
                </View>

                <View style={styles.inputRow}>
                    <FormText/>
                </View>


                <SubmitButton onPress={checkInputs} buttonText={'Υποβολή Φόρμας'}/>


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
    warningText: {
        fontSize: 130,
        color: "#979797",
        fontWeight: 200
    },
    clientBox: {
        borderBottomWidth: 2,
        borderColor: '#878787',
        borderStyle: 'dashed'
    }

})
export default expenseForm
