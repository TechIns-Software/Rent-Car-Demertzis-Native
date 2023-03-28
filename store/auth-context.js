import {createContext,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export  const DUMMY_CONTNENT = [
    {
        id : 1,
        data : {
            driverFullName: 'sad',
            vehicleType : 'sad'
        },
        isSent: 1,
        date : new Date('2022-11-19'),

    },
    {
        id : 2,
        data : {
            driverFullName: 'sad',
            vehicleType : 'sad'
        },
        isSent: 1,
        date : new Date('2022-11-19'),

    }

]


export  const AuthContext = createContext({
    username:'',
    fullName:'',
    token :'',
    idAdmin :'',
    isAuthenticated :false,
    authenticate :(username,fullName,token,idAdmin,isAuthenticated) =>{},
    logout :() =>{},
});

function  AuthContextProvider({children}){
    const [authInfo,setAuthToken] = useState({
        username:'',
        fullName:'',
        token :'',
        idAdmin :'',
        isAuthenticated :false,
    });

    function authenticate(username,fullName,token,idAdmin,isAuthenticated){

        setAuthToken({
            username:username,
            fullName:fullName,
            token :token,
            idAdmin :idAdmin,
            isAuthenticated :isAuthenticated,
        });

        AsyncStorage.setItem('username',username);
        AsyncStorage.setItem('fullName',fullName);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('idAdmin',idAdmin.toString());
        AsyncStorage.setItem('isAuthenticated',isAuthenticated.toString());
    }

    function logout(){
        setAuthToken({
            username:'',
            fullName:'',
            token :'',
            idAdmin :'',
            isAuthenticated :0,
        })
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('fullName');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('idAdmin');
        AsyncStorage.removeItem('isAuthenticated');
        AsyncStorage.removeItem('numberOfForms');
        AsyncStorage.removeItem('userForms');
    }


    const value = {
        authInformation:authInfo,
        isAuthenticated :!!authInfo.token,
        authenticate :authenticate,
        logout :logout,
        fullName:authInfo.fullName
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthContextProvider