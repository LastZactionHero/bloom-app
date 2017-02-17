import alt from '../alt';
import UserSource from '../sources/UserSource';

class UserSignInActions {
  signUp(email, password) {
    UserSource.sign_up(email, password).then( (user) => {
      console.log("Resolved!!!!!!");
      this.signUpSuccess(user)
    });
    return null;
  }

  signUpSuccess(user) {
    console.log("SUCCESSFUL!")
    return null;
  }

  signUpFail(xhr) {

  }

  signIn(email, password) {

  }

  signInSuccess(user) {

  }

  signInFail(xhr) {

  }
}

export default alt.createActions(UserSignInActions);