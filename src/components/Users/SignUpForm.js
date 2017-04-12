import React from 'react';
import SessionActions from 'actions/SessionActions'
import SessionForm from './SessionForm';


class SignUpForm extends SessionForm {
  handleSubmit = (event) => {
    event.preventDefault();
    SessionActions.startSignUp(this.state.submitting,
                               this.state.fields.email,
                               this.state.fields.password,
                               this.state.fields.password_confirmation);
  }

  render() {
    return(
      <div>
        {this.state.errors['server'] && this.state.errors['server'].length > 0 ?
          <p className='alert alert-danger' >{this.state.errors['server'][0]}</p> : null
        }
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' type='email' placeholder='Email' value={this.state.fields.email} onChange={this.handleUpdateEmail} />
            <p className='field-error' >{this.errorMessageFor('email')}</p>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input className='form-control' type='password' placeholder='Password' value={this.state.fields.password} onChange={this.handleUpdatePassword} />
            <p className='field-error' >{this.errorMessageFor('password')}</p>
          </div>
          <div className='form-group'>
            <label>Password Confirmation</label>
            <input className='form-control' type='password' placeholder='Password' value={this.state.fields.password_confirmation} onChange={this.handleUpdatePasswordConfirmation}/>
            <p className='field-error' >{this.errorMessageFor('password_confirmation')}</p>
          </div>
          <button className={'btn btn-success btn-lg ' + (this.state.submitting ? 'disabled' : '')}>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUpForm