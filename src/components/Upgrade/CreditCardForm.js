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
    UpgradeActions.upgradeStart(token);
  }

  render() {
    return(
      <StripeCheckout token={this.onToken}
                      stripeKey='pk_test_Q4Vk0WhrdssfjdtHLfG0nzpa'
                      email={this.state.user.email}
                      name='Bloom Landscape Assistant'
                      description='1 Year Unlimited Access'
                      amount={1499}
                       >
        <button className='btn btn-success btn-lg'>Upgrade</button>
      </StripeCheckout>
    )
  }
}

export default CreditCardForm;