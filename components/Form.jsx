import React from "react";
import { Button } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import Spacer from "./Spacer";

const Form = ({ fields, onSubmit, buttonText, hasPassword }) => {
  return (
    <View>
      {fields.map((field, idx) => (
        <Spacer>
          <TextInput
            key={idx}
            placeholder={field.placeholder}
            onChangeText={field.onChangeText}
            value={field.value}
            secureTextEntry={field.isPassword || false}
            style={styles.textInput}
          />
        </Spacer>
      ))}
      <Button title={buttonText} onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 5
  }
});

export default Form;
