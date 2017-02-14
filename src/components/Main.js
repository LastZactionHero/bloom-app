require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Footer from './Footer';

class AppComponent extends React.Component {
  render() {
    let children = this.props.children || <Dashboard/>;

    return (
      <div className='container-fluid'>
        <Navbar/>
        <div className='container'>
          {children}
        </div>
        <Footer/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
