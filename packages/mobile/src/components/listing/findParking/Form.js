import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '@parkyourself-frontend/shared/config/colors';

function FindParkingForm() {
  const findParking = useSelector(({ findParking }) => findParking);
  const dispatch = useDispatch();

  const [picker, setPicker] = useState({
    showPicker: false,
    mode: 'date',
    type: 'start',
    date: new Date()
  });

  const handlePickerChange = (event, selectedDate) => {
    setPicker({ ...picker, showPicker: false });
    if (picker.type === 'start') {
      // let tempStartDate = new Date();
      let tempEndDate = new Date();
      if (picker.mode === 'date' && new Date(selectedDate) > new Date(findParking.end)) {
        tempEndDate = new Date(new Date(selectedDate).setHours(selectedDate.getHours() + 3));
        dispatch(updateFindParkingData({ start: selectedDate, end: tempEndDate }));
      } else {
        dispatch(updateFindParkingData({ start: selectedDate }));
      }
    } else {
      dispatch(updateFindParkingData({ end: selectedDate }));
    }
  };

  return (
    <View>
      <View style={styles.durationRow}>
        <View
          style={[styles.durationBox, { opacity: findParking.duration === 'hourly' ? 1 : 0.5 }]}>
          <TouchableOpacity
            style={[styles.durationBox]}
            onPress={() => dispatch(updateFindParkingData({ duration: 'hourly' }))}>
            <FontAwesomeIcon name="clock-o" style={styles.icon} />
            <Text style={styles.daily}>HOURLY</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.durationBox, { opacity: findParking.duration === 'monthly' ? 1 : 0.5 }]}>
          <TouchableOpacity
            style={[styles.durationBox]}
            onPress={() => dispatch(updateFindParkingData({ duration: 'monthly' }))}>
            <FontAwesomeIcon name="calendar" style={styles.icon} />
            <Text style={styles.daily}>MONTHLY</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{ height: 50, paddingHorizontal: 10 }}>
        <GooglePlacesAutocomplete
          clearSearch
          onPress={(data, details = null) => {
            dispatch(
              updateFindParkingData({
                coordinates: [details.geometry.location.lng, details.geometry.location.lat]
              })
            );
          }}
          placeholder="Search Location"
          poweredContainer={false}
          listViewDisplayed={false}
          fetchDetails
          // currentLocation={true}
          // currentLocationLabel="Current Location"
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            type: ['cities']
          }}
          GooglePlacesDetailsQuery={{
            fields: ['geometry']
          }}
          debounce={200}
          isRowScrollable
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          enablePoweredByContainer={false}
          query={{
            key: 'AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg',
            language: 'en',
            location: '30.36214,78.26541',
            radius: 100
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              padding: 0,
              backgroundColor: '#fff',
              borderWidth: 2,
              borderRadius: 5,
              borderColor: '#d6d6d6',
              marginTop: 5,
              marginBottom: 0,
              elevation: 0
            },
            listView: {
              backgroundColor: 'red',
              position: 'absolute',
              zIndex: 99999,
              top: 50
            },
            row: {
              backgroundColor: 'rgb(255,255,255)'
            },
            textInput: {
              height: '100%',
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              fontSize: 15,
              paddingVertical: 0
            }
          }}
        />
      </View>
       */}
      <View style={styles.rect5Row}>
        <TouchableOpacity
          style={styles.rect5}
          onPress={() =>
            setPicker({
              ...picker,
              date: new Date(findParking.start),
              type: 'start',
              mode: 'date',
              showPicker: true
            })
          }>
          <Text style={styles.startDateTime}>Start Date</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {moment(findParking.start).format('L')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect5}
          onPress={() =>
            setPicker({
              ...picker,
              date: new Date(findParking.end),
              type: 'end',
              mode: 'date',
              showPicker: true
            })
          }>
          <Text style={styles.endDateTime}>End Date</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {moment(findParking.end).format('L')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rect5Row}>
        <TouchableOpacity
          style={styles.rect5}
          onPress={() =>
            setPicker({
              ...picker,
              date: new Date(findParking.start),
              type: 'end',
              mode: 'time',
              showPicker: true
            })
          }>
          <Text style={styles.startDateTime}>Start Time</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {moment(findParking.start).format('LT')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect5}
          onPress={() =>
            setPicker({
              ...picker,
              date: new Date(findParking.end),
              type: 'end',
              mode: 'time',
              showPicker: true
            })
          }>
          <Text style={styles.endDateTime}>End Time</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {moment(findParking.end).format('LT')}
          </Text>
        </TouchableOpacity>
      </View>
      {picker.showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={picker.mode}
          // is24Hour
          onChange={handlePickerChange}
          // display="spinner"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  durationRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
  durationBox: { flexDirection: 'row' },
  active: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
    opacity: 1
  },
  icon: {
    color: colors.secondary,
    fontSize: 20
  },
  daily: {
    color: colors.secondary,
    fontSize: 15,
    marginLeft: 5
  },
  rect5: {
    width: '48%',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    paddingVertical: 5,
    alignItems: 'center'
  },
  startDateTime: {
    color: colors.grey,
    textAlign: 'center'
  },
  endDateTime: {
    color: colors.grey,
    textAlign: 'center'
  },
  rect5Row: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  dateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  }
});

export default FindParkingForm;
