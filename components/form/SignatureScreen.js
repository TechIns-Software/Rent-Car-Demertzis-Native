import React, {useRef, useState} from "react";
import {StyleSheet, View, Button, Image, Text, Pressable, ScrollView, ImageBackground} from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ onOK,setScrollTrue,setScrollfalse,onBack,value=".",bgImage = "" }) => {
    const ref = useRef();
    const [signature,setSignature] = useState('.')

    const handleOK = (signature) => {
        // console.log(signature);
        onOK(signature);
        setSignature(signature)
    };

    const handleClear = () => {
        ref.current.clearSignature();
        setSignature('.')
    };

    const handleConfirm = () => {
        // console.log("end");
        ref.current.readSignature();
    };

    const style = `.m-signature-pad--footer {display: none; margin: 0px;} body,html {
              width:90%; height: 70%; }`;

    return (
        <View style={styles.generalContainer} >
            <View style={styles.container}>
                {bgImage == ""?  <SignatureScreen ref={ref} onOK={handleOK} webStyle={style}/> :
                    <SignatureScreen ref={ref}  bgSrc={bgImage}
                                     bgWidth={'100%'}
                                     bgHeight={'100%'} onOK={handleOK} webStyle={style}/>
                }

                <View style={styles.row}>
                    <Button title="Καθαρισμός " onPress={handleClear}/>
                    <Button title="Υποβολή" onPress={handleConfirm}/>
                </View>
            </View>
            <View style={styles.previewContainer}>
                <Text style={styles.previewText}>Signature Preview</Text>
                { bgImage == "" ?  <Image
                    resizeMode={"contain"}
                    style={styles.previewImage}
                    source={{ uri: `${value}`}}/>:
                    <ImageBackground
                        resizeMode={"cover"}
                        style={{width: '90%', height: '70%'}}
                                     source={ {uri:bgImage}}>
                    <Image
                        resizeMode={"cover"}
                        style={styles.previewImage}
                        source={{ uri: `${value}`}}/>
                    </ImageBackground>}

            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={onBack} style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Πίσω</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Sign;

const styles = StyleSheet.create({
    generalContainer:{
        flexDirection:'column',
        height:'100%'
    },
    container: {
        borderWidth:1,
        alignItems: "center",
        justifyContent: "center",
        height:'50%',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        alignItems: "center",
    },
    previewContainer: {
        borderWidth:0,
        height:'30%',
    },
    previewText:{
        fontSize:29,
      color:'#3a8af1'
    },
    previewImage:{
        width:'90%',
        height: '70%',
    },
    buttonContainer:{
        marginVertical:15,
        height:'10%',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        textAlign:'center',
        alignItems:'center',
        backgroundColor: '#f1950d',
    },
    textStyle:{
        fontSize:16,
        color:'white'
    }

});