import React from 'react';
import { View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
const status=["Öğrenci","Çalışan","İşsiz"];
 
const DropDwnGender = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: 'blue',
         backgroundColor:'white',
         
      }}>
      <SelectDropdown
       data={status}
       onSelect={props.onSelect}
       defaultButtonText="Seçiniz.."

       />
    </View>
  );
};

export default DropDwnGender;