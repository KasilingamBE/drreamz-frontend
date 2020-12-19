import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLogo from '../components/AppLogo';

function SignUp({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppLogo />
      <View style={styles.rect}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
          <View style={styles.iconRow}>
            <EntypoIcon name="facebook" style={styles.icon}></EntypoIcon>
            <Text style={styles.loremIpsum}>Sign in with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => Auth.federatedSignIn({ provider: 'Google' })}>
          <View style={styles.icon2Row}>
            <MaterialCommunityIconsIcon name="google" style={styles.icon2} />
            <Text style={styles.signInWithGoogle}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('SignUpForm')}>
          <Text style={styles.loremIpsum2}>
            Sign up with Email &amp; Mobile Number
          </Text>
        </TouchableOpacity>
        <Text style={styles.loremIpsum3}>
          If you are Already user? Please Sign-in Below
        </Text>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate('SignInStack')}>
          <Text style={styles.signUp}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.loremIpsum4}>
          By creating or using an Account you agree to the
        </Text>
        <Text style={styles.loremIpsum5}>
          ParkYouself Terms &amp; Conditions and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  rect: {
    flex: 1,
    height: 480,
    backgroundColor: 'rgba(39,170,225,1)',
    marginTop: 45,
    alignItems: 'center',
  },
  button: {
    width: 306,
    height: 58,
    backgroundColor: 'rgba(51,88,158,1)',
    borderRadius: 5,
    shadowColor: 'rgba(39,39,39,0.4)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.72,
    shadowRadius: 50,
    flexDirection: 'row',
    marginTop: 40,
    // marginLeft: 34,
  },
  icon: {
    color: 'rgba(252,252,252,1)',
    fontSize: 34,
    height: 37,
    width: 34,
  },
  loremIpsum: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(246,244,244,1)',
    fontSize: 15,
    marginLeft: 39,
    marginTop: 9,
  },
  iconRow: {
    height: 37,
    flexDirection: 'row',
    flex: 1,
    marginRight: 73,
    marginLeft: 15,
    marginTop: 10,
  },
  button1: {
    width: 306,
    height: 58,
    backgroundColor: 'rgba(234,66,53,1)',
    borderRadius: 5,
    shadowColor: 'rgba(101,101,101,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.44,
    shadowRadius: 50,
    flexDirection: 'row',
    marginTop: 17,
    // marginLeft: 34,
  },
  icon2: {
    color: 'rgba(251,251,251,1)',
    fontSize: 33,
    height: 36,
    width: 33,
  },
  signInWithGoogle: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(248,248,248,1)',
    fontSize: 15,
    marginLeft: 49,
    marginTop: 9,
  },
  icon2Row: {
    height: 36,
    flexDirection: 'row',
    flex: 1,
    marginRight: 81,
    marginLeft: 15,
    marginTop: 10,
  },
  button2: {
    width: 306,
    height: 58,
    borderRadius: 5,
    shadowColor: 'rgba(60,60,60,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.44,
    shadowRadius: 50,
    backgroundColor: 'rgba(255,254,254,1)',
    marginTop: 18,
    // marginLeft: 34,
  },
  loremIpsum2: {
    //fontFamily: 'roboto-700',
    color: 'rgba(92,159,188,1)',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 28,
  },
  loremIpsum3: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(252,250,250,1)',
    opacity: 0.66,
    letterSpacing: 0,
    fontSize: 15,
    marginTop: 30,
    // marginLeft: 60,
  },
  button3: {
    width: 306,
    height: 49,
    borderWidth: 1,
    borderColor: 'rgba(225,221,221,1)',
    marginTop: 18,
    // marginLeft: 34,
  },
  signUp: {
    //fontFamily: 'roboto-500',
    color: 'rgba(235,233,233,1)',
    fontSize: 18,
    marginTop: 13,
    marginLeft: 119,
  },
  loremIpsum4: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(239,237,237,1)',
    marginTop: 35,
    // marginLeft: 38,
  },
  loremIpsum5: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(247,245,245,1)',
    marginTop: 4,
    // marginLeft: 31,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  head: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignUp;
