import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function FilterButton() {
  return (
    <TouchableOpacity style={styles.filterRow} onPress={() => Alert.alert('Filter', 'Filter')}>
      <Text style={styles.filterText}>FILTER</Text>
      <AntDesignIcon name="downcircleo" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row'
  },
  icon: {
    color: 'black',
    fontSize: 15,
    marginLeft: 3,
    marginTop: Platform.OS === 'ios' ? 1 : 2
  },
  filterText: {
    fontWeight: '500'
  }
});
