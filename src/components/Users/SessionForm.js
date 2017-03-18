import React from 'react';
import { browserHistory } from 'react-router'
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';

class SessionForm extends React.Component {
  constructor() {
    super();
    this.state = SessionStore.getState();
    this.redirectIfSignedIn();
  }

  componentDidMount = () => {
    SessionStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    SessionStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
    this.redirectIfSignedIn();
  }

  redirectIfSignedIn = () => {
    if(this.state.user) { browserHistory.replace('/dashboard/yards'); }
  }

  handleUpdateEmail = (event) => {
    SessionActions.setEmail(event.target.value);
  }

  handleUpdatePassword = (event) => {
    SessionActions.setPassword(event.target.value);
  }

  handleUpdatePasswordConfirmation = (event) => {
    SessionActions.setPasswordConfirmation(event.target.value);
  }

  errorMessageFor = (key) => {
    if(this.state.errors[key] && this.state.errors[key].length > 0){
      const keyName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      return `${keyName} ${this.state.errors[key].join(', ')}.`;
    }
    return null;
  }

}

export default SessionForm;
