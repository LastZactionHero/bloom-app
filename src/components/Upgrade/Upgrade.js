import React from 'react';
import { Link } from 'react-router'
import SessionStore from 'stores/SessionStore';
import CreditCardForm from './CreditCardForm';

class Upgrade extends React.Component {
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
  }

  render() {
    return(
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          {this.state.user.account.status == 'full_access' ?
            <div className='alert alert-success alert-inverted'>
              Thank you for your purchase!&nbsp;
              <Link to={{pathname: `/dashboard/yards`}}>Return to your yard</Link>
            </div> :
            <div className='upgrade'>
              <h2>Upgrade to Unlimited Access</h2>

              <p>Your Bloom trial lets you create one yard and one garden bed. Upgrade and receive:</p>
              <ul className='features'>
                <li><p>Unlimited yards and garden beds</p></li>
                <li><p>Unlimited access for one year - design all season!</p></li>
                <li><p>Unlimited searches in our database of over 5000 plants</p></li>
              </ul>

              <div className='price'>Just $7.99</div>
              <div className='price-detail'>One-time purchase for the year- not a subscription.</div>
              <div className='text-center'>
                <CreditCardForm />
              </div>

            </div>
          }
        </div>
      </div>
    )
  }
}

export default Upgrade;
