import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import UserCard from './UserCard';

const DATA = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Vivek Thakur',
    active: true,
    bookings: 4,
    listings: 2,
    picture: 'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg'
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Sumi J',
    active: false,
    bookings: 4,
    listings: 2,
    picture: 'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg'
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Mark',
    active: true,
    bookings: 4,
    listings: 2,
    picture: 'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg'
  }
];

export default function UsersList() {
  return (
    <View style={styles.outerView}>
      <View style={styles.searchRow}>
        <TextInput placeholder="Type user name" style={styles.searchInput} />
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item, index }) => <UserCard user={item} index={index} />}
        keyExtractor={(item) => item._id}
      />
      {/* <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
        <Text style={styles.buttonText}>Load More</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: { flex: 1, backgroundColor: colors.white },
  searchRow: {
    paddingHorizontal: 10,
    marginVertical: 10
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    padding: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  }
});
