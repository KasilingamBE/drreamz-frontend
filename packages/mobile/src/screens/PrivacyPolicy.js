import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

function PrivacyPolicy(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.privacyPolicy}>Privacy Policy</Text>
      <View style={styles.rect1}>
        <Text style={styles.userAgreement}>User Agreement</Text>
        <Text style={styles.loremIpsum5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.loremIpsum4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section3}>Section 1</Text>
        <Text style={styles.loremIpsum3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section2}>Section 2</Text>
        <Text style={styles.loremIpsum2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section1}>Section 3</Text>
        <Text style={styles.loremIpsum1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
      <Text style={styles.loremIpsum6}>Last Updated : June 15, 2019</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  privacyPolicy: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 26,
    marginLeft: 16,
  },
  rect1: {
    width: 375,
    height: 1255,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 210,
    shadowOpacity: 0.1,
    shadowRadius: 70,
    marginTop: 42,
  },
  userAgreement: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 14,
    marginLeft: 16,
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 20,
    marginLeft: 17,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 17,
    marginLeft: 17,
  },
  section3: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 17,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 9,
    marginLeft: 17,
  },
  section2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 40,
    marginLeft: 16,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 11,
    marginLeft: 17,
  },
  section1: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 16,
  },
  loremIpsum1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 12,
    marginLeft: 16,
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 14,
    fontSize: 11,
    marginTop: -1277,
    marginLeft: 16,
  },
});

export default PrivacyPolicy;
