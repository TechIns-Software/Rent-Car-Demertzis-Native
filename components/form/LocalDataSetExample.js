import React, { memo, useMemo, useState } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import {generateDataSet} from "./helpers";
import {cars} from "./data";
import {RFPercentage} from "react-native-responsive-fontsize";

export const LocalDataSetExample = memo(({style,label,onchangeText}) => {

    const carNames = cars.map((car,index) => ( { id:index, title: car.registrationNumber.trim()}) );

    function giveValue(value){
        if (value !=null){
            onchangeText(value.title);
        }else {
            onchangeText('');
        }
    }
    function getValue(value){
        onchangeText(value);
    }

    return (
        <View style={style.rowInput}>
            <Text style={styles.label}>{label}</Text>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                onSelectItem={giveValue}
                dataSet={[...carNames]}
                ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
                getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                showChevron={true}
                onChangeText={getValue}
            />
        </View>
    )
})

const  styles = StyleSheet.create({
    inputContainer :{
        marginHorizontal :4,
        marginVertical : 16,

    },
    label :{
        fontSize: RFPercentage(1.4),
        color:'#000000',
        fontWeight :'bold',
        marginBottom :4
    }});