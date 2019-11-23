import React, { Component } from 'react';
import List from '../list/List';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class DeviceTypes extends Component {
  render() {
    const { deviceTypes, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <List items={deviceTypes} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    deviceTypes: state.firestore.ordered.deviceTypes,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'deviceTypes', orderBy: ['createdAt', 'desc'] },
  ])
)(DeviceTypes);
