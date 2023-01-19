import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RecentlyBox from '../components/RecentlyBox';
function RecentlyApplications(){
    return <View style={styles.container} >
        <RecentlyBox type={'Αυτοκινήτου'} date={'01-05-2023'} isSent={true}/>

        <RecentlyBox type={'Μηχανής'} date={'01-15-2023'} isSent={false}/>

        <RecentlyBox type={'Μηχανής'} date={'01-05-2023'} isSent={true}/>

    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default RecentlyApplications;