import { useState } from 'react';
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
import DropDownListEducation from './components/DropDownEducation';
 import React, { useEffect } from 'react';

const db = DatabaseConnection.getConnection();

const EgitimYetkinlik = ({ navigation }) => {
  let [usereducationStatus, setUserEducationStatus] = useState(''); 
  let [userSchool, setUserSchool] = useState('');
  let [userDepartmant, setUserDepartmant] = useState('');
  let [userFinishDate, setUserFinishDate] = useState('');
  let [userCompetency, setUserCompotency] = useState('');
  console.log(usereducationStatus,userSchool,userDepartmant,userFinishDate,userCompetency);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_education'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_education', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_education(user_id INTEGER PRIMARY KEY AUTOINCREMENT,user_educationStatus VARCHAR(20) , user_school VARCHAR(20) , user_departmant VARCHAR(20) , user_finish_date VARCHAR(20) , user_compedency VARCHAR(20))',
              []
            );
          }
          console.log('item 2:', res.rows);
        }
      );
    });
  }, []); 

  let register_user_education = () => {
    console.log(usereducationStatus,userSchool,userDepartmant,userFinishDate,userCompetency);

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user_education(user_educationStatus , user_school, user_departmant, user_finish_date, user_compedency) VALUES (?,?,?,?,?)',
      [usereducationStatus,userSchool,userDepartmant,userFinishDate,userCompetency],

      (tx, results) => {
        console.log('Results', results.rowsAffected);

        if (results.rowsAffected > 0) {
          Alert.alert(
            'Bilgilendirme',
            'Kayıt yapıldı',
            [
              {
                text: 'Ok',
                onPress: () =>   navigation.navigate('CVPdf') 
 
              },
            ],
            { cancelable: false }
          );

        } else alert('Kayıt Yapılamadı!');
      }
    );

  });
    console.log(usereducationStatus,userSchool,userDepartmant,userFinishDate,userCompetency);
 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                <DropDownListEducation onSelect={
                  (usereducationStatus) => setUserEducationStatus
                (usereducationStatus)}
                ></DropDownListEducation>
              <Mytextinput
                placeholder="Okul Adı"
                onChangeText={
                  (userSchool) => setUserSchool(userSchool)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Bölüm"
                onChangeText={
                  (userDepartmant) => setUserDepartmant(userDepartmant)
                }
                style={{ padding: 10 }}
              />
                <Mytextinput
                placeholder="Mezuniyet Yılı"
                onChangeText={
                  (userFinishDate) => setUserFinishDate(userFinishDate)
                }
                style={{ padding: 10 }}
              />
            <Mytextinput
                placeholder="Yetkinlik Dereceleri"
                onChangeText={
                  (userCompetency) => setUserCompotency(userCompetency)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Mybutton title="İleri"
                            customClick={register_user_education}/>
                             
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EgitimYetkinlik;