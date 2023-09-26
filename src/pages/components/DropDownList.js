import React from 'react';
import { View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
let countries;
fetch("https://restcountries.com/v3.1/all")
.then(res =>res.json())
.then(data=> initialize(data))
.catch(err => console.log("Error:", err));
const arrayCuntry=[]
function initialize(countriesData){
  countries=countriesData;
  let options="";
  arrayCuntry.push("Ülke Seçiniz")
  for(let i=0; i<countries.length;i++){
     arrayCuntry.push(countries[i].altSpellings[1])
  console.log("arrayCuntry",countries[i].altSpellings[1] )
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
         backgroundColor:'white',
         }}>
      <SelectDropdown
        data={arrayCuntry}
        onSelect={props.onSelect}
        defaultButtonText="Ülke"
       />
    </View>
  );
};

export default DropDwn;