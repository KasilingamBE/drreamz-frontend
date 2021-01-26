import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { toggleUserType, toggleAdminMode } from '@parkyourself-frontend/shared/redux/actions/user';
import { unsetAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import colors from '@parkyourself-frontend/shared/config/colors';
import ToggleButton from './ToggleButton';
import MenuItem from './MenuItem';

function AppDrawer({
  navigation,
  toggleUserType,
  isSpaceOwner,
  userName,
  unsetAuthUser,
  toggleAdminMode,
  adminMode,
  admin
}) {
  const handleLogout = () => {
    Auth.signOut().then(() => {
      unsetAuthUser();
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/headerlogo.jpg')}
        resizeMode="contain"
        style={styles.image}
      />
      {!isSpaceOwner && !adminMode && (
        <>
          <MenuItem label="Book a Parking">
            <MaterialCommunityIconsIcon name="calendar-clock" style={styles.materialCIcon} />
          </MenuItem>
          <MenuItem label="My Bookings">
            <FontAwesomeIcon name="car" style={styles.fontAIcon} />
          </MenuItem>
          <MenuItem label="Book a Parking">
            <MaterialCommunityIconsIcon name="calendar-clock" style={styles.materialCIcon} />
          </MenuItem>
          <MenuItem label="On-Going Parkings">
            <FontAwesomeIcon name="credit-card" style={styles.fontAIcon} />
          </MenuItem>
          <MenuItem label="Messages">
            <FeatherIcon name="mail" style={styles.featherIcon} />
          </MenuItem>
          <MenuItem label="Rent your Space">
            <MaterialCommunityIconsIcon name="cash" style={styles.materialCIcon} />
          </MenuItem>
          <MenuItem label="Send a Gift">
            <MaterialCommunityIconsIcon name="gift" style={styles.featherIcon} />
          </MenuItem>
          <MenuItem label="Refer a Friend">
            <EntypoIcon name="add-user" style={styles.featherIcon} />
          </MenuItem>
          <MenuItem label="FAQ&#39;s">
            <FontAwesomeIcon name="question-circle-o" style={styles.fontAIcon} />
          </MenuItem>
        </>
      )}
      {admin && (
        <ToggleButton
          value={adminMode}
          onChange={toggleAdminMode}
          label={adminMode ? 'Switch to User' : 'Switch to Admin'}
        />
      )}
      {!adminMode && (
        <ToggleButton
          value={isSpaceOwner}
          onChange={toggleUserType}
          label={isSpaceOwner ? 'Switch to Driver' : 'Switch to Space Owner'}
        />
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
        <IoniconsIcon name="ios-log-out" style={styles.logoutIcon} />
        <Text style={{ color: colors.white, marginLeft: 5 }}>LOG OUT</Text>
      </TouchableOpacity>

      <View style={styles.userRow}>
        <EntypoIcon name="user" style={styles.materialCIcon} />
        <Text style={styles.userText}>{userName}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 30 : 20
  },
  image: {
    alignSelf: 'center'
  },
  materialCIcon: {
    fontSize: 25,
    color: colors.secondary
  },
  fontAIcon: {
    fontSize: 20,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 23,
    color: colors.secondary
  },
  logoutButton: {
    backgroundColor: 'rgba(39,170,225,1)',
    shadowColor: 'rgba(180,179,179,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%'
  },
  logoutIcon: { fontSize: 30, color: colors.white },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10
  },
  userText: { fontWeight: 'bold', fontSize: 20, marginLeft: 5 }
});

const mapStateToProps = ({ user, auth }) => ({
  admin: auth.data.admin,
  isSpaceOwner: user.isSpaceOwner,
  userName: auth.authenticated ? auth.data.attributes.name : null,
  adminMode: user.adminMode
});

export default connect(mapStateToProps, {
  toggleUserType,
  unsetAuthUser,
  toggleAdminMode
})(AppDrawer);
