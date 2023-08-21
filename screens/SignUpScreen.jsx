import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Form from "../components/Form";
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import * as yup from "yup";

const SignUpScreen = () => {
  const { state, signUp, clearErrorMessage, tryLocalSignIn } =
    useContext(AuthContext);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters.`)
      .required("Password is required"),
    username: yup.string().required("Username is required"),
  });

  const navigation = useNavigation();

  useEffect(() => {
    tryLocalSignIn();
  }, []);

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
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validationSchema={validationSchema}
      onSubmit={signUp}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Spacer>
            <Text style={styles.header}>Sign Up For Rider</Text>
          </Spacer>
          <Spacer>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
          </Spacer>
          <Spacer>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
          </Spacer>
          <Spacer>
            <TextInput
              onChangeText={handleChange("username")}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
              autoCorrect={false}
              autoCapitalize="none"

            />
            {touched.username && errors.username && (
              <Text style={{ color: "red" }}>{errors.username}</Text>
            )}
          </Spacer>
          { state.errorMessage && <Text style={styles.errorMessage}>{state.errorMessage}</Text>}
          <Spacer>
            <Button title="Sign Up" onPress={handleSubmit} />
          </Spacer>
          <Spacer>
            <NavLink
              toScreen="SignIn"
              text="Already have an account? Go to SignIn"
            />
          </Spacer>
        </View>
      )}
    </Formik>
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
});

export default SignUpScreen;
