import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const MyImageButton = (props) => {

  return (
    
      <TouchableOpacity
        style={styles.button}
        onPress={props.customClick}>
  
        <Text style={styles.text}>
          {props.title}
        </Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#132143',
    color: '#ffffff',
    width:30,
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
  },
});


export default MyImageButton;