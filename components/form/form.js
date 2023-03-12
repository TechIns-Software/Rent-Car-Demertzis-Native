import {
    Text,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    Button,
    Modal,
    Pressable,
    Platform
} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import React, {useContext, useEffect, useState} from "react";
import SignatureScreen from "react-native-signature-canvas";
import Sign from "./SignatureScreen";
import {FormsContext} from "../../store/form-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDatePicker from "./DatePicker";
import {AuthContext} from "../../store/auth-context";
import DatePicker2 from "./DatePicker2";

function expenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {

    const [formInputs, setFormInputs] = useState({
        driverFullName: "",
        driverDateOfBirth: "",
        driverPhone: "",
        driverRegistrationNumber: "",
        driverRegistrationCountry: "",
        driverRegistrationDateIssue: "",
        driverRegistrationExpirationDate: "",
        secondDriverFullName: "",
        secondDriverBirthDate: "",
        secondDriverRegistrationNumber: "",
        secondDriverRegistrationCountry: "",
        secondDriverRegistrationDateIssue: "",
        secondDriverRegistrationExpirationDate : "",
        email: "",
        registrationNumber: "",
        vehicleType: "",
        checkOutDate: "",
        checkOutTime: "",
        checkOutStation: "",
        checkInDate: "",
        checkInTime: "",
        checkInStation: "",
        charges: "",
        days: "",
        recommendedBy: "",
        rateCode: "",
        subTotal: "",
        cdw: "",
        liabilityAmount: "",
        total: "",
        cdwAgree: false,
        signClient:".",
        cardHolderName: "",
        cardExpirationDate: "",
        cvv: "",
        signCard: ".",
        damage1: ".",
        damage2: ".",
        damage3: "."
    })
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisibleDamage1, setModalVisibleDamage1] = useState(false);
    const [modalVisibleDamage2, setModalVisibleDamage2] = useState(false);
    const [modalVisibleDamage3, setModalVisibleDamage3] = useState(false);


    const RULES_INPUTS = {
        driverFullName: {
            mandatory: true,
            type: "text"
        },
        driverDateOfBirth: {
            mandatory: true,
            type: "date"
        },
        driverPhone: {
            mandatory: true,
            type: "text"
        },
        driverRegistrationNumber: {
            mandatory: true,
            type: "text"
        },
        driverRegistrationCountry: {
            mandatory: true,
            type: "text"
        },
        driverRegistrationDateIssue: {
            mandatory: true,
            type: "text"
        },
        driverRegistrationExpirationDate: {
            mandatory: true,
            type: "text"
        },
        secondDriverFullName: {
            mandatory: false,
            type: "text"
        },
        secondDriverBirthDate: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverRegistrationNumber: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverRegistrationCountry: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverRegistrationDateIssue: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverRegistrationExpirationDate : {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        email: {
            mandatory: true,
            type: "text"
        },
        registrationNumber: {
            mandatory: true,
            type: "text"
        },
        vehicleType: {
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

        charges: {
            mandatory: true,
            type: "number"
        },
        days: {
            mandatory: true,
            type: "number"
        },
        recommendedBy: {
            mandatory: true,
            type: "text"
        },
        rateCode: {
            mandatory: true,
            type: "text"
        },
        subTotal: {
            mandatory: false,
            type: "text",
        },
        total: {
            mandatory: false,
            type: "text"
        },
        cdw: {
            mandatory: true,
            type: "bool-influenced",
            radioToCheckOn: "cdwAgree"
        },
        liabilityAmount: {
            mandatory: true,
            type: "bool-influenced",
            radioToCheckOn: "cdwAgree"
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
        cardHolderName: {
            mandatory: true,
            type: "text"
        },
        cardExpirationDate : {
            mandatory: true,
            type: "text"
        },
        cvv: {
            mandatory: true,
            type: "text"
        }
    };
    const [everythingOk, setEveryThingOk] = useState({
        driverFullName: false,
        driverDateOfBirth: false,
        driverPhone: false,
        driverRegistrationNumber: false,
        driverRegistrationCountry:false,
        driverRegistrationDateIssue: false,
        driverRegistrationExpirationDate: false,
        secondDriverFullName: true,
        secondDriverBirthDate: true,
        secondDriverRegistrationNumber: true,
        secondDriverRegistrationCountry: true,
        secondDriverRegistrationDateIssue: true,
        secondDriverRegistrationExpirationDate : true,
        email: false,
        registrationNumber: false,
        vehicleType: false,
        checkOutDate: false,
        checkOutTime: false,
        checkOutStation: false,
        checkInDate: false,
        checkInTime: false,
        checkInStation: false,


        charges: false,
        days: false,
        recommendedBy: false,
        rateCode: false,
        subTotal: true,
        cdw: true,
        total: true,
        cdwAgree: true,
        liabilityAmount: true,
        signClient:false,
        cardHolderName: false,
        cardExpirationDate: false,
        cvv: false,
        signCard: false,
    });
    const formCtx = useContext(FormsContext) ;
    const authCtx = useContext(AuthContext);
    function changeHandlerInputs(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        });
        updateCalculatedDependentValuesAndChangeCriteria(inputName, inputValue);
    }
    function changeHandlerDatePicker(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        });
        updateCalculatedDependentValuesAndChangeCriteria(inputName, inputValue);
    }
    function updateCalculatedDependentValuesAndChangeCriteria(inputName, inputValue) {
        var _total = 0;
        var _subTotal = 0;
        if (inputName === 'days' || inputName === 'charges' || inputName === "cdw" || inputName === 'cdwAgree') {
            var _ = 0;
            if (formInputs['cdwAgree'] == '1') {
                _ = 1;
            }
            if (inputName === 'days') {
                _total = (inputValue * Number(formInputs['charges']) + _ * Number(formInputs['cdw'])).toString();
                _subTotal = (inputValue * Number(formInputs['charges'])).toString();
            } else if (inputName === 'charges') {
                _total = (formInputs['days'] * Number(inputValue) + _ * Number(formInputs['cdw'])).toString();
                _subTotal = (formInputs['days'] * Number(inputValue)).toString();
            } else if (inputName === "cdw") {
                _total = (formInputs['days'] * Number(formInputs['charges']) + _ * Number(inputValue)).toString();
                _subTotal = (formInputs['days'] * Number(formInputs['charges'])).toString();
            } else if (inputName === "cdwAgree") {
                _total = (formInputs['days'] * Number(formInputs['charges']) + inputValue * Number(formInputs['cdw'])).toString();
                _subTotal = (formInputs['days'] * Number(formInputs['charges'])).toString();
            }

            setFormInputs((prevValues) => {
                return {
                    ...prevValues,
                    ['total']: _total,
                    ['subTotal']: _subTotal
                }
            });
        }
        changeStateOfEverythingOk(inputName, inputValue);
    }

    function changeStateOfEverythingOk(inputName = null, inputValue = null) {
        setEveryThingOk((oldValues) => {
            const setTrueObj = {};
            for (const [key, value] of Object.entries(oldValues)) {
                setTrueObj[key] = true;
            }
            return {
                ...setTrueObj
            }
        });
        if (inputName) {
            formInputs[inputName] = inputValue;
        }
        let flag = true;
        for (const [key, value] of Object.entries(formInputs)) {
            if (RULES_INPUTS[key]) {
                //check types if we want
                if (RULES_INPUTS[key]['mandatory']) {
                    if (RULES_INPUTS[key]['type'] === 'bool-influenced') {
                        if (formInputs[RULES_INPUTS[key]['radioToCheckOn']]) {
                            setEveryThingOk((oldValues) => {
                                return {
                                    ...oldValues, [key]: value.length !== 0
                                }
                            });
                            if (value.length === 0) {
                                flag = false;
                            }
                        }

                        continue;
                    }
                    if (RULES_INPUTS[key]['type'] === 'bool') {
                        setEveryThingOk((oldValues) => {
                            return {
                                ...oldValues, [key]: value
                            }
                        });
                        continue;
                    }

                    if (value.length === 0) {
                        setEveryThingOk((oldValues) => {
                            return {
                                ...oldValues, [key]: false
                            }
                        });
                        flag = false;

                    }
                } else {
                    if (RULES_INPUTS[key]['underCondition']) { //υπο συνθηκη αναγκαστικα
                        if (value.length === 0) {
                            const fieldName = RULES_INPUTS[key]['fieldNameUnderCondition'];
                            if (formInputs[fieldName].length > 0) {
                                setEveryThingOk((oldValues) => {
                                    return {
                                        ...oldValues, [key]: false
                                    }
                                });
                                flag = false;
                            }
                        }
                    }
                }
            }
        }
        return flag;
    }

    async function checkInputs() {
        // console.log(formInputs);
        // console.log(everythingOk);
        let flag = changeStateOfEverythingOk();
        for (const [key, value] of Object.entries(everythingOk)) {
            if (!value) {
                console.log(everythingOk);
                console.log(formInputs);
                flag = false;
                break;
            }
        }
        //todo check signatures and car as well
        var flagDays = false;
        if (formInputs['checkInDate'] && formInputs['checkOutDate']) {
            var date1 = new Date(formInputs['checkInDate']);
            var date2 = new Date(formInputs['checkOutDate']);
            var daysDifference = new Date(date2.getTime() - date1.getTime()).getUTCDate() - 1;
            if (Platform.OS == "ios") {//todo check πρωτα αν εβαζα το τελος, ή την αρχη αντιστοιχα αν εφταιγε αυτο
                daysDifference += 1;
            }
            if (daysDifference != formInputs['days'] && (daysDifference + 1) != formInputs['days']) {
                flagDays = true;
                Alert.alert('Πρόβλημα με τις ημέρες που ορίσατε', 'Ο Υπολογισμός των ημερών φαίνεται λάθος με βάση τις ημερομηνίες που δόθηκαν')
            }
        }
        if (!flagDays) {
            if (!flag) {
                Alert.alert('Πρόβλημα με τα στοιχεία', 'Πρέπει να συμπληρώσετε ορισμένα πεδία')
            } else {
                console.log(authCtx);
                const answer = await formCtx.saveLocal(formInputs, authCtx);
                if (answer['uploadedOk']) {
                    if (answer['uploadedOk'] == '1') {
                        Alert.alert('Υποβολή Φόρμας', "Επιτυχής Υποβολή")
                    } else {
                        Alert.alert('Υποβολή Φόρμας', "Επιτυχής Υποβολή")
                    }
                } else {
                    Alert.alert('Υποβολή Φόρμας', "Δεν ήταν δυνατή η υποβολή στο ίντερνετ, αλλά αποθηκεύτηκε τοπικά")
                }
            }
        }



    }

    function RadioPressHandler(val) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                ['cdwAgree']: val
            }
        });
        updateCalculatedDependentValuesAndChangeCriteria('cdwAgree', val);
    }

    function  clearSignature(label,value){

        console.log(label)
        console.log(value)
    }

    function changeDates(label, selectedDate){
        console.log(label)
        console.log(selectedDate)
    }

    return <View style={styles.generalContainer}>

        <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
            <View style={[styles.clientBox, {overflow: 'hidden'}]}>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Ονοματεπώνυμο και Πατρώνυμο οδηγού'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverFullName')}
                           TextInputConfig={{}}
                           value={formInputs['driverFullName']}
                           inputStyle={!everythingOk.driverFullName? styles.nullInput : ''}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'driverDateOfBirth'}  customOnChange={changeHandlerDatePicker}  label={'Ημερ.Γεννήσεως'} type={'date'}/>

                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput} label={'Τηλ.'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPhone')}
                           TextInputConfig={{keyboardType: 'phone-pad', placeholder: '+30 6980999416'}}
                           value={formInputs['driverPhone']}
                           inputStyle={!everythingOk.driverPhone ? styles.nullInput : ''}

                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverRegistrationNumber')}
                           label={'Αρ.Αδείας Οδηγού'}
                           value={formInputs['driverRegistrationNumber']}
                           inputStyle={!everythingOk.driverRegistrationNumber ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>


                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverRegistrationCountry')}
                           label={'Χώρα'}
                           value={formInputs['driverRegistrationCountry']}
                           inputStyle={!everythingOk.driverRegistrationCountry ? styles.nullInput : ''}
                    />
                    <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationDateIssue'}  customOnChange={changeHandlerDatePicker}  label={'Ημερ Εκδοσης'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationExpirationDate'}  customOnChange={changeHandlerDatePicker}  label={'Λήξη'} type={'date'}/>
                </View>
            </View>

            {/*<View style={[styles.clientBox, {overflow: 'hidden'}]}>*/}
            {/*    */}

            {/*</View>*/}
            <View style={[styles.inputRow, {marginTop: 30}]}>
                <Input
                    style={styles.rowInput}
                    label={'Ονοματεπώνυμο Επιπλέον Οδηγού'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverFullName')}
                    value={formInputs['secondDriverFullName']}
                    inputStyle={!everythingOk.secondDriverFullName ? styles.nullInput : ''}
                />

                <DatePicker2 style={styles.rowInput} objectKey={'secondDriverBirthDate'}  customOnChange={changeHandlerDatePicker}  label={'Ημερ Γέννησης'} type={'date'}/>

            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput}
                       label={'Αρ.Αδείας Επιπλέον Οδηγού'}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverRegistrationNumber')}
                       TextInputConfig={{keyboardType: 'phone-pad',}}
                       inputStyle={!everythingOk.secondDriverRegistrationNumber ? styles.nullInput : ''}
                       value={formInputs['secondDriverRegistrationNumber']}
                />
                <Input
                    style={styles.rowInput}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverRegistrationCountry')}
                    label={'Χώρα'}
                    value={formInputs['secondDriverRegistrationCountry']}
                    inputStyle={!everythingOk.secondDriverRegistrationCountry ? styles.nullInput : ''}
                />

                <DatePicker2 style={styles.rowInput} objectKey={'secondDriverRegistrationDateIssue'}  customOnChange={changeHandlerDatePicker}  label={'Ημερ Έκδοσης'} type={'date'}/>
                <DatePicker2 style={styles.rowInput} objectKey={'secondDriverRegistrationExpirationDate'}  customOnChange={changeHandlerDatePicker}  label={'Λήξη'} type={'date'}/>

            </View>
            <Input label={'Email'}
                   onChangeText={changeHandlerInputs.bind(this, 'email')}
                   inputStyle={!everythingOk.email ? styles.nullInput : ''}
                   value={formInputs['email']}
            />
            <View style={styles.containerBorder}>
                <Text style={styles.titleText}>Επιπλέον Πληροφορίες</Text>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Αρ. Κυκλοφορίας'}
                           value={formInputs['registrationNumber']}
                           onChangeText={changeHandlerInputs.bind(this, 'registrationNumber')}
                           inputStyle={!everythingOk.registrationNumber ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'vehicleType')}
                           value={formInputs['vehicleType']}
                           label={'Τύπος'}
                           inputStyle={!everythingOk.vehicleType ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>

                    <DatePicker2 style={styles.rowInput} objectKey={'checkInDate'}  customOnChange={changeHandlerDatePicker}  label={'Hμ Παράδοσης'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'checkInTime'}  customOnChange={changeHandlerDatePicker}  label={'Ωρα Παράδοσης'} type={'time'}/>


                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                           label={'Station'}
                           value={formInputs['checkInStation']}
                           inputStyle={!everythingOk.checkInStation ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>

                    <DatePicker2 style={styles.rowInput} objectKey={'checkOutDate'}  customOnChange={changeHandlerDatePicker}  label={'Hμ Επιστροφής'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'checkOutTime'}  customOnChange={changeHandlerDatePicker}  label={'Ωρα Επιστροφής'} type={'time'}/>

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutStation')}
                           label={'Station'}
                           value={formInputs['checkOutStation']}
                           inputStyle={!everythingOk.checkOutStation ? styles.nullInput : ''}
                    />
                </View>

                <View style={[styles.inputRow, {marginTop: 40}]}>


                </View>

                <View style={[styles.inputRow, {marginBottom: 60}]}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'recommendedBy')}
                           label={'Recommended By'}
                           value={formInputs['recommendedBy']}
                           inputStyle={!everythingOk.recommendedBy ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'rateCode')}
                           label={'Rate Code'}
                           value={formInputs['rateCode']}
                           inputStyle={!everythingOk.rateCode ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <View style={{minWidth: '50%'}}></View>
                    <View style={styles.rowInput}>
                        <RadioButtonCustom value={formInputs['cdwAgree']} onPress={RadioPressHandler} label={"Αποδέχεσαι C.D.W."}/>
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'charges')}
                           label={'Χρεώσεις €'}
                           value={formInputs['charges']}
                           inputStyle={!everythingOk.charges ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'subTotal')}
                           label={'Sub-Total'}
                           value={formInputs['subTotal']}
                           editable = {false}
                           inputStyle={!everythingOk.subTotal ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'days')}
                           label={'Ημέρες'}
                           value={formInputs.days.toString()}
                           inputStyle={!everythingOk.days ? styles.nullInput : ''}
                    />

                    <View style={styles.rowInput}>
                        <Input style={styles.rowInput}
                               value={formInputs['cdw']}
                               onChangeText={changeHandlerInputs.bind(this, 'cdw')}
                               label={'C.M.D Μερική Απαλλαγή Ζημιών'}
                               inputStyle={!everythingOk.cdw ? styles.nullInput : ''}
                        />
                    </View>

                </View>
                <View style={[styles.inputRow, {width: '50%'}]}>
                    <Input style={styles.rowInput}
                           value={formInputs['liabilityAmount']}
                           onChangeText={changeHandlerInputs.bind(this, 'liabilityAmount')}
                           label={'Απαλλαγή'}
                           inputStyle={!everythingOk.liabilityAmount ? styles.nullInput : ''}
                    />

                </View>
                <View style={styles.inputRow}>
                    <View style={{minWidth: '50%'}}></View>
                    <Input style={[styles.rowInput, {}]}
                           value={formInputs.total}
                           onChangeText={changeHandlerInputs.bind(this, 'total')}
                           label={'TOTAL - Σύνολο'}
                           editable = {false}
                           inputStyle={!everythingOk.total ? styles.nullInput : ''}
                    />
                </View>
                <Text style={styles.bolder}> COLLISION DAMAGE INSURANCE </Text>
                <View style={styles.inputRow}>
                    <Text>
                        Client shall be liable for the full value of damage to the Lessor Company vehicle, however, the
                        Client
                        by marking the suitable box can reduce the liability to €{formInputs.liabilityAmount} with the obligation to pay an
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
                        €{formInputs.liabilityAmount} ή με σημείωση στο ανάλογο πεδίο να καταβάλει πρόσθετο ποσόν που καλύπτει πλήρη
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

                <View>
                    <Text style={styles.titleText}>
                        Ζημίες Αυτοκινήτου
                    </Text>

                    <SubmitButton style={styles.damagesButton} buttonText={'Μπροστά και πλευρά οδηγού'} onPress={() => {
                        setModalVisibleDamage1(!modalVisibleDamage1)
                    }}/>

                    <SubmitButton style={styles.damagesButton} buttonText={' Πίσω και πλευρά συνοδηγού'} onPress={() => {
                        setModalVisibleDamage2(!modalVisibleDamage2)
                    }}/>

                    <SubmitButton style={styles.damagesButton} buttonText={' Οροφή Αυτοκινήτου'} onPress={() => {
                        setModalVisibleDamage3(!modalVisibleDamage3)
                    }}/>




                </View>

                <View style={styles.inputRow}>
                    <FormText
                        onChangeInputs={changeHandlerInputs}
                        driverFullName={formInputs.driverFullName}
                        After={formInputs.afterDateBank}
                        RegistrationNumber={formInputs.registrationNumber}
                    />

                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cardHolderName')}
                           label={'Card Holder'}
                           value={formInputs['cardHolderName']}
                           inputStyle={!everythingOk.cardHolderName ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cardExpirationDate')}
                           label={'EXP.'}
                           value={formInputs['cardExpirationDate']}
                           inputStyle={!everythingOk.cardExpirationDate  ? styles.nullInput : ''}
                    />

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cvv')}
                           label={'CVV'}
                           value={formInputs['cvv']}
                           inputStyle={!everythingOk.cvv ? styles.nullInput : ''}
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
                <Sign onOK={changeHandlerInputs.bind(this,'signClient')} value={formInputs.signClient} onBack={() => setModalVisible(!modalVisible)} />

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
                <Sign onOK={changeHandlerInputs.bind(this,'signCard')} value={formInputs.signCard} onBack={() => setModalVisible2(!modalVisible2)}/>

            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibleDamage1}
            onRequestClose={() => {
                setModalVisibleDamage1(!modalVisibleDamage1);
            }}>

            <View style={styles.generalContainer}>
                <Text style={styles.titleText}>Καταγραφή ζημιών 1</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage1')} bgImage={'https://viajerodecorazon.com/assets/react/front-left1.png'} value={formInputs.damage1} onBack={() => setModalVisibleDamage1(!modalVisibleDamage1)}/>

            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibleDamage2}
            onRequestClose={() => {
                setModalVisibleDamage2(!modalVisibleDamage2);
            }}>

            <View style={styles.generalContainer}>
                <Text style={styles.titleText}>Καταγραφή ζημιών 2</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage2')} bgImage={'https://viajerodecorazon.com/assets/react/rear-right1.png'} value={formInputs.damage2} onBack={() => setModalVisibleDamage2(!modalVisibleDamage2)}/>

            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibleDamage3}
            onRequestClose={() => {
                setModalVisibleDamage3(!modalVisibleDamage3);
            }}>
            <View style={styles.generalContainer}>
                <Text style={styles.titleText}>Καταγραφή ζημιών 3</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage3')} bgImage={'https://viajerodecorazon.com/assets/react/top1.png'} value={formInputs.damage3} onBack={() => setModalVisibleDamage3(!modalVisibleDamage3)}/>

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
        justifyContent: 'space-between',
        alignItems:'center'
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
    },
    damagesButton :{
        width: '100%',
        backgroundColor: '#12015d',
        color:'white',
        marginVertical:5
    }


})
export default expenseForm
