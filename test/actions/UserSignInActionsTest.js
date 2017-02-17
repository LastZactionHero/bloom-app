'use strict'
import UserSignInActions from 'actions/UserSignInActions'
import UserSource from 'sources/UserSource'
import simple from 'simple-mock'

describe('UserSignInActions', function(){
  var email = 'user@site.com'
  var password = 'abcd1234';

  afterEach(function() { simple.restore(); });

  describe('signUp', function(){
    it('calls UserSource#sign_up', function() {
      simple.mock(UserSource, 'sign_up');
      UserSignInActions.signUp(email, password);
      UserSource.sign_up.called.should.be.true;
    });

    it('calls signUpSuccess if successful', function() {
      const user = { email: email };

      simple.mock(UserSource, 'sign_up').returnWith( new Promise( (resolve, reject) => { resolve(user) } ) );
      // const successFn = simple.spy(UserSignInActions.signUpSuccess);
      UserSignInActions.signInSuccess = null;
      UserSignInActions.signUp(email, password);
      // successFn.callCount.should.equal(1);
    });

    it('calls signUpFail if unsuccessful', function() {

    });
  });

  describe('signIn', function(){

  });
});