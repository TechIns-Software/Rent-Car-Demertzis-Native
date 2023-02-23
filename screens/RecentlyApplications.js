import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecentlyBox from '../components/RecentlyBox';
import {DUMMY_CONTNENT} from "../store/auth-context";
import {getFormattedDate} from "../util/date";
import {createContext, useContext, useEffect, useState} from "react";
import {FormsContext} from "../store/form-context";


function renderApplications(applications){

    return <RecentlyBox
        id={applications.index}
        // type={applications.item.data.vehicleType}
        date={applications.item.date.toString()}
        // date={ getFormattedDate(applications.item.date)}
        isSent={applications.item.isSent}/>
}

function RecentlyApplications(){
    const [allFormsSaved, setAllFormsSaved] = useState(DUMMY_CONTNENT);
    const formsCtx = useContext(FormsContext);
    useEffect(()=>{
        function  getAllForms(){
        formsCtx.allForms().then((res) => {
            if (res == null){
                setAllFormsSaved([    {
                    id : -55,
                    data : {
                        driverFullName: 'sad',
                        vehicleType : 'sad'
                    },
                    isSent: 1,
                    date : new Date('2022-11-19'),

                },]);
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

    },
});

export default RecentlyApplications;