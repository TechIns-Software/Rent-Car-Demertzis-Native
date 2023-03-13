import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



function HomeScreen (){


    return <View style={styles.container}>

        <View style={ styles.imageStyle} >
            <ImageBackground resizeMode={'contain'} style={ styles.image}  source={ {uri:'https://www.superisemykonos.com/image/logo.png'}}>
            </ImageBackground>
        </View>

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
        height:'50%',

    },
    image:{
        width: '100%',
        height:'100%',
    }

})

export default HomeScreen;