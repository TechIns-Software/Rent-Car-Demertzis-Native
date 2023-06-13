import React, { memo, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import {generateDataSet} from "./helpers";

export const LocalDataSetExample = memo(() => {
    const [selectedItem, setSelectedItem] = useState(null)

    const cars = [
        {registationNumber: ' XEX 9932 ' ,brand: ' BMW '},
        {registationNumber: ' ΧΖΟ 5667 ' ,brand: ' BMW '},
        {registationNumber: ' XEM 1568 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΖΝΑ1858 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΡΙ 4370 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΤΤ 3665 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΤΤ 4225 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΤΤ 4226 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΤΤ 4228 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΤΤ 4229 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΥΒ 5568 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΥΒ 5571 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΥΒ 5582 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΥΒ 5583 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΙΥΧ 1679 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΧΕΖ 8867 ' ,brand: ' CITROEN '},
        {registationNumber: ' ΧΕΚ 9491 ' ,brand: ' CITROEN '},
        {registationNumber: ' IYE 1697 ' ,brand: ' FIAT '},
        {registationNumber: ' ΖΤΑ 9165 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΟΒ 4277 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΡΙ 1883 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΤΒ 2147 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΤΒ 2150 ' ,brand: ' FIAT '},
        {registationNumber: ' ZNI 6574 ' ,brand: ' FIAT '},
        {registationNumber: ' ΒΚΗ 8965 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΤΕ 9863 ' ,brand: ' FIAT '},
        {registationNumber: ' ΙΤΕ 9864 ' ,brand: ' FIAT '},
        {registationNumber: ' ΖΝΙ 5488 ' ,brand: ' HYUNDAI '},
        {registationNumber: ' ΖΝΙ 6467 ' ,brand: ' HYUNDAI '},
        {registationNumber: ' ΒΚΜ 1874 ' ,brand: ' JEEP '},
        {registationNumber: ' ZNI 2641 ' ,brand: ' JEEP '},
        {registationNumber: ' IYA 1087 ' ,brand: ' MERCEDES '},
        {registationNumber: ' ΖΝΑ7622 ' ,brand: ' MERCEDES '},
        {registationNumber: ' ΧΕΗ 3701 ' ,brand: ' MERCEDES '},
        {registationNumber: ' ΧΕΗ 3702 ' ,brand: ' MERCEDES '},
        {registationNumber: ' ΧΕΙ 7023 ' ,brand: ' MINI '},
        {registationNumber: ' ΧΕΙ 7665 ' ,brand: ' MINI '},
        {registationNumber: ' ΧΕΙ 7750 ' ,brand: ' MINI '},
        {registationNumber: ' ΧΕΧ 5411 ' ,brand: ' MINI '},
        {registationNumber: ' ΖΧΡ3291 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3461 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3462 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3468 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3470 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2591 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2592 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2593 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2594 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2595 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2596 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΡ 8538 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6396 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6397 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6398 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6399 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΜΙΗ 4715 ' ,brand: ' OPEL '},
        {registationNumber: ' ΜΙΗ 4716 ' ,brand: ' OPEL '},
        {registationNumber: ' ΜΙΗ 4721 ' ,brand: ' OPEL '},
        {registationNumber: ' MIH 4211 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4337 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4338 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4340 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΖΝΑ1830 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΖΝΑ1832 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΒΚΖ 8132 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' ΙΥΗ 8464 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' ΧΖΤ 5637 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' BKH 9290 ' ,brand: ' TOYOTA '},
        {registationNumber: ' BKI 4031 ' ,brand: ' TOYOTA '},
        {registationNumber: ' BKI 9702 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ZXY 2953 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ΑΖΜ 4832 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ΖΝΙ 5726 ' ,brand: ' ΚΙΑ '},
        {registationNumber: ' ΙΟΒ 3461 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3462 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3468 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΟΒ 3470 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2591 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2592 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2593 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2594 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2595 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΙΥΚ 2596 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΡ 8538 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6396 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6397 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6398 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΥΝΧ 6399 ' ,brand: ' NISSAN '},
        {registationNumber: ' ΜΙΗ 4715 ' ,brand: ' OPEL '},
        {registationNumber: ' ΜΙΗ 4716 ' ,brand: ' OPEL '},
        {registationNumber: ' ΜΙΗ 4721 ' ,brand: ' OPEL '},
        {registationNumber: ' MIH 4211 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4337 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4338 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' MIH 4340 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΖΝΑ1830 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΖΝΑ1832 ' ,brand: ' PEUGEOT '},
        {registationNumber: ' ΒΚΖ 8132 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' ΙΥΗ 8464 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' ΧΖΤ 5637 ' ,brand: ' RANGE ROVER '},
        {registationNumber: ' BKH 9290 ' ,brand: ' TOYOTA '},
        {registationNumber: ' BKI 4031 ' ,brand: ' TOYOTA '},
        {registationNumber: ' BKI 9702 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ZXY 2953 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ΑΖΜ 4832 ' ,brand: ' TOYOTA '},
        {registationNumber: ' ΖΝΙ 5726 ' ,brand: ' ΚΙΑ '},

    ];

    const carNames = cars.map((car,index) => ( { id:index, title: car.registationNumber.trim()}) );
    console.log(carNames);

    const dataSet = useMemo(generateDataSet, [])

    return (
        <>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                onSelectItem={setSelectedItem}
                dataSet={[...carNames]}
                ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
                getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                showChevron={true}
          

            />
            <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
        </>
    )
})