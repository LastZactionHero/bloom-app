require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Footer from './Footer';
import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = SessionStore.getState();
  }

  componentDidMount = () => {
    SessionStore.listen(this.onChange);
    SessionActions.ping();
  }

  componentWillUnmount = () => {
    SessionStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state)
  }

  render() {
    let children = this.props.children || <Dashboard/>;

    return (
      <div className='container-fluid'>
        {this.state.initPing ?
          <div>
            <Navbar/>
            <div className='container'>
              {children}
            </div>
            <Footer/>
          </div> : null }
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
