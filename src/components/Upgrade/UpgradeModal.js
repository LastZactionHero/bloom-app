import React from 'react'
import { browserHistory } from 'react-router'
import SessionStore from 'stores/SessionStore';
import PromoCodeSource from 'sources/PromoCodeSource';
import UpgradeActions from 'actions/UpgradeActions'
import Modal from 'components/Common/Modal'
import CreditCardForm from './CreditCardForm';
import Loading from 'components/Common/Loading';
import FacebookTrackingPixel from 'components/Common/FacebookTrackingPixel';

class UpgradeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = SessionStore.getState();
    this.state.price = 1.99;
    this.state.promo_code = {
      code: '',
      entering: false,
      submitting: false,
      response: null,
      error: null
    };
  }

  componentDidMount = () => {
    SessionStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    SessionStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
    if(state.user.account.status == 'full_access') {
      setTimeout( () => { $('.modal').modal('hide') }, 1000);
    }
  }

  handleStartPromoCode = () => {
    const promoCode = this.state.promo_code;
    promoCode.entering = true;
    this.setState({promo_code: promoCode});
  }

  handlePromoCodeChange = (event) => {
    const promoCode = this.state.promo_code;
    promoCode.code = event.target.value;
    this.setState({promo_code: promoCode});
  }

  handlePromoCodeValidate = () => {
    const promoCode = this.state.promo_code;
    promoCode.error = null;
    promoCode.submitting = true;
    this.setState(promoCode);

    PromoCodeSource.validate(this.state.promo_code.code)
      .then( (response) => {
        promoCode.submitting = false;
        promoCode.response = response;
        this.setState({promo_code: promoCode, price: response.discounted_price});
      }).catch( () => {
        promoCode.submitting = false;
        promoCode.error = 'Could not redeem this code. Please double check that it is correct.'
        this.setState(promoCode);
      });
  }

  handleFreeUpgrade = () => {
    UpgradeActions.upgradeStart({}, this.state.promo_code.code);
  }

  startSearch = () => {
    browserHistory.replace('/sign_up');
  }

  render() {
    return(
      <Modal title='Upgrade to Full Access' buttons={[{name: 'No thanks', onClick: this.props.cancel}]}>
        <div className='upgrade-modal'>
          {this.state.user.account.status == 'full_access' ?
            <div>
              <div className='alert alert-success alert-inverted'>Thank you for your purchase!</div>
              <FacebookTrackingPixel eventName='CompleteRegistration' />
            </div> :
            <div>
              <h4>Upgrade and receive:</h4>
              <ul className='features'>
                <li>Unlimited yards and garden beds</li>
                <li>Unlimited access for one year - design all season!</li>
                <li>Unlimited searches in our database of over 5000 plants</li>
              </ul>

              {this.state.price > 0 ?
                <div>
                  <div className='price'>Just ${this.state.price.toFixed(2)}</div>
                  {this.state.promo_code.response ? <div className='text-center'>*{this.state.promo_code.response.discount}% Discount Applied</div> : null}
                  <div className='price-detail'>One-time purchase for the year- not a subscription.</div>
                  <div className='text-center'>
                    <CreditCardForm price={this.state.price} promoCode={this.state.promo_code.code} />
                  </div>
                </div> :
                <div className='text-center'>
                  <div className='price'>Free for 1 year!</div>
                  <div className='btn btn-success btn-lg' href='javascript:void(0)' onClick={this.handleFreeUpgrade}>Upgrade</div>
                </div>
              }
              {this.state.promo_code.response ?
                null :
                <div>{this.state.promo_code.entering ?
                  <div>
                    {
                      this.state.promo_code.error ?
                        <div className='alert alert-danger alert-inverted'>{this.state.promo_code.error}</div>
                        : null
                    }
                    <div className='well'>
                    <div className='form-group'>
                      <input type='text' placeholder='Promo Code' className='form-control' value={this.state.promo_code.code} onChange={this.handlePromoCodeChange}/>
                    </div>
                    <div className='text-right'>
                      {
                        this.state.promo_code.submitting ?
                          <Loading message='Validating' /> :
                          <button className='btn btn-primary' onClick={this.handlePromoCodeValidate} >Redeem Promo Code</button>
                      }
                    </div>
                    </div>
                  </div> :
                  <div><a href='javascript:void(0)' onClick={this.handleStartPromoCode}>Have a promo code?</a></div>
                }</div>
              }

            </div>
          }
        </div>
      </Modal>
    )
  }
}

export default UpgradeModal;
