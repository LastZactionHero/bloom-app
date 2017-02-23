import alt from '../alt';
import UserSource from '../sources/UserSource';

class SessionActions {
  ping() {
    UserSource.ping()
      .then( (user) => {
        this.signedIn(user);
      }).catch( () => {
        this.signedIn(null);
      });
    return null;
  }

  startSignOut() {
    UserSource.sign_out()
      .then( () => {
        this.signedIn(null);
      }).catch( () => {
        // Oh noes
      });
    return null
  }

  signedIn(user) {
    return user;
  }

  signInError(errors) {
    return errors;
  }

  setEmail(email) {
    return email;
  }

  setPassword(password) {
    return password;
  }

  setPasswordConfirmation(password) {
    return password;
  }

  startSignIn(submitting, email, password) {
    if(submitting) { return true; }

    if(email.length > 0 && password.length > 0){
      UserSource.sign_in(email, password)
        .then( (user) => {
          this.signedIn(user);
        }).catch( (xhr) => {
          const errors = xhr.responseJSON ? xhr.responseJSON.errors : {server: ['An error occurred signing in.']};
          this.signInError(errors);
        });
    } else {
      return false;
    }
    return true;
  }

  validateInput = () => {
    let valid = true;
    let errors = {};

    if(this.state.email.length == 0) {
      valid = false;
      errors.email = ['can\'t be blank'];
    }
    if(this.state.password.length == 0) {
      valid = false;
      errors.password = ['can\'t be blank'];
    }
    if(this.state.password_confirmation.length == 0) {
      valid = false;
      errors.password_confirmation = ['can\'t be blank'];
    }
    if(this.state.password.length > 0 &&
       this.state.password_confirmation.length > 0 &&
       this.state.password != this.state.password_confirmation){
      valid = false;
      errors.password_confirmation = ['does not match'];
    }
    this.setState({errors: errors});

    return valid;
  }


  startSignUp(submitting, email, password, password_confirmation) {
    if(submitting) { return true }

    let valid = true;
    const errors = {};
    if(email.length == 0) {
      errors.email = ['can\'t be blank'];
      valid = false;
    }
    if(password.length == 0) {
      errors.password = ['can\'t be blank'];
      valid = false;
    }
    if(password_confirmation.length == 0) {
      errors.password_confirmation = ['can\'t be blank'];
      valid = false;
    }
    if(password.length > 0 && password_confirmation.length > 0 && password != password_confirmation) {
      errors.password_confirmation = ['does not match'];
      valid = false;
    }
    if(valid == false) {
      this.signInError(errors);
      return false;
    }

    UserSource.sign_up(email, password)
      .then( (user) => {
        this.signedIn(user);
      }).catch( (xhr) => {
        const errors = xhr.responseJSON ? xhr.responseJSON.errors : {server: ['An error occurred signing up.']};
        this.signInError(errors);
      });
    return true;
  }

}

export default alt.createActions(SessionActions);
