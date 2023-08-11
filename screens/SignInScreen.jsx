import React, { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Spacer from '../components/Spacer';
import Form from '../components/Form';
import NavLink from '../components/NavLink';

const SignInScreen = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleSignIn = () => {};

  const fields = [
    {
      placeholder: "Email",
      onChangeText: setEmail,
      value: email,
    },
    {
      placeholder: "Password",
      onChangeText: setPassword,
      value: password,
      isPassword: true,
    },
  ];
  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.header}>Sign In For Rider</Text>
      </Spacer>
      <Form fields={fields} onSubmit={handleSignIn} buttonText="Sing In" />
      <Spacer>
        <NavLink toScreen="SignUp" text="Dont have an account? Sign up instead" />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
  header: {
    fontSize: 20,
    textAlign: 'center'
  }
})

export default SignInScreen;
