import React from 'react';
import { View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
let countries;
fetch("src/pages/components/DropDownList.js")
.then(res =>res.json())
.then(data=> initialize(data))
.catch(err => console.log("Error:", err));
const arrayCuntry=[]
function initialize(countriesData){
  countries=countriesData;
  let options="";
  for(let i=0; i<countries.length;i++){
  console.log("arrayCuntry",countries[i])
  }
} 
const DropDwn = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: 'blue',
         backgroundColor:'white'
      }}>
      <SelectDropdown
       data={arrayCuntry}
       />
    </View>
  );
};

export default DropDwn;