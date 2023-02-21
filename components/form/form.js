import {Text, View, StyleSheet, Alert, ScrollView, Button, Modal, Pressable} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import React, {useContext, useState} from "react";
import SignatureScreen from "react-native-signature-canvas";
import Sign from "./SignatureScreen";
import {FormsContext} from "../../store/form-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        renter: "",
        afm: "",
        doy: "",
        renterAddress: "",
        renterCity: "",
        renterPhone: "",
        secondDriverFullName: "",
        secondDriverBirthDate: "",
        secondDriverLicenceNumber: "",
        secondDriverLicenceCountry: "",
        secondDriverLicenceDateIssue: "",
        secondDriverLicenceDateExp: "",
        email: "",
        registrationNumber: "",
        typeofCar: "",
        checkOutDate: "",
        checkOutTime: "",
        checkOutStation: "",
        checkInDate: "",
        checkInTime: "",
        checkInStation: "",
        extensionTo: "",
        deliveredAt: "",
        collectedFrom: "",
        charges: "",
        days: "",
        recommendedBy: "",
        rateCode: "",
        subTotal: "",
        cdw: "",
        total: "",
        cdwAgree: true,
        signClient:"",
        cardHolder: "",
        cardExpDate: "",
        cvv: "",
        signCard: "",
    })
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
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
        renter: {
            mandatory: true,
            type: "text"
        },
        afm: {
            mandatory: true,
            type: "text"
        },
        doy: {
            mandatory: true,
            type: "text"
        },
        renterAddress: {
            mandatory: true,
            type: "text"
        },
        renterCity: {
            mandatory: true,
            type: "text"
        },
        renterPhone: {
            mandatory: true,
            type: "text"
        },
        secondDriverFullName: {
            mandatory: true,
            type: "text"
        },
        secondDriverBirthDate: {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceNumber: {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceCountry: {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceDateIssue: {
            mandatory: true,
            type: "text"
        },
        secondDriverLicenceDateExp: {
            mandatory: true,
            type: "text"
        },
        email: {
            mandatory: true,
            type: "text"
        },
        registrationNumber: {
            mandatory: true,
            type: "text"
        },
        typeofCar: {
            mandatory: true,
            type: "text"
        },
        checkOutDate: {
            mandatory: true,
            type: "text"
        },
        checkOutTime: {
            mandatory: true,
            type: "text"
        },
        checkOutStation: {
            mandatory: true,
            type: "text"
        },
        checkInDate: {
            mandatory: true,
            type: "text"
        },
        checkInTime: {
            mandatory: true,
            type: "text"
        },
        checkInStation: {
            mandatory: true,
            type: "text"
        },
        extensionTo: {
            mandatory: true,
            type: "text"
        },
        deliveredAt: {
            mandatory: true,
            type: "text"
        },
        collectedFrom: {
            mandatory: true,
            type: "text"
        },
        charges: {
            mandatory: true,
            type: "number"
        },
        days: {
            mandatory: true,
            type: "number"
        },
        recommendedBy: {
            mandatory: false,
            type: "text"
        },
        rateCode: {
            mandatory: false,
            type: "text"
        },
        subTotal: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "afm"
        },
        total: {
            mandatory: true,
            type: "text"
        },
        cdwAgree: {
            mandatory: true,
            type: "bool"
        },
        fullNameBank: {
            mandatory: true,
            type: "text"
        },
        afterDateBank: {
            mandatory: true,
            type: "text"
        },
        regNumberBank: {
            mandatory: true,
            type: "text"
        },
        cardHolder: {
            mandatory: true,
            type: "text"
        },
        cardExpDate: {
            mandatory: true,
            type: "text"
        },
        cvv: {
            mandatory: true,
            type: "text"
        }
    };
    const [everythingOk, SetEveryThingOk] = useState(true);
    const formCtx = useContext(FormsContext) ;

    function changeHandlerInputs(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        })
    }

    function checkInputs() {
        SetEveryThingOk(true);

        for (const [key, value] of Object.entries(formInputs)) {
            if (RULES_INPUTS[key]) {
                if (RULES_INPUTS[key]['mandatory']) {
                    //check types if we want
                    if (value.length === 0) {
                        SetEveryThingOk(false);
                        //make button red

                    }
                } else {
                    if (RULES_INPUTS[key]['underCondition']) { //υπο συνθηκη αναγκαστικα
                        if (value.length === 0) {
                            const fieldName = RULES_INPUTS[key]['fieldNameUnderCondition'];
                            if (formInputs[fieldName].length > 0) {
                                SetEveryThingOk(false);
                                //make red button
                            }
                        }
                    }
                }
            }

        }

        //todo check signatures and car as well
        if (!everythingOk) {
            Alert.alert('Πρόβλημα με τα στοιχεία', 'Όλα τα πεδία είναι υποχρεωτικά')
        }

        formCtx.saveLocal(0,formInputs);


    }

    function RadioPressHandler(val) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                ['cdwAgree']: val
            }
        })
    }

    function  clearSignature(label,value){

        console.log(label)
        console.log(value)
    }


    return <View style={styles.generalContainer}>

        <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
            <View style={[styles.clientBox, {overflow: 'hidden'}]}>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Ονοματεπώνυμο και Πατρώνυμο οδηγού'}
                           onChangeText={changeHandlerInputs.bind(this, 'fullName')}
                           TextInputConfig={{}}
                           inputStyle={!everythingOk && formInputs.fullName.trim() === '' ? styles.nullInput : ''}/>
                    <Input style={styles.rowInput}
                           label={'Ημερ.Γεννήσεως'}
                           onChangeText={changeHandlerInputs.bind(this, 'birthDate')}
                           TextInputConfig={{placeholder: 'YYY-MM-DD', maxLength: 10,}}
                           inputStyle={!everythingOk && formInputs.birthDate.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διεύθυνση Κατοικίας'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverAddress')}
                           TextInputConfig={{keyboardType: 'decimal-pad'}}
                           inputStyle={!everythingOk && formInputs.driverAddress.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverCountry')}
                           label={'Χώρα'}
                           inputStyle={!everythingOk && formInputs.driverCountry.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput} label={'Τηλ.'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPhone')}
                           TextInputConfig={{keyboardType: 'number-pad', placeholder: '+30 6980999416'}}
                           inputStyle={!everythingOk && formInputs.driverPhone.trim() === '' ? styles.nullInput : ''}

                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διαβ.No'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassport')}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk && formInputs.driverPassport.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateIssue')}
                           label={'Ημερ Εκδοσης'}
                           inputStyle={!everythingOk && formInputs.driverPassportDateIssue.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateExp')}
                           label={'Λήξη'}
                           inputStyle={!everythingOk && formInputs.driverPassportDateExp.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceNumber')}
                           label={'Αρ.Αδείας Οδηγού'}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk && formInputs.driverLicenceNumber.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateIssue')}
                           label={'Ημερ Εκδοσης'}
                           inputStyle={!everythingOk && formInputs.driverLicenceDateIssue.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateExp')}
                           label={'Λήξη'}
                           inputStyle={!everythingOk && formInputs.driverLicenceDateExp.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
            </View>

            <View style={[styles.clientBox, {overflow: 'hidden'}]}>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renter')}
                           label={'Μισθωτής'}
                           inputStyle={!everythingOk && formInputs.renter.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'afm')}
                           label={'ΑΦΜ'}
                           inputStyle={!everythingOk && formInputs.afm.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'doy')}
                           label={'Δ.Ο.Υ'}
                           inputStyle={!everythingOk && formInputs.doy.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterAddress')}
                           label={'Διεύθυνση Κατοικίας'}
                           inputStyle={!everythingOk && formInputs.renterAddress.trim() === '' ? styles.nullInput : ''}
                    />

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterCity')}
                           label={'Πόλη'}
                           inputStyle={!everythingOk && formInputs.renterCity.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterPhone')}
                           label={'Τηλ'}
                           TextInputConfig={{keyboardType: 'number-pad', placeholder: '+30 6980999416'}}
                           inputStyle={!everythingOk && formInputs.renterPhone.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

            </View>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label={'Ονοματεπώνυμο Επιπλέον Οδηγού'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverFullName')}
                    inputStyle={!everythingOk && formInputs.secondDriverFullName.trim() === '' ? styles.nullInput : ''}
                />
                <Input
                    style={styles.rowInput}
                    label={'Ημερ Γέννησης'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverBirthDate')}
                    inputStyle={!everythingOk && formInputs.secondDriverBirthDate.trim() === '' ? styles.nullInput : ''}
                />
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput}
                       label={'Αρ.Αδείας Επιπλέον Οδηγού'}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceNumber')}
                       TextInputConfig={{keyboardType: 'decimal-pad',}}
                       inputStyle={!everythingOk && formInputs.secondDriverLicenceNumber.trim() === '' ? styles.nullInput : ''}
                />
                <Input
                    style={styles.rowInput}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceCountry')}
                    label={'Χώρα'}
                    inputStyle={!everythingOk && formInputs.secondDriverLicenceCountry.trim() === '' ? styles.nullInput : ''}
                />
                <Input style={styles.rowInput}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateIssue')}
                       label={'Ημερ Έκδοσης'}
                       inputStyle={!everythingOk && formInputs.secondDriverLicenceDateIssue.trim() === '' ? styles.nullInput : ''}
                />
                <Input style={styles.rowInput}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateExp')}
                       label={'Λήξη'}
                       inputStyle={!everythingOk && formInputs.secondDriverLicenceDateExp.trim() === '' ? styles.nullInput : ''}
                />
            </View>
            <Input label={'Email'}
                   onChangeText={changeHandlerInputs.bind(this, 'email')}
                   inputStyle={!everythingOk && formInputs.email.trim() === '' ? styles.nullInput : ''}
            />
            <View style={styles.containerBorder}>
                <Text style={styles.titleText}>Επιπλέον Πληροφορίες</Text>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Αρ. Κυκλοφορίας'}
                           onChangeText={changeHandlerInputs.bind(this, 'registrationNumber')}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk && formInputs.registrationNumber.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'typeofCar')}
                           label={'Τύπος'}
                           inputStyle={!everythingOk && formInputs.typeofCar.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutDate')}
                           label={'Hμ Παράδοσης'}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk && formInputs.checkOutDate.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutTime')}
                           label={'Ωρα'}
                           inputStyle={!everythingOk && formInputs.checkOutTime.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutStation')}
                           label={'Station'}
                           inputStyle={!everythingOk && formInputs.checkOutStation.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInDate')}
                           label={'Επιστροφή'}
                           inputStyle={!everythingOk && formInputs.checkInDate.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInTime')}
                           label={'Ωρα'}
                           inputStyle={!everythingOk && formInputs.checkInTime.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                           label={'Station'}
                           inputStyle={!everythingOk && formInputs.checkInStation.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'deliveredAt')}
                           label={'Παρεδόθη εις'}
                           inputStyle={!everythingOk && formInputs.deliveredAt.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'collectedFrom')}
                           label={'Παραλαβή από'}
                           inputStyle={!everythingOk && formInputs.collectedFrom.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'charges')}
                           label={'Χρεώσεις €'}
                           inputStyle={!everythingOk && formInputs.charges.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'days')}
                           label={'Ημέρες'}
                           inputStyle={!everythingOk && formInputs.days.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'recommendedBy')}
                           label={'Recommended By'}
                           inputStyle={!everythingOk && formInputs.recommendedBy.trim() === '' ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'rateCode')}
                           label={'Rate Code'}
                           inputStyle={!everythingOk && formInputs.rateCode.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'subTotal')}
                           label={'Sub-Total'}
                           inputStyle={!everythingOk && formInputs.subTotal.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cdw')}
                           label={'C.M.D Μερική Απαλλαγή Ζημιών'}
                           inputStyle={!everythingOk && formInputs.cdw.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'total')}
                           label={'TOTAL - Σύνολο'}
                           inputStyle={!everythingOk && formInputs.total.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <RadioButtonCustom onPress={RadioPressHandler} label={"Αποδέχεσαι C.D.W."}/>
                </View>
                <Text style={styles.bolder}> COLLISION DAMAGE INSURANCE </Text>
                <View style={styles.inputRow}>
                    <Text>
                        Client shall be liable for the full value of damage to the Lessor Company vehicle, however, the
                        Client
                        by marking the suitable box can reduce the liability to €_________ with the obligation to pay an
                        amount
                        that mentioned in org price list with (Collision Damage Waiver), or by marking the suitable box
                        to pay
                        an additional amount that covers full value of damage Full Damage Waiver), any damage on tires,
                        windshield, windows, and underneath the car are not covered in both causes.
                    </Text>
                </View>
                <Text style={styles.bolder}> ΑΠΑΛΛΑΓΗ ΕΥΘΥΝΗΣ ΖΗΜΙΩΝ</Text>
                <View style={styles.inputRow}>
                    <Text>
                        Ο πελάτης - μισθωτής ευθύνεται για οποιαδήποτε ζημία κατά τη διάρκεια της μίσθωσης ανεξαρτήτου
                        υπαιτιότητας. Εάν όμως δεχτεί με σημείωση στο ανάλογο πεδίο να καταβάλει ημερησίως ποσό που
                        προβλέπει ο ισχύων τιμοκατάλογος η ευθύνη του περιορίζεται ανά ζημιά στο ανώτερο ποσό των
                        €_________ ή με σημείωση στο ανάλογο πεδίο να καταβάλει πρόσθετο ποσόν που καλύπτει πλήρη
                        απαλλαγή ζημιών.
                        Ζημιές σε ελαστικά, τζάμια και στο κάτω μέρος του αυτοκινήτου δεν καλύπτονται
                    </Text>
                </View>

                <View>
                    <SubmitButton style={styles.signatureButton} buttonText={' Υπογραφη'} onPress={() => {
                        setModalVisible(!modalVisible)
                    }}
                    />
                </View>

                <View style={styles.inputRow}>
                    <FormText
                        onChangeInputs={changeHandlerInputs}
                        FullName={formInputs.fullName}
                        After={formInputs.afterDateBank}
                        RegistrationNumber={formInputs.registrationNumber}
                    />

                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cardHolder')}
                           label={'Card Holder'}
                           inputStyle={!everythingOk && formInputs.cardHolder.trim() === '' ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cardExpDate')}
                           label={'EXP.'}
                           inputStyle={!everythingOk && formInputs.cardExpDate.trim() === '' ? styles.nullInput : ''}
                    />

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cvv')}
                           label={'CVV'}
                           inputStyle={!everythingOk && formInputs.cvv.trim() === '' ? styles.nullInput : ''}
                    />
                </View>

                <View>
                    <SubmitButton style={styles.signatureButton} buttonText={' Υπογραφη'} onPress={() => {
                        setModalVisible2(!modalVisible2)
                    }}

                    />

                </View>


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

            <View>
                <Text style={styles.titleText}>Υπογραφή Πελάτη</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'signClient')} onBack={() => setModalVisible(!modalVisible)} />

            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible2}
            onRequestClose={() => {
                setModalVisible2(!modalVisible2);
            }}>

            <View style={styles.generalContainer}>
                <Text style={styles.titleText}>Υπογραφή Για την Κάρτα</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'signCard')} onBack={() => setModalVisible2(!modalVisible2)}/>

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
    border: {
        borderColor: 'red',
        borderWidth: 5
    },
    nullInput: {
        backgroundColor: '#fdb4b4',
    },
    bolder: {
        fontWeight: "bold",
        fontSize: 15
    },
    signatureButton: {
        width: '35%',
        backgroundColor: '#ec6512',


    }


})
export default expenseForm
