import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function RecentlyBox(props) {
    return         <View style={styles.container} >
            <View style={styles.infoBox} >
                <Text style={styles.label}>#{props.id}</Text>
                <Text style={styles.label} >Τύπος:<Text style={styles.value} > {props.type}</Text></Text>
                <Text style={styles.label}>Ημερομηνία:<Text style={styles.value}>{props.date} </Text></Text>
            </View>

            <View style={styles.isSentBox}>
                <Text> {props.isSent ?
                    <Ionicons name={'ios-information-circle'} size={35} color={'green'}/>
                    : <Ionicons name={'ios-flag'} size={35} color={'red'}/>}</Text>
            </View>
        </View>}

const styles = StyleSheet.create({
    container:{
        padding :12,
        marginVertical :8,
        backgroundColor :'#f8a81b',
        flexDirection :'row',
        justifyContent :'space-between',
        borderRadius : 6,
        /// SHADOW FOR ANDROID AND IOS
        elevation : 3,
        shadowOffset :{width:1,height:1},
        shadowOpacity:0.4
    },
    label :{
        color :'black',
        fontWeight : '500'
    },
    value:{
        color :'rgb(225,65,65)',
        fontWeight : 'bold',
        fontSize : 16
    }


});

export default RecentlyBox;