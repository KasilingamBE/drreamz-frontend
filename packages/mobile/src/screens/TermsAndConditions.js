import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

function TermsAndConditions(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.termsConditions}>Terms &amp; Conditions</Text>
      <View style={styles.rect}>
        <Text style={styles.overview}>Overview</Text>
        <Text style={styles.loremIpsum}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.loremIpsum1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section1}>Section 1</Text>
        <Text style={styles.loremIpsum2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section2}>Section 2</Text>
        <Text style={styles.loremIpsum3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.section3}>Section 3</Text>
        <Text style={styles.loremIpsum4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  termsConditions: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 24,
    marginLeft: 17,
  },
  rect: {
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
    marginTop: 44,
  },
  overview: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 17,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 18,
    marginLeft: 17,
  },
  loremIpsum1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 17,
    marginLeft: 17,
  },
  section1: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 17,
  },
  loremIpsum2: {
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
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 11,
    marginLeft: 17,
  },
  section3: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 16,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 12,
    marginLeft: 16,
  },
});

export default TermsAndConditions;
