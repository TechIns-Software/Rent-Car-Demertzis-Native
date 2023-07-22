import {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {Alert} from "react-native";


export  const FormsContext = createContext({
    numberOfForms :0,
    saveLocal : (isUploaded,data)=>{},
    getAdmin : ()=>{},
    upload : ()=>{},
    previewForm :(idForm) =>{},
    allForms : ()=>{},
    deleteForm : (idForm)=>{},
    uploadOfflineForm :  (idForm)=>{}
});

function  FormsContextProvider({children}){
    const [numberOfForm,setNumberOfForms] = useState(0)


    async function saveLocal(data){
        // we check the connection START
        const hasInternet = await NetInfo.fetch().then(state => {
            return state.isConnected;
        });
        // we check the connection END

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        var answer = {};
        answer.uploadedOk = 0;
        let lastId = await getLastId();
        const formInfo = {
            isUploaded: answer.uploadedOk ?? 0,
            data :data,
            date:formattedDate
        }

        await storeData({[lastId + 1]:formInfo},Number(lastId+1).toString());
        if (hasInternet) {
            answer = await sendForm(data, formattedDate);
            if (answer.uploadedOk == 1) {
                await updateStatusWhenFormSubmittedSuccessfully();
            }
        } else {
            answer.uploadedOk = 0;
        }
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

    async function getAdmin() {
        const idAdmin = await AsyncStorage.getItem('idAdmin').then((res) => {
            return res;
        });
        const token = await AsyncStorage.getItem('token').then((res) => {
            return res;
        });

        return {idAdmin: idAdmin, token: token};
    }

    async function sendForm(formInputs, date,isReUpload = false) {
        const adminObj = await getAdmin();
        const idAdmin = adminObj['idAdmin'];
        const uniqueHash = Date.now() + (Math.random() + 1).toString(36) + String(idAdmin).padStart(3, '0');
        //todo calculate digest
        const hashToken = adminObj['token'];
        const digest = "sadsad";

        formInputs.action = "uploadForm";
        formInputs.idAdmin = idAdmin;
        formInputs.digest = digest;
        formInputs.uniqueHash = uniqueHash;
        const timeUploaded = date;
        formInputs.timeUploaded = timeUploaded;
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
        // myHeaders.append('Accept', 'application/json');
        var answer = 0;
        try {
            answer = await axios.post('https://a-omega.com.gr/admin/request/', data)
                .then(function (response) {
                return response.data
                }).catch(function (error) {
                    console.log('error');
                    console.log(error);
                });
        } catch (error){
            const ans = {
                "no-network": "1"
            };
            return ans
        }
        return answer;
    }

    async function deleteForm(idForm){
        const allForms = await getAllForms();

        delete allForms[Number(idForm)];
        await AsyncStorage.removeItem('userForms');
        const obj = JSON.stringify(allForms);
        await AsyncStorage.setItem('userForms', obj);
        setNumberOfForms((prevValue) => Number(prevValue - 1));
        await AsyncStorage.setItem('numberOfForms', numberOfForm.toString());
    }

    async  function uploadOfflineForm(formId){
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        const allForms = await getAllForms();
        const myForm = allForms[Number(formId)].data;
        const answer = await sendForm(myForm, formattedDate,true);

        allForms[Number(formId)].isUploaded = answer.uploadedOk ;
        await AsyncStorage.removeItem('userForms');
        const obj = JSON.stringify(allForms);
        await AsyncStorage.setItem('userForms', obj);
        if (answer.uploadedOk){
            Alert.alert('Successful Upload', 'Form has successfully uploaded in the web');
        }

    }

    async  function updateStatusWhenFormSubmittedSuccessfully(){
        const allForms = await getAllForms();
        const length = Object.keys(allForms).length;
        console.log(length);
        console.log(allForms[Number(length - 1)]);
        allForms[Number(length - 1)].isUploaded = 1;
        console.log(allForms[Number(length - 1)]);
        await AsyncStorage.removeItem('userForms');
        const obj = JSON.stringify(allForms);
        await AsyncStorage.setItem('userForms', obj);
        //fixme: when the form statusis updates, the status shown is not updated
    }

    const value = {
        saveLocal :saveLocal,
        numberOfForms :numberOfForm,
        allForms : getAllForms,
        getAdmin : getAdmin,
        deleteForm :deleteForm,
        uploadOfflineForm : uploadOfflineForm
    }

    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>

}

export default FormsContextProvider