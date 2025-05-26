import {
    Text,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    Modal,
    Pressable,
    LogBox, SafeAreaView, useColorScheme, KeyboardAvoidingView, Platform
} from "react-native";
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import React, {useContext, useEffect, useState} from "react";
import Sign from "./SignatureScreen";
import {FormsContext} from "../../store/form-context";
import DatePicker2 from "./DatePicker2";
import { AutoComplete } from 'react-native-element-textinput';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import {LocalDataSetExample} from "./LocalDataSetExample";
import {StatusBar} from "expo-status-bar";
import {cars, bike1, front_left1, rear_right1, top1,atv} from "./data";
import SignatureModal from "./SignatureModal";
import DamageModal from "./DamageModal";
import LoadingSpinner from "../LoadingSpinner";
import SelectDropdown from 'react-native-select-dropdown'
import {Icon} from "react-native-paper";

export  default function ExpenseForm({navigation,idForm}) {
    const initialState = {
        isReady: false,
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
        realRecommendedBy: "",
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
        notes :"",
        damage1: ".",
        damage2: ".",
        damage3: ".",
        damage4: ".",
        damage5: ".",
        damageIsOkBtn1: true,
        damageIsOkBtn2: true,
        damageIsOkBtn3: true,
        damageIsOkBtn4: true,
        damageIsOkBtn5: true,
        fuel:""
    };
    const initialState2 = {
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
        realRecommendedBy:false,
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
        damage1: false,
        damage2: false,
        damage3: false,
        damage4: false,
        damage5: false,
        fuel: false,
        notes:false
    }
    const [formInputs, setFormInputs] = useState(initialState)
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [modalVisibleSecondDriver, setmodalVisibleSecondDriver] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisibleDamage1, setModalVisibleDamage1] = useState(false);
    const [modalVisibleDamage2, setModalVisibleDamage2] = useState(false);
    const [modalVisibleDamage3, setModalVisibleDamage3] = useState(false);
    const [modalVisibleDamage4, setModalVisibleDamage4] = useState(false);
    const [modalVisibleDamage5, setModalVisibleDamage5] = useState(false);
    const [stateOfButton,setStateOfButton] = useState(false);

    const [hasLoadedForm, setHasLoadedForm] = useState(false);
    const [creationDate, setCreationDate] = useState('');
    const [editedFormId, setEditedFormId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [synergates, setSynergates] = useState([
        {title:'DIRECT'},
        {title:'WEBSITE'},
        {title:'A MYTH HOTEL'},
        {title:'ADORNO'},
        {title:'AEGON'},
        {title:'AKKADIAN'},
        {title:'ALISSACHNI'},
        {title:'ALKISTIS HOTEL'},
        {title:'AMAZON'},
        {title:'ANDRONIKOS'},
        {title:'ARA'},
        {title:'AST TOURISM'},
        {title:'BEST ANGOLA'},
        {title:'BILL & COO'},
        {title:'BILL & COO COAST'},
        {title:'BLUE VILLAS'},
        {title:'BOHEME'},
        {title:'BRANCO'},
        {title:'CACTUS'},
        {title:'CASA DEL MAR'},
        {title:'COVA'},
        {title:'CROCO'},
        {title:'DANIELLE GIOVANNI'},
        {title:'DIVINE'},
        {title:'DONJON'},
        {title:'DONTAS'},
        {title:'DORION'},
        {title:'DREAM BOX'},
        {title:'DUE MARI'},
        {title:'EREZ'},
        {title:'EUGENE'},
        {title:'EVITA'},
        {title:'EZIO BO'},
        {title:'FANTASIA VILLAS'},
        {title:'FELIX'},
        {title:'GEORGAKLIS'},
        {title:'GIOVANNI ILLARIA'},
        {title:'GOLDEN HOME'},
        {title:'GRACE'},
        {title:'HERMES TOURISM'},
        {title:'HIPPIE CHIC'},
        {title:'I MOVE '},
        {title:'I TRAVEL HOME'},
        {title:'IKIES'},
        {title:'ISLE BLUE'},
        {title:'JENNY'},
        {title:'KALESMA'},
        {title:'KATOIKIES'},
        {title:'KEVIN ROCKS'},
        {title:'KINGLIKE'},
        {title:'KORALI'},
        {title:'KOUROS'},
        {title:'KYMA'},
        {title:'LUXURY KEY'},
        {title:'MAERA VILLAS'},
        {title:'MATHA'},
        {title:'MAZI TRAVEL'},
        {title:'MERHIA BAY'},
        {title:'MILEO '},
        {title:'MINA\'s STUDIO'},
        {title:'MLV'},
        {title:'MY MYKONOS'},
        {title:'MYKONAKI HOTEL'},
        {title:'MYKONOS 4 ISLAND'},
        {title:'MYKONOS AGENDA'},
        {title:'MYKONOS BEST'},
        {title:'MYKONOS EARTTH'},
        {title:'MYKONOS RIVIERA'},
        {title:'N HOTEL'},
        {title:'NAIA'},
        {title:'NASTAYA'},
        {title:'NEREUS'},
        {title:'NIKOS ROOMS'},
        {title:'NOIMA LUXURY SUITES'},
        {title:'NOMIA ΑΓ.ΣΟΦΙΑ'},
        {title:'NUR'},
        {title:'ONCE IN MYKONOS'},
        {title:'PANORMOS BAY'},
        {title:'PANORMOS VILLAGE'},
        {title:'PANORMOS VILLAS'},
        {title:'PAOLAS TOWN'},
        {title:'PETINOS'},
        {title:'PETINOS BEACH'},
        {title:'PRINCESS'},
        {title:'RICCARDO LUXURY'},
        {title:'ROCABELLA'},
        {title:'ROCHARI'},
        {title:'SAN MARCO'},
        {title:'SARAH'},
        {title:'SOHO'},
        {title:'STELIOS JO'},
        {title:'SUMMIT'},
        {title:'SUPER PARADISE SUITES'},
        {title:'SUPERIOR AIR'},
        {title:'TAGOO BLACK'},
        {title:'THALIA MYKONOS'},
        {title:'THARROE'},
        {title:'THEO PANORMOS'},
        {title:'YI'},
        {title:'ΑΙΒΑΖΙΔΗΣ'},
        {title:'ΑΙΒΑΛΙΩΤΗΣ'},
        {title:'Α-Ω'},
        {title:'ΒΑΓΓΕΛΗΣ'},
        {title:'ΒΑΣΙΛΗΣ ΚΙΝΟΣ'},
        {title:'ΒΑΤΣΗΣ BEACHFRONT'},
        {title:'ΗΡΩ ΡΑΛΛΗ'},
        {title:'ΘΑΝΟΣ ΜΟΤΟSPEED'},
        {title:'ΚΩΣΤΑΣ ΧΡΥΣΑΦΗΣ'},
        {title:'ΛΑΙΣ'},
        {title:'ΜΑΝΟΣ ΡΑΛΛΗΣ'},
        {title:'ΜΑΡΓΑΡΙΤΑ'},
        {title:'ΜΕΝΤΗΣ'},
        {title:'ΜΥΤΑΚΙΔΗ'},
        {title:'ΝΤΟΥΣΚΑΣ'},
        {title:'ΠΕΤΡΟΣ ΑΘΗΝΑΙΟΣ'},
        {title:'ΣΤΑΥΡΟΥΛΑ ΠΕΙΡΑΙΩΣ'},
        {title:'ΤΑΣΟΣ ΑΘΗΝΑ'},
        {title:'ΤΑΣΟΣ ΚΩΣΤΟΠΟΥΛΟΣ'},
        {title:'ΤΙΝΑ ΛΕΟΝΤΙΟΥ'},
        {title:'ΦΑΝΙΑ'},
        {title:'ΧΡΗΣΤΟΣ ΜΑΝΟΣ'},
        {title:'ΧΡΥΣΟΥΛΑ PAOLA\'S'},
        {title:'ΑΛΛΟ'},
    ]);
    const [tempSynergaths, setTempSynergaths] = useState();

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
        realRecommendedBy :{
            mandatory: true,
            type: "text"
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
        },
        fuel: {
            mandatory: true,
            type: "text"
        },
        notes: {
            mandatory: true,
            type: "text"
        }
    };
    const [everythingOk, setEveryThingOk] = useState(initialState2)
    const labels = {
        driverFullName: "Driver Full Name",
        driverDateOfBirth: "Driver Date Of Birth",
        driverPhone: "Driver Phone Number",
        driverRegistrationNumber: "Driver Registration Number",
        driverRegistrationCountry:"Driver Registration Country",
        driverRegistrationDateIssue: "Driver Registration Date Of Issue",
        driverRegistrationExpirationDate: "Driver Registration Expiration Date",
        secondDriverFullName: "Second Driver Full Name",
        secondDriverBirthDate: "Second Driver Date Of Birth",
        secondDriverRegistrationNumber: "Second Driver Registration Number",
        secondDriverRegistrationCountry: "Second Driver Registration Country",
        secondDriverRegistrationDateIssue: "Second Driver Registration Date Of Issue",
        secondDriverRegistrationExpirationDate : "Second Driver Registration Expiration Date",
        email: "Email",
        registrationNumber: " Registration Number Of Vehicle",
        vehicleType: "Vehicle Type",
        checkOutDate: "CheckOut Date",
        checkOutTime: "CheckOut Time",
        checkOutStation: "CheckOut Station",
        checkInDate: "CheckIn Date",
        checkInTime: "CheckIn Time",
        checkInStation: "CheckIn Station",

        charges: "Charges",
        days: "Days",
        realRecommendedBy: "Recommended By",
        recommendedBy: "Hotel / Villa",
        rateCode: "RateCode",
        subTotal: "Sub-Total",
        cdw: "Cdw",
        total: "Total",
        cdwAgree: "Cdw Agree",
        liabilityAmount: "Liability",
        signClient: "Sign Client",
        cardHolderName: "Card Holder Name",
        cardExpirationDate: "Card Expiration Date",
        cvv: "CVV",
        signCard: "Sign Card",
        damage1: "Damage Front & Driver-side",
        damage2: "Damage Rear & Passenger-side",
        damage3: "Damage Car Roof",
        damage4: "Damage Motto",
        damage5: "Damage Atv",
        fuel: "Fuel",
        notes :"Notes"
    }
    const formCtx = useContext(FormsContext) ;
    function changeHandlerInputs(inputName, inputValue) {
        if (inputName === 'registrationNumber') {
            var stringAssign = '';
            var availableValues = cars.filter(obj => {

                if (obj.hasOwnProperty('registrationNumber')) {

                    if (obj['registrationNumber'].trim() == inputValue) {
                        return true;
                    }

                }
                return false;
            });

            if (availableValues.length > 0) {
                stringAssign = availableValues[0]['brand'] + ' ' + availableValues[0]['model'];
            }

            setFormInputs((prevValues) => {
                return {
                    ...prevValues,
                    ['vehicleType']: stringAssign,
                    [inputName]: inputValue
                }
            });

        } else {
            setFormInputs((prevValues) => {
                return {
                    ...prevValues,
                    [inputName]: inputValue
                }
            });
        }
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
        let flagDaysChangedByDates = false;
        if (inputName === 'checkInDate' || inputName === 'checkOutDate') {

            let checkInDateTemp;
            let checkOutDateTemp;
            if (inputName === 'checkInDate') {
                checkInDateTemp = inputValue;
                checkOutDateTemp = formInputs['checkOutDate'];
            } else {
                checkInDateTemp = formInputs['checkInDate']
                checkOutDateTemp = inputValue;
            }

            let splitCheckInDate = checkInDateTemp.split('-');
            let splitCheckOutDate = checkOutDateTemp.split('-');
            if (splitCheckInDate.length >= 3 && splitCheckOutDate.length >= 3) {
                let dateCheckIn = new Date(splitCheckInDate[2],splitCheckInDate[1],splitCheckInDate[0]);
                let dateCheckOut = new Date(splitCheckOutDate[2],splitCheckOutDate[1],splitCheckOutDate[0]);
                const diffInMs   = dateCheckOut - dateCheckIn;
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                if (diffInDays > 0){
                    flagDaysChangedByDates = diffInDays;
                    setFormInputs((prevValues) => {
                        return {
                            ...prevValues,
                            ['days']: diffInDays
                        }
                    });
                }
            }


        }
        if (inputName === 'days' || inputName === 'charges' || inputName === "cdw" || inputName === 'cdwAgree' || flagDaysChangedByDates !== false) {
            var _ = 0;
            if (formInputs['cdwAgree'] == '1') {
                _ = 1;
            }
            if (inputName === 'days') {
                _total = (inputValue * (Number(formInputs['charges']) + _ * Number(formInputs['cdw']))).toString();
                _subTotal = (inputValue * Number(formInputs['charges'])).toString();
            } else if (inputName === 'charges') {
                _total = (formInputs['days'] * (Number(inputValue) + _ * Number(formInputs['cdw']))).toString();
                _subTotal = (formInputs['days'] * Number(inputValue)).toString();
            } else if (inputName === "cdw") {
                _total = (formInputs['days'] * (Number(formInputs['charges']) + _ * Number(inputValue))).toString();
                _subTotal = (formInputs['days'] * Number(formInputs['charges'])).toString();
            } else if (inputName === "cdwAgree") {
                _total = (formInputs['days'] * (Number(formInputs['charges']) + inputValue * Number(formInputs['cdw']))).toString();
                _subTotal = (formInputs['days'] * Number(formInputs['charges'])).toString();
            } else if (flagDaysChangedByDates !== false) {
                _total = (flagDaysChangedByDates * (Number(formInputs['charges']) + _ * Number(formInputs['cdw']))).toString();
                _subTotal = (flagDaysChangedByDates * Number(formInputs['charges'])).toString();
            }

            setFormInputs((prevValues) => {
                return {
                    ...prevValues,
                    ['total']: _total,
                    ['subTotal']: _subTotal
                }
            });
        } else if (inputName === 'registrationNumber') {
            setEveryThingOk((oldValues) => {
                return {
                    ...oldValues,
                    ['registrationNumber']: inputValue != ''
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

    function checkIfDatesAreResponsive(checkInDate,checkOutDate){
        let splitCheckInDate = checkInDate.split('-');
        let splitCheckOutDate = checkOutDate.split('-');
        if (splitCheckInDate.length < 3 || splitCheckOutDate.length < 3){
            Alert.alert('Problem with Dates', 'Please check the dates');
            return true;
        }
        let dateCheckIn = new Date(splitCheckInDate[2],splitCheckInDate[1],splitCheckInDate[0]);
        let dateCheckOut = new Date(splitCheckOutDate[2],splitCheckOutDate[1],splitCheckOutDate[0]);
        if (dateCheckOut < dateCheckIn ){
            Alert.alert('Problem with Dates', 'Check Out Date must larger than Check In Date');
            return true;
        }
        return false;

    }

    async function checkInputs() {
        setStateOfButton(true);
        var emptyInput = '';
        let flag = changeStateOfEverythingOk();
        for (const [key, value] of Object.entries(everythingOk)) {
            if (!value) {
                emptyInput = key;
                flag = false;
                break;
            }
        }
        // We check if the two signatures are not null
        if (formInputs['signClient'] == "." || formInputs['signCard'] == "."){
            Alert.alert('Problem with signatures', 'Both signatures are mandatory.');
            setStateOfButton(false);
            formInputs['isReady'] = false;
            return;
        }

        // # We check if the damages are ok, or not mandatory
        if (formInputs['damage4'] == "." && formInputs['damageIsOkBtn4']) {
            if (formInputs['damage5'] == "." && formInputs['damageIsOkBtn5']) {
                if (formInputs['damage1'] == "." && formInputs['damageIsOkBtn1']){
                    Alert.alert('Problem with car damage', 'Front and driver\'s side not filled in or not selected that is ok');
                    setStateOfButton(false);
                    return;
                } else if (formInputs['damage2'] == "." && formInputs['damageIsOkBtn2']) {
                    Alert.alert('Problem with car damage', 'Real and passenger side not filled in or not selected that is ok');
                    setStateOfButton(false);
                    return;
                } else if (formInputs['damage3'] == "." && formInputs['damageIsOkBtn3']) {
                    Alert.alert('Problem with car damage', 'Car Roof not filled in or not selected that is ok');
                    setStateOfButton(false);
                    return;
                }
            }

        }

        // Check if Check out Date is larger than Check In date
        if (checkIfDatesAreResponsive(formInputs['checkInDate'],formInputs['checkOutDate'])) {
            setStateOfButton(false);
            formInputs['isReady'] = false;
            return;
        }

        if (!flag) {
            Alert.alert('Data problem', `You must fill the ${labels[emptyInput]} Input. `);
            // Alert.alert('Data problem', 'You must fill in some fields. Check the inputs');
            setStateOfButton(false);
            formInputs['isReady'] = false;
        } else {
            formInputs['isReady'] = true;
            // if is from new form do the same if is from draft give the idForm
            setIsLoading(true);
            if(!idForm){
                var answer = await formCtx.saveLocal(formInputs);
            }else {
                var answer  = await formCtx.updateLocalForm(formInputs,editedFormId,creationDate);
            }

            if (answer) {

                Alert.alert('Form Saved',"Form Saved Locally Successfully")
            } else {
                Alert.alert('Unexpected error',"Something went wrong")
            }
            setIsLoading(false);

            resetForm();
            setStateOfButton(false);
            await navigation.navigate('Homepage');

        }

    }

    async function saveDraft() {
        const answer = await formCtx.saveLocal(formInputs);
        setIsLoading(true);
        if (answer) {
            Alert.alert('Form Saved As Draft',"Form Saved Locally Successfully");
            resetForm();
            setStateOfButton(false);
        } else {
            Alert.alert('Unexpected error draft',"Something went wrong");
        }
        setIsLoading(false);
        await navigation.navigate('Forms');
    }

    async function saveChanges() {
        formInputs['isReady'] = false;
        setIsLoading(true);

        const answer = await formCtx.updateLocalForm(formInputs,editedFormId,creationDate);
        if (answer) {
            Alert.alert('Form changes Saved ',"Form changes Saved  Successfully")
        } else {
            Alert.alert('Unexpected error draft with  Form changes',"Something went wrong")
        }
        setIsLoading(false);

        await navigation.navigate('Device Forms');

    }


    useEffect(() => {
        async function getDraftForm(idForm) {
            const form = await formCtx.getForm(idForm);
            setFormInputs(form.data);
            setCreationDate(form.date)
        }
        if (idForm && !hasLoadedForm) {
            getDraftForm(idForm);
            setEditedFormId(idForm);
        }
        if (idForm){
            setHasLoadedForm(true)
        }
    }, [idForm, hasLoadedForm]); // Only re-run the effect when idForm or hasLoadedForm changes



    function RadioPressHandler(val) {
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                ['cdwAgree']: val
            }
        });
        updateCalculatedDependentValuesAndChangeCriteria('cdwAgree', val);
    }

    const backgroundStyle = {
        backgroundColor:'#b30c0c'
    }
    function resetForm(){
        setFormInputs(initialState)
        setEveryThingOk(initialState2);
    }


    return <SafeAreaView style={(backgroundStyle, {flex: 1})}>
        <StatusBar/>
        { isLoading && <LoadingSpinner/>}
        { !isLoading &&
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled>
            <AutocompleteDropdownContextProvider>
                <View style={styles.generalContainer}>
                    <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
                        <View style={[styles.clientBox, {overflow: 'hidden'}]}>

                            <View style={styles.inputRow}>
                                <Input style={styles.rowInput}
                                       label={'Driver`s Full Name'}
                                       onChangeText={changeHandlerInputs.bind(this, 'driverFullName')}
                                       TextInputConfig={{}}
                                       value={formInputs['driverFullName']}
                                       inputStyle={!everythingOk.driverFullName ? styles.nullInput : ''}/>


                                <DatePicker2 style={styles.rowInput} objectKey={'driverDateOfBirth'}
                                             customOnChange={changeHandlerDatePicker} label={'Date of Birth'}
                                             type={'date'}
                                             everythingOkValue={everythingOk.driverDateOfBirth}
                                             value={formInputs['driverDateOfBirth']}

                                />

                            </View>


                            <View style={styles.inputRow}>
                                <Input style={styles.rowInput} label={'Tel.'}
                                       onChangeText={changeHandlerInputs.bind(this, 'driverPhone')}
                                       TextInputConfig={{keyboardType: 'phone-pad', placeholder: '+30 6980999416'}}
                                       value={formInputs['driverPhone']}
                                       inputStyle={!everythingOk.driverPhone ? styles.nullInput : ''}

                                />
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'driverRegistrationNumber')}
                                       label={'Driver`s Lic. No'}
                                       value={formInputs['driverRegistrationNumber']}
                                       inputStyle={!everythingOk.driverRegistrationNumber ? styles.nullInput : ''}
                                />
                            </View>
                            <View style={styles.inputRow}>


                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'driverRegistrationCountry')}
                                       label={'Country'}
                                       value={formInputs['driverRegistrationCountry']}
                                       inputStyle={!everythingOk.driverRegistrationCountry ? styles.nullInput : ''}
                                />
                                <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationDateIssue'}
                                             customOnChange={changeHandlerDatePicker} label={'Date of issue'}
                                             type={'date'}
                                             everythingOkValue={everythingOk.driverRegistrationDateIssue}
                                             value={formInputs['driverRegistrationDateIssue']}
                                />
                                <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationExpirationDate'}
                                             customOnChange={changeHandlerDatePicker} label={'Exp. Date'}
                                             type={'date'}
                                             everythingOkValue={everythingOk.driverRegistrationExpirationDate}
                                             value={formInputs['driverRegistrationExpirationDate']}


                                />
                            </View>
                            <Input label={'Email'}
                                   onChangeText={changeHandlerInputs.bind(this, 'email')}
                                   inputStyle={!everythingOk.email ? styles.nullInput : ''}
                                   value={formInputs['email']}
                            />
                        </View>

                        <View style={[{marginVertical: 30}]}>
                            <SubmitButton style={styles.damagesButton} buttonText={' Second Driver Information'}
                                          onPress={() => {
                                              setmodalVisibleSecondDriver(!modalVisibleSecondDriver)
                                          }}/>

                        </View>

                        <View style={styles.containerBorder}>
                            <Text style={styles.titleText}>Extra Information</Text>

                            <View style={styles.inputRow}>
                                <LocalDataSetExample style={styles} label={'Registration No'}
                                 onchangeText={changeHandlerInputs.bind(this, 'registrationNumber')} objectList={cars}/>
                            </View>


                            <View style={styles.inputRow}>





                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'vehicleType')}
                                       value={formInputs['vehicleType']}
                                       label={'Type of Car'}
                                       inputStyle={!everythingOk.vehicleType ? styles.nullInput : ''}
                                />
                            </View>


                            <View style={styles.inputRow}>

                                <DatePicker2 style={styles.rowInput} objectKey={'checkInDate'}
                                             customOnChange={changeHandlerDatePicker} label={'Check in Date'}
                                             type={'date'}
                                             everythingOkValue={everythingOk.checkInDate}
                                                value={formInputs['checkInDate']}
                                />
                                <DatePicker2 style={styles.rowInput} objectKey={'checkInTime'}
                                             customOnChange={changeHandlerDatePicker} label={'Check in Time'}
                                             type={'time'}
                                             everythingOkValue={everythingOk.checkInTime}
                                                value={formInputs['checkInTime']}
                                />


                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                                       label={'Station'}
                                       value={formInputs['checkInStation']}
                                       inputStyle={!everythingOk.checkInStation ? styles.nullInput : ''}
                                />
                            </View>
                            <View style={styles.inputRow}>

                                <DatePicker2 style={styles.rowInput} objectKey={'checkOutDate'}
                                             customOnChange={changeHandlerDatePicker} label={'Check out Date'}
                                             type={'date'}
                                             everythingOkValue={everythingOk.checkOutDate}
                                                value={formInputs['checkOutDate']}
                                />
                                <DatePicker2 style={styles.rowInput} objectKey={'checkOutTime'}
                                             customOnChange={changeHandlerDatePicker} label={'Check out Time'}
                                             type={'time'}
                                             everythingOkValue={everythingOk.checkOutTime}
                                                value={formInputs['checkOutTime']}
                                />

                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'checkOutStation')}
                                       label={'Station'}
                                       value={formInputs['checkOutStation']}
                                       inputStyle={!everythingOk.checkOutStation ? styles.nullInput : ''}
                                />
                            </View>

                            <View style={[styles.inputRow, {marginTop: 40}]}>
                                <SelectDropdown
                                    data={synergates}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem.title, index);

                                        if (selectedItem.title !== 'ΑΛΛΟ') {
                                            setTempSynergaths(selectedItem.title);
                                            setFormInputs((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    ['realRecommendedBy']: selectedItem.title
                                                }
                                            });
                                            setEveryThingOk((oldValues) => {
                                                return {
                                                    ...oldValues,
                                                    ['realRecommendedBy']: true
                                                }
                                            });
                                        }else {
                                            setFormInputs((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    ['realRecommendedBy']: ''
                                                }
                                            });
                                            setEveryThingOk((oldValues) => {
                                                return {
                                                    ...oldValues,
                                                    ['realRecommendedBy']: false
                                                }
                                            });
                                        }


                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                {selectedItem && (
                                                    <Icon source={selectedItem.icon} style={styles.dropdownButtonIconStyle}  size={15}/>
                                                )}
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem && selectedItem.title) || 'Select Recommended By'}
                                                </Text>
                                                <Icon source={isOpened ? 'chevron-up' : 'chevron-down'} size={15} style={styles.dropdownButtonArrowStyle} />
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={true}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                    search={true}
                                />


                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'realRecommendedBy')}
                                       label={'Recommended By'}
                                       value={formInputs['realRecommendedBy']}
                                       inputStyle={!everythingOk.realRecommendedBy ? styles.nullInput : ''}
                                />

                            </View>


                            <View style={[styles.inputRow, {marginBottom: 60}]}>
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'recommendedBy')}
                                       label={'Hotel / Villa'}
                                       value={formInputs['recommendedBy']}
                                       inputStyle={!everythingOk.recommendedBy ? styles.nullInput : ''}
                                />
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'rateCode')}
                                       label={'Room'}
                                       value={formInputs['rateCode']}
                                       inputStyle={!everythingOk.rateCode ? styles.nullInput : ''}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <View style={{minWidth: '50%'}}></View>
                                <View style={styles.rowInput}>
                                    <RadioButtonCustom value={formInputs['cdwAgree']} onPress={RadioPressHandler}
                                                       option1={'I Agree'} option2={' I Dont Agree'} label={" C.D.W."}/>
                                </View>
                            </View>
                            <View style={styles.inputRow}>
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'charges')}
                                       label={'Charges €'}
                                       value={formInputs['charges']}
                                       inputStyle={!everythingOk.charges ? styles.nullInput : ''}
                                />
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'subTotal')}
                                       label={'Sub-Total'}
                                       value={formInputs['subTotal']}
                                       editable={false}
                                       inputStyle={!everythingOk.subTotal ? styles.nullInput : ''}
                                />
                            </View>

                            <View style={styles.inputRow}>
                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'days')}
                                       label={'Days'}
                                       value={formInputs.days.toString()}
                                       inputStyle={!everythingOk.days ? styles.nullInput : ''}
                                />

                                <View style={styles.rowInput}>
                                    <Input style={styles.rowInput}
                                           value={formInputs['cdw']}
                                           onChangeText={changeHandlerInputs.bind(this, 'cdw')}
                                           label={'C.D.W '}
                                           editable={formInputs.cdwAgree}
                                           inputStyle={!everythingOk.cdw ? styles.nullInput : ''}
                                    />
                                </View>

                            </View>
                            <View style={[styles.inputRow, {width: '50%'}]}>
                                <Input style={styles.rowInput}
                                       value={formInputs['liabilityAmount']}
                                       onChangeText={changeHandlerInputs.bind(this, 'liabilityAmount')}
                                       label={'Liability '}
                                       editable={formInputs.cdwAgree}
                                       inputStyle={!everythingOk.liabilityAmount ? styles.nullInput : ''}
                                />

                            </View>
                            <View style={styles.inputRow}>
                                <View style={{minWidth: '50%'}}></View>
                                <Input style={[styles.rowInput, {}]}
                                       value={formInputs.total}
                                       onChangeText={changeHandlerInputs.bind(this, 'total')}
                                       label={'Total'}
                                       editable={false}
                                       inputStyle={!everythingOk.total ? styles.nullInput : ''}
                                />
                            </View>
                            <Text style={styles.bolder}> COLLISION DAMAGE INSURANCE </Text>
                            <View style={styles.inputRow}>
                                <Text>
                                    Client shall be liable for the full value of damage to the Lessor Company vehicle,
                                    however, the
                                    Client
                                    by marking the suitable box can reduce the liability to
                                    €{formInputs.liabilityAmount} with the obligation to pay an
                                    amount
                                    that mentioned in org price list with (Collision Damage Waiver), or by marking the
                                    suitable box
                                    to pay
                                    an additional amount that covers full value of damage Full Damage Waiver), any
                                    damage on tires,
                                    windshield, windows, and underneath the car are not covered in both causes.
                                </Text>
                            </View>

                            <View>
                                <SubmitButton style={styles.signatureButton} buttonText={' Signature'} onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                                />
                            </View>

                            <View style={styles.inputRow}>
                                <FormText
                                    onChangeInputs={changeHandlerInputs}
                                    driverFullName={formInputs.driverFullName}
                                    After={formInputs.checkOutDate}
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
                                       inputStyle={!everythingOk.cardExpirationDate ? styles.nullInput : ''}
                                />

                                <Input style={styles.rowInput}
                                       onChangeText={changeHandlerInputs.bind(this, 'cvv')}
                                       label={'CVV'}
                                       value={formInputs['cvv']}
                                       inputStyle={!everythingOk.cvv ? styles.nullInput : ''}
                                />
                            </View>

                            <View>
                                <SubmitButton style={styles.signatureButton} buttonText={' Signature'} onPress={() => {
                                    setModalVisible2(!modalVisible2)
                                }}

                                />

                            </View>
                            <View>
                                <View>
                                    <Text style={styles.titleText}>
                                        Fuel Deposit {formInputs.fuel == "" ? 0 : formInputs.fuel} /8
                                    </Text>
                                    <View style={styles.container}>
                                        {/*<Slider*/}
                                        {/*    containerStyle={styles.sliderContainer}*/}
                                        {/*    value={formInputs.fuel}*/}
                                        {/*    onValueChange={changeSliderValue}*/}
                                        {/*    step={1}*/}
                                        {/*    maximumValue={8}*/}
                                        {/*    minimumValue={1}*/}
                                        {/*/>*/}

                                        <Input style={styles.rowInput}
                                               onChangeText={changeHandlerInputs.bind(this, 'fuel')}

                                               TextInputConfig={{keyboardType: "numeric"}}
                                               value={formInputs['fuel']}
                                               inputStyle={!everythingOk.fuel ? styles.nullInput : ''}
                                        />

                                    </View>

                                </View>
                                <View style={styles.inputRow}>

                                    <Input style={styles.rowInput}
                                           onChangeText={changeHandlerInputs.bind(this, 'notes')}
                                           label={'Notes'}
                                           TextInputConfig={{multiline:true}}
                                           value={formInputs['notes']}
                                           inputStyle={!everythingOk.notes ? styles.nullInput : ''}
                                    />
                                </View>


                                <Text style={styles.titleText}>
                                    Car Damages
                                </Text>
                                <View style={styles.damagesContainer} >

                                <SubmitButton style={styles.damagesButton} buttonText={'Front and driver`s side '}
                                              onPress={() => {
                                                  setModalVisibleDamage1(!modalVisibleDamage1)
                                              }}/>

                                <SubmitButton style={styles.damagesButton} buttonText={' Rear and passenger side'}
                                              onPress={() => {
                                                  setModalVisibleDamage2(!modalVisibleDamage2)
                                              }}/>

                                <SubmitButton style={styles.damagesButton} buttonText={' Car Roof'} onPress={() => {
                                    setModalVisibleDamage3(!modalVisibleDamage3)
                                }}/>
                                </View>

                            </View>

                            <View>
                                <Text style={styles.titleText}>
                                    Motto Damages
                                </Text>

                                <SubmitButton style={styles.damagesButton} buttonText={' Motto'} onPress={() => {
                                    setModalVisibleDamage4(!modalVisibleDamage4)
                                }}/>

                            </View>

                            <View>
                                <Text style={styles.titleText}>
                                    Atv Damages
                                </Text>

                                <SubmitButton style={styles.damagesButton} buttonText={' Atv'} onPress={() => {
                                    setModalVisibleDamage5(!modalVisibleDamage5)
                                }}/>

                            </View>

                            <View style={styles.submitContainer}>
                               <SubmitButton isDisabled={stateOfButton} onPress={checkInputs}
                                                              buttonText={'Check & Save'}/>

                                {! idForm &&         <SubmitButton  style={styles.draftBtn} onPress={saveDraft}
                                                                    buttonText={'Save Form As Draft'}/>}

                                {idForm && <SubmitButton  style={styles.draftBtn} onPress={saveChanges}
                                                               buttonText={'Save Draft'}/> }

                            </View>

                        </View>

                    </ScrollView>
                    <SignatureModal
                        modalTitle={'Client Signature'}
                        defaultSignature={formInputs.signClient}
                        styles={styles}
                        modalVisible={modalVisible}
                        setModalVisibility={() => { setModalVisible(!modalVisible); }}
                        onOK={changeHandlerInputs.bind(this, 'signClient')}
                    />

                    <SignatureModal
                        modalTitle={'Signature for the card'}
                        defaultSignature={formInputs.signCard}
                        styles={styles}
                        modalVisible={modalVisible2}
                        setModalVisibility={() => { setModalVisible2(!modalVisible2); }}
                        onOK={changeHandlerInputs.bind(this, 'signCard')}
                    />

                    <DamageModal
                        modalTitle={'Damage Record 1'}
                        defaultDamage={formInputs.damage1}
                        styles={styles}
                        modalVisible={modalVisibleDamage1}
                        setModalVisibility={() => { setModalVisibleDamage1(!modalVisibleDamage1); }}
                        onOK={changeHandlerInputs.bind(this, 'damage1')}
                        bgImage={front_left1}
                        hasDamage={formInputs.damageIsOkBtn1}
                        onchangeRadioButton={changeHandlerInputs.bind(this, 'damageIsOkBtn1')}

                    />

                    <DamageModal
                        modalTitle={'Damage Record 2'}
                        defaultDamage={formInputs.damage2}
                        styles={styles}
                        modalVisible={modalVisibleDamage2}
                        setModalVisibility={() => { setModalVisibleDamage2(!modalVisibleDamage2); }}
                        onOK={changeHandlerInputs.bind(this, 'damage2')}
                        bgImage={rear_right1}
                        hasDamage={formInputs.damageIsOkBtn2}
                        onchangeRadioButton={changeHandlerInputs.bind(this, 'damageIsOkBtn2')}

                    />

                    <DamageModal
                        modalTitle={'Damage Record 3'}
                        defaultDamage={formInputs.damage3}
                        styles={styles}
                        modalVisible={modalVisibleDamage3}
                        setModalVisibility={() => { setModalVisibleDamage3(!modalVisibleDamage3); }}
                        onOK={changeHandlerInputs.bind(this, 'damage3')}
                        bgImage={top1}
                        hasDamage={formInputs.damageIsOkBtn3}
                        onchangeRadioButton={changeHandlerInputs.bind(this, 'damageIsOkBtn3')}

                    />

                    <DamageModal
                        modalTitle={'Damage Record Motto'}
                        defaultDamage={formInputs.damage4}
                        styles={styles}
                        modalVisible={modalVisibleDamage4}
                        setModalVisibility={() => { setModalVisibleDamage4(!modalVisibleDamage4); }}
                        onOK={changeHandlerInputs.bind(this, 'damage4')}
                        bgImage={bike1}
                        hasDamage={formInputs.damageIsOkBtn4}
                        onchangeRadioButton={changeHandlerInputs.bind(this, 'damageIsOkBtn4')}

                    />

                    <DamageModal
                        modalTitle={'Damage Record Atv'}
                        defaultDamage={formInputs.damage5}
                        styles={styles}
                        modalVisible={modalVisibleDamage5}
                        setModalVisibility={() => { setModalVisibleDamage5(!modalVisibleDamage5); }}
                        onOK={changeHandlerInputs.bind(this, 'damage5')}
                        bgImage={atv}
                        hasDamage={formInputs.damageIsOkBtn5}
                        onchangeRadioButton={changeHandlerInputs.bind(this, 'damageIsOkBtn5')}

                    />



                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisibleSecondDriver}
                        onRequestClose={() => {
                            setmodalVisibleSecondDriver(!modalVisibleSecondDriver)
                        }}>
                        <View>
                            <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
                                <View style={{overflow: 'hidden'}}>
                                    <View style={[styles.inputRow, {marginTop: 30}]}>
                                        <Input
                                            style={styles.rowInput}
                                            label={'Add Driver'}
                                            onChangeText={changeHandlerInputs.bind(this, 'secondDriverFullName')}
                                            value={formInputs['secondDriverFullName']}
                                            inputStyle={!everythingOk.secondDriverFullName ? styles.nullInput : ''}
                                        />

                                        <DatePicker2 style={styles.rowInput} objectKey={'secondDriverBirthDate'}
                                                     customOnChange={changeHandlerDatePicker} label={'Date of Birth'}
                                                     type={'date'}
                                                     everythingOkValue={everythingOk.secondDriverBirthDate}
                                                     value={formInputs['secondDriverBirthDate']}
                                        />
                                    </View>

                                    <View style={[styles.inputRow, {marginTop: 30}]}>
                                        <Input style={styles.rowInput}
                                               label={'Driver`s Lic. No'}
                                               onChangeText={changeHandlerInputs.bind(this, 'secondDriverRegistrationNumber')}
                                               inputStyle={!everythingOk.secondDriverRegistrationNumber ? styles.nullInput : ''}
                                               value={formInputs['secondDriverRegistrationNumber']}
                                        />
                                        <Input
                                            style={styles.rowInput}
                                            onChangeText={changeHandlerInputs.bind(this, 'secondDriverRegistrationCountry')}
                                            label={'Country'}
                                            value={formInputs['secondDriverRegistrationCountry']}
                                            inputStyle={!everythingOk.secondDriverRegistrationCountry ? styles.nullInput : ''}
                                        />


                                    </View>
                                </View>

                                <View style={[styles.inputRow, {marginTop: 30}]}>

                                    <DatePicker2 style={styles.rowInput} objectKey={'secondDriverRegistrationDateIssue'}
                                                 customOnChange={changeHandlerDatePicker} label={'Date of issue'}
                                                 type={'date'}
                                                 everythingOkValue={everythingOk.secondDriverRegistrationDateIssue}
                                                    value={formInputs['secondDriverRegistrationDateIssue']}

                                    />
                                    <DatePicker2 style={styles.rowInput}
                                                 objectKey={'secondDriverRegistrationExpirationDate'}
                                                 customOnChange={changeHandlerDatePicker} label={'Exp. Date'}
                                                 type={'date'}
                                                 everythingOkValue={everythingOk.secondDriverRegistrationExpirationDate}
                                                    value={formInputs['secondDriverRegistrationExpirationDate']}

                                    />
                                </View>
                                <View style={{height: '30%', marginVertical: 35}}>
                                    <Pressable onPress={() => {
                                        setmodalVisibleSecondDriver(!modalVisibleSecondDriver)
                                    }} style={[styles.button, styles.buttonClose]}>
                                        <Text style={styles.textStyle}>Go Back</Text>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>

                </View>
            </AutocompleteDropdownContextProvider>
        </KeyboardAvoidingView>
        }
    </SafeAreaView>
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,

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
    damagesContainer:{
      display:'flex',
      justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    damagesButton :{
        width: 180,
        flex:1,
        margin:"auto",
        backgroundColor: '#12015d',
        color:'white',
        marginVertical:5
    },
    sliderTitle:{
      textAlign:'center',
      fontSize:25
    },
    sliderContainer:{
        marginHorizontal:45
    },
    input: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputStyle: { fontSize: 16 },
    labelStyle: { fontSize: 14 },
    placeholderStyle: { fontSize: 16 },
    textErrorStyle: { fontSize: 16 },
    submitContainer :{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    draftBtn: {
        backgroundColor: 'rgba(218,8,8,0.8)',
    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 13,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },


})

