import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function FAQScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.loremIpsum}>Frequently Asked Questions</Text>
      <View style={styles.rect}>
        <Text style={styles.allTopics}>All Topics</Text>
        <View style={styles.rect2Stack}>
          <View style={styles.rect2}>
            <Text style={styles.drivers}>Drivers</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.findParking}>Find Parking</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.checkingInEarly}>Checking in early</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect3Stack}>
          <View style={styles.rect3}>
            <Text style={styles.spaceOwner}>Space Owner</Text>
            <TouchableOpacity style={styles.button3}>
              <Text style={styles.addAListing}>Add a listing</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button4}>
            <Text style={styles.withdrawFunds}>Withdraw funds</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect4Stack}>
          <View style={styles.rect4}>
            <Text style={styles.parkingAttendant}>Parking Attendant</Text>
          </View>
          <TouchableOpacity style={styles.button5}>
            <Text style={styles.loggingIn}>Logging in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 23,
    marginTop: 60,
    marginLeft: 21,
  },
  rect: {
    width: 342,
    height: 660,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 150,
    shadowOpacity: 0.15,
    shadowRadius: 50,
    marginTop: 16,
    marginLeft: 16,
  },
  allTopics: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 15,
  },
  rect2: {
    top: 0,
    left: 0,
    width: 342,
    height: 162,
    position: 'absolute',
  },
  drivers: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 15,
  },
  button: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 6,
  },
  findParking: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 23,
    marginLeft: 15,
  },
  button2: {
    top: 99,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  checkingInEarly: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 23,
    marginLeft: 15,
  },
  rect2Stack: {
    width: 342,
    height: 164,
    marginTop: 15,
  },
  rect3: {
    top: 0,
    left: 0,
    width: 342,
    height: 168,
    position: 'absolute',
  },
  spaceOwner: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 11,
    marginLeft: 12,
  },
  button3: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,0.66)',
    marginTop: 10,
  },
  addAListing: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 23,
    marginLeft: 15,
  },
  button4: {
    top: 104,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,0.66)',
  },
  withdrawFunds: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 23,
    marginLeft: 15,
  },
  rect3Stack: {
    width: 342,
    height: 169,
    marginTop: 36,
  },
  rect4: {
    top: 0,
    left: 0,
    width: 342,
    height: 103,
    position: 'absolute',
  },
  parkingAttendant: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 12,
  },
  button5: {
    top: 39,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,0.66)',
  },
  loggingIn: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 22,
    marginLeft: 17,
  },
  rect4Stack: {
    width: 342,
    height: 104,
    marginTop: 30,
  },
});

export default FAQScreen;
