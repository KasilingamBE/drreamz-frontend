import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialButtonPrimary from './MaterialButtonPrimary';

function AddReviewModal(props) {
  return (
    <View style={styles.rectStack}>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>Review your experience</Text>
        <View style={styles.rect2}>
          <View style={styles.imageRow}>
            <Image
              source={require('../assets/images/cars2.jpg')}
              resizeMode="stretch"
              style={styles.image}></Image>
            <Text style={styles.loremIpsum3}>Owner Name : Alexander Smith</Text>
          </View>
        </View>
        <Text style={styles.loremIpsum4}>
          How was your experience at the location ?
        </Text>
        <Text style={styles.provideARating}>Provide a rating :</Text>
        <View style={styles.rect3Stack}>
          <View style={styles.rect3}>
            <View style={styles.icon1Row}>
              <EntypoIcon name="star" style={styles.icon1}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon2}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon3}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon4}></EntypoIcon>
            </View>
          </View>
          <EntypoIcon name="star" style={styles.icon}></EntypoIcon>
        </View>
        <Text style={styles.provideAFeedback}>Provide a feedback :</Text>
        <TextInput
          placeholder="Write your feedback here..."
          numberOfLines={10}
          maxLength={200}
          style={styles.textInput}></TextInput>
        <MaterialButtonPrimary
          caption="SUBMIT"
          style={styles.materialButtonPrimary}></MaterialButtonPrimary>
      </View>
      <Text style={styles.loremIpsum2}>
        906 Peg Shop St. Franklyn, NY 11209
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    top: 0,
    width: 350,
    height: 529,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 7,
    left: 0,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 18,
    marginLeft: 56,
  },
  rect2: {
    width: 350,
    height: 105,
    flexDirection: 'row',
    marginTop: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 15,
    marginLeft: 12,
    marginTop: 52,
  },
  imageRow: {
    height: 70,
    flexDirection: 'row',
    flex: 1,
    marginRight: 54,
    marginLeft: 17,
    marginTop: 23,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 24,
    marginLeft: 15,
  },
  provideARating: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 14,
    marginLeft: 15,
  },
  rect3: {
    top: 0,
    left: 1,
    width: 149,
    height: 29,
    position: 'absolute',
    flexDirection: 'row',
  },
  icon1: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
  },
  icon2: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 5,
  },
  icon3: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 3,
  },
  icon4: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 4,
  },
  icon1Row: {
    height: 29,
    flexDirection: 'row',
    flex: 1,
    marginRight: 3,
    marginLeft: 30,
  },
  icon: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
  },
  rect3Stack: {
    width: 150,
    height: 29,
    marginTop: 12,
    marginLeft: 91,
  },
  provideAFeedback: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 23,
    marginLeft: 15,
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 105,
    width: 316,
    marginTop: 10,
    marginLeft: 17,
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.37,
    shadowRadius: 20,
    marginTop: 23,
    marginLeft: 121,
  },
  loremIpsum2: {
    top: 81,
    left: 88,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
    right: 0,
  },
  rectStack: {
    height: 529,
    marginTop: 141,
    marginLeft: 11,
  },
});

export default AddReviewModal;
