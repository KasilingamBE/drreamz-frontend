import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useMutation} from '@apollo/client';
import ListingService from '../../app/services/listing.service';
import {deleteTempListing} from '../../app/redux/actions/tempListing';
import {connect} from 'react-redux';
import {
  addListingLocal,
  updateListingLocal,
} from '../../app/redux/actions/user';

const AddListingHeader = ({
  onPress,
  width = '100%',
  icon = 'arrowleft',
  onPressSaveAndExit,
  activeIndex = 0,

  navigation,
  tempListing,
  deleteTempListing,
  userData,
  addListingLocal,
  updateListingLocal,
}) => {
  const [createListing] = useMutation(ListingService.CREATE_LISTING);
  const [updateListing] = useMutation(ListingService.UPDATE_LISTING);

  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await ListingService.addListingService(
        tempListing,
        createListing,
        updateListing,
        userData,
        addListingLocal,
        updateListingLocal,
      );
      deleteTempListing();
      setDisabled(false);
      // if (tempListing.edit) {
      //   navigation.navigate('MyListingsScreen');
      // } else {
      //   navigation.navigate('MyListingsScreen');
      // }
      navigation.navigate('MyListingsScreen');
    } catch (error) {
      console.log(error);
      setDisabled(false);
      Alert.alert('Something Went wrong!', error.message);
    }
  };

  const onSaveAndExit = () => {
    Alert.alert(
      'Do you really want to exit?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onSubmitHandler,
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressIndicator}>
        <View style={{...styles.progress, width: width}}></View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={onPress} style={styles.backBtn}>
          <AntDesignIcon name={icon} size={28} color="#666"></AntDesignIcon>
        </TouchableOpacity>
        {disabled ? (
          <ActivityIndicator
            style={styles.loading}
            color="#0b4094"
            size="large"
          />
        ) : (
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
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    marginBottom: 20,
    paddingBottom: 10,
    zIndex: 1000000,
  },
  progressIndicator: {
    width: '100%',
    height: 10,
  },
  progress: {
    height: 10,
    backgroundColor: '#27aae1',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {},
  save: {
    fontWeight: '700',
    fontSize: 16,
    color: '#666',
  },
});

const mapStateToProps = ({tempListing, auth}) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null,
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal,
})(AddListingHeader);
