import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import LocationHeader from '../components/LocationHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addBooking } from '../actions/user';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

function PayNowScreen({ navigation, route, listings }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showStart, setStartShow] = useState(false);
  const [showEnd, setEndShow] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [card, setCard] = useState(null);
  const [listingId, setListingId] = useState(route.params.lId);
  const [price, setPrice] = useState(route.params.price);

  const [listingData] = useState(listings.filter((item) => item.id === listingId)[0])[0];

  const { address, city, state, postalCode } = listingData.locationDetails;

  if (route.params.vehicle) {
    console.log('Vehicle data ', vehicle);
    setVehicle(vehicle);
  }

  if (route.params.card) {
    console.log('Card data ', card);
    setCard(card);
  }

  const onSubmitHandler = () => {
    try {
      if (listingId && startDate && endDate && price && vehicle && card) {
        let bookingData = {
          id: uuidv4(),
          listingId: listingId,
          location: `${address}, ${city}, ${state}, ${postalCode}`,
          startDate,
          endDate,
          duration: moment.duration(endDate.diff(startDate)).asHours(),
          vehicle,
          price,
          card
        };
        addBooking(bookingData);
        navigation.navigate('SuccessfullyBooked', {
          bookingData: bookingData
        });
      } else {
        Alert.alert('Missing Inputs', 'Please fill all the inputs');
      }
    } catch (error) {
      Alert.alert('Something Went Wrong!', 'Please try again');
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    // setEndShow(false);
    // setStartShow(true);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    // setStartShow(false);
    // setEndShow(true);
    setEndDate(currentDate);
  };

  const showMode = (currentMode, item) => {
    if (item == 'start') {
      setEndShow(false);
      setStartShow(true);
    } else if (item == 'end') {
      setStartShow(false);
      setEndShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = (item) => {
    showMode('date', item);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LocationHeader location={`${address}, ${city}, ${state}, ${postalCode}`} />
      <View style={styles.rect2Stack}>
        <View style={styles.listItem}>
          <Text style={styles.arriving}>Arriving</Text>
          <Text style={styles.loremIpsum3} numberOfLines={1}>
            {startDate.toString()}
          </Text>
          <TouchableOpacity onPress={() => showDatepicker('start')}>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.leaving}>Leaving</Text>
          <Text style={styles.loremIpsum4} numberOfLines={1}>
            {endDate.toString()}
          </Text>
          <TouchableOpacity onPress={() => showDatepicker('end')}>
            <Text style={styles.change2}>Change</Text>
          </TouchableOpacity>
        </View>
        {showStart && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
        {showEnd && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
        <View style={styles.listItem}>
          <Text style={styles.duration}>Duration</Text>
          <Text style={styles.loremIpsum5}>
            {startDate && endDate && moment.duration(endDate.diff(startDate)).asHours()}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.vehicle}>Vehicle</Text>
          <Text style={styles.loremIpsum6}>{vehicle.model}</Text>
          <TouchableOpacity
            style={styles.ellipseStack}
            onPress={() => navigation.navigate('AddVehicle')}>
            <Svg viewBox="0 0 23.02 19.27" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(39,170,225,1)"
                cx={12}
                cy={10}
                rx={12}
                ry={10}></Ellipse>
            </Svg>
            <Text style={styles.loremIpsum7}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.profileCategory}>Profile Category</Text>
          <View style={styles.rect9}>
            <View style={styles.rect10Row}>
              <View style={styles.rect10}>
                <Text style={styles.business}>Business</Text>
              </View>
              <Text style={styles.personal}>Personal</Text>
            </View>
          </View>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.payment}>Payment</Text>
          <Text style={styles.loremIpsum8}>{price}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.cardNumber}>Card Number</Text>
          <FontAwesomeIcon name="cc-visa" style={styles.icon5}></FontAwesomeIcon>
          <Text style={styles.xxxXxxxXxxx0147}>{card.cardNumber}</Text>
          <TouchableOpacity
            style={styles.ellipse1Stack}
            onPress={() => navigation.navigate('AddCreditDebitCard')}>
            <Svg viewBox="0 0 23.02 19.27" style={styles.ellipse1}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(39,170,225,1)"
                cx={12}
                cy={10}
                rx={12}
                ry={10}></Ellipse>
            </Svg>
            <Text style={styles.loremIpsum9}>+</Text>
          </TouchableOpacity>
        </View>
        <MaterialButtonPrimary
          caption={`PAY ${price}`}
          style={styles.materialButtonPrimary3}
          onPress={onSubmitHandler}></MaterialButtonPrimary>
        <Text style={styles.loremIpsum10}>
          By Making payment you indicate your acceptance of our Terms &amp; Conditions and Privacy
          Policy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff'
  },
  listItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    // marginVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  rect3: {
    width: '100%',
    height: 60,
    flexDirection: 'row'
  },
  arriving: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16
  },
  loremIpsum3: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginLeft: 80,
    marginTop: 3,
    width: 170
  },
  change: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 6
  },
  duration: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16
  },
  loremIpsum5: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginLeft: 133
  },
  vehicle: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16,
    marginTop: 4
  },
  loremIpsum6: {
    // fontFamily: 'roboto-700',
    color: 'rgba(39,170,225,1)',
    fontSize: 15,
    marginLeft: 134,
    marginTop: 5
  },
  ellipse: {
    top: 3,
    left: 0,
    width: 22,
    height: 22,
    position: 'absolute'
  },
  loremIpsum7: {
    top: 0,
    left: 5,
    // position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  ellipseStack: {
    width: 22,
    height: 24
    // marginLeft: 13,
  },
  payment: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16
  },
  loremIpsum8: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 16,
    marginLeft: 210
  },
  cardNumber: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16,
    marginTop: 5
  },
  icon5: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 25,
    width: 32,
    marginLeft: 19,
    marginTop: 2
  },
  xxxXxxxXxxx0147: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginLeft: 6,
    marginTop: 6
  },
  ellipse1: {
    top: 1,
    left: 0,
    width: 22,
    height: 22
    // position: 'absolute',
  },
  loremIpsum9: {
    top: 0,
    left: 5,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  ellipse1Stack: {
    width: 22,
    height: 26,
    // marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  materialButtonPrimary3: {
    height: 36,
    width: 100,
    marginTop: 34,
    alignSelf: 'center'
  },
  leaving: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16
  },
  loremIpsum4: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginLeft: 80,
    marginTop: 1,
    width: 170
  },
  change2: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 4
  },
  profileCategory: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(179,177,177,1)',
    fontSize: 16,
    marginTop: 8
  },
  rect9: {
    width: 108,
    height: 32,
    backgroundColor: 'rgba(216,212,212,1)',
    borderRadius: 38,
    flexDirection: 'row',
    marginLeft: 92
  },
  rect10: {
    width: 55,
    height: 25,
    backgroundColor: 'rgba(39,170,225,1)',
    borderRadius: 57
  },
  business: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 9,
    marginTop: 6,
    marginLeft: 9
  },
  personal: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
    marginLeft: 7,
    marginTop: 8
  },
  rect10Row: {
    height: 25,
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
    marginLeft: 3,
    marginTop: 3
  },
  loremIpsum10: {
    // top: 412,
    // left: 15,
    // position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    textAlign: 'center',
    marginVertical: 30
  },
  rect2Stack: {
    height: 580,
    marginTop: 20
    // marginLeft: 16,
    // marginRight: -31,
  }
});

export default PayNowScreen;
