import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BookingItem from '../components/BookingItem';
import PropTypes from 'prop-types';

function MyBookings({ bookings, navigation }) {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <View style={styles.container}>
      <Text style={styles.myBookings}>My Bookings</Text>
      <View style={styles.rect}>
        <View style={styles.currentRow}>
          <TouchableOpacity onPress={() => setActiveIndex(0)}>
            <Text style={activeIndex == 0 ? { ...styles.tab, ...styles.active } : styles.tab}>
              CURRENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveIndex(1)}>
            <Text style={activeIndex == 1 ? { ...styles.tab, ...styles.active } : styles.tab}>
              UPCOMING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveIndex(2)}>
            <Text style={activeIndex == 2 ? { ...styles.tab, ...styles.active } : styles.tab}>
              COMPLETED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveIndex(3)}>
            <Text style={activeIndex == 3 ? { ...styles.tab, ...styles.active } : styles.tab}>
              CANCELLED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.noItemsFound}>
        <Text style={styles.notFoundText}>No Bookings found</Text>
      </View>
      {/* <View style={styles.scrollAreaStack}> */}
      {/* <View style={styles.scrollArea}> */}
      {/* {activeIndex == 1 ? (
        // <ScrollView
        //   horizontal={false}
        //   contentContainerStyle={styles.scrollArea_contentContainerStyle}>
        //   <BookingItem />
        //   <BookingItem />
        //   <BookingItem />
        // </ScrollView>
        <View style={styles.scrollArea_contentContainerStyle}>
          <FlatList
            data={bookings}
            renderItem={({ item }) => <BookingItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View style={styles.noItemsFound}>
          <Text style={styles.notFoundText}>No items found</Text>
        </View>
      )} */}

      {/* </View> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  myBookings: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 26,
    marginTop: 10,
    marginLeft: 23
  },
  rect: {
    // width: '100%',
    height: 38,
    flexDirection: 'row',
    marginTop: 15,
    // marginLeft: 23,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  tab: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 14,
    opacity: 0.8
    // marginRight: 10,
  },
  currentRow: {
    // height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: 1,
    marginTop: 5
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: '#0b4094',
    color: '#0b4094',
    fontSize: 14,
    fontWeight: 'bold'
  },
  scrollArea_contentContainerStyle: {
    // height: 584,
    width: '100%',
    padding: 20
  },
  rect2: {
    top: 0,
    left: 1,
    width: 332,
    height: 233,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 60,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff'
  },
  rect3: {
    width: 330,
    height: 85
  },
  rect4: {
    width: 82,
    height: 85
  },
  image: {
    width: 49,
    height: 49,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12
  },
  loremIpsum: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginTop: 1
  },
  rect5: {
    width: 50,
    height: 20,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginLeft: 3
  },
  rebook: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 10,
    marginTop: 5,
    marginLeft: 10
  },
  loremIpsumRow: {
    height: 37,
    flexDirection: 'row',
    marginLeft: 1
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginTop: 8
  },
  loremIpsumRowColumn: {
    width: 242,
    marginTop: 14,
    marginBottom: 11
  },
  rect4Row: {
    height: 85,
    flexDirection: 'row',
    marginRight: 6
  },
  materialButtonPrimary2: {
    height: 36,
    width: 120
  },
  rect9: {
    width: 124,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    marginLeft: 13
  },
  cancelBooking: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginTop: 11,
    marginLeft: 7
  },
  rect10: {
    top: 0,
    left: 0,
    width: 38,
    height: 36,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  icon6: {
    top: 0,
    left: 2,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 34,
    height: 37,
    width: 34
  },
  rect10Stack: {
    width: 38,
    height: 37,
    marginLeft: 11
  },
  materialButtonPrimary2Row: {
    height: 37,
    flexDirection: 'row',
    marginTop: 92,
    marginLeft: 13,
    marginRight: 13
  },
  rect6: {
    top: 97,
    left: 0,
    width: 332,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(223,220,220,1)',
    flexDirection: 'row'
  },
  button: {
    width: 138,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(187,186,186,1)',
    flexDirection: 'row'
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    height: 20,
    width: 26
  },
  visa6094320: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 6
  },
  iconRow: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 8,
    marginTop: 5
  },
  moreDetails: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 10,
    textDecorationLine: 'underline',
    marginLeft: 10,
    marginTop: 10
  },
  rect8: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    marginLeft: 9
  },
  icon2: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13
  },
  icon3: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 5,
    marginTop: 1
  },
  icon4: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 6,
    marginTop: 1
  },
  icon5: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 5,
    marginTop: 1
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(114,113,113,1)',
    fontSize: 10,
    marginLeft: 9,
    marginTop: 4
  },
  icon2Row: {
    height: 18,
    flexDirection: 'row',
    flex: 1,
    marginRight: 6,
    marginTop: 7
  },
  buttonRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 6,
    marginLeft: 13,
    marginTop: 19
  },
  scrollAreaStack: {
    width: '90%',
    height: 584,
    marginTop: 22,
    marginLeft: 22
  },
  noItemsFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundText: {
    fontSize: 18,
    color: '#999'
  }
});

MyBookings.propTypes = {
  bookings: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  bookings: state.user.bookings
});

export default connect(mapStateToProps, null)(MyBookings);
