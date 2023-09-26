import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import KullanıcıKaydı from './src/pages/KullanıcıKaydı';
import KullanıcıBilgileri from './src/pages/KullanıcıBilgileri';
import EgitimMeslek from './src/pages/EgitimMeslek';
import CVPdf from './src/pages/CVPdf';
import TümKullanıcılar from './src/pages/TümKullanıcılar';
import EgitimYetkinlik from './src/pages/EgitimYetkinlik';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KullanıcıKaydı">
        <Stack.Screen
          name="KullanıcıKaydı"
          component={KullanıcıKaydı}
          options={{
            title: 'Kullanıcı Kaydı',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="KullanıcıBilgileri"
          component={KullanıcıBilgileri}
          options={{
            title: 'Kullanıcı Bilgileri',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EgitimMeslek"
          component={EgitimMeslek}
          options={{
            title: 'Eğitim ve Meslek Bilgileri',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="CVPdf"
          component={CVPdf}
          options={{
            title: 'CV ve Proje Alanı',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="TümKullanıcılar"
          component={TümKullanıcılar}
          options={{
            title: 'Tüm Kullanıcıları Görüntüle',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EgitimYetkinlik"
          component={EgitimYetkinlik}
          options={{
            title: 'Eğitim Seviyesi ve Yetkinlik Bilgileri',
            headerStyle: {
              backgroundColor: '#132143',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;