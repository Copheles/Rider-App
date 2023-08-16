import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Form from "../components/Form";
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const { state, signUp, clearErrorMessage, tryLocalSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();
  const handleSignUp = () => {
    console.log(email, password, username);
    signUp({ email, password, username });
  };

  const fields = [
    {
      placeholder: "Username",
      onChangeText: setUsername,
      value: username,
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

  useEffect(() => {
    tryLocalSignIn()
  },[])

  useEffect(() => {
    if (state.errorMessage) {
      const timeout = setTimeout(() => {
        clearErrorMessage();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.errorMessage]);

  useEffect(() => {
    const unscribe = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return unscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.header}>Sign Up For Rider</Text>
      </Spacer>
      <Form
        fields={fields}
        error={state.errorMessage}
        onSubmit={handleSignUp}
        buttonText="Sing Up"
      />
      <Spacer>
        <NavLink
          toScreen="SignIn"
          text="Already have an account? Go to SignIn"
        />
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
    textAlign: "center",
  },
});

export default SignUpScreen;
