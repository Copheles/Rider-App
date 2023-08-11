import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ toScreen, text }) => {
  const navigation = useNavigation();

  const navigateToScreen = () => {
    navigation.navigate(toScreen);
  };

  return (
    <TouchableOpacity onPress={navigateToScreen}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link:{
    color: 'blue',
  }
})

export default NavLink;
