import {Text, View, StyleSheet, Alert, ScrollView, Button,Modal,Pressable} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import {useState} from "react";
import SignatureScreen from "react-native-signature-canvas";
import Sign from "./SignatureScreen";

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
        secondDriverBirthDate: "",
        secondDriverLicenceNumber: "",
        secondDriverLicenceCountry: "",
        secondDriverLicenceDateIssue : "",
        secondDriverLicenceDateExp :"",
        email :"",
        registrationNumber :"",
        typeofCar :"",
        checkOutDate :"",
        checkOutTime :"",
        checkOutStation :"",
        checkInDate :"",
        checkInTime :"",
        checkInStation :"",
        extensionTo :"",
        deliveredAt :"",
        collectedFrom :"",
        charges :"",
        days :"",
        recommendedBy :"",
        rateCode :"",
        subTotal :"",
        cdw :"",
        total :"",
        cdwAgree :true,
        fullNameBank :"",
        afterDateBank :"",
        regNumberBank :"",
        cardHolder :"",
        cardExpDate :"",
        cvv :""
    })
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const RULES_INPUTS = {
        fullName: {
            mandatory: true,
            type: "text"
        },
        birthDate: {
            mandatory: true,
            type: "date"
        },
        driverAddress: {
            mandatory: true,
            type: "text"
        },
        driverCountry: {
            mandatory: true,
            type: "text"
        },
        driverPhone: {
            mandatory: true,
            type: "text"
        },
        driverPassport: {
            mandatory: true,
            type: "text"
        },
        driverPassportDateIssue: {
            mandatory: true,
            type: "text"
        },
        driverPassportDateExp: {
            mandatory: true,
            type: "text"
        },
        driverLicenceNumber: {
            mandatory: true,
            type: "text"
        },
        driverLicenceDateIssue: {
            mandatory: true,
            type: "text"
        },
        driverLicenceDateExp: {
            mandatory: true,
            type: "text"
        },
        renter : {
            mandatory: true,
            type: "text"
        },
        afm : {
            mandatory: true,
            type: "text"
        },
        doy : {
            mandatory: true,
            type: "text"
        },
        renterAddress : {
            mandatory: true,
            type: "text"
        },
        renterCity : {
            mandatory: true,
            type: "text"
        },
        renterPhone : {
            mandatory: true,
            type: "text"
        },
        secondDriverFullName :  {
            mandatory: true,
            type: "text"
        },
        secondDriverBirthDate:  {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceNumber:  {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceCountry:  {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceDateIssue :  {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceDateExp : {
            mandatory: true,
            type: "text"
        },
        email : {
            mandatory: true,
            type: "text"
        },
        registrationNumber : {
            mandatory: true,
            type: "text"
        },
        typeofCar : {
            mandatory: true,
            type: "text"
        },
        checkOutDate : {
            mandatory: true,
            type: "text"
        },
        checkOutTime : {
            mandatory: true,
            type: "text"
        },
        checkOutStation : {
            mandatory: true,
            type: "text"
        },
        checkInDate : {
            mandatory: true,
            type: "text"
        },
        checkInTime : {
            mandatory: true,
            type: "text"
        },
        checkInStation : {
            mandatory: true,
            type: "text"
        },
        extensionTo : {
            mandatory: true,
            type: "text"
        },
        deliveredAt : {
            mandatory: true,
            type: "text"
        },
        collectedFrom : {
            mandatory: true,
            type: "text"
        },
        charges : {
            mandatory: true,
            type: "number"
        },
        days : {
            mandatory: true,
            type: "number"
        },
        recommendedBy : {
            mandatory: false,
            type: "text"
        },
        rateCode : {
            mandatory: false,
            type: "text"
        },
        subTotal : {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "afm"
        },
        total : {
            mandatory: true,
            type: "text"
        },
        cdwAgree : {
            mandatory: true,
            type: "bool"
        },
        fullNameBank : {
            mandatory: true,
            type: "text"
        },
        afterDateBank : {
            mandatory: true,
            type: "text"
        },
        regNumberBank : {
            mandatory: true,
            type: "text"
        },
        cardHolder : {
            mandatory: true,
            type: "text"
        },
        cardExpDate : {
            mandatory: true,
            type: "text"
        },
        cvv : {
            mandatory: true,
            type: "text"
        }
    };

    function changeHandlerInputs(inputName,inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        })
    }

    function checkInputs(){
        var everythingOk = true;

        for (const [key, value] of Object.entries(formInputs)) {
            if (RULES_INPUTS[key]) {
                if (RULES_INPUTS[key]['mandatory']) {
                    //check types if we want
                    if (value.length === 0) {
                        everythingOk = false;
                        //make button red
                    }
                } else {
                    if (RULES_INPUTS[key]['underCondition']) { //υπο συνθηκη αναγκαστικα
                        if (value.length === 0) {
                            const fieldName = RULES_INPUTS[key]['fieldNameUnderCondition'];
                            if (formInputs[fieldName].length > 0) {
                                everythingOk = false;
                                //make red button
                            }
                        }
                    }
                }
            }

        }

        //todo check signatures and car as well
        if (!everythingOk){
            Alert.alert('Πρόβλημα με τα στοιχεία','Όλα τα πεδία είναι υποχρεωτικά')
        }
        console.log(formInputs);
    }



    function changeBankInputs(label,val){
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [label]: val
            }
        })

    }

    function RadioPressHandler(val){
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                ['cdwAgree']: val
            }
        })
    }



    return <View style={styles.generalContainer}>

        <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
            <View style={[styles.clientBox,{ overflow: 'hidden'}]}>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Ονοματεπώνυμο και Πατρώνυμο οδηγού'}
                           onChangeText={changeHandlerInputs.bind(this, 'fullName')}
                           value={formInputs.fullName}
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

            <View  style={[styles.clientBox,{ overflow: 'hidden'}]}>
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
                <Input
                    style={styles.rowInput}
                    label={'Ονοματεπώνυμο Επιπλέον Οδηγού'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverFullName')}
                />
                <Input
                    style={styles.rowInput}
                    label={'Ημερ Γέννησης'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverBirthDate')}

                />
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput}
                       label={'Αρ.Αδείας Επιπλέον Οδηγού'}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceNumber')}
                       TextInputConfig={{
                    keyboardType: 'decimal-pad',
                }}/>
                <Input
                    style={styles.rowInput}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceCountry')}
                    label={'Χώρα'}/>
                <Input style={styles.rowInput}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateIssue')}
                       label={'Ημερ Έκδοσης'}/>
                <Input style={styles.rowInput}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateExp')}
                       label={'Λήξη'}/>
            </View>
            <Input label={'Email'}
                   onChangeText={changeHandlerInputs.bind(this, 'email')}/>
            <View style={styles.containerBorder}>
                <Text style={styles.titleText}>Επιπλέον Πληροφορίες</Text>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Αρ. Κυκλοφορίας'}
                           onChangeText={changeHandlerInputs.bind(this, 'registrationNumber')}
                           TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'typeofCar')}
                           label={'Τύπος'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutDate')}
                           label={'Hμ Παράδοσης'}
                           TextInputConfig={{
                        keyboardType: 'decimal-pad',
                    }}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutTime')}
                           label={'Ωρα'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutStation')}
                           label={'Station'}/>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInDate')}
                           label={'Επιστροφή'} />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInTime')}
                           label={'Ωρα'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                           label={'Station'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'extensionTo')}
                           label={'Παρετάθη διά'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'deliveredAt')}
                           label={'Παρεδόθη εις'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'collectedFrom')}
                           label={'Παραλαβή από'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'charges')}
                           label={'Χρεώσεις €'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'days')}
                           label={'Ημέρες'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'recommendedBy')}
                           label={'Recommended By'}/>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'rateCode')}
                           label={'Rate Code'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'subTotal')}
                           label={'Sub-Total'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cdw')}
                           label={'C.M.D Μερική Απαλλαγή Ζημιών'}/>
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'total')}
                           label={'TOTAL - Σύνολο'}/>
                </View>

                <View style={styles.inputRow}>
                    <RadioButtonCustom onPress={RadioPressHandler}  label={"Αποδέχεσαι C.D.W."}/>
                </View>

                <View style={styles.inputRow}>
                    <FormText
                        onChangeInputs={changeBankInputs}
                    />

                </View>
                <Pressable onPress={()=>{setModalVisible(!modalVisible)}}>
                <View style={{width:'100%'}}>
                        <View>
                            <Button title={' Υπογραφη'} onPress={()=>{setModalVisible(!modalVisible)}}/>

                        </View>
                </View>
                </Pressable>

                <SubmitButton onPress={checkInputs} buttonText={'Υποβολή Φόρμας'}/>

            </View>

        </ScrollView>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>

                    <View >
                        <Sign />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Πίσω</Text>
                        </Pressable>
                    </View>
        </Modal>


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
    },
    enteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    border:{
        borderColor:'red',
        borderWidth:5
    }


})
export default expenseForm
