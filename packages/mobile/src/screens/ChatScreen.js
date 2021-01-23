import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

function Untitled24({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gabrielaPepe}>Gabriela &amp; Pepe</Text>
      <Text style={styles.loremIpsum}>906 Peg Shop St. Franklyn, NY 11209</Text>
      <ScrollView contentContainerStyle={styles.rectStack}>
        <View style={styles.rect2}>
          <View style={styles.iconRow}>
            <FontAwesomeIcon name="user-circle" style={styles.icon}></FontAwesomeIcon>
            <View style={styles.rect3}>
              <Text style={styles.loremIpsum2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Text>
              <Text style={styles.loremIpsum3}>11:52 AM</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect5}>
          <View style={styles.rect4Row}>
            <View style={styles.rect4}>
              <Text style={styles.loremIpsum4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </Text>
              <Text style={styles.loremIpsum5}>11:56 AM</Text>
            </View>
            <FontAwesomeIcon name="user-circle" style={styles.icon1}></FontAwesomeIcon>
          </View>
        </View>
      </ScrollView>
      <View style={styles.rect10Stack}>
        <View style={styles.rect11}>
          <View style={styles.icon5Row}>
            <FeatherIcon name="camera" style={styles.icon5}></FeatherIcon>
            <TextInput
              placeholder="Type a Comment"
              placeholderTextColor="rgba(11,64,148,1)"
              style={styles.typeAComment}></TextInput>
            <SimpleLineIconsIcon name="paper-clip" style={styles.icon6}></SimpleLineIconsIcon>
          </View>
          <View style={styles.rect12}>
            <FeatherIcon name="arrow-right" style={styles.icon4}></FeatherIcon>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  gabrielaPepe: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 8
  },
  rect: {
    // top: 86,
    // left: 1,
    // width: 375,
    // height: 525,
    // position: 'absolute',
  },
  rect5: {
    width: 375,
    // height: 127,
    flexDirection: 'row',
    marginTop: 41
  },
  rect4: {
    width: 238,
    // height: 105,
    backgroundColor: 'rgba(39,170,225,1)'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 11,
    marginLeft: 13
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 174
  },
  icon1: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginLeft: 9,
    marginTop: 55
  },
  rect4Row: {
    height: 105,
    flexDirection: 'row',
    flex: 1,
    marginRight: 17,
    marginLeft: 61,
    marginTop: 12
  },
  icon3: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: 43
  },
  loremIpsum8: {
    top: 64,
    left: 169,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 13
  },
  loremIpsum8Stack: {
    top: 0,
    left: 0,
    width: 233,
    height: 93,
    position: 'absolute'
  },
  loremIpsum9: {
    top: 14,
    left: 13,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 22,
    fontSize: 15
  },
  loremIpsum8StackStack: {
    width: 233,
    height: 93,
    marginLeft: 10
  },
  rect6: {
    width: 238,
    height: 105,
    backgroundColor: 'rgba(39,170,225,1)'
  },
  loremIpsum7: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 11,
    marginLeft: 14
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 13,
    marginTop: 3,
    marginLeft: 174
  },
  icon2: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginLeft: 10,
    marginTop: 55
  },
  rect6Row: {
    height: 105,
    flexDirection: 'row',
    marginTop: 36,
    marginLeft: 60,
    marginRight: 17
  },
  rect2: {
    // top: 0,
    // left: 1,
    width: 375,
    height: 114,
    // position: 'absolute',
    flexDirection: 'row'
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: 42
  },
  rect3: {
    width: 233,
    height: 93,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 9
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 22,
    fontSize: 15,
    marginTop: 13,
    marginLeft: 14
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 170
  },
  iconRow: {
    height: 93,
    flexDirection: 'row',
    flex: 1,
    marginRight: 67,
    marginLeft: 16,
    marginTop: 11
  },
  rect7: {
    top: 484,
    left: 0,
    width: 375,
    height: 127,
    position: 'absolute'
  },
  rect9: {
    top: 271,
    left: 0,
    width: 375,
    height: 114,
    position: 'absolute'
  },
  rectStack: {
    width: 376,
    height: 500,
    marginTop: 32,
    marginLeft: -1
  },
  rect10: {
    // top: 0,
    // left: 1,
    width: '100%',
    height: 57
    // position: 'absolute',
  },
  rect12: {
    width: '15%',
    height: 57,
    backgroundColor: 'rgba(39,170,225,1)'
    // marginLeft: 315,
  },
  icon4: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 30,
    width: 30,
    marginTop: 14,
    marginLeft: 17
  },
  rect11: {
    // top: 0,
    // left: 0,
    width: '100%',
    height: 58,
    // position: 'absolute',
    flexDirection: 'row'
  },
  icon5: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 25,
    width: 25,
    marginTop: 17
  },
  typeAComment: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 57,
    width: 224,
    marginLeft: 9
  },
  icon6: {
    color: 'rgba(39,170,225,1)',
    fontSize: 22,
    height: 25,
    width: 22,
    marginLeft: 13,
    marginTop: 17
  },
  icon5Row: {
    width: '80%',
    height: 57,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 14
  },
  rect10Stack: {
    width: '100%',
    height: 58,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Untitled24;
