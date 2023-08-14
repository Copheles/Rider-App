import React, { useContext, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Context as ProfileContext } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-native';

const ProfileScreen = () => {

  const { state, getUserProfile, clearProfile } = useContext(ProfileContext);
  const { signOut } = useAuth();

  useEffect(() => {
    getUserProfile();
  }, [])

  const handleLogout = () => {
    clearProfile();
    signOut();
  }

  return (
    <View>
      <Text>User Name: {state.userProfile ? state.userProfile.name : 'Loading...'}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
