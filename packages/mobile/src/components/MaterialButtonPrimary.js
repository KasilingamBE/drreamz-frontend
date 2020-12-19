import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MaterialButtonPrimary({ caption, style, onPress }) {
  return (
    <TouchableOpacity style={{ ...styles.btn, ...style }} onPress={onPress}>
      <Text style={styles.title}>{caption}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#27aae1',
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#fff',
  },
});
