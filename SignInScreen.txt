import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Spacer from "../components/Spacer";
import Form from "../components/Form";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {

  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation();
  console.log(email, password);
  
  const handleSignIn = () => {
    console.log(email, password);
    signIn({ email, password });
  };

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
    const unscribe = navigation.addListener('blur', () => {
      clearErrorMessage();
    })

    return unscribe;
  }, [navigation])

  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.header}>Sign In For Rider</Text>
      </Spacer>
      <Form
        fields={fields}
        error={state.errorMessage}
        onSubmit={handleSignIn}
        buttonText="Sign In"
      />
      <Spacer>
        <NavLink
          toScreen="SignUp"
          text="Dont have an account? Sign up instead"
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

export default SignInScreen;
