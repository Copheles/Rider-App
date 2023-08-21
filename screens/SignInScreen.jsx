import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Spacer from "../components/Spacer";
import Form from "../components/Form";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "react-native";

const SignInScreen = () => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters.`)
      .required("Password is required"),
  });

  const navigation = useNavigation();

  const handleSignIn = () => {
    signIn({ email, password });
  };

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
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={signIn}
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
            <Text style={styles.header}>Sign In For Rider</Text>
          </Spacer>
          <Spacer>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
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
              onBlur={handleBlur("password")}
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
            <Button title="Sign In" onPress={handleSubmit} />
          </Spacer>
          <Spacer>
            <NavLink
              toScreen="SignUp"
              text="Dont have an account? Sign up instead"
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
});

export default SignInScreen;
