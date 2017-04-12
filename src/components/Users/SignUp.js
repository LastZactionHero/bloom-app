import React from 'react';
import SignUpForm from './SignUpForm';
import { Link } from 'react-router';

class SignUp extends React.Component {

  render(){
    return(
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <div className='panel panel-default panel-sign-up'>
            <div className='panel-body'>
              <h2 className='text-center'>Sign Up for Bloom</h2>
              <hr/>
              <SignUpForm />
              <div className='alternate-action'>
                Already have an account?&nbsp;
                <Link to='/sign_in'>Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;
