import React from "react";
import { Button, Text } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import Spacer from "./Spacer";

const Form = ({ fields, error, onSubmit, buttonText }) => {
  return (
    <View>
      {fields.map((field, idx) => (
        <Spacer key={idx}>
          <TextInput
            key={idx}
            placeholder={field.placeholder}
            onChangeText={field.onChangeText}
            value={field.value}
            secureTextEntry={field.isPassword || false}
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Spacer>
      ))}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Button title={buttonText} onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 5
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
});

export default Form;
