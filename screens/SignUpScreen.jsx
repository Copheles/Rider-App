import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { View, StyleSheet } from "react-native";
import Form from "../components/Form";
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const handleSignUp = () => {};

  const fields = [
    {
      placeholder: "Username",
      onChangeText: setUsername,
      value: username
    },
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
        <Text style={styles.header}>Sign Up For Rider</Text>
      </Spacer>
      <Form fields={fields} onSubmit={handleSignUp} buttonText="Sing Up" />
      <Spacer>
        <NavLink toScreen="SignIn" text="Already have an account? Go to SignIn" />
      </Spacer>
    </View>
  );
};

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
});

export default SignUpScreen;
