import React, { useEffect } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import DropDownListStatus from './components/DropDownStatus';
import Mytext from './components/Mytext';
import { useState } from 'react';

const db = DatabaseConnection.getConnection();

const EgitimMeslek = ({ navigation }) => {
  let [userworkStatus, setUserWorkStatus] = useState(''); 
  let [userProfession, setUserProfession] = useState('');

  console.log(userworkStatus,userProfession);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_work_information'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_work_information', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_work_information(user_id INTEGER PRIMARY KEY AUTOINCREMENT,user_workStatus VARCHAR(20) , user_profession VARCHAR(20))',
              []
            );
          }
          console.log('item 2:', res.rows);
        }
      );
    });
  }, []); 

  let register_user_status = () => {
    console.log(userworkStatus,userProfession);
 
    
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user_work_information (user_workStatus,user_profession) VALUES (?,?)',
      [userworkStatus,userProfession],

      (tx, results) => {
        console.log('Results', results.rowsAffected);

        if (results.rowsAffected > 0) {
          Alert.alert(
            'Bilgilendirme',
            'Kayıt yapıldı',
            [
              {
                text: 'Ok',
                onPress: () =>   navigation.navigate('EgitimYetkinlik') 

              },
            ],
            { cancelable: false }
          );

        } else alert('Kayıt Yapılamadı!!!');
      }
    );

  });
};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white',paddingTop:200}}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Çalışma Durumu" />
               <DropDownListStatus  onSelect={
                  (userworkStatus) => setUserWorkStatus
                (userworkStatus)
              }></DropDownListStatus>
              <Mytextinput
                placeholder="Meslek"
                onChangeText={
                  (userProfession) => setUserProfession(userProfession)
                }
                style={{ padding: 10 }}
              />
             
              <Mybutton title="İleri"
                            customClick={register_user_status}/>
                             
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EgitimMeslek;