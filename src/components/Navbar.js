import React from 'react';
import SessionActions from '../actions/SessionActions'
import SessionStore from '../stores/SessionStore';

class Navbar extends React.Component {
  constructor() {
    super();
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

  signOut = () => {
    SessionActions.startSignOut();
  }

  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Bloom Landscape Assistant</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="javascript:void(0)" onClick=''>Whatever</a></li> :
            </ul>

            <ul className="nav navbar-nav navbar-right">
              {
                this.state.user ?
                  <li><a href="javascript:void(0)" onClick={this.signOut}>Sign Out</a></li> :
                  null
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
