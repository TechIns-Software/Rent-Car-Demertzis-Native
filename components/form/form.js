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
        liabilityAmount: "",
        total: "",
        cdwAgree: false,
        signClient:".",
        cardHolder: "",
        cardExpDate: "",
        cvv: "",
        signCard: ".",
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
            mandatory: false,
            type: "text"
        },
        secondDriverBirthDate: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverLicenceNumber: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverLicenceCountry: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverLicenceDateIssue: {
            mandatory: false,
            type: "text",
            underCondition: true,
            fieldNameUnderCondition: "secondDriverFullName"
        },
        secondDriverLicenceDateExp: {
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
        cdw: {
            mandatory: true,
            type: "bool",
            radioToCheckOn: "cdwAgree"
        },
        liabilityAmount: {
            mandatory: true,
            type: "bool",
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
    const [everythingOk, setEveryThingOk] = useState({
        fullName: false,
        birthDate: false,
        driverAddress: false,
        driverCountry: false,
        driverPhone: false,
        driverPassport: false,
        driverPassportDateIssue: false,
        driverPassportDateExp: false,
        driverLicenceNumber: false,
        driverLicenceDateIssue: false,
        driverLicenceDateExp: false,
        renter: false,
        afm: false,
        doy: false,
        renterAddress: false,
        renterCity: false,
        renterPhone: false,
        secondDriverFullName: true,
        secondDriverBirthDate: true,
        secondDriverLicenceNumber: true,
        secondDriverLicenceCountry: true,
        secondDriverLicenceDateIssue: true,
        secondDriverLicenceDateExp: true,
        email: false,
        registrationNumber: false,
        typeofCar: false,
        checkOutDate: false,
        checkOutTime: false,
        checkOutStation: false,
        checkInDate: false,
        checkInTime: false,
        checkInStation: false,
        extensionTo: true,
        deliveredAt: false,
        collectedFrom: false,
        charges: false,
        days: false,
        recommendedBy: true,
        rateCode: true,
        subTotal: false,
        cdw: true,
        total: false,
        cdwAgree: true,
        liabilityAmount: true,
        signClient:false,
        cardHolder: false,
        cardExpDate: false,
        cvv: false,
        signCard: false,
    });
    const formCtx = useContext(FormsContext) ;

    function changeHandlerInputs(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        });
        updateCalculatedDependentValues(inputName, inputValue);
        console.log(formInputs);
    }
    function changeHandlerDatePicher(inputName, inputValue) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                [inputName]: inputValue
            }
        });
        updateCalculatedDependentValues(inputName, inputValue);
    }
    function updateCalculatedDependentValues(inputName, inputValue) {
        var tempChange = 0;
        if (inputName === 'days' || inputName == 'charges') {
            if (inputName === 'days') {

                tempChange = (inputValue * Number(formInputs['charges'])).toString();
            } else {
                tempChange = (formInputs['days'] * Number(inputValue)).toString();
            }

            setFormInputs((prevValues) => {
                return {
                    ...prevValues,
                    ['total']: tempChange
                }
            });
        }

    }

    function checkInputs() {


        /////////////////
        setEveryThingOk((oldValues) => {
            const setTrueObj = {};
            for (const [key, value] of Object.entries(oldValues)) {
                setTrueObj[key] = true;
            }
            return {
                ...setTrueObj
            }
        });
        for (const [key, value] of Object.entries(formInputs)) {
            if (RULES_INPUTS[key]) {
                //check types if we want
                if (RULES_INPUTS[key]['mandatory']) {
                    if (RULES_INPUTS[key]['type'] === 'bool') {

                        setEveryThingOk((oldValues) => {
                            return {
                                ...oldValues, [key]: !formInputs[RULES_INPUTS[key]['radioToCheckOn']]
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
                            }
                        }
                    }
                }
            }

        }
        console.log(formInputs);
        // console.log(everythingOk);
        let flag = true;
        for (const [key, value] of Object.entries(everythingOk)) {
            if (!value) {
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
            if (Platform.OS == "ios") {
                daysDifference += 1;
            }
            if (daysDifference != formInputs['days'] && (daysDifference + 1) != formInputs['days']) {
                flagDays = true;
                Alert.alert('Πρόβλημα με την ημερομηνία', 'Ο Υπολογισμός των ημερών φαίνεται λάθος με βάση τις ημερομηνίες που δόθηκαν')
            }
        }
        if (!flagDays) {
            if (!flag) {
                Alert.alert('Πρόβλημα με τα στοιχεία', 'Πρέπει να συμπληρώσετε ορισμένα πεδία')
            } else {
                formCtx.saveLocal(0,formInputs);
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
        updateCalculatedDependentValues(inputName, inputValue);
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
                           onChangeText={changeHandlerInputs.bind(this, 'fullName')}
                           TextInputConfig={{}}
                           value={formInputs['fullName']}
                           inputStyle={!everythingOk.fullName ? styles.nullInput : ''}/>
                    {/*<Input style={styles.rowInput}*/}
                    {/*       label={'Ημερ.Γεννήσεως'}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'birthDate')}*/}
                    {/*       TextInputConfig={{placeholder: 'YYY-MM-DD', maxLength: 10,}}*/}
                    {/*       inputStyle={!everythingOk.birthDate ? styles.nullInput : ''}*/}
                    {/*/>*/}
                   <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerDatePicher} objectKey={'birthDate'} label={'Ημερ.Γεννήσεως'} />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διεύθυνση Κατοικίας'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverAddress')}
                           TextInputConfig={{keyboardType: 'decimal-pad'}}
                           value={formInputs['driverAddress']}
                           inputStyle={!everythingOk.driverAddress ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverCountry')}
                           label={'Χώρα'}
                           value={formInputs['driverCountry']}
                           inputStyle={!everythingOk.driverCountry ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput} label={'Τηλ.'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPhone')}
                           TextInputConfig={{keyboardType: 'number-pad', placeholder: '+30 6980999416'}}
                           value={formInputs['driverPhone']}
                           inputStyle={!everythingOk.driverPhone ? styles.nullInput : ''}

                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Διαβ.No'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassport')}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           value={formInputs['driverPassport']}
                           inputStyle={!everythingOk.driverPassport ? styles.nullInput : ''}
                    />
                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateIssue')}*/}
                    {/*       label={'Ημερ Εκδοσης'}*/}
                    {/*       inputStyle={!everythingOk.driverPassportDateIssue ? styles.nullInput : ''}*/}
                    {/*/>*/}
                    <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerDatePicher} objectKey={'driverPassportDateIssue'} label={'Ημερ Εκδοσης'} />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverPassportDateExp')}
                           label={'Λήξη'}
                           value={formInputs['driverPassportDateExp']}
                           inputStyle={!everythingOk.driverPassportDateExp ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceNumber')}
                           label={'Αρ.Αδείας Οδηγού'}
                           value={formInputs['driverLicenceNumber']}
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk.driverLicenceNumber ? styles.nullInput : ''}
                    />
                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateIssue')}*/}
                    {/*       label={'Ημερ Εκδοσης'}*/}
                    {/*       inputStyle={!everythingOk.driverLicenceDateIssue ? styles.nullInput : ''}*/}
                    {/*/>*/}
                    <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerDatePicher} objectKey={'driverLicenceDateIssue'} label={'Ημερ Εκδοσης'} />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'driverLicenceDateExp')}
                           label={'Λήξη'}
                           value={formInputs['driverLicenceDateExp']}
                           inputStyle={!everythingOk.driverLicenceDateExp ? styles.nullInput : ''}
                    />
                </View>
            </View>

            <View style={[styles.clientBox, {overflow: 'hidden'}]}>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renter')}
                           label={'Μισθωτής'}
                           value={formInputs['renter']}
                           inputStyle={!everythingOk.renter ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'afm')}
                           label={'ΑΦΜ'}
                           value={formInputs['afm']}
                           inputStyle={!everythingOk.afm ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'doy')}
                           label={'Δ.Ο.Υ'}
                           value={formInputs['doy']}
                           inputStyle={!everythingOk.doy ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterAddress')}
                           label={'Διεύθυνση Κατοικίας'}
                           value={formInputs['renterAddress']}
                           inputStyle={!everythingOk.renterAddress ? styles.nullInput : ''}
                    />

                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterCity')}
                           label={'Πόλη'}
                           value={formInputs['renterCity']}
                           inputStyle={!everythingOk.renterCity ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'renterPhone')}
                           label={'Τηλ'}
                           value={formInputs['renterPhone']}
                           TextInputConfig={{keyboardType: 'number-pad', placeholder: '+30 6980999416'}}
                           inputStyle={!everythingOk.renterPhone ? styles.nullInput : ''}
                    />
                </View>

            </View>
            <View style={[styles.inputRow, {marginTop: 30}]}>
                <Input
                    style={styles.rowInput}
                    label={'Ονοματεπώνυμο Επιπλέον Οδηγού'}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverFullName')}
                    value={formInputs['secondDriverFullName']}
                    inputStyle={!everythingOk.secondDriverFullName ? styles.nullInput : ''}
                />
                {/*<Input*/}
                {/*    style={styles.rowInput}*/}
                {/*    label={'Ημερ Γέννησης'}*/}
                {/*    onChangeText={changeHandlerInputs.bind(this, 'secondDriverBirthDate')}*/}
                {/*    inputStyle={!everythingOk.secondDriverBirthDate ? styles.nullInput : ''}*/}
                {/*/>*/}
                <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerDatePicher} objectKey={'secondDriverBirthDate'} label={'Ημερ Εκδοσης'} />
            </View>
            <View style={styles.inputRow}>
                <Input style={styles.rowInput}
                       label={'Αρ.Αδείας Επιπλέον Οδηγού'}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceNumber')}
                       TextInputConfig={{keyboardType: 'decimal-pad',}}
                       inputStyle={!everythingOk.secondDriverLicenceNumber ? styles.nullInput : ''}
                       value={formInputs['secondDriverLicenceNumber']}
                />
                <Input
                    style={styles.rowInput}
                    onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceCountry')}
                    label={'Χώρα'}
                    value={formInputs['secondDriverLicenceCountry']}
                    inputStyle={!everythingOk.secondDriverLicenceCountry ? styles.nullInput : ''}
                />
                {/*<Input style={styles.rowInput}*/}
                {/*       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateIssue')}*/}
                {/*       label={'Ημερ Έκδοσης'}*/}
                {/*       inputStyle={!everythingOk.secondDriverLicenceDateIssue ? styles.nullInput : ''}*/}
                {/*/>*/}
                <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerDatePicher} objectKey={'secondDriverLicenceDateIssue'} label={'Ημερ Εκδοσης'} />
                <Input style={styles.rowInput}
                       onChangeText={changeHandlerInputs.bind(this, 'secondDriverLicenceDateExp')}
                       label={'Λήξη'}
                       value={formInputs['secondDriverLicenceDateExp']}
                       inputStyle={!everythingOk.secondDriverLicenceDateExp ? styles.nullInput : ''}
                />
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
                           TextInputConfig={{keyboardType: 'decimal-pad',}}
                           inputStyle={!everythingOk.registrationNumber ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'typeofCar')}
                           value={formInputs['typeofCar']}
                           label={'Τύπος'}
                           inputStyle={!everythingOk.typeofCar ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>
                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'checkOutDate')}*/}
                    {/*       label={'Hμ Παράδοσης'}*/}
                    {/*       TextInputConfig={{keyboardType: 'decimal-pad',}}*/}
                    {/*       inputStyle={!everythingOk.checkOutDate ? styles.nullInput : ''}*/}
                    {/*/>*/}
                    <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerInputs} objectKey={'checkInDate'} label={'Hμ Παράδοσης'} />

                    <CustomDatePicker style={[styles.rowInput]} type={'time'} customOnChange={changeHandlerInputs} objectKey={'checkInTime'} label={'Ωρα Παράδοσης'} />

                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'checkOutTime')}*/}
                    {/*       label={'Ωρα'}*/}
                    {/*       inputStyle={!everythingOk.checkOutTime ? styles.nullInput : ''}*/}
                    {/*/>*/}
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                           label={'Station'}
                           value={formInputs['checkInStation']}
                           inputStyle={!everythingOk.checkOutStation ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'checkInDate')}*/}
                    {/*       label={'Επιστροφή'}*/}
                    {/*       inputStyle={!everythingOk.checkInDate ? styles.nullInput : ''}*/}
                    {/*/>*/}
                    {/*<Input style={styles.rowInput}*/}
                    {/*       onChangeText={changeHandlerInputs.bind(this, 'checkInTime')}*/}
                    {/*       label={'Ωρα'}*/}
                    {/*       inputStyle={!everythingOk.checkInTime ? styles.nullInput : ''}*/}
                    {/*/>*/}

                    <CustomDatePicker style={[styles.rowInput]} customOnChange={changeHandlerInputs} objectKey={'checkOutDate'} label={'Hμ Επιστροφής'} />
                    <CustomDatePicker style={[styles.rowInput]} type={'time'} customOnChange={changeHandlerInputs} objectKey={'checkOutDate'} label={'Ωρα Επιστροφής'} />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkOutStation')}
                           label={'Station'}
                           value={formInputs['checkOutStation']}
                           inputStyle={!everythingOk.checkInStation ? styles.nullInput : ''}
                    />
                </View>

                <View style={[styles.inputRow, {marginTop: 40}]}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'collectedFrom')}
                           label={'Παρεδόθη εις'}
                           value={formInputs['collectedFrom']}
                           inputStyle={!everythingOk.deliveredAt ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'deliveredAt')}
                           value={formInputs['deliveredAt']}
                           label={'Παραλαβή από'}
                           inputStyle={!everythingOk.collectedFrom ? styles.nullInput : ''}
                    />
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
                        <RadioButtonCustom onPress={RadioPressHandler} label={"Αποδέχεσαι C.D.W."}/>
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
                           editable = {false}
                           label={'Απαλαγή'}
                           inputStyle={!everythingOk.liabilityAmount ? styles.nullInput : ''}
                    />

                </View>
                <View style={styles.inputRow}>
                    <View style={{minWidth: '50%'}}></View>
                    <Input style={[styles.rowInput, {}]}
                           value={formInputs.total}
                           onChangeText={changeHandlerInputs.bind(this, 'total')}
                           label={'TOTAL - Σύνολο'}
                           // editable = {false}
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
                        €{formInputs.liabilityAmount}ή με σημείωση στο ανάλογο πεδίο να καταβάλει πρόσθετο ποσόν που καλύπτει πλήρη
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
                           value={formInputs['cardHolder']}
                           inputStyle={!everythingOk.cardHolder ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'cardExpDate')}
                           label={'EXP.'}
                           value={formInputs['cardExpDate']}
                           inputStyle={!everythingOk.cardExpDate ? styles.nullInput : ''}
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
