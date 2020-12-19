import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

export default function Input({validate, value, ...rest}) {
  return (
    <View style={styles.container}>
      <View
        style={
          validate && !value
            ? {...styles.inputContainer, ...styles.required}
            : styles.inputContainer
        }>
        <TextInput value={value} {...rest} style={styles.textInput} />
      </View>
      {validate && !value && (
        <Text style={styles.requiredText}>This field is required</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  inputContainer: {
    marginVertical: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    width: '100%',
  },
  textInput: {
    fontSize: 18,
  },
  required: {
    borderBottomColor: 'red',
  },
  requiredText: {
    color: 'red',
    fontSize: 12,
  },
});
