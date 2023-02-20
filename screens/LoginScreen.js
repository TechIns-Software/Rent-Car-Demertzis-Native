import AuthContent from '../components/Auth/AuthContent';
import { Alert} from  'react-native';
import {useContext, useState} from "react";
// import  {login} from '../util/auth';
import {AuthContext} from "../store/auth-context";

function LoginScreen() {
    const [isAuthenticating,setAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    async  function  loginHandler({email,password}){
        var data = {
            username: email,
            password: password,
            action: "login"
        };
        const toUrlEncoded = (obj) => {
            return Object
                .keys(obj)
                .map(
                k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
                .join('&');
        }
        data = toUrlEncoded(data);
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
                    // console.log(response);
                    if (response['success'] === 1) {
                        authCtx.authenticate(email,response.fullName,response.specialHash,response.idAdmin,1);

                    } else {
                        Alert.alert('Ανεπιτυχής Σύνδεση', response['status'])
                    }

                });
        } catch (error){
            Alert.alert('Something Went wrong','error')
        }


    }


    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;