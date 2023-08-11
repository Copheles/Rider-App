import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import {View, StyleSheet, Text} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation(); // Hook for navigation

  return (
    <View>
      <Text>Welcome to Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};


const styles = StyleSheet.create({})

export default HomeScreen;
