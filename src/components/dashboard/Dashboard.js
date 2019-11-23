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
  InfoWindow
} from 'react-google-maps';
import { Redirect } from 'react-router-dom';

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 29.5, lng: -95 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>{marker.shelter}</div>
              </InfoWindow>
            )}
            }
          </Marker>
        );
      })}
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
      triangleCoordsCollection: [],
    };

    this.renderMarkers = this.renderMarkers.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPolygons();
    // this.props.getWorkRequests();
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
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

  // renderPolygons() {
  //   const { triangleCoordsCollection, classic20 } = this.state;
  //   return triangleCoordsCollection.map((triangleCoords, index) => (
  //     <Polygon
  //       key={index}
  //       paths={triangleCoords}
  //       strokeColor="#202020"
  //       strokeOpacity={0.8}
  //       strokeWeight={2}
  //       fillColor={classic20[index]}
  //       fillOpacity={0.35}
  //     />
  //   ));
  // }

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
    const { projects, auth, notifications, workRequests } = this.props;
    console.log(workRequests)
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        {/* <Map
          google={this.props.google}
          zoom={11}
          style={{ width: '100%', height: '100%' }}
          initialCenter={{ lat: 42.9432533, lng: -81.2298144 }}
        >
          {this.renderPolygons()}
          {this.renderMarkers()}
        </Map> */}
        <MapWithAMarker
          selectedMarker={this.state.selectedMarker}
          markers={workRequests}
          onClick={this.handleClick}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5PvcQzF-xP9HRa50L1zFf-c5bts9_MZA&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const workerRequests = state.firestore.ordered.workerRequests;
  return {
    workRequests: state.firestore.ordered.workRequests,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWorkRequests: () => dispatch(getWorkRequests())
  };
};

export default compose(
  connect(mapStateToProps),
  // GoogleApiWrapper({ apiKey: 'AIzaSyA5PvcQzF-xP9HRa50L1zFf-c5bts9_MZA' }),
  firestoreConnect([
    { collection: 'workRequests' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);
