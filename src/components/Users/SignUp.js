import React from 'react';
import SessionForm from './SessionForm';
import SessionActions from '../../actions/SessionActions';
import { Link } from 'react-router';

class SignUp extends SessionForm {
  handleSubmit = (event) => {
    event.preventDefault();
    SessionActions.startSignUp(this.state.submitting,
                               this.state.fields.email,
                               this.state.fields.password,
                               this.state.fields.password_confirmation);
  }

  render(){
    return(
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <div className='panel panel-default panel-sign-up'>
            <div className='panel-body'>
              <h2 className='text-center'>Sign Up for Bloom</h2>
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
                <div className='form-group'>
                  <label>Password Confirmation</label>
                  <input className='form-control' type='password' placeholder='Password' value={this.state.fields.password_confirmation} onChange={this.handleUpdatePasswordConfirmation}/>
                  <p className='text-danger' >{this.errorMessageFor('password_confirmation')}</p>
                </div>
                <button className={'btn btn-primary' + (this.state.submitting ? 'disabled' : '')}>Sign Up</button>
                <div className='alternate-action'>
                  Already have an account?
                  <Link to='/sign_in'>Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;
