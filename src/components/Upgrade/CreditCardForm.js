import React from 'react';
import UpgradeActions from 'actions/UpgradeActions'
import SessionStore from 'stores/SessionStore';
import StripeCheckout from 'react-stripe-checkout';

class CreditCardForm extends React.Component {
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

  onToken = (token) => {
    UpgradeActions.upgradeStart(token, this.props.promoCode);
  }

  render() {
    return(
      <div>
        <StripeCheckout token={this.onToken}
                        stripeKey={STRIPE_PUBLISHABLE_KEY}
                        email={this.state.user.email}
                        name='Bloom Landscape Assistant'
                        description='1 Year Unlimited Access'
                        amount={this.props.price * 100}
                         >
          <button className='btn btn-success btn-lg'>Upgrade</button>
        </StripeCheckout>
        <a className='btn btn-default btn-lg' style={{marginLeft: '8px'}} target='_blank' href='http://www.plantwithbloom.com/samples/denver_colorado.html'>See Samples</a>
      </div>
    )
  }
}

export default CreditCardForm;
