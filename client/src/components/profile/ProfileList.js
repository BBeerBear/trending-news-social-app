import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../layout/Spinner';
import NotFound from '../layout/NotFound';
import ProfileItem from './ProfileItem';

class ProfileList extends Component {
  renderContent() {
    switch (this.props.user.users) {
      case null:
        return <Spinner />;
      case false:
        return <NotFound />;
      default: {
        return (
          <ul class='collection'>
            {this.props.user.users.map((user) => {
              return <ProfileItem user={user} key={user._id} />;
            })}
          </ul>
        );
      }
    }
  }
  render() {
    return this.renderContent();
  }
}

//destruct state
function mapStateToProps({ user, profile }) {
  return { user, profile };
}
export default connect(mapStateToProps, actions)(ProfileList);