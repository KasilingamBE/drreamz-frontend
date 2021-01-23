import React from 'react';
import { SafeAreaView, View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '@parkyourself-frontend/shared/config/colors';
import countries from '@parkyourself-frontend/shared/config/countries';

export default function AddressModal({ visible = false, onHide, setMarker, tempListingLocationD }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onHide} style={styles.backBtn}>
              <AntDesignIcon name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Search Your Address</Text>
            <GooglePlacesAutocomplete
              placeholder="Search your location"
              onPress={(data, details = null) => {
                let tempLoc = {
                  marker: {
                    type: 'Point',
                    coordinates: [details.geometry.location.lng, details.geometry.location.lat]
                  }
                };

                let add = '';
                add += data.structured_formatting.main_text;

                setMarker({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng
                });

                details.address_components.forEach((item) => {
                  if (item.types.includes('route')) {
                    add += `, ${item.long_name}`;
                  }
                  if (item.types.includes('sublocality')) {
                    add += `, ${item.long_name}`;
                    // console.log('address :', add);
                  }
                  if (item.types.includes('country')) {
                    // console.log('country :', item.long_name);
                    // setCountry(item.long_name);
                    // setCode(countries.filter((i) => i.country == item.long_name)[0].code);
                    tempLoc = {
                      ...tempLoc,
                      country: item.long_name,
                      code: countries.filter((i) => i.country == item.long_name)[0].code
                    };
                  }
                  if (item.types.includes('administrative_area_level_1')) {
                    // console.log('state :', item.long_name);
                    // setState(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      state: item.long_name
                    };
                  }
                  if (item.types.includes('administrative_area_level_2')) {
                    // console.log('city :', item.long_name);
                    // setCity(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      city: item.long_name
                    };
                  }
                  if (item.types.includes('postal_code')) {
                    // console.log('postal code :', item.long_name);
                    // setPostalCode(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      postalCode: item.long_name
                    };
                  }
                });
                tempListingLocationD({ ...tempLoc, address: add });
                onHide();
              }}
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
                fields: ['formatted_address', 'geometry']
              }}
              debounce={200}
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
                  marginTop: 20,
                  marginBottom: 30,
                  elevation: 10
                },
                listView: {
                  position: 'absolute',
                  backgroundColor: 'rgb(255,255,255)',
                  top: 70,
                  zIndex: 99999
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
                  fontSize: 18,
                  paddingVertical: 10
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: {
    color: colors.secondary,
    fontSize: 20,
    marginBottom: -10,
    marginTop: 20,
    fontWeight: '500'
  }
});
