import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

export default function ScreenTittle({ size = 'large', color = colors.secondary, style = {} }) {
  return <ActivityIndicator style={{ ...style }} size={size} colors={color} />;
}

// const styles = StyleSheet.create({
//   title: {
//     color: colors.secondary,
//     fontSize: 24
//   }
// });
