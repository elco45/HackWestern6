import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Marker } from 'google-maps-react';

const Markers = ({ google, workRequests }) => {
  if (!workRequests) {
    return ''
  }
  console.log(workRequests[0].coordinates.latitude)
  console.log(workRequests[0].coordinates.longitude)
  return (
    workRequests &&
    workRequests.map(workRequest => (
      <Marker
        key={workRequest.id}
        name={workRequest.id}
        position={{ lat: workRequest.coordinates.latitude, lng: -81.2298144 }}
        // icon={{
        //   url: `../../../public/img/${workRequest.deviceType}.png`,
        //   anchor: new google.maps.Point(32, 32),
        //   scaledSize: new google.maps.Size(64, 64)
        // }}
      />
    ))
  );
};

export default Markers;
