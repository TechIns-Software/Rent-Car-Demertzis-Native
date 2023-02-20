import {createContext,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export  const FormsContext = createContext({
    numberOfForms :0,
    saveLocal : (isUploaded,data)=>{},
    upload : ()=>{},
    previewForm :(idForm) =>{}
});

function  FormsContextProvider({children}){
    const [formInfo,setFormInfo] = useState({
        idForm:'',
        isUploaded:'',
        data:{
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
            fullNameBank: "",
            afterDateBank: "",
            regNumberBank: "",
            cardHolder: "",
            cardExpDate: "",
            cvv: ""
        }
    });
    const [numberOfForm,setNumberOfForms] = useState(0)


    async function   saveLocal(isUploaded,data){
        setFormInfo({
            isUploaded:isUploaded,
            data :data
        });

        let lastId =  await getLastId();

        await  storeData({[lastId]:formInfo},Number(lastId+1).toString());

        let allForms = await getAllForms();

        console.log(allForms)
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
                value = 1;
            }
            setNumberOfForms(value)

            return Number(value);
        } catch (e) {
            // error reading value
        }
    }

    async function getAllForms() {
        try {
            // await AsyncStorage.removeItem('userForms');
            // await AsyncStorage.removeItem('numberOfForms');
            var obj = await AsyncStorage.getItem('userForms').then((res) => {
                return JSON.parse(res);
            })
            if (obj == null){
                obj = [];
            }

            return obj;
        } catch (e) {
            // error reading value
        }
    }



    const value = {
        saveLocal :saveLocal,
        numberOfForms :numberOfForm
    }

    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>

}

export default FormsContextProvider