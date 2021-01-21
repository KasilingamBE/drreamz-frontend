import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useGetAllListings } from '@parkyourself-frontend/shared/hooks/listings';
import { loadUserListings } from '@parkyourself-frontend/shared/redux/actions/user';
import MyListingListItem from '../../components/SpaceOwner/MyListingListItem';

function MyListings({ navigation, listings, loadUserListings, userId }) {
  const { allData, loading, filter, setFilter, loadMore } = useGetAllListings({
    username: userId,
    active: null
  });

  useEffect(() => {
    loadUserListings(allData.listings);
  }, [allData.listings]);

  return (
    <View style={styles.container}>
      <View style={styles.myListings4Row}>
        <Text style={styles.myListings4}>My Listings {`(${listings.length})`}</Text>
        <View style={styles.rect}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <FontAwesomeIcon name="calendar" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <FontAwesomeIcon name="th-list" style={styles.icon2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {listings.length > 0 ? (
        <>
          {loading && <ActivityIndicator color="#27aae1" size="large" />}
          <FlatList
            data={listings}
            renderItem={({ item }) => <MyListingListItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : loading ? (
        <View style={styles.noItemsFound}>
          <ActivityIndicator color="#27aae1" size="large" />
        </View>
      ) : (
        <View style={styles.noItemsFound}>
          <Text style={styles.notFoundText}>No items found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  myListings4Row: {
    height: 30,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  myListings4: {
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect: {
    width: 63,
    height: 29,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginLeft: 98
  },
  buttonRow: {
    height: 29,
    flexDirection: 'row',
    flex: 1
  },
  button: {
    width: 31,
    height: 29,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    height: 16,
    width: 15,
    marginTop: 6,
    marginLeft: 9
  },
  button2: {
    width: 31,
    height: 29,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 1
  },
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 16,
    height: 16,
    width: 16,
    marginTop: 7,
    marginLeft: 7
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

MyListings.propTypes = {
  loadUserListings: PropTypes.func.isRequired,
  listings: PropTypes.array.isRequired
};

const mapStateToProps = ({ user, auth }) => ({
  listings: user.listings,
  userId: auth.authenticated ? auth.data.attributes.sub : null
});

export default connect(mapStateToProps, { loadUserListings })(MyListings);
