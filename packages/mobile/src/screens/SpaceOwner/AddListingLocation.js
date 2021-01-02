import React, { Component, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import { addListingLocation } from '../../actions/listing';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import RadioButton from '../../components/RadioButton';
import NextButton from '../../components/SpaceOwner/NextButton';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import Input from '../../components/Input';
import RadioListItem from '../../components/RadioListItem';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateTempListing, tempListingLocationD } from '../../app/redux/actions/tempListing';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+358', country: 'Aland Islands' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+54', country: 'Argentina' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+975', country: 'Bhutan' },
  { code: '+55', country: 'Brazil' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+855', country: 'Cambodia' },
  { code: '+1', country: 'Canada' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+53', country: 'Cuba' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+224', country: 'Guinea' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+91', country: 'India' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+39', country: 'Italy' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+254', country: 'Kenya' },
  { code: '+965', country: 'Kuwait' },
  { code: '+961', country: 'Lebanon' },
  { code: '+218', country: 'Libya' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macau' },
  { code: '+389', country: 'Macedonia' },
  { code: '+60', country: 'Malaysia' },
  { code: '+230', country: 'Mauritius' },
  { code: '+52', country: 'Mexico' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+31', country: 'Netherlands' },
  { code: '+64', country: 'New Zealand' },
  { code: '+234', country: 'Nigeria' },
  { code: '+850', country: 'North Korea' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+507', country: 'Panama' },
  { code: '+63', country: 'Philippines' },
  { code: '+351', country: 'Portugal' },
  { code: '+974', country: 'Qatar' },
  { code: '+242', country: 'Republic of the Congo' },
  { code: '+7', country: 'Russia' },
  { code: '+378', country: 'San Marino' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+65', country: 'Singapore' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+41', country: 'Switzerland' },
  { code: '+886', country: 'Taiwan' },
  { code: '+66', country: 'Thailand' },
  { code: '+90', country: 'Turkey' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },

  { code: '+39', country: 'Vatican' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' }
];

const featureList = [
  '24/7 access',
  'Car Wash',
  'Covered',
  'EV Charging',
  'Fenced',
  'Mobile Pass',
  'Paved',
  'Security',
  'Staff onsite',
  'Tandem',
  'Unpaved',
  'Valet'
];

function AddListingLocation({
  onBackButtonPress,
  onNextButtonPress,
  addListingLocation,
  locationDetails,
  tempListingLocationD,
  navigation
}) {
  const scrollRef = useRef();

  const [activeIndex, setActiveIndex] = useState(1);

  const [width, setWidth] = useState(0);

  const [validate, setValidate] = useState(false);

  const [visible, setVisible] = useState(false);

  const [listingType, setListingType] = useState(
    locationDetails && locationDetails.listingType ? locationDetails.listingType : 'Business'
  );
  const [propertyType, setPropertyType] = useState(
    locationDetails && locationDetails.propertyType ? locationDetails.propertyType : 'Driveway'
  );
  const [propertyName, setPropertyName] = useState(
    locationDetails && locationDetails.propertyName ? locationDetails.propertyName : ''
  );
  const [country, setCountry] = useState(
    locationDetails && locationDetails.country ? locationDetails.country : countryCodes[0].country
  );
  const [address, setAddress] = useState(
    locationDetails && locationDetails.address ? locationDetails.address : ''
  );
  const [unitNum, setUnitNum] = useState(
    locationDetails && locationDetails.unitNum ? locationDetails.unitNum : ''
  );
  const [city, setCity] = useState(locationDetails ? locationDetails.city : '');
  const [state, setState] = useState(
    locationDetails && locationDetails.state ? locationDetails.state : ''
  );
  const [postalCode, setPostalCode] = useState(
    locationDetails && locationDetails.postalCode ? locationDetails.postalCode : ''
  );

  const [code, setCode] = useState(
    locationDetails && locationDetails.code ? locationDetails.code : countryCodes[0].code
  );
  const [phone, setPhone] = useState(
    locationDetails && locationDetails.phone ? locationDetails.phone : ''
  );

  const [marker, setMarker] = useState(
    locationDetails && locationDetails.latlng
      ? locationDetails.latlng
      : {
          latitude: 37.78825,
          longitude: -122.4324
        }
  );

  const [images, setImages] = useState(
    locationDetails && locationDetails.images ? locationDetails.images : []
  );

  const [features, setFeatures] = useState(
    locationDetails && locationDetails.features ? locationDetails.features : []
  );

  const toggleFeatures = (feature) => {
    if (locationDetails.features.includes(feature)) {
      tempListingLocationD({
        features: locationDetails.features.filter((item) => item != feature)
      });
    } else {
      tempListingLocationD({ features: [...locationDetails.features, feature] });
    }
  };

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const removeImage = (type) => {
    if (type === 'streetViewImages') {
      tempListingLocationD({
        streetViewImages: []
      });
      updateTempListing({ tStreetViewImages: [] });
    } else if (type === 'parkingEntranceImages') {
      tempListingLocationD({
        parkingEntranceImages: []
      });
      updateTempListing({ tParkingEntranceImages: [] });
    } else {
      tempListingLocationD({
        parkingSpaceImages: []
      });
      updateTempListing({ tParkingSpaceImages: [] });
    }
  };

  const streetViewImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setImages([...images, source]);
        tempListingLocationD({
          streetViewImages: [response.uri]
        });
        updateTempListing({ tStreetViewImages: [response.uri] });
      }
    });
  };
  const parkingEntranceImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        tempListingLocationD({
          parkingEntranceImages: [response.uri]
        });
        updateTempListing({ tParkingEntranceImages: [response.uri] });
      }
    });
  };
  const parkingSpaceImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        tempListingLocationD({
          parkingSpaceImages: [response.uri]
        });
        updateTempListing({ tParkingSpaceImages: [response.uri] });
      }
    });
  };

  const backButtonHandler = () => {
    if (activeIndex != 1) {
      setActiveIndex(activeIndex - 1);
      scrollRef.current.scrollTo({
        y: 0,
        animated: true
      });
      setWidth(width - 20);
    } else {
      onBackButtonPress();
    }
  };

  const onSubmitHandler = () => {
    try {
      if (activeIndex != 6) {
        if (
          (activeIndex == 1 && locationDetails.propertyName) ||
          (activeIndex == 2 &&
            locationDetails.country &&
            locationDetails.address &&
            // locationDetails.unitNum &&
            locationDetails.city &&
            locationDetails.state &&
            locationDetails.postalCode &&
            locationDetails.code &&
            locationDetails.phone) ||
          (activeIndex == 3 &&
            locationDetails.country &&
            locationDetails.address &&
            // locationDetails.unitNum &&
            locationDetails.city &&
            locationDetails.state &&
            locationDetails.postalCode &&
            locationDetails.code &&
            locationDetails.phone) ||
          activeIndex == 4 ||
          activeIndex == 5
        ) {
          setValidate(false);
          setActiveIndex(activeIndex + 1);
          scrollRef.current.scrollTo({
            y: 0,
            animated: true
          });
          setWidth(width + 20);
        } else {
          setValidate(true);
        }
      } else {
        // let locationData = {
        //   listingType,
        //   propertyName: propertyName,
        //   country,
        //   address,
        //   unitNum,
        //   city,
        //   state,
        //   postalCode,
        //   code,
        //   phone,
        //   latlng: marker,
        //   propertyType,
        //   images,
        //   features,
        // };

        // addListingLocation(locationData);
        onNextButtonPress();
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Something Went wrong!', 'Unable to add location data');
    }
  };

  return (
    <>
      <AddListingHeader
        onPress={backButtonHandler}
        icon={activeIndex == 1 ? 'close' : 'arrowleft'}
        width={`${width}%`}
        navigation={navigation}
        activeIndex={activeIndex}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
        ref={scrollRef}>
        {activeIndex == 1 && (
          <>
            <Text style={styles.heading}>Choose a Listing Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={locationDetails.listingType}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  tempListingLocationD({ listingType: itemValue })
                }>
                <Picker.Item label="Business" value="Business" />
                <Picker.Item label="Residential" value="Residential" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            <Input
              placeholder="Property Name"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.textInput}
              value={locationDetails.propertyName}
              validate={validate}
              onChangeText={(input) => tempListingLocationD({ propertyName: input })}></Input>
          </>
        )}
        {activeIndex == 2 && (
          <>
            <Text style={styles.heading}>Listing Address</Text>
            <GooglePlacesAutocomplete
              placeholder="Search your location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // console.log(data);
                // console.log(details);
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
                    console.log('country :', item.long_name);
                    setCountry(item.long_name);
                    setCode(countryCodes.filter((i) => i.country == item.long_name)[0].code);
                    tempLoc = {
                      ...tempLoc,
                      country: item.long_name,
                      code: countryCodes.filter((i) => i.country == item.long_name)[0].code
                    };
                  }
                  if (item.types.includes('administrative_area_level_1')) {
                    console.log('state :', item.long_name);
                    setState(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      state: item.long_name
                    };
                  }
                  if (item.types.includes('administrative_area_level_2')) {
                    console.log('city :', item.long_name);
                    setCity(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      city: item.long_name
                    };
                  }
                  if (item.types.includes('postal_code')) {
                    console.log('postal code :', item.long_name);
                    setPostalCode(item.long_name);
                    tempLoc = {
                      ...tempLoc,
                      postalCode: item.long_name
                    };
                  }
                });
                tempListingLocationD({ ...tempLoc, address: add });
                // setAddress(add);
              }}
              poweredContainer={false}
              listViewDisplayed={false}
              fetchDetails={true}
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

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={country}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                {countryCodes.map((item) => (
                  <Picker.Item key={item} label={item.country} value={item.country} />
                ))}
              </Picker>
            </View>
            <Input
              placeholder="Address"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.address}
              validate={validate}
              onChangeText={(input) => tempListingLocationD({ locationDetails: input })}></Input>
            <Input
              placeholder="Unit #"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.unitNum}
              // validate={validate}
              onChangeText={(input) => tempListingLocationD({ unitNum: input })}></Input>
            <Input
              placeholder="City/Town"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.city}
              validate={validate}
              onChangeText={(input) => tempListingLocationD({ city: input })}></Input>
            <Input
              placeholder="State/Province"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.state}
              validate={validate}
              onChangeText={(input) => tempListingLocationD({ state: input })}></Input>
            <Input
              placeholder="Postal Code"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.postalCode}
              validate={validate}
              onChangeText={(input) => tempListingLocationD({ postalCode: input })}></Input>
            <View style={styles.phone}>
              {/* <View style={styles.pickerContainer}> */}
              <Picker
                selectedValue={locationDetails.code}
                style={{ width: 120, marginTop: 10 }}
                onValueChange={(itemValue, itemIndex) => setCode(itemValue)}>
                {countryCodes.map((item) => (
                  <Picker.Item
                    key={item}
                    label={`${item.code}  ${item.country}`}
                    value={item.code}
                  />
                ))}
              </Picker>
              {/* </View> */}

              <Input
                placeholder="Phone Number"
                placeholderTextColor="rgba(182,182,182,1)"
                style={styles.placeholder}
                value={locationDetails.phone}
                keyboardType="number-pad"
                validate={validate}
                onChangeText={(input) => tempListingLocationD({ phone: input })}></Input>
            </View>
          </>
        )}
        {activeIndex == 3 && (
          <>
            <Text style={styles.heading}>Mark your location on the map</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: locationDetails.marker.coordinates[1],
                longitude: locationDetails.marker.coordinates[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              onPress={(event) => {
                tempListingLocationD({
                  marker: {
                    type: 'Point',
                    coordinates: [
                      event.nativeEvent.coordinate.longitude,
                      event.nativeEvent.coordinate.latitude
                    ]
                  }
                });
              }}
              customMapStyle={[
                {
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#f5f5f5'
                    }
                  ]
                },
                {
                  elementType: 'labels.icon',
                  stylers: [
                    {
                      visibility: 'off'
                    }
                  ]
                },
                {
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#616161'
                    }
                  ]
                },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [
                    {
                      color: '#f5f5f5'
                    }
                  ]
                },
                {
                  featureType: 'administrative.land_parcel',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#bdbdbd'
                    }
                  ]
                },
                {
                  featureType: 'poi',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#eeeeee'
                    }
                  ]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#757575'
                    }
                  ]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#e5e5e5'
                    }
                  ]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#9e9e9e'
                    }
                  ]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#ffffff'
                    }
                  ]
                },
                {
                  featureType: 'road.arterial',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#757575'
                    }
                  ]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#dadada'
                    }
                  ]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#616161'
                    }
                  ]
                },
                {
                  featureType: 'road.local',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#9e9e9e'
                    }
                  ]
                },
                {
                  featureType: 'transit.line',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#e5e5e5'
                    }
                  ]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#eeeeee'
                    }
                  ]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [
                    {
                      color: '#c9c9c9'
                    }
                  ]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [
                    {
                      color: '#9e9e9e'
                    }
                  ]
                }
              ]}
              style={styles.mapView}>
              <Marker
                coordinate={{
                  latitude: locationDetails.marker.coordinates[1],
                  longitude: locationDetails.marker.coordinates[0]
                }}></Marker>
            </MapView>
          </>
        )}

        {activeIndex == 4 && (
          <>
            <Text style={styles.heading}>Choose a Property Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={locationDetails.propertyType}
                style={styles.picker}
                onValueChange={(itemValue) => tempListingLocationD({ propertyType: itemValue })}>
                <Picker.Item label="Driveway" value="Driveway" />
                <Picker.Item label="Residential Garage" value="Residential Garage" />
                <Picker.Item label="Open Air Lot" value="Open Air Lot" />
                <Picker.Item
                  label="Commercial Parking Structure"
                  value="Commercial Parking Structure"
                />
              </Picker>
            </View>
          </>
        )}

        {activeIndex == 5 && (
          <>
            <Text style={styles.heading}>Add photos of this Listing</Text>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Street View Image</Text>
              {locationDetails.streetViewImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('streetViewImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.streetViewImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity style={styles.addPhotoBtn} onPress={streetViewImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photos</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Parking Entrance Image</Text>
              {locationDetails.parkingEntranceImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('parkingEntranceImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.parkingEntranceImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={parkingEntranceImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photos</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Parking Space Image</Text>
              {locationDetails.parkingSpaceImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('parkingSpaceImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.parkingSpaceImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={parkingSpaceImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photos</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {activeIndex == 6 && (
          <>
            <Text style={styles.heading}>What features will you offer?</Text>
            <View style={styles.features}>
              {featureList.map((item) => (
                <RadioListItem
                  key={item}
                  label={item}
                  checked={
                    locationDetails.features ? locationDetails.features.includes(item) : false
                  }
                  onPress={() => {
                    toggleFeatures(item);
                  }}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <NextButton onPress={onSubmitHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: 40,
    // color: '#fff',
    color: 'red'
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 15,
    left: 5
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    minHeight: Dimensions.get('window').height,
    zIndex: 0,
    paddingVertical: 80
  },
  heading: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10
  },
  location: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 17,
    fontWeight: '500'

    // marginLeft: 23,
  },
  pickerContainer: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  picker: {
    width: '100%'
    // marginVertical: 10,
    // fontSize: 18,
  },
  label: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '700'
    // marginLeft: 24,
  },
  rect: {
    width: 330,
    height: 43,
    flexDirection: 'row',
    marginTop: 18
    // marginLeft: 23,
  },
  inactiveTab: {
    width: 94,
    height: 31,
    borderWidth: 2,
    borderColor: 'rgba(182,182,182,1)',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  activeTab: {
    width: 110,
    height: 31,
    borderRadius: 21,
    backgroundColor: 'rgba(39,170,225,1)',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,1)',
    // marginLeft: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  activeText: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 13,
    textAlign: 'center'
  },
  activeIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 58
    // height: 63,
    // width: 58,
  },
  inactiveBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  inactiveText: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    textAlign: 'center'
  },
  inactiveIcon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 60
    // height: 65,
    // width: 49,
  },
  rect4: {
    width: 85,
    height: 31,
    borderWidth: 2,
    borderColor: 'rgba(182,182,182,1)',
    borderRadius: 21,
    marginLeft: 5,
    marginTop: 8
  },
  rect2Row: {
    height: 31,
    flexDirection: 'row',
    flex: 1,
    marginRight: 32,
    marginTop: 5
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 41,
    width: '100%',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6'
    // marginLeft: 24,
  },
  listingAddress: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 16
    // marginLeft: 24,
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 45,
    width: '100%',
    // marginTop: 26,
    // borderBottomColor: '#d6d6d6',
    // borderBottomWidth: 1,
    fontSize: 18
    // marginLeft: 23,
  },
  modalView: {
    padding: 20,
    backgroundColor: '#fff'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
    // borderBottomColor: '#d6d6d6',
    // borderBottomWidth: 1,
  },
  mapView: {
    height: 400,
    width: '100%',
    marginTop: 21
  },
  propertyType: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 29
    // marginLeft: 21,
  },
  rect5: {
    width: 250,
    height: 235,
    marginTop: 19
    // marginLeft: 23,
  },
  rect6: {
    width: 119,
    height: 112,
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  icon: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 49
  },
  driveway: {
    top: 62,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11
  },
  iconStack: {
    width: 49,
    height: 75,
    marginTop: 13,
    marginLeft: 35
  },
  icon1: {
    top: 11,
    left: 28,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 60
  },
  rect7: {
    top: 0,
    left: 0,
    width: 119,
    height: 112,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  residentialGarage: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 74,
    marginLeft: 21
  },
  icon1Stack: {
    width: 119,
    height: 112,
    marginLeft: 12
  },
  rect6Row: {
    height: 112,
    flexDirection: 'row'
  },
  icon2: {
    top: 13,
    left: 35,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 53
  },
  rect8: {
    top: 0,
    left: 0,
    width: 119,
    height: 112,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  openAirLot: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    marginTop: 74,
    marginLeft: 28
  },
  icon2Stack: {
    width: 119,
    height: 112
  },
  rect9: {
    width: 119,
    height: 112,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginLeft: 12
  },
  icon3: {
    top: 0,
    left: 23,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 60
  },
  loremIpsum: {
    top: 62,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    textAlign: 'center'
  },
  icon3Stack: {
    width: 112,
    height: 89,
    marginTop: 10,
    marginLeft: 4
  },
  icon2StackRow: {
    height: 112,
    flexDirection: 'row',
    marginTop: 11
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 31
    // marginLeft: 19,
  },
  addPhotoBtn: {
    borderColor: '#0b4094',
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
    width: 150,
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
  imageList: {},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 25,
    marginTop: 10
  },
  rect10: {
    top: 0,
    left: 0,
    width: 261,
    height: 73,
    position: 'absolute',
    flexDirection: 'row'
  },
  rect11: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon4: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 25,
  },
  streetView: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    marginTop: 3
    // marginLeft: 16,
  },
  rect12: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon5: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 27,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 1
    // marginLeft: 13,
  },
  rect11Row: {
    height: 73,
    flexDirection: 'row',
    flex: 1,
    marginRight: 83
  },
  rect13: {
    top: 0,
    left: 187,
    width: 84,
    height: 84,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon6: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 27,
  },
  parkingSpaceStal: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    textAlign: 'center'
    // marginLeft: 8,
  },
  rect10Stack: {
    width: 271,
    height: 73,
    marginTop: 16
    // marginLeft: 19,
  },
  listingFeatures: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginVertical: 20
    // marginLeft: 20,
  },
  features: {},
  feature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    paddingVertical: 5
  },
  featureText: {
    fontSize: 18
  },
  rect14: {
    width: 340,
    height: 180,
    marginTop: 12
    // marginLeft: 20,
  },
  rect15: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect16: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  carWash: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect17: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  covered: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  rect15Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum5: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect20: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  eyCharging: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum5Stack: {
    width: 110,
    height: 32
  },
  rect19: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fenced: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 36,
  },
  rect18: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mobilePass: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 26,
  },
  loremIpsum5StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum6: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect23: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paved: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  loremIpsum6Stack: {
    width: 110,
    height: 32
  },
  rect22: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  security: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  rect21: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  staffOnsite: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 28,
  },
  loremIpsum6StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum7: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect26: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tandem: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum7Stack: {
    width: 110,
    height: 32
  },
  rect25: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unpaved: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect24: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valet: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum7StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 1,
    marginRight: 1
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtnText: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    marginVertical: 67,
    alignSelf: 'center'
  }
});

// AddListingLocation.propTypes = {
//   updateTempListing: PropTypes.func.isRequired,
//   tempListingLocationD: PropTypes.func.isRequired,
// };

const mapStateToProps = ({ tempListing }) => ({
  locationDetails: tempListing.locationDetails
});

export default connect(mapStateToProps, { tempListingLocationD })(AddListingLocation);
