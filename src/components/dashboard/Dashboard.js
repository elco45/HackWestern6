import React, { Component } from 'react';
import { connect } from 'react-redux';
import getWorkRequests from '../../store/actions/workRequestActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polygon
} from 'react-google-maps';
import { Redirect } from 'react-router-dom';

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 42.9432533, lng: -81.2298144 }}
    >
      {props.markers &&
        props.markers.map(marker => {
          const onClick = props.onClick.bind(this, marker);
          return (
            <Marker
              key={marker.id}
              onClick={onClick}
              position={{
                lat: marker.coordinate._lat,
                lng: marker.coordinate._long
              }}
            >
              {props.selectedMarker === marker && (
                <InfoWindow>
                  <div>{`${marker.deviceType}-${marker.id}`}</div>
                </InfoWindow>
              )}
              }
            </Marker>
          );
        })}
      {props.triangleCoords &&
        props.triangleCoords.map((triangleCoord, index) => (
          <Polygon key={index} path={triangleCoord} />
        ))}
    </GoogleMap>
  );
});

class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      classic20: [
        '#1F77B4',
        '#AEC7E8',
        '#FF7F0E',
        '#FFBB78',
        '#2CA02C',
        '#98DF8A',
        '#D62728',
        '#FF9896',
        '#9467BD',
        '#C5B0D5',
        '#8C564B',
        '#C49C94',
        '#E377C2',
        '#F7B6D2',
        '#7F7F7F',
        '#C7C7C7',
        '#BCBD22',
        '#DBDB8D',
        '#17BECF',
        '#9EDAE5'
      ],
      selectedMarker: false,
      triangleCoordsCollection: []
    };

    this.renderMarkers = this.renderMarkers.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPolygons();
  }
  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker });
  };
  getPolygons() {
    fetch(
      'https://opendata.arcgis.com/datasets/3f7bd8a96500488ebad6f53faa60513d_3.geojson'
    )
      .then(res => res.json())
      .then(data => {
        const tmp = [];
        for (let i = 0; i < data.features.length; i++) {
          const { geometry } = data.features[i];
          geometry.coordinates.forEach(coordinatesCol => {
            tmp.push(
              coordinatesCol.map(coordinates => {
                return {
                  lng: coordinates[0],
                  lat: coordinates[1]
                };
              })
            );
          });
        }
        if (this._isMounted) {
          this.setState({
            triangleCoordsCollection: tmp
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderMarkers() {
    const { workRequests } = this.props;
    workRequests &&
      workRequests.id &&
      workRequests.map(workRequest => (
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          key={workRequest.id}
          position={{ lat: 42.9432533, lng: -81.2298144 }}
          // icon={{
          //   url: `../../../public/img/${workRequest.deviceType}.png`,
          //   anchor: new google.maps.Point(32, 32),
          //   scaledSize: new google.maps.Size(64, 64)
          // }}
        />
      ));
  }

  render() {
    const { auth, workRequests } = this.props;
    const { triangleCoordsCollection } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <MapWithAMarker
          selectedMarker={this.state.selectedMarker}
          markers={workRequests}
          triangleCoords={triangleCoordsCollection}
          onClick={this.handleClick}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5PvcQzF-xP9HRa50L1zFf-c5bts9_MZA&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    workRequests: state.firestore.ordered.workRequests,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'workRequests' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);
