import React from 'react';
import { View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
const gender=["Kadın","Erkek"];
 
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
       data={gender}
       onSelect={props.onSelect}
       defaultButtonText="Cinsiyet"

       />
    </View>
  );
};

export default DropDwnGender;