import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';

export default function ScreenTittle({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    fontSize: 25,
    // fontWeight: Platform.OS === 'ios' ? '600' : '900',
    fontWeight: 'bold',
    textTransform: 'uppercase'
    // fontFamily: 'fontFamily-bold'
  }
});
