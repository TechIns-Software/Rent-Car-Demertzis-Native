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
    driverFullName:'',
    token :'',
    idAdmin :'',
    isAuthenticated :false,
    authenticate :(username,driverFullName,token,idAdmin,isAuthenticated) =>{},
    logout :() =>{},
});

function  AuthContextProvider({children}){
    const [authInfo,setAuthToken] = useState({
        username:'',
        driverFullName:'',
        token :'',
        idAdmin :'',
        isAuthenticated :false,
    });

    function authenticate(username,driverFullName,token,idAdmin,isAuthenticated){

        setAuthToken(prevState => ({
            username:username,
            driverFullName:driverFullName,
            token :token,
            idAdmin :idAdmin,
            isAuthenticated :isAuthenticated,
        }));

        AsyncStorage.setItem('username',username);
        AsyncStorage.setItem('driverFullName',driverFullName);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('idAdmin',JSON.stringify(idAdmin));
        AsyncStorage.setItem('isAuthenticated',JSON.stringify(isAuthenticated));
    }

    function logout(){
        setAuthToken({
            username:'',
            driverFullName:'',
            token :'',
            idAdmin :'',
            isAuthenticated :0,
        })
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('driverFullName');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('idAdmin');
        AsyncStorage.removeItem('isAuthenticated');
    }

    function sendForm(formInputs) {
        formInputs.action = "uploadForm";
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

        try {
            fetch('https://a-omega.com.gr/admin/request/', {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                headers: myHeaders,
                body: data.toString() // body data type must match "Content-Type" header
            })
                .then((response) => response.json())
                .then((response) => {
                    //todo handle response
                });
        } catch (error){
            Alert.alert('Something Went wrong','error')
        }
    }

    const value = {
        authInformation:authInfo,
        isAuthenticated :!!authInfo.token,
        authenticate :authenticate,
        logout :logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthContextProvider