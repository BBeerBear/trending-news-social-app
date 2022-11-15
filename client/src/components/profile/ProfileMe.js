import React, { Component } from 'react';
import "./ProfileStyle.css";
import { connect } from 'react-redux';
// import avatar from "../images/image-rita.png";
// import actions from "./ProfileEdit";
import * as actions from '../../actions';

class ProfileMe extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default: {
      return (
        <div className="card-container">
          <header>
            <a href='#!user'>
              <img class='circle' src={this.props.auth.picture} />
            </a>
          </header>
          <h1 className="UserCard">
          </h1>
          {/* <h2 className="normal-text">{props.city}</h2> */}
          <div className="User">
            <div className="UserName">
              <h1 className="smaller-text">Name:</h1>
              <a href='#!name'>
                <span class='name'>{this.props.auth.name}</span>
              </a>
            </div>
            <div className="Email">
              <h1 className="smaller-text">Email:
              <a href='#!email'>
                <span class='email'>{this.props.auth.email}</span>
              </a>
              </h1>
            </div>
            {/* <div className="Categories">
              <h1 className="bold-text">{actions.getProfile}</h1>
              <h2 className="smaller-text">Like Categories:</h2>
            </div> */}
          </div>
        </div>
      ); 
    } 
    }
  }
  render() {
    return (
      <>
        <ul id='profilecard-1' class='profileme profileme-fixed'>
          {this.renderContent()}
        </ul>
      </>
    );
  }
}

//destruct state
function mapStateToProps({ activity, auth }) {
  return { activity, auth };
}

export default connect(mapStateToProps, actions)(ProfileMe);


