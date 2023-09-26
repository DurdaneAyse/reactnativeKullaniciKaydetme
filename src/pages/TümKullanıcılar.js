import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import HomeScreen from './KullanıcıKaydı';

const db = DatabaseConnection.getConnection();

export default function ViewAllUser(props){
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user_register INNER JOIN table_user_work_information ON table_user_register.user_id=table_user_work_information.user_id INNER JOIN  table_user_education ON table_user_register.user_id=table_user_education.user_id ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#132143', marginTop: 20, padding: 30, borderRadius: 10 }}>
  

        <Text style={styles.textheader}>Ad</Text>
        <Text style={styles.textbottom}>{item.user_name}</Text>

        <Text style={styles.textheader}>Soyad</Text>
        <Text style={styles.textbottom}>{item.user_surname}</Text>

        <Text style={styles.textheader}>Ülke</Text>
        <Text style={styles.textbottom}>{item.user_country}</Text>

        <Text style={styles.textheader}>Doğum Tarihi</Text>
        <Text style={styles.textbottom}>{item.user_date}</Text>

        <Text style={styles.textheader}>TC</Text>
        <Text style={styles.textbottom}>{item.user_tc}</Text>

        <Text style={styles.textheader}>Telefon</Text>
        <Text style={styles.textbottom}>{item.user_phone}</Text>

        <Text style={styles.textheader}>Cinsiyet</Text>
        <Text style={styles.textbottom}>{item.user_gender}</Text>

        <Text style={styles.textheader}>Çalışma Durumu</Text>
        <Text style={styles.textbottom}>{item.user_workStatus}</Text>

        <Text style={styles.textheader}>Meslek</Text>
        <Text style={styles.textbottom}>{item.user_profession}</Text>

        <Text style={styles.textheader}>Eğitim Durumu</Text>
        <Text style={styles.textbottom}>{item.user_educationStatus}</Text>

        <Text style={styles.textheader}>Okul</Text>
        <Text style={styles.textbottom}>{item.user_school}</Text>

        <Text style={styles.textheader}>Bölüm</Text>
        <Text style={styles.textbottom}>{item.user_departmant}</Text>

        <Text style={styles.textheader}>Btirme Tarihi</Text>
        <Text style={styles.textbottom}>{item.user_finish_date}</Text>

        <Text style={styles.textheader}>Yetkinlik Dereceleri</Text>
        <Text style={styles.textbottom}>{item.user_compedency}</Text>

      
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textheader: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '700',
    marginTop:5

  },
  textbottom: {
    color: 'white',
    fontSize: 18,
  },
});

 