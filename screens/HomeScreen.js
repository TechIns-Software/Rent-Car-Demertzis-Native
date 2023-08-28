import {Button, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import {shareAsync} from  'expo-sharing';


function HomeScreen (){

    const downloadTest = async () =>{
    const filename = 'test.json';
    const result = await  FileSystem.downloadAsync(
    'https://techins.gr/demo/test.json',FileSystem.documentDirectory + filename
    );
    console.log(result);
    save(result.uri)
    }

    const save = async (uri) =>{
    shareAsync(uri)
    }

    return <View style={styles.container}>

        <View style={ styles.imageStyle} >
            <ImageBackground resizeMode={'contain'} style={ styles.image}  source={ require('../assets/img/logo.png')}>
            </ImageBackground>
        </View>
        <Button title={'Test Download'} onPress={downloadTest}></Button>

        <Text style={styles.title}>Welcome Back </Text>
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