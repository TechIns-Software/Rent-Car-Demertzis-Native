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
    deleteForm : (idForm)=>{}
});

function  FormsContextProvider({children}){
    const [numberOfForm,setNumberOfForms] = useState(0)


    async function saveLocal(data){
        // we check the connection START
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            Alert.alert('Internet Connection problem', 'No internet found but click ok to continue local');
            return state.isConnected;
        });

        const areWeOnline =  unsubscribe();
        // we check the connection END

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        const answer = await sendForm(data, formattedDate);
        // console.log(answer);
        let lastId = await getLastId();
        const formInfo = {
            isUploaded: answer.uploadedOk ?? 0,
            data :data,
            date:formattedDate
        }

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

    async function getAdmin() {
        const idAdmin = await AsyncStorage.getItem('idAdmin').then((res) => {
            return res;
        });
        const token = await AsyncStorage.getItem('token').then((res) => {
            return res;
        });

        return {idAdmin: idAdmin, token: token};
    }

    async function sendForm(formInputs, date) {
        const adminObj = await getAdmin();
        const idAdmin = adminObj['idAdmin'];
        const uniqueHash = Date.now() + (Math.random() + 1).toString(36) + String(idAdmin).padStart(3, '0');
        //todo calculate digest
        const hashToken = adminObj['token'];
        const digest = "sadsad";
        const timeUploaded = date;
        formInputs.action = "uploadForm";
        formInputs.idAdmin = idAdmin;
        formInputs.digest = digest;
        formInputs.uniqueHash = uniqueHash;
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
            // answer = fetch('https://a-omega.com.gr/admin/request/', {
            //     method: 'POST',
            //     mode: 'cors', // no-cors, *cors, same-origin
            //     cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            //     headers: myHeaders,
            //     body: data.toString() // body data type must match "Content-Type" header
            // })
            //     .then((res) => {
            //         if(!res.ok) {
            //             return res.text().then(text => { throw new Error(text) })
            //         }
            //         else {
            //             return res.json();
            //         }
            //     })
            //     .then((response) => {
            //         console.log("returned the below");
            //         console.log(response);
            //         return response;
            //     }).catch(error => {
            //         console.log(JSON.stringify(error));
            //         console.log(error);
            //     }).then(errorResponse => errorResponse);
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

    const value = {
        saveLocal :saveLocal,
        numberOfForms :numberOfForm,
        allForms : getAllForms,
        getAdmin : getAdmin,
        deleteForm :deleteForm
    }

    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>

}

export default FormsContextProvider