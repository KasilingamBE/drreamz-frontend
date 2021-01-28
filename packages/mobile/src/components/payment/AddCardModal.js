import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  NativeModules,
  Platform
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import ScreenTittle from '../common/ScreenTittle';
import Input from '../Input';

var StripeBridge = NativeModules.StripeBridge;

export default function CountryModal({ visible = false, onHide, createSetupIntent, onComplete }) {
  const [disabled, setDisabled] = useState(false);
  const [validated, setValidated] = useState(false);
  const [payload, setPayload] = useState({
    ccname: '',
    year: '',
    ccnumber: '',
    month: '',
    cvc: ''
  });

  const onPress = async () => {
    try {
      if (payload.ccname && payload.year && payload.ccnumber && payload.month && payload.cvc) {
        setValidated(false);
        setDisabled(true);
        const { ccnumber, year, month, cvc } = payload;
        const { data } = await createSetupIntent();
        const secret = data.stripeCreateSetupIntent;
        if (Platform.OS === 'ios') {
          StripeBridge.confirmSetupIntend(secret, ccnumber, month, year, cvc, (error, res) => {
            if (res == 'SUCCESS') {
              // setDisabled(false);
              onComplete();
            } else {
              Alert.alert('Error', 'Please enter correct card details');
              setDisabled(false);
            }
          });
        }
        // setDisabled(false);
      } else {
        setValidated(true);
      }
    } catch (error) {
      setDisabled(false);
      Alert.alert('Something Went Wrong', error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onHide} style={styles.closeButton}>
                <AntDesignIcon name="close" size={28} color={colors.secondary} />
              </TouchableOpacity>
              <ScreenTittle title="Add New Card" />
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View>
                <View style={styles.inputGroup}>
                  <Input
                    editable
                    style={styles.searchInput}
                    autoCapitalize="words"
                    keyboardType="default"
                    placeholder="Name on Card"
                    label="Name on Card"
                    onChangeText={(text) => setPayload({ ...payload, ccname: text })}
                    autoCorrect={false}
                    value={payload.ccname}
                    multiLine={false}
                    placeholderTextColor="#7a7d85"
                    // selectionColor="white"
                    autoCompleteType="off"
                    textContentType="none"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Input
                    placeholder="Card Number"
                    validated={validated}
                    onChangeText={(input) => setPayload({ ...payload, ccnumber: input })}
                    value={payload.ccnumber.toString()}
                    editable
                    maxLength={16}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    multiLine={false}
                    autoCapitalize="none"
                    placeholderTextColor="#7a7d85"
                    // selectionColor="white"
                    autoCompleteType="off"
                    textContentType="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Input
                    validated={validated}
                    maxLength={2}
                    editable
                    style={styles.searchInput}
                    keyboardType="number-pad"
                    placeholder="MM"
                    label="Month"
                    onChangeText={(text) => setPayload({ ...payload, month: text })}
                    value={payload.month.toString()}
                    autoCorrect={false}
                    multiLine={false}
                    placeholderTextColor="#7a7d85"
                    // selectionColor="white"
                    autoCompleteType="off"
                    textContentType="none"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Input
                    validated={validated}
                    maxLength={2}
                    editable
                    style={styles.searchInput}
                    keyboardType="number-pad"
                    placeholder="YY"
                    label="Year"
                    onChangeText={(text) => setPayload({ ...payload, year: text })}
                    value={payload.year.toString()}
                    autoCorrect={false}
                    multiLine={false}
                    placeholderTextColor="#7a7d85"
                    // selectionColor="white"
                    autoCompleteType="off"
                    textContentType="none"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Input
                    validated={validated}
                    maxLength={3}
                    editable
                    style={styles.searchInput}
                    keyboardType="number-pad"
                    placeholder="CVC"
                    label="CVC"
                    onChangeText={(text) => setPayload({ ...payload, cvc: text })}
                    value={payload.cvc.toString()}
                    autoCorrect={false}
                    multiLine={false}
                    placeholderTextColor="#7a7d85"
                    // selectionColor="white"
                    autoCompleteType="off"
                    textContentType="none"
                  />
                </View>
                <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
                  {disabled ? (
                    <ActivityIndicator color={colors.white} size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Save Card</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1, paddingTop: 0 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  closeButton: { marginRight: 5 },
  scrollView: {
    marginTop: 10,
    paddingBottom: 40
  },
  heading: {
    fontSize: 20,
    color: colors.black
  },
  inputGroup: { marginVertical: 5 },
  label: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold'
  },
  addPhotoBtn: {
    borderColor: '#0b4094',
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  addPhotoBtnText: {
    color: '#0b4094',
    fontWeight: '700',
    fontSize: 16
  },
  deleteIcon: {
    fontSize: 40,
    color: 'red'
  },
  imageList: { marginVertical: 10 },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5
    // marginBottom: 25
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 10,
    left: 5
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 15
  },
  buttonText: {
    fontWeight: '700',
    color: colors.white,
    fontSize: 18,
    textAlign: 'center'
  }
});
