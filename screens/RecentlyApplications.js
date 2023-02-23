import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecentlyBox from '../components/RecentlyBox';
import {DUMMY_CONTNENT} from "../store/auth-context";
import {getFormattedDate} from "../util/date";
import {createContext, useContext, useEffect, useState} from "react";
import {FormsContext} from "../store/form-context";


function renderApplications(applications){
    // console.log('=======================')
    // console.log(applications)
    // return <RecentlyBox
    //     id={applications.item.id}
    //     // type={applications.item.data.vehicleType}
    //     date={'2022-02-11'}
    //     // date={ getFormattedDate(applications.item.date)}
    //     isSent={applications.item.isSent}/>
}

function RecentlyApplications(){
    const [allFormsSaved, setAllFormsSaved] = useState([]);
    const formsCtx = useContext(FormsContext);
    useEffect(()=>{
        function  getAllForms(){
        formsCtx.allForms().then((res) => {
            if (res == null){
                setAllFormsSaved([]);
            } else {
                const newObj = [];
                var alreadyKeys = [];
                for (const [key, value] of Object.entries(res)) {
                    var tempInnerObj = {};
                    // if (alreadyKeys.includes(key)) {
                    //     continue;
                    // }

                    tempInnerObj.id = value.id;
                    tempInnerObj.data = value.data;
                    tempInnerObj.isSent = value.isUploaded;
                    tempInnerObj.date = value.date;
                    // alreadyKeys.push(key);
                    newObj.push(tempInnerObj);
                }
                // console.log(newObj);
                // AsyncStorage.removeItem(3);
                setAllFormsSaved(newObj);
                // console.log(res);

            }
        });
        }
        getAllForms();
    },[formsCtx.numberOfForms])


    return <View style={styles.container} >
        <FlatList
            data={allFormsSaved}
            renderItem={renderApplications}
            // keyExtractor={(item) => item.id }
        />
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e2e2'
    },
});

export default RecentlyApplications;