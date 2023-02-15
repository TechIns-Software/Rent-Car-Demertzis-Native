import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecentlyBox from '../components/RecentlyBox';
import {DUMMY_CONTNENT} from "../store/auth-context";
import {getFormattedDate} from "../util/date";

function renderApplications(applications){
   return <RecentlyBox
        id={applications.item.id}
        type={applications.item.type}
        date={ getFormattedDate(applications.item.date)}
        isSent={applications.item.isSent}/>
}

function RecentlyApplications(){
    return <View style={styles.container} >
        <FlatList
            data={DUMMY_CONTNENT}
            renderItem={renderApplications}
            keyExtractor={(item) => item.id }
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