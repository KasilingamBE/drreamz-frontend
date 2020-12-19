import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const NextButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>NEXT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b4094',
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 10,
    zIndex: 10000000,
  },
  text: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18,
  },
});

export default NextButton;
