import {Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



function HomeScreen (){


    return <View style={styles.container}>

        <Image style={ styles.imageStyle}   source={require("../assets/img/logo.png")} >
        </Image>
        <Text style={styles.title}>Καλώς Ήρθατε  </Text>
    </View>
}


const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor :'rgba(164,164,164,0.07)',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontWeight :'bold',
        fontSize : 25,
        marginVertical:50
    },
    imageStyle:{
        width: '50%',
        height:'50%'
    }

})

export default HomeScreen;