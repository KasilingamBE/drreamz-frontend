import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithAMarker = withScriptjs(
  withGoogleMap(({ coordinates }) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lng: coordinates[0], lat: coordinates[1] }}>
      <Marker position={{ lng: coordinates[0], lat: coordinates[1] }} />
    </GoogleMap>
  ))
);

export default ({ coordinates }) => (
  <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    coordinates={coordinates}
  />
);
