import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  addListingLocal,
  updateListingLocal
} from '@parkyourself-frontend/shared/redux/actions/user';
import colors from '@parkyourself-frontend/shared/config/colors';

const AddListingHeader = ({
  onPress,
  icon = 'arrowleft',
  navigation,
  activeIndex = 0,
  handleSubmit,
  propertyName
}) => {
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await handleSubmit();
      setDisabled(false);
      navigation.navigate('My Listings');
    } catch (error) {
      // console.log('error', error);
      setDisabled(false);
      Alert.alert('Something Went wrong!', error.message);
    }
  };

  const onSaveAndExit = () => {
    Alert.alert(
      'Do you really want to Save and Exit?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: onSubmitHandler
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressIndicator}>
        <View style={{ ...styles.progress, width: `${activeIndex * 5.8}%` }} />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={onPress} style={styles.backBtn}>
          <AntDesignIcon name={icon} size={28} color="#666" />
        </TouchableOpacity>
        {disabled ? (
          <ActivityIndicator style={styles.loading} color="#0b4094" size="small" />
        ) : activeIndex == 0 && propertyName == '' ? null : (
          <TouchableOpacity onPress={onSaveAndExit} style={styles.saveBtn}>
            <Text style={styles.save}>Save & Exit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    backgroundColor: colors.white,
    width: '100%'
    // position: 'absolute',
    // top: 0,
    // marginBottom: 20,
    // paddingBottom: 10,
    // zIndex: 1000000
  },
  progressIndicator: {
    width: '100%',
    height: 5
  },
  progress: {
    height: 10,
    backgroundColor: colors.primary
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveBtn: {},
  save: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.grey
  }
});

const mapStateToProps = ({ tempListing, auth }) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal
})(AddListingHeader);
