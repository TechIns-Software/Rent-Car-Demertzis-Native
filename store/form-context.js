import {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {Alert} from "react-native";


export  const FormsContext = createContext({
    numberOfForms :1,
    saveLocal : (isUploaded,data)=>{},
    getAdmin : ()=>{},
    upload : ()=>{},
    previewForm :(idForm) =>{},
    allForms : ()=>{},
    deleteAllForms : ()=>{},
    deleteForm : (idForm)=>{},
    uploadOfflineForm :  (idForm)=>{},
    getForm :  (idForm)=>{},
    updateLocalForm : (formInputs,editedFormId,creationDate)=>{}
});

function  FormsContextProvider({children}){
    const [numberOfForms,setNumberOfForms] = useState(1)


    async function saveLocal(data) {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        var answer = {};
        answer.uploadedOk = 0;
        let lastId = await getLastId();
        const formInfo = {
            isUploaded: answer.uploadedOk ?? 0,
            data: data,
            date: formattedDate
        }
        const result = await storeData({[lastId + 1]: formInfo});
        return result;
    }

    async function storeData(obj) {

        try {
            var jsonObj = JSON.stringify(obj);
            await AsyncStorage.mergeItem('userForms', jsonObj);
            return true;
        } catch (e) {
            console.log(e)
            return false;
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
        return AsyncStorage.getItem('userForms').then((res) => {
            return JSON.parse(res);
        });
    }

    async function deleteAllForms() {
        // this is for remove keys in local storage
        await AsyncStorage.removeItem('numberOfForms');
        await AsyncStorage.removeItem('userForms');
        console.log('All Forms Deleted !')
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
        console.log('test_1');

        formInputs.action = "uploadForm";
        formInputs.idAdmin = idAdmin;
        formInputs.digest = digest;
        formInputs.uniqueHash = uniqueHash;
        const timeUploaded = date;
        formInputs.timeUploaded = timeUploaded;
        const toUrlEncoded = (obj) => {
            console.log('test_2');
            return Object
                .keys(obj)
                .map(
                    k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
                .join('&');
        }
        console.log('test_3');
        const data = toUrlEncoded(formInputs);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        // myHeaders.append('Accept', 'application/json');
        var answer = 0;
        console.log('test_4');
        try {
            console.log('test_5');
            answer = await axios.post('https://a-omega.com.gr/admin/request/', data)
                .then(function (response) {
                    console.log('test_6');
                return response.data
                }).catch(function (error) {
                    console.log('test_7');
                    console.log('error');
                    console.log(error);
                });
        } catch (error){
            console.log('test_8');
            const ans = {
                "no-network": "1"
            };
            return ans
        }
        console.log('test_9');
        return answer;
    }

    async function deleteForm(idForm){
        const allForms = await getAllForms();
        delete allForms[Number(idForm)];
        await AsyncStorage.removeItem('userForms');
        const obj = JSON.stringify(allForms);
        await AsyncStorage.setItem('userForms', obj);
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

    async function getForm(idForm){
        const allForms = await getAllForms();
        const myForm = allForms[Number(idForm)];
        return myForm;
    }

    async function updateLocalForm(data,idForm,currentDate){
        const formInfo = {
            isUploaded: 0,
            data :data,
            date:currentDate
        }
        await deleteForm(idForm);
        await storeData({[idForm]:formInfo});
        return true;
    }

    const value = {
        saveLocal :saveLocal,
        numberOfForms :numberOfForms,
        allForms : getAllForms,
        deleteAllForms : deleteAllForms,
        getAdmin : getAdmin,
        deleteForm :deleteForm,
        getForm :getForm,
        uploadOfflineForm : uploadOfflineForm,
        updateLocalForm :updateLocalForm
    }

    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>

}

export default FormsContextProvider