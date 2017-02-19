import React from 'react';
import SessionForm from './SessionForm';
import SessionActions from '../../actions/SessionActions';
import { Link } from 'react-router';

class SignIn extends SessionForm {
  handleSubmit = (event) => {
    event.preventDefault();
    SessionActions.startSignIn(this.state.submitting,
                               this.state.fields.email,
                               this.state.fields.password);
  }

  render(){
    return(
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <div className='panel panel-default panel-sign-up'>
            <div className='panel-body'>
              <h2 className='text-center'>Sign In</h2>
              <hr/>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>Email</label>
                  <input className='form-control' type='email' placeholder='Email' value={this.state.fields.email} onChange={this.handleUpdateEmail} />
                  <p className='text-danger' >{this.errorMessageFor('email')}</p>
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input className='form-control' type='password' placeholder='Password' value={this.state.fields.password} onChange={this.handleUpdatePassword} />
                  <p className='text-danger' >{this.errorMessageFor('password')}</p>
                </div>
                <button className={'btn btn-primary' + (this.state.submitting ? 'disabled' : '')}>Sign In</button>
                <div className='alternate-action'>
                  Don&apos;t have an account?
                  <Link to='/sign_up'>Sign Up</Link>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default SignIn;
