import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { tempListingMobileInitial } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import colors from '@parkyourself-frontend/shared/config/colors';
import ProfileButtons from '../../components/common/ProfileButtons';

function SpaceOwnerDashboard({ navigation }) {
  const dispatch = useDispatch();

  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };
  const addListingNavigationHandler = (screen) => {
    dispatch(tempListingMobileInitial());
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.spaceOwner}>Space Owner</Text>
      <TouchableOpacity
        style={styles.rect1}
        onPress={() => {
          navigationHandler('CreateSpaceOwnerProfile');
        }}>
        <View style={styles.icon2Row}>
          <SimpleLineIconsIcon name="briefcase" style={styles.icon2} />
          <View style={styles.spaceOwnerProfileColumn}>
            <Text style={styles.spaceOwnerProfile}>SPACE OWNER PROFILE</Text>
            <Text style={styles.exampleGmailCom1}>example@gmail.com</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.dashboard}>DASHBOARD</Text>
      <TouchableOpacity style={styles.rect2} onPress={() => navigationHandler('My Listings')}>
        <View style={styles.wrapper}>
          <MaterialCommunityIconsIcon name="calendar-clock" style={styles.icon} />
          <Text style={styles.btnText}>My Listings</Text>
        </View>
        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rect2} onPress={() => navigationHandler('Parking Orders')}>
        <View style={styles.wrapper}>
          <FontAwesomeIcon name="car" style={styles.icon} />
          <Text style={styles.btnText}>Parking Orders Recieved</Text>
        </View>
        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect2}
        onPress={() => addListingNavigationHandler('AddListing')}>
        <View style={styles.wrapper}>
          <FontAwesomeIcon name="credit-card" style={styles.icon} />
          <Text style={styles.btnText}>Add a Listing</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rect2}
        onPress={() => {
          navigationHandler('WithdrawalSettings');
        }}>
        <View style={styles.wrapper}>
          <MaterialCommunityIconsIcon name="cash-multiple" style={styles.icon} />
          <Text style={styles.btnText}>Withdrawal Settings</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.rect2} onPress={() => {}}>
        <View style={styles.wrapper}>
          <SimpleLineIconsIcon name="notebook" style={styles.icon} />
          <Text style={styles.btnText}>Payout &amp; Deposit Reports</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.rect2} onPress={() => {}}>
        <View style={styles.wrapper}>
          <FontAwesomeIcon name="handshake-o" style={styles.icon} />
          <Text style={styles.btnText}>Set Staff Credentials</Text>
        </View>

        <FontAwesomeIcon name="arrow-right" style={styles.icon2} />
      </TouchableOpacity>
      <ProfileButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  spaceOwner: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect1: {
    width: '100%',
    // height: 64,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 37,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon2: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 28,
    width: 25
    // marginTop: 7,
  },
  spaceOwnerProfile: {
    // fontFamily: 'roboto-300',
    color: '#121212',
    fontSize: 12,
    marginLeft: 1
  },
  exampleGmailCom1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 4
  },
  spaceOwnerProfileColumn: {
    // width: 150,
    marginLeft: 19
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
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 22,
    height: 24
  },
  btnText: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginLeft: 24
  },
  icon1: {
    color: 'rgba(39,170,225,1)',
    fontSize: 22,
    height: 24,
    width: 15,
    marginLeft: 90,
    marginTop: 4
  },
  icon2Row: {
    // height: 38,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 14,
    marginRight: 16
  },
  icon9: {
    top: 19,
    left: 310,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 21
  },
  rect8: {
    top: 0,
    left: 0,
    width: 329,
    height: 58,
    position: 'absolute',
    shadowColor: 'rgba(208,206,206,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 0.88,
    shadowRadius: 20,
    backgroundColor: '#fff'
  },
  myListings: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 56
  },
  icon9Stack: {
    top: 0,
    left: 0,
    width: 329,
    height: 58,
    position: 'absolute'
  },
  icon14: {
    top: 20,
    left: 14,
    position: 'absolute',
    color: 'rgba(11,64,148,1)',
    fontSize: 22
  },
  icon9StackStack: {
    width: 329,
    height: 58,
    marginTop: 82,
    marginLeft: 25
  },
  icon10: {
    top: 19,
    left: 17,
    position: 'absolute',
    color: 'rgba(11,64,148,1)',
    fontSize: 22
  },
  rect6: {
    top: 0,
    left: 0,
    width: 329,
    height: 58,
    position: 'absolute',
    shadowColor: 'rgba(208,206,206,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.88,
    shadowRadius: 20,
    flexDirection: 'row'
  },
  addAListing: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 1
  },
  icon17: {
    color: 'rgba(39,170,225,1)',
    fontSize: 21,
    height: 23,
    width: 7,
    marginLeft: 158
  },
  addAListingRow: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 13,
    marginLeft: 58,
    marginTop: 17
  },
  icon10Stack: {
    width: 329,
    height: 58,
    marginTop: 100,
    marginLeft: 25
  },
  rect7: {
    width: 329,
    height: 58,
    shadowColor: 'rgba(208,206,206,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.88,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: -137,
    marginLeft: 25
  },
  icon11: {
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    height: 22,
    width: 25,
    marginTop: 4
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 5
  },
  dashboard: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 18,
    marginTop: 30
  },
  rect9: {
    width: 329,
    height: 58,
    shadowColor: 'rgba(208,206,206,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.88,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: 250,
    marginLeft: 25
  }

  // rect12: {
  //   width: 150,
  //   height: 40,
  //   backgroundColor: 'rgba(39,170,225,1)',
  //   flexDirection: 'row',
  //   marginTop: 20,
  //   marginBottom: 50,
  //   alignSelf: 'center',
  // },
  // icon21: {
  //   color: 'rgba(254,253,253,1)',
  //   fontSize: 24,
  //   height: 27,
  //   width: 19,
  // },
  // logOut1: {
  //   // fontFamily: 'roboto-500',
  //   color: 'rgba(255,255,255,1)',
  //   marginLeft: 8,
  //   marginTop: 6,
  // },
  // icon21Row: {
  //   height: 27,
  //   flexDirection: 'row',
  //   flex: 1,
  //   marginRight: 36,
  //   marginLeft: 30,
  //   marginTop: 7,
  // },
  // rect13: {
  //   width: 260,
  //   height: 43,
  //   backgroundColor: 'rgba(20,222,113,1)',
  //   shadowColor: 'rgba(180,177,177,1)',
  //   shadowOffset: {
  //     width: 3,
  //     height: 3,
  //   },
  //   elevation: 20,
  //   shadowOpacity: 1,
  //   shadowRadius: 10,
  //   flexDirection: 'row',
  //   marginTop: 120,
  //   alignSelf: 'center',
  // },
  // switch: {
  //   marginLeft: 32,
  //   marginTop: 12,
  // },
  // switchToDriver: {
  //   // fontFamily: 'roboto-regular',
  //   color: 'rgba(255,255,255,1)',
  //   fontSize: 15,
  //   marginLeft: 17,
  //   marginTop: 15,
  // },
});

// SpaceOwnerDashboard.propTypes = {
//   toggleUserType: PropTypes.func.isRequired,
//   isSpaceOwner: PropTypes.bool.isRequired,
// };

// const mapStateToProps = ({ user, auth }) => ({
//   admin: auth.data.admin,
//   isSpaceOwner: user.isSpaceOwner,
//   userName: auth.authenticated ? auth.data.attributes.name : null,
//   adminMode: user.adminMode
// });

// export default connect(mapStateToProps, { toggleUserType, unsetAuthUser, toggleAdminMode })(
//   SpaceOwnerDashboard
// );
export default SpaceOwnerDashboard;
