import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import Map from '../components/Map';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // const [err] = useLocation(true, ()=> {
  //   console.log('hello')
  // })

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Map />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({})

export default HomeScreen;
