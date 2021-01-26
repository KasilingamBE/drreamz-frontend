import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NextButton = ({ onPress, label = 'Next' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 40,
    right: 20,
    borderRadius: 10,
    zIndex: 10000000
  },
  text: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18
  }
});

export default NextButton;
