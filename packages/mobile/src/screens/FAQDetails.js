import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function FAQDetails(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.loremIpsum1}>Frequently Asked Questions</Text>
      <View style={styles.rect1}>
        <Text style={styles.spaceOwner}>Space Owner</Text>
        <Text style={styles.addAListing}>Add a listing</Text>
        <View style={styles.rect2}>
          <TouchableOpacity style={styles.button2}>
            <View style={styles.loremIpsum2Row}>
              <Text style={styles.loremIpsum2}>
                Lorem ipsum dolor sit amet ?
              </Text>
              <FeatherIcon
                name="chevron-down"
                style={styles.icon}></FeatherIcon>
            </View>
          </TouchableOpacity>
          <Text style={styles.loremIpsum3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View style={styles.icon1StackStack}>
          <View style={styles.icon1Stack}>
            <FeatherIcon name="chevron-down" style={styles.icon1}></FeatherIcon>
            <TouchableOpacity style={styles.button}></TouchableOpacity>
          </View>
          <Text style={styles.loremIpsum4}>Lorem ipsum dolor sit amet ?</Text>
        </View>
        <View style={styles.icon2StackStack}>
          <View style={styles.icon2Stack}>
            <FeatherIcon name="chevron-down" style={styles.icon2}></FeatherIcon>
            <View style={styles.rect5}>
              <TouchableOpacity style={styles.button3}></TouchableOpacity>
            </View>
            <View style={styles.rect7}>
              <TouchableOpacity style={styles.button4}>
                <View style={styles.loremIpsum6Row}>
                  <Text style={styles.loremIpsum6}>
                    Lorem ipsum dolor sit amet ?
                  </Text>
                  <FeatherIcon
                    name="chevron-down"
                    style={styles.icon3}></FeatherIcon>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rect9}>
              <TouchableOpacity style={styles.button5}></TouchableOpacity>
            </View>
            <View style={styles.rect11}>
              <TouchableOpacity style={styles.button6}>
                <View style={styles.loremIpsum8Row}>
                  <Text style={styles.loremIpsum8}>
                    Lorem ipsum dolor sit amet ?
                  </Text>
                  <FeatherIcon
                    name="chevron-down"
                    style={styles.icon5}></FeatherIcon>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.loremIpsum5}>Lorem ipsum dolor sit amet ?</Text>
          <FeatherIcon name="chevron-down" style={styles.icon4}></FeatherIcon>
          <Text style={styles.loremIpsum7}>Lorem ipsum dolor sit amet ?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loremIpsum1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 23,
    marginTop: 60,
    marginLeft: 21,
  },
  rect1: {
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
  spaceOwner: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 15,
    marginLeft: 12,
  },
  addAListing: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 18,
    marginLeft: 12,
  },
  rect2: {
    width: 342,
    height: 212,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 16,
  },
  button2: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    marginTop: 1,
  },
  icon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginLeft: 113,
  },
  loremIpsum2Row: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 14,
    marginLeft: 12,
    marginTop: 23,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 22,
    marginTop: 16,
    marginLeft: 14,
  },
  icon1: {
    top: 23,
    left: 308,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  button: {
    top: 0,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  icon1Stack: {
    top: 0,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
  },
  loremIpsum4: {
    top: 24,
    left: 12,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
  },
  icon1StackStack: {
    width: 342,
    height: 65,
  },
  icon2: {
    top: 23,
    left: 308,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  rect5: {
    top: 0,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  button3: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  rect7: {
    top: 64,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  button4: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
  },
  loremIpsum6: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    marginTop: 1,
  },
  icon3: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginLeft: 113,
  },
  loremIpsum6Row: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 14,
    marginLeft: 12,
    marginTop: 23,
  },
  rect9: {
    top: 128,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  button5: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  rect11: {
    top: 191,
    left: 0,
    width: 342,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
  },
  button6: {
    width: 342,
    height: 65,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
  },
  loremIpsum8: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    marginTop: 1,
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginLeft: 113,
  },
  loremIpsum8Row: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 14,
    marginLeft: 12,
    marginTop: 23,
  },
  icon2Stack: {
    top: 0,
    left: 0,
    width: 342,
    height: 256,
    position: 'absolute',
  },
  loremIpsum5: {
    top: 24,
    left: 12,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
  },
  icon4: {
    top: 151,
    left: 308,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  loremIpsum7: {
    top: 152,
    left: 12,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
  },
  icon2StackStack: {
    width: 342,
    height: 256,
  },
});

export default FAQDetails;
