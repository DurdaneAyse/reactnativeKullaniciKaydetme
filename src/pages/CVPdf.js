import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import MybuttonAdd from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const CVPdf = ({ navigation }) =>{
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});
 
  let searchUser = () => {
    console.log(inputUserId); 
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('CV eklenecek');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="CV*" />
          <MybuttonAdd
            title="+" customClick={searchUser}
            style={{ padding: 10}}
          />
            <Mytextinput
                placeholder="Projeler"
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
             <Mybutton title="Kaydı Tamamla"
                           customClick={() =>  navigation.navigate('KullanıcıKaydı')}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CVPdf;