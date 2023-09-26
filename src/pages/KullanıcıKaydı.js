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
import CheckBox from './components/CheckBox';
import { useState } from 'react';

const db = DatabaseConnection.getConnection();

export default function KullanıcıKaydı({ navigation }){
  let [inputUserTc, setInputUserTc] = useState('');
  let searchUser = () => {
    console.log(inputUserTc);
  
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user_register WHERE user_tc=?',
        [inputUserTc],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
             navigation.navigate('TümKullanıcılar') 
   
          } else {
            alert('Kullanıcı bulunamadı!');
           }
        }
      );
    });
  };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
       <View style={{ flex: 1, backgroundColor: 'white', paddingTop:200}}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                <Mytextinput
                  placeholder="TC"
                  onChangeText={
                    (userTC) => setInputUserTc(userTC)
                  }
                   style={{ padding: 10 }}
                  keyboardType="numeric"
  
                />
                
               <Mybutton title="Giriş Yap" 
               customClick={searchUser}/>
              
              <Mybutton title="Kaydol" 
  
               customClick={() => navigation.navigate('KullanıcıBilgileri') }/>
              
                </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
}
 