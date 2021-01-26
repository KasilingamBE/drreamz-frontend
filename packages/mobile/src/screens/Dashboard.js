import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useCRUDVehicle } from '@parkyourself-frontend/shared/hooks/vehicle';
import ProfileButtons from '../components/common/ProfileButtons';
import AddVehicleModal from '../components/vehicle/AddVehicleModal';

function Dashboard({ navigation }) {
  const {
    allData: { vehicles },
    handleDeleteVehicle
  } = useCRUDVehicle();
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // console.log('Wvwvehicles', vehicles);

  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.dashboard}>Dashboard</Text>
      <View style={styles.rect}>
        <TouchableOpacity
          style={styles.rect2}
          onPress={() => setShowPersonalForm(!showPersonalForm)}>
          <View style={styles.wrapper}>
            <MaterialCommunityIconsIcon name="google" style={styles.icon} />
            <View style={styles.profileColumn}>
              <Text style={styles.profile}>PERSONAL PROFILE</Text>
              <Text style={styles.email}>example@gmail.com</Text>
            </View>
          </View>
          <FontAwesomeIcon
            name={showPersonalForm ? 'arrow-up' : 'arrow-down'}
            style={styles.icon2}
          />
        </TouchableOpacity>
        {showPersonalForm && (
          <View style={styles.form}>
            <TextInput placeholder="First Name" placeholderTextColor="rgba(211,211,211,1)" />
            <TextInput placeholder="Last Name" placeholderTextColor="rgba(211,211,211,1)" />
            <TextInput placeholder="Email" placeholderTextColor="rgba(211,211,211,1)" />
            <TextInput placeholder="Mobile Number" placeholderTextColor="rgba(211,211,211,1)" />
            <View style={styles.placeholderStack}>
              <TextInput placeholder="Password" placeholderTextColor="rgba(211,211,211,1)" />
              <Text style={styles.change}>Change</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.rect}>
        <TouchableOpacity
          style={styles.rect2}
          onPress={() => setShowBusinessForm(!showBusinessForm)}>
          <View style={styles.wrapper}>
            <SimpleLineIconsIcon name="briefcase" style={styles.icon} />
            <View style={styles.profileColumn}>
              <Text style={styles.profile}>BUSINESS PROFILE</Text>
              <Text style={styles.email}>Set Up Business Profile</Text>
            </View>
          </View>
          <FontAwesomeIcon
            name={showBusinessForm ? 'arrow-up' : 'arrow-down'}
            style={styles.icon2}
          />
        </TouchableOpacity>
        {showBusinessForm && (
          <View style={styles.form}>
            <TextInput placeholder="Business Name" placeholderTextColor="rgba(211,211,211,1)" />
            <TextInput placeholder="Business Email" placeholderTextColor="rgba(211,211,211,1)" />
            <TextInput placeholder="Mobile Number" placeholderTextColor="rgba(211,211,211,1)" />
            <View style={styles.placeholderStack}>
              <TextInput placeholder="Password" placeholderTextColor="rgba(211,211,211,1)" />
              <Text style={styles.change}>Change</Text>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.moreInformation}>MORE INFORMATION</Text>
      <View style={styles.rect}>
        <TouchableOpacity style={styles.rect2} onPress={() => setShowVehicles(!showVehicles)}>
          <View style={styles.wrapper}>
            <FontAwesomeIcon name="car" style={styles.icon} />
            <Text style={styles.btnText}>Vehicles</Text>
          </View>

          <FontAwesomeIcon
            name={showVehicles ? 'arrow-down' : 'arrow-right'}
            style={styles.icon2}
          />
        </TouchableOpacity>
        {showVehicles && (
          <View style={styles.form}>
            {vehicles &&
              vehicles.map((item) => (
                <View style={styles.vehicle} key={item._id}>
                  <Text style={styles.vehicleName}>
                    {item.year} {item.make} {item.model}
                  </Text>
                  <View style={styles.iconBtnRow}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddVehicle', { vehicle: item });
                      }}
                      style={styles.iconBtn}>
                      <EvilIconsIcon name="pencil" size={28} color="#888" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteVehicle(item._id)}
                      style={styles.iconBtn}>
                      <EvilIconsIcon name="trash" size={28} color="#888" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            <AddVehicleModal
              visible={showAddVehicleModal}
              onHide={() => setShowAddVehicleModal(false)}
            />
            <TouchableOpacity
              onPress={() => setShowAddVehicleModal(true)}
              style={styles.addVehicleBtn}>
              <EntypoIcon name="circle-with-plus" style={styles.icon5} />
              <Text style={styles.addVehicle}>Add New Vehicles</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('Payments');
        }}>
        <View style={styles.wrapper}>
          <FontAwesomeIcon name="credit-card" style={styles.icon} />
          <Text style={styles.btnText}>Payment</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('MyReviews');
        }}>
        <View style={styles.wrapper}>
          <FontAwesomeIcon name="star-o" style={styles.icon} />
          <Text style={styles.btnText}>Reviews</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rect2}>
        <View style={styles.wrapper}>
          <FeatherIcon name="gift" style={styles.icon} />
          <Text style={styles.btnText}>Send a Gift</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('ReferFriend');
        }}>
        <View style={styles.wrapper}>
          <FontAwesome5Icon name="hands-helping" style={styles.icon}></FontAwesome5Icon>
          <Text style={styles.btnText}>Refer a Friend</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('FAQ');
        }}>
        <View style={styles.wrapper}>
          <FeatherIcon name="help-circle" style={styles.icon} />
          <Text style={styles.btnText}>FAQs</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('Settings');
        }}>
        <View style={styles.wrapper}>
          <FeatherIcon name="settings" style={styles.icon} />
          <Text style={styles.btnText}>Settings</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <ProfileButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  dashboard: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 28
  },
  rect: {
    width: '100%'
  },
  rect2: {
    width: '100%',
    padding: 20,
    // height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 30,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    marginTop: 20
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 27
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 30
    // height: 33,
    // width: 30,
  },
  addVehicleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10
  },
  addVehicle: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 18,
    marginLeft: 23
    // marginTop: 6,
  },
  vehicle: {
    padding: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vehicleName: {
    fontSize: 18
  },
  iconBtnRow: {
    flexDirection: 'row'
  },
  iconBtn: {
    marginHorizontal: 5
  },
  profile: {
    // fontFamily: 'roboto-300',
    color: '#121212',
    fontSize: 13
  },
  email: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 4
  },
  profileColumn: {
    marginLeft: 19
  },
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 22,
    height: 24
  },
  form: {
    padding: 15,
    elevation: 30,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.16,
    shadowRadius: 20
  },
  change: {
    top: 20,
    left: 259,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 11,
    textDecorationLine: 'underline'
  },
  placeholderStack: {
    width: '100%',
    height: 47
  },
  moreInformation: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 41
  },
  btnText: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginLeft: 24
  }
  // rect12: {
  //   // width: 260,
  //   // height: 50,
  //   backgroundColor: 'rgba(20,222,113,1)',
  //   shadowColor: 'rgba(180,177,177,1)',
  //   shadowOffset: {
  //     width: 3,
  //     height: 3,
  //   },
  //   elevation: 30,
  //   shadowOpacity: 1,
  //   shadowRadius: 10,
  //   flexDirection: 'row',
  //   marginTop: 300,
  //   // marginLeft: 66,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  // },
  // switch: {
  //   // marginLeft: 19,
  //   // marginTop: 11,
  // },
  // loremIpsum2: {
  //   // fontFamily: 'roboto-regular',
  //   color: 'rgba(255,255,255,1)',
  //   marginLeft: 14,
  //   // marginTop: 15,
  // },
  // rect13: {
  //   width: 150,
  //   height: 45,
  //   backgroundColor: 'rgba(39,170,225,1)',
  //   shadowColor: 'rgba(180,179,179,1)',
  //   shadowOffset: {
  //     width: 3,
  //     height: 3,
  //   },
  //   elevation: 30,
  //   shadowOpacity: 1,
  //   shadowRadius: 10,
  //   flexDirection: 'row',
  //   marginTop: 16,
  //   marginBottom: 80,
  //   alignSelf: 'center',
  //   // paddingVertical: 10,
  //   // paddingHorizontal: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // icon17: {
  //   color: 'rgba(254,253,253,1)',
  //   fontSize: 24,
  //   height: 27,
  //   width: 19,
  // },
  // logOut: {
  //   // fontFamily: 'roboto-500',
  //   color: 'rgba(255,255,255,1)',
  //   marginLeft: 13,
  //   marginTop: 6,
  // },
  // icon17Row: {
  //   height: 27,
  //   flexDirection: 'row',
  //   flex: 1,
  //   marginRight: 33,
  //   marginLeft: 28,
  //   marginTop: 6,
  // },
});

// Dashboard.propTypes = {
//   vehicles: PropTypes.array.isRequired,
// };

const mapStateToProps = (state) => ({
  vehicles: state.user.vehicles
});

export default connect(mapStateToProps, null)(Dashboard);
