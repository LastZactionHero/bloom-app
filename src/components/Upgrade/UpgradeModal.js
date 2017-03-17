import React from 'react'
import { browserHistory } from 'react-router'
import SessionStore from 'stores/SessionStore';
import Modal from 'components/Common/Modal'
import CreditCardForm from './CreditCardForm';

class UpgradeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = SessionStore.getState();
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

  render() {
    return(
      <Modal title='Upgrade to Unlimited Access' buttons={[{name: 'No thanks', onClick: this.props.cancel}]}>
        <div className='upgrade-modal'>
          {this.state.user.account.status == 'full_access' ?
            <div className='alert alert-success alert-inverted'>
              Thank you for your purchase!
            </div> :
            <div>
              <div>Your Bloom trial lets you create one yard and one garden bed. Upgrade and receive:</div>
              <ul className='features'>
                <li>Unlimited yards and garden beds</li>
                <li>Unlimited access for one year - design all season!</li>
                <li>Unlimited searches in our database of over 5000 plants</li>
              </ul>

              <div className='price'>Just $14.99</div>
              <div className='price-detail'>One-time purchase for the year- not a subscription.</div>
              <div className='text-center'>
                <CreditCardForm />
              </div>
            </div>
          }
        </div>
      </Modal>
    )
  }
}

export default UpgradeModal;