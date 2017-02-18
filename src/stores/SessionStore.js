import alt from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.bindListeners({
      handleSignedIn: SessionActions.SIGNED_IN,
      handleSignInError: SessionActions.SIGN_IN_ERROR,
      handleEmailChange: SessionActions.SET_EMAIL,
      handlePasswordChange: SessionActions.SET_PASSWORD,
      handlePasswordConfirmationChange: SessionActions.SET_PASSWORD_CONFIRMATION,
      handleStartSignIn: SessionActions.START_SIGN_IN,
      handleStartSignUp: SessionActions.START_SIGN_UP
    });

    this.initPing = false;
    this.user = null;
    this.errors = {};
    this.fields = {email: '', password: '', password_confirmation: ''};
    this.submitting = false;
  }

  handleSignedIn(user) {
    this.user = user;
    this.submitting = false;
    this.errors = {};
    this.fields = {email: '', password: '', password_confirmation: ''};
    this.initPing = true;
  }

  handleSignInError(errors) {
    this.errors = errors;
    this.submitting = false;
  }

  handleEmailChange(email) {
    this.fields.email = email;
  }

  handlePasswordChange(password) {
    this.fields.password = password;
  }

  handlePasswordConfirmationChange(password) {
    this.fields.password_confirmation = password;
  }

  handleStartSignIn(submitting) {
    this.submitting = submitting;
  }

  handleStartSignUp(submitting) {
    this.submitting = submitting;
  }
}

export default alt.createStore(SessionStore, 'SessionStore');
