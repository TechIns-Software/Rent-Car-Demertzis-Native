import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function RecentlyBox(props){
    return <View style={styles.container}>
        <View style={styles.infoContainer} >
            <Text>Ασφάλεια {props.type}</Text>
            <Text>Ημερομηνία: {props.date}</Text>
        </View>

        <View style={styles.isSentContainer}>
            <Text>Εχει σταλθεί ? {props.isSent ? <Ionicons name={'ios-information-circle'} size={15}  color={'green'} />
                : <Ionicons name={'ios-flag'} size={15}  color={'red'} />}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection :'column',
        alignContent :'space-between',
        backgroundColor: '#bbea9c',
       border : 'solid',
        borderWidth : 1,
        borderColor :'gray',
        marginVertical :10,
        paddingVertical :5,
        borderRadius :10,
        width : '90%'

    },
    infoContainer : {


    },
    isSentContainer: {

    },
});

export default RecentlyBox;