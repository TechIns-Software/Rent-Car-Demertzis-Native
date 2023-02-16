import React, { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ onOK,setScrollTrue,setScrollfalse }) => {
    const ref = useRef();

    const handleOK = (signature) => {
        console.log(signature);
        onOK(signature);
    };

    const handleClear = () => {
        ref.current.clearSignature();
    };

    const handleConfirm = () => {
        console.log("end");
        ref.current.readSignature();
    };

    const style = `.m-signature-pad--footer {display: none; margin: 0px;} body,html {
              width:90%; height: 200px;}`;

    return (
        <View style={styles.container}>
            <SignatureScreen ref={ref}   onOK={handleOK} webStyle={style} />
            <View style={styles.row}>
                <Button title="Καθαρισμός " onPress={handleClear} />
                <Button title="Υποβολή" onPress={handleConfirm} />
            </View>
        </View>
    );
};

export default Sign;

const styles = StyleSheet.create({
    container: {

        alignItems: "center",
        justifyContent: "center",
        height:450,
        padding: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "30%",
        alignItems: "center",
    },
});