import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';

import Mytextinput from './components/Mytextinput';
import DropDownList from './components/DropDownList';
import DropDownListCity from './components/DropDownListCity';
import DropDownListGender from './components/DropDownListGender';
 import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import CheckBox from './components/CheckBox';
import { useState } from 'react';
import { ImageBackground,Dimensions,Image } from 'react-native';


const db = DatabaseConnection.getConnection();
const {width,height} = Dimensions.get('window');

const KullanıcıBilgileri = ({ navigation }) => {
  const [onay, setOnay] = useState(false); 
  let [userName, setUserName] = useState('');
  let [userSurName, setUserSurName] = useState('');
  let [userCountry, setUserCountry] = useState('');
  let [userdate, setUserDate] = useState('');
  let [userTC, setUserTC] = useState('');
  let [userTel, setUserTel] = useState('');
  let [userGender, setUserGender] = useState('');
  let [date, setDate] = useState(new Date())
   
  console.log(userName, userSurName, userCountry,userdate,userTC,userTel,userGender);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_register'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_register', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_register(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),user_surname VARCHAR(20),user_country VARCHAR(20),user_date VARCHAR(20),user_tc VARCHAR(20),user_phone VARCHAR(20),user_gender VARCHAR(20))',
              []
            );
          }
          console.log('item 2:', res.rows);
        }
      );
    });
  }, []); 

  let register_user = () => {
    console.log(userName,userSurName,userCountry,userdate,userTC,userTel,userGender);

    if (!userName) {
      alert('İsim yok!');
      return;
    }
    if (!userTC) {
      alert('TC boş bırakılamaz');
      return;
    }
    
 

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user_register ( user_name,user_surname,user_country,user_date,user_tc,user_phone,user_gender) VALUES (?,?,?,?,?,?,?)',
      [userName,userSurName,userCountry,userdate,userTC,userTel,userGender],

      (tx, results) => {
        console.log('Results', results.rowsAffected);

        if (results.rowsAffected > 0) {
          Alert.alert(
            'Bilgilendirme',
            'Kayıt yapıldı',
            [
              {
                text: 'Ok',
                onPress: () =>   navigation.navigate('EgitimMeslek') 

              },
            ],
            { cancelable: false }
          );

        } else alert('Kayıt yapılamadı!!');
      }
    );

  });
};
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                   
              <Mytextinput
                placeholder="Ad"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Soyad"
                onChangeText={
                  (usersurName) => setUserSurName(usersurName)
                }
                style={{ padding: 10 }}
              />
               <DropDownList onSelect={
                  (userCountry) => setUserCountry
                (userCountry)
                }
                text="sdxcvb"

                ></DropDownList>
               <Mytextinput
                placeholder="GG.AA.YYYY"
                onChangeText={
                  (userDate) => setUserDate(userDate)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              /> 
                <Mytextinput
                placeholder="TC"
                onChangeText={
                  (userTC) => setUserTC(userTC)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
                 <Mytextinput
                placeholder="Telefon"
                onChangeText={
                  (userTel) => setUserTel(userTel)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
            
              <DropDownListGender onSelect={
                  (userGender) => setUserGender
                (userGender)
              }></DropDownListGender>
              <CheckBox
              onPress={() => setOnay(!onay)}
                 title="KVKK onay metni"
                 isChecked={onay}
               /> 
             <Mybutton title="İleri" 
                disabled={!onay}
              
                customClick={() => onay ?  register_user() : alert("KVKK kabul ediniz ")}

             />
              </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    
  );
};

export default KullanıcıBilgileri;