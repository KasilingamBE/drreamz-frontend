import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { toggleUserType, toggleAdminMode } from '@parkyourself-frontend/shared/redux/actions/user';
import { unsetAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import colors from '@parkyourself-frontend/shared/config/colors';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ToggleButton from './ToggleButton';

function ProfileButtons({
  toggleUserType,
  isSpaceOwner,
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
    <View style={{ marginVertical: 15 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  logoutIcon: { fontSize: 30, color: colors.white }
});

const mapStateToProps = ({ user, auth }) => ({
  admin: auth.data.admin,
  isSpaceOwner: user.isSpaceOwner,
  userName: auth.authenticated ? auth.data.attributes.name : null,
  adminMode: user.adminMode
});

export default connect(mapStateToProps, { toggleUserType, unsetAuthUser, toggleAdminMode })(
  ProfileButtons
);
