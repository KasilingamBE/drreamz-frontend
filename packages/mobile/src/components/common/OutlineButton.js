import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OutlineButton({ label = 'Button', onPress = () => {} }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderColor: colors.secondary,
    padding: 7,
    borderRadius: 3
  },
  label: {
    color: colors.secondary,
    fontSize: 20
    // textAlign: 'center',
    // fontWeight: 'bold'
  }
});
