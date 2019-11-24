/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Popup from 'reactjs-popup';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = props => {
  return (
    <div>
      <ul className="right">
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <Popup
            trigger={
              <button className="btn btn-floating pink lighten-1">
                {props.profile.initials}
              </button>
            }
            position="bottom right"
            closeOnDocumentClick
          >
            <div className="popupWrapper">
              <NavLink
                to={props.location.pathname === '/' ? '/chat2' : '/'}
                className={`btn btn-floating ${
                  props.location.pathname === '/' ? 'blue' : 'green'
                } lighten-1`}
              >
                {props.location.pathname === '/' ? 'HP' : 'DT'}
              </NavLink>
            </div>
          </Popup>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks));
