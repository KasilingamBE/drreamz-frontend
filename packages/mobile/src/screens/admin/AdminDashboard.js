import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MenuItem from '../../components/common/MenuItem';
import MenuItemDrop from '../../components/common/MenuItemDrop';
import colors from '@parkyourself-frontend/shared/config/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ScreenTittle from '../../components/common/ScreenTittle';

const settings = [
  { name: 'Property Type', navigate: 'AdminPropertyType' },
  { name: 'Listing Type', navigate: 'AdminListingType' },
  { name: 'Application Fee', navigate: 'AdminAppFee' }
];

function SpaceOwnerDashboard({ navigation }) {
  return (
    <View style={styles.outerView}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTittle title="Admin Dashboard" />
        <MenuItem
          label="Users"
          style={styles.menuItem}
          onPress={() => navigation.navigate('AdminUsers')}>
          <MaterialCommunityIconsIcon
            name="account-multiple-outline"
            style={styles.materialCIcon}
          />
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          label="Bookings"
          onPress={() => navigation.navigate('AdminBooking')}>
          <MaterialCommunityIconsIcon name="calendar-clock" style={styles.materialCIcon} />
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          label="Parking Inventory"
          onPress={() => navigation.navigate('AdminParking')}>
          <FontAwesomeIcon name="car" style={styles.fontAIcon} />
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          label="Registration Stats"
          onPress={() => navigation.navigate('AdminRegStats')}>
          <MaterialCommunityIconsIcon name="clipboard-text-outline" style={styles.materialCIcon} />
        </MenuItem>
        <MenuItem style={styles.menuItem} label="Messages">
          <FeatherIcon name="mail" style={styles.featherIcon} />
        </MenuItem>
        <MenuItem style={styles.menuItem} label="Cashouts">
          <MaterialCommunityIconsIcon name="cash" style={styles.materialCIcon} />
        </MenuItem>
        <MenuItemDrop
          style={styles.menuItem}
          label="Settings"
          options={settings}
          navigation={navigation}>
          <FeatherIcon name="settings" style={styles.featherIcon} />
        </MenuItemDrop>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: { flex: 1, backgroundColor: colors.white },
  menuItem: {
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  fontAIcon: {
    fontSize: 20,
    color: colors.secondary
  },
  materialCIcon: {
    fontSize: 25,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 23,
    color: colors.secondary
  },
  container: {
    backgroundColor: colors.white,
    padding: 20
  }
});

// SpaceOwnerDashboard.propTypes = {
//   toggleUserType: PropTypes.func.isRequired,
//   isSpaceOwner: PropTypes.bool.isRequired,
// };

// const mapStateToProps = (state) => ({
//   isSpaceOwner: state.user.isSpaceOwner,
// });

// export default connect(mapStateToProps, {toggleUserType})(SpaceOwnerDashboard);
export default SpaceOwnerDashboard;
