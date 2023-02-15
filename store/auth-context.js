import {createContext,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            isAuthenticated :true,
        }));

        AsyncStorage.setItem('username',username);
        AsyncStorage.setItem('fullName',fullName);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('idAdmin',idAdmin);
        AsyncStorage.setItem('isAuthenticated','1');
        console.log(authInfo)
    }

    function logout(){
        setAuthToken({
            username:'',
            fullName:'',
            token :'',
            idAdmin :'',
            isAuthenticated :false,
        })
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('fullName');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('idAdmin');
        AsyncStorage.removeItem('isAuthenticated');
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