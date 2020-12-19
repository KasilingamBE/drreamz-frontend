import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';

function CreateSpaceOwnerProfile({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.spaceOwnerProfile}>Space Owner Profile</Text>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="rgba(182,182,182,1)"
        style={styles.firstName}></TextInput>
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="rgba(182,182,182,1)"
        style={styles.firstName1}></TextInput>
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(182,182,182,1)"
        style={styles.firstName2}></TextInput>
      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="rgba(182,182,182,1)"
        style={styles.firstName3}></TextInput>
      <TextInput
        placeholder="Address"
        placeholderTextColor="rgba(182,182,182,1)"
        style={styles.firstName4}></TextInput>
      <View style={styles.firstName5Stack}>
        <TextInput
          placeholder="Business Name (optional)"
          placeholderTextColor="rgba(182,182,182,1)"
          style={styles.firstName5}></TextInput>
      </View>
      <Text style={styles.socialMedia}>Social Media</Text>

      <View style={styles.firstName6Stack}>
        <TextInput
          placeholder="Facebook Account"
          placeholderTextColor="rgba(182,182,182,1)"
          style={styles.firstName6}></TextInput>
        <Text style={styles.change}>Change</Text>
      </View>
      <View style={styles.change1Stack}>
        <Text style={styles.change1}>Change</Text>
        <TextInput
          placeholder="Twitter Account"
          placeholderTextColor="rgba(182,182,182,1)"
          style={styles.firstName7}></TextInput>
      </View>
      <View style={styles.firstName8Stack}>
        <TextInput
          placeholder="Instagram Account"
          placeholderTextColor="rgba(182,182,182,1)"
          style={styles.firstName8}></TextInput>
        <Text style={styles.change2}>Change</Text>
      </View>
      <MaterialButtonPrimary
        onPress={() => {
          navigation.navigate('SpaceOwnerDashboard');
        }}
        caption="SAVE PROFILE"
        style={styles.materialButtonPrimary6}></MaterialButtonPrimary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  spaceOwnerProfile: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
  },
  firstName: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    marginTop: 25,
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  firstName1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    marginTop: 6,
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  firstName2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    marginTop: 8,
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  firstName3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    marginTop: 9,
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  firstName4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    marginTop: 8,
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  firstName5: {
    top: 0,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  socialMedia: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    marginVertical: 20,
  },
  firstName5Stack: {
    width: '100%',
    height: 66,
    marginTop: 10,
  },
  firstName6: {
    top: 0,
    left: 0,
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  change: {
    top: 17,
    right: 10,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  firstName6Stack: {
    height: 49,
    // marginTop: 62,
    // marginLeft: 41,
    width: '100%',
  },
  change1: {
    top: 17,
    right: 10,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  firstName7: {
    top: 0,
    left: 0,
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  change1Stack: {
    width: '100%',
    height: 49,
    marginTop: 7,
    // marginLeft: 41,
  },
  firstName8: {
    top: 0,
    left: 0,
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: '100%',
    fontSize: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  change2: {
    top: 17,
    right: 10,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  firstName8Stack: {
    width: '100%',
    height: 49,
    marginTop: 5,
    // marginLeft: 41,
  },
  materialButtonPrimary6: {
    height: 36,
    width: 121,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 20,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    marginTop: 105,
    marginVertical: 30,
    // marginLeft: 122,
    alignSelf: 'center',
    backgroundColor: '#27aae1',
  },
});

export default CreateSpaceOwnerProfile;
