import {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";


export  const FormsContext = createContext({
    numberOfForms :0,
    saveLocal : (isUploaded,data)=>{},
    upload : ()=>{},
    previewForm :(idForm) =>{},
    allForms : ()=>{}
});

function  FormsContextProvider({children}){
    const [formInfo,setFormInfo] = useState({
        idForm:'',
        isUploaded:0,
        data:{
            driverFullName: "",
            driverDateOfBirth: "",
            driverAddress: "",
            driverCountry: "",
            driverPhone: "",
            driverPassportNumber: "",
            driverPassportCountry: "",
            driverPassportDateIssue: "",
            driverPassportExpirationDate: "",
            driverRegistrationNumber: "",
            driverRegistrationCountry: "",
            driverRegistrationDateIssue: "",
            driverRegistrationExpirationDate: "",
            renterName: "",
            renderAFM: "",
            doy: "",
            renterAddress: "",
            renterCity: "",
            renterPhone: "",
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
            cdwAgree: true,
            signClient:"",
            cardHolderName: "",
            cardExpirationDate : "",
            cvv: "",
            signCard: "",
        }
    });
    const [numberOfForm,setNumberOfForms] = useState(0)


    async function saveLocal(isUploaded,data){
        const currentDate = new Date();
        const formatedDate = currentDate.getFullYear()+'-'+currentDate.getDate()+'-'+(currentDate.getMonth()+1);
        let lastId =  await getLastId();

        setFormInfo({
            isUploaded:isUploaded,
            data :data,
            date:formatedDate
        });
        //todo change that
        const answer = await sendForm(data);
        console.log(answer);
        return;
        await  storeData({[lastId + 1]:formInfo},Number(lastId+1).toString());
        // console.log(allForms)

    }

    async function storeData(obj, formNum) {

        try {
            const jsonObj = JSON.stringify(obj);

            await AsyncStorage.setItem('numberOfForms', formNum);
            await AsyncStorage.mergeItem('userForms', jsonObj);


        } catch (e) {
            console.log(e)
        }
    }
    async function getLastId() {
        try {
            var value = await AsyncStorage.getItem('numberOfForms').then((res) => {
                return JSON.parse(res);
            })
            if (value == null){
                value = 0;
            }
            setNumberOfForms(value)

            return Number(value);
        } catch (e) {
            // error reading value
        }
    }

    async function getAllForms() {
        // this is for remove keys in local storage
        // await AsyncStorage.removeItem('numberOfForms');
        // await AsyncStorage.removeItem('userForms');
        return AsyncStorage.getItem('userForms').then((res) => {
            return JSON.parse(res);
        });
    }

    async function sendForm(formInputs) {
        //todo find idAdmin, uniqueHash
        const idAdmin = 1;
        const uniqueHash = (Math.random() + 1).toString(36);
        const digest = "sadsad";
        const timeUploaded = "2022-02-23";
        formInputs.action = "uploadForm";
        formInputs.idAdmin = idAdmin;
        formInputs.digest = digest;
        formInputs.uniqueHash = uniqueHash;
        formInputs.timeUploaded = timeUploaded;
        // console.log(formInputs);
        const toUrlEncoded = (obj) => {
            return Object
                .keys(obj)
                .map(
                    k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
                .join('&');
        }

        const data = toUrlEncoded(formInputs);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append('Accept', 'application/json');
        var answer = ";sadsa43g";
        try {
            answer = fetch('https://a-omega.com.gr/admin/request/', {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                headers: myHeaders,
                body: data.toString() // body data type must match "Content-Type" header
            })
                .then((res) => {
                    if(!res.ok) {
                        return res.text().then(text => { throw new Error(text) })
                    }
                    else {
                        return res.json();
                    }
                })
                .then((response) => {
                    console.log(JSON.stringify(response));
                    console.log(response);
                    return response;
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    console.log(error);
                });;
        } catch (error){
            Alert.alert('Something Went wrong','error')
        }
        return answer;
    }

    const value = {
        saveLocal :saveLocal,
        numberOfForms :numberOfForm,
        allForms : getAllForms
    }

    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>

}

export default FormsContextProvider