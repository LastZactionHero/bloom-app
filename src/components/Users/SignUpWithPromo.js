import React from 'react';
import SessionForm from './SessionForm';
import SessionActions from '../../actions/SessionActions';
import PromoCodeSource from 'sources/PromoCodeSource';
import SessionStore from '../../stores/SessionStore';
import { Link } from 'react-router';
import Loading from 'components/Common/Loading';

class SignUpWithPromo extends SessionForm {

  componentDidMount = () => {
    SessionStore.listen(this.onChange);

    const promoCode = this.props.location.query.code;
    this.setState({
      promoCode: promoCode,
      validatingCode: true,
      validationError: null});

    PromoCodeSource.validate(promoCode)
      .then( (response) => {
        if(response.discount == 100) {
          this.setState({
            validatingCode: false, validationError: null});
        } else {
          this.setState({
            validatingCode: false,
            validationError: 'This code must be redeemed with purchase. Please contact info@plantwithbloom.com for assistance.'});
        }
      }).catch( (error) => {
        this.setState({
          validatingCode: false,
          validationError: 'An error occurred validating your promo code. Please contact info@plantwithbloom.com for assistance.'})
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    SessionActions.startSignUp(this.state.submitting,
                               this.state.fields.email,
                               this.state.fields.password,
                               this.state.fields.password_confirmation,
                               this.state.promoCode);
  }

  render(){
    return(
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <div className='panel panel-default panel-sign-up'>
            <div className='panel-body'>
              {this.state.validatingCode ?
                <Loading message='Checking code' /> :
                <div>{this.state.validationError ?
                  <div className='alert alert-danger alert-inverted'>{this.state.validationError}</div> :
                  <div>
                    <h2 className='text-center'>Sign Up for Bloom</h2>
                    <hr/>
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
                      <div className='alternate-action'>
                        Already have an account?
                        <Link to='/sign_in'>Sign In</Link>
                      </div>
                    </form>
                  </div>
                  }</div>
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpWithPromo;
