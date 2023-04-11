import {
    Text,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    Button,
    Modal,
    Pressable,
    Platform,
    AppRegistry
} from "react-native";
import {Slider} from '@miblanchard/react-native-slider';
import Input from "./input";
import RadioButtonCustom from "./radioButton";
import FormText from "./formText";
import SubmitButton from "./submitButton";
import React, {useContext, useEffect, useState} from "react";
import Sign from "./SignatureScreen";
import {FormsContext} from "../../store/form-context";
import DatePicker2 from "./DatePicker2";

function expenseForm({navigation}) {

    const initialState = {
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
        damage3: ".",
        damage4: ".",
        damageIsOkBtn1: true,
        damageIsOkBtn2: true,
        damageIsOkBtn3: true,
        damageIsOkBtn4: true,
        fuel:1
    };
    const [formInputs, setFormInputs] = useState(initialState)
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [modalVisibleSecondDriver, setmodalVisibleSecondDriver] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisibleDamage1, setModalVisibleDamage1] = useState(false);
    const [modalVisibleDamage2, setModalVisibleDamage2] = useState(false);
    const [modalVisibleDamage3, setModalVisibleDamage3] = useState(false);
    const [modalVisibleDamage4, setModalVisibleDamage4] = useState(false);
    const [stateOfButton,setStateOfButton] = useState(false);


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
            mandatory: false,
            type: "text",
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
        damage1: false,
        damage2: false,
        damage3: false,
        damage4: false
    });
    const formCtx = useContext(FormsContext) ;
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

    function changeSliderValue(value){
        setFormInputs((prevValues) => {
            return {
                ...prevValues,
                ['fuel']: value
            }
        });

    }

    async function checkInputs() {
        setStateOfButton(true);

        let flag = changeStateOfEverythingOk();
        for (const [key, value] of Object.entries(everythingOk)) {
            if (!value) {
                console.log(everythingOk);
                console.log(formInputs);
                flag = false;
                break;
            }
        }
        // We check if the two signatures are not null
        if (formInputs['signClient'] == "." || formInputs['signCard'] == "."){
            Alert.alert('Problem with signatures', 'Both signatures are mandatory.');
            return;
        }

        // # We check if the damages are ok, or not mandatory
        if (formInputs['damage1'] == "." && formInputs['damageIsOkBtn1']){
            Alert.alert('Problem with car damage', 'Front and driver\'s side not filled in or not selected that is ok');
            return;
        } else if (formInputs['damage2'] == "." && formInputs['damageIsOkBtn2']) {
            Alert.alert('Problem with car damage', 'Real and passenger side not filled in or not selected that is ok');
            return;
        } else if (formInputs['damage3'] == "." && formInputs['damageIsOkBtn3']) {
            Alert.alert('Problem with car damage', 'Car Roof not filled in or not selected that is ok');
            return;
        } else if (formInputs['damage4'] == "." && formInputs['damageIsOkBtn4']) {
            Alert.alert('Problem with the damage of the motorbike', 'The damage to the motorbike has not been adjusted');
            return;
        }
        if (!flag) {
            Alert.alert('Data problem', 'You must fill in some fields. Check the inputs')
        } else {
            const answer = await formCtx.saveLocal(formInputs);
            if (answer['uploadedOk']) {
                if (answer['uploadedOk'] == '1') {
                    Alert.alert('Form submission',"Successful Submission")
                } else {
                    Alert.alert('Form submission',"Successful Submission")
                }
            } else {
                Alert.alert('Form submission', "Failed to submit online, but saved locally")
            }
            resetForm();
            setStateOfButton(false);

        }
        await navigation.navigate('Homepage');
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

    function resetForm(){
        setFormInputs(initialState)
    }


    return <View style={styles.generalContainer}>

        <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
            <View style={[styles.clientBox, {overflow: 'hidden'}]}>

                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Driver`s Full Name'}
                           onChangeText={changeHandlerInputs.bind(this, 'driverFullName')}
                           TextInputConfig={{}}
                           value={formInputs['driverFullName']}
                           inputStyle={!everythingOk.driverFullName? styles.nullInput : ''}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'driverDateOfBirth'}  customOnChange={changeHandlerDatePicker}  label={'Date of Birth'} type={'date'}/>

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
                    <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationDateIssue'}  customOnChange={changeHandlerDatePicker}  label={'Date of issue'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'driverRegistrationExpirationDate'}  customOnChange={changeHandlerDatePicker}  label={'Exp. Date'} type={'date'}/>
                </View>
                <Input label={'Email'}
                       onChangeText={changeHandlerInputs.bind(this, 'email')}
                       inputStyle={!everythingOk.email ? styles.nullInput : ''}
                       value={formInputs['email']}
                />
            </View>

            <View style={[ {marginVertical: 30}]}>
                <SubmitButton style={styles.damagesButton} buttonText={' Second Driver Information'} onPress={() => {
                    setmodalVisibleSecondDriver(!modalVisibleSecondDriver)
                }}/>

            </View>

            <View style={styles.containerBorder}>
                <Text style={styles.titleText}>Extra Information</Text>
                <View style={styles.inputRow}>
                    <Input style={styles.rowInput}
                           label={'Registration No'}
                           value={formInputs['registrationNumber']}
                           onChangeText={changeHandlerInputs.bind(this, 'registrationNumber')}
                           inputStyle={!everythingOk.registrationNumber ? styles.nullInput : ''}
                    />
                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'vehicleType')}
                           value={formInputs['vehicleType']}
                           label={'Type of Car'}
                           inputStyle={!everythingOk.vehicleType ? styles.nullInput : ''}
                    />
                </View>

                <View style={styles.inputRow}>

                    <DatePicker2 style={styles.rowInput} objectKey={'checkInDate'}  customOnChange={changeHandlerDatePicker}  label={'Check in Date'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'checkInTime'}  customOnChange={changeHandlerDatePicker}  label={'Check in Time'} type={'time'}/>


                    <Input style={styles.rowInput}
                           onChangeText={changeHandlerInputs.bind(this, 'checkInStation')}
                           label={'Station'}
                           value={formInputs['checkInStation']}
                           inputStyle={!everythingOk.checkInStation ? styles.nullInput : ''}
                    />
                </View>
                <View style={styles.inputRow}>

                    <DatePicker2 style={styles.rowInput} objectKey={'checkOutDate'}  customOnChange={changeHandlerDatePicker}  label={'Check out Date'} type={'date'}/>
                    <DatePicker2 style={styles.rowInput} objectKey={'checkOutTime'}  customOnChange={changeHandlerDatePicker}  label={'Check out Date'} type={'time'}/>

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
                        <RadioButtonCustom value={formInputs['cdwAgree']} onPress={RadioPressHandler} option1={'I Agree'}  option2={' I Dont Agree'} label={" C.D.W."}/>
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
                           editable = {false}
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
                               label={'C.M.W '}
                               inputStyle={!everythingOk.cdw ? styles.nullInput : ''}
                        />
                    </View>

                </View>
                <View style={[styles.inputRow, {width: '50%'}]}>
                    <Input style={styles.rowInput}
                           value={formInputs['liabilityAmount']}
                           onChangeText={changeHandlerInputs.bind(this, 'liabilityAmount')}
                           label={'Liability '}
                           inputStyle={!everythingOk.liabilityAmount ? styles.nullInput : ''}
                    />

                </View>
                <View style={styles.inputRow}>
                    <View style={{minWidth: '50%'}}></View>
                    <Input style={[styles.rowInput, {}]}
                           value={formInputs.total}
                           onChangeText={changeHandlerInputs.bind(this, 'total')}
                           label={'Total'}
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
                    <SubmitButton style={styles.signatureButton} buttonText={' Signature'} onPress={() => {
                        setModalVisible(!modalVisible)
                    }}
                    />
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
                    <SubmitButton style={styles.signatureButton} buttonText={' Signature'} onPress={() => {
                        setModalVisible2(!modalVisible2)
                    }}

                    />

                </View>
                <View>
                    <Text style={styles.titleText}>
                        Car Damages
                    </Text>

                    <View style={styles.container}>
                        <Text style={styles.sliderTitle}  >Fuel : {formInputs.fuel} </Text>
                        <Slider
                            containerStyle={styles.sliderContainer}
                            value={formInputs.fuel}
                            onValueChange={changeSliderValue}
                            step={1}
                            maximumValue={8}
                            minimumValue={1}
                        />

                    </View>

                    <SubmitButton style={styles.damagesButton} buttonText={'Front and driver`s side '} onPress={() => {
                        setModalVisibleDamage1(!modalVisibleDamage1)
                    }}/>

                    <SubmitButton style={styles.damagesButton} buttonText={' Rear and passenger side'} onPress={() => {
                        setModalVisibleDamage2(!modalVisibleDamage2)
                    }}/>

                    <SubmitButton style={styles.damagesButton} buttonText={' Car Roof'} onPress={() => {
                        setModalVisibleDamage3(!modalVisibleDamage3)
                    }}/>

                </View>

                <View>
                    <Text style={styles.titleText}>
                        Motto Damages
                    </Text>

                    <SubmitButton style={styles.damagesButton} buttonText={' Motto'} onPress={() => {
                        setModalVisibleDamage4(!modalVisibleDamage4)
                    }}/>

                </View>

                <SubmitButton isDisabled={stateOfButton} onPress={checkInputs}  buttonText={'Form Submit'}/>

            </View>

        </ScrollView>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>

            <View style={styles.generalContainer}>
                <Text style={styles.titleText}> Client Signature</Text>
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
                <Text style={styles.titleText}> Signature for the card</Text>
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
                <Text style={styles.titleText}>Damage Record 1</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage1')}
                      bgImage={'https://viajerodecorazon.com/assets/react/front-left1.png'}
                      value={formInputs.damage1}
                      onBack={() => setModalVisibleDamage1(!modalVisibleDamage1)}
                      onDamage
                      hasDamage={formInputs.damageIsOkBtn1}
                      onchangeRadioButton={changeHandlerInputs.bind(this,'damageIsOkBtn1')}
                />

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
                <Text style={styles.titleText}>Damage Record 2</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage2')}
                      bgImage={'https://viajerodecorazon.com/assets/react/rear-right1.png'}
                      value={formInputs.damage2}
                      onBack={() => setModalVisibleDamage2(!modalVisibleDamage2)}
                      hasDamage={formInputs.damageIsOkBtn2}
                      onchangeRadioButton={changeHandlerInputs.bind(this,'damageIsOkBtn2')}
                />

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
                <Text style={styles.titleText}>Damage Record 3</Text>
                <Sign onOK={changeHandlerInputs.bind(this,'damage3')}
                      bgImage={'https://viajerodecorazon.com/assets/react/top1.png'}
                      value={formInputs.damage3}
                      onBack={() => setModalVisibleDamage3(!modalVisibleDamage3)}
                      hasDamage={formInputs.damageIsOkBtn3}
                      onchangeRadioButton={changeHandlerInputs.bind(this,'damageIsOkBtn3')}

                />

            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibleDamage4}
            onRequestClose={() => {
                setModalVisibleDamage4(!modalVisibleDamage4);
            }}>
            <View style={styles.generalContainer}>
                <Text style={styles.titleText}>Damage Record Motto</Text>
                <Sign
                    onOK={changeHandlerInputs.bind(this,'damage4')}
                    bgImage={'https://viajerodecorazon.com/assets/react/bike1.png'}
                    value={formInputs.damage4}
                    onBack={() => setModalVisibleDamage4(!modalVisibleDamage4)}
                    hasDamage={formInputs.damageIsOkBtn4}
                    onchangeRadioButton={changeHandlerInputs.bind(this,'damageIsOkBtn4')}
                />

            </View>
        </Modal>


        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibleSecondDriver}
            onRequestClose={() => {
                setmodalVisibleSecondDriver(!modalVisibleSecondDriver)
            }}>
            <View >
                <ScrollView style={styles.form} scrollEnabled={scrollEnabled}>
                    <View style={[styles.clientBox, {overflow: 'hidden'}]}>
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
                                         type={'date'}/>
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

                            <DatePicker2 style={styles.rowInput} objectKey={'secondDriverRegistrationDateIssue'}
                                         customOnChange={changeHandlerDatePicker} label={'Date of issue'}
                                         type={'date'}/>
                            <DatePicker2 style={styles.rowInput} objectKey={'secondDriverRegistrationExpirationDate'}
                                         customOnChange={changeHandlerDatePicker} label={'Exp. Date'} type={'date'}/>

                        </View>
                    </View>
                    <View style={{height:'30%',marginVertical:35}}>
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
    damagesButton :{
        width: '100%',
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
    }


})
export default expenseForm
