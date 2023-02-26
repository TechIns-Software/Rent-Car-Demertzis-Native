import {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {AuthContext} from "./auth-context";


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
            cdwAgree: true,
            signClient:"",
            cardHolderName: "",
            cardExpirationDate : "",
            cvv: "",
            signCard: "",
        }
    });
    const [numberOfForm,setNumberOfForms] = useState(0)


    async function saveLocal(data, authCtx){
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        const answer = await sendForm(data, formattedDate, authCtx);

        setFormInfo({
            isUploaded: answer.uploadedOk ?? 0,
            data :data,
            date:formattedDate
        });
        let lastId = await getLastId();
        await storeData({[lastId + 1]:formInfo},Number(lastId+1).toString());
        return answer;

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
        var value = 0;
        try {
            value = await AsyncStorage.getItem('numberOfForms').then((res) => {
                return JSON.parse(res);
            })
            if (value == null){
                value = 0;
            }
        } catch (e) {
            // error reading value
        }

        setNumberOfForms(value)
        return Number(value);
    }

    async function getAllForms() {
        // this is for remove keys in local storage
        // await AsyncStorage.removeItem('numberOfForms');
        // await AsyncStorage.removeItem('userForms');
        return AsyncStorage.getItem('userForms').then((res) => {
            return JSON.parse(res);
        });
    }

    async function sendForm(formInputs, date, authCtx) {
        console.log(authCtx);
        const idAdmin = authCtx['idAdmin'];
        const uniqueHash = Date.now() + (Math.random() + 1).toString(36) + String(idAdmin).padStart(3, '0');
        //todo calculate digest
        const hashToken = authCtx['token'];
        const digest = "sadsad";
        const timeUploaded = date;
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
        var answer = 0;
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
                    console.log("returned the below");
                    console.log(response);
                    return response;
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    console.log(error);
                }).then(errorResponse => errorResponse);
        } catch (error){
            const ans = {
                "no-network": "1"
            };
            return ans
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