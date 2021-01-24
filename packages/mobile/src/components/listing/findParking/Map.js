import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Form from './Form';
import colors from '@parkyourself-frontend/shared/config/colors';
// import MapMarker from '../../MapMarker';

export default function Map() {
  const findParking = useSelector(({ findParking }) => findParking);
  return (
    <View style={styles.container}>
      <Form />
      <MapView
        style={{ flex: 1, marginTop: 4 }}
        region={{
          latitude: findParking.coordinates[1],
          longitude: findParking.coordinates[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}>
        <Marker
          coordinate={{
            latitude: findParking.coordinates[1],
            longitude: findParking.coordinates[0]
          }}
        />
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}>
          <MapMarker price="$72" />
        </Marker>
      </MapView>
    </View>
  );
}

const MapMarker = () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          marginLeft: 26,
          top: 14,
          zIndex: 100,
          backgroundColor: colors.secondary,
          width: 48,
          height: 48,
          borderRadius: 25,
          paddingTop: 13
        }}>
        <Text style={{ textAlign: 'center', color: colors.white }}>$1000</Text>
      </View>
      <Icon name="location-pin" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  icon: {
    fontSize: 100,
    color: colors.secondary,
    textAlign: 'center'
  }
});
