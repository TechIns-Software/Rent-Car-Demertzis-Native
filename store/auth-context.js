import {createContext,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export  const DUMMY_CONTNENT = [
    {
        id:'e1',
        type : 'car',
        date : new Date('2022-11-19'),
        isSent : true
    },
    {
        id:'e2',
        type : 'car',
        date : new Date('2022-11-19'),
        isSent : false
    },
    {
        id:'e3',
        type : 'car',
        date : new Date('2022-12-29'),
        isSent : true
    },
    {
        id:'e4',
        type : 'motto',
        date : new Date('2022-12-19'),
        isSent : true
    },
    {
        id:'e5',
        type : 'car',
        date : new Date('2022-11-19'),
        isSent : true
    },
    {
        id:'e6',
        type : 'motto',
        date : new Date('2023-01-10'),
        isSent : false
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

        setAuthToken(prevState => ({
            username:username,
            fullName:fullName,
            token :token,
            idAdmin :idAdmin,
            isAuthenticated :isAuthenticated,
        }));

        AsyncStorage.setItem('username',username);
        AsyncStorage.setItem('fullName',fullName);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('idAdmin',JSON.stringify(idAdmin));
        AsyncStorage.setItem('isAuthenticated',JSON.stringify(isAuthenticated));
        console.log(authInfo)
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