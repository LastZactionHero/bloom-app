import React from 'react';
import YardList from './Yards/YardList';
import SessionStore from '../stores/SessionStore';
import { browserHistory, Link } from 'react-router'

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = SessionStore.getState();
    this.redirectIfSignedOut();
  }

  componentDidMount = () => {
    SessionStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    SessionStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
    this.redirectIfSignedOut();
  }

  redirectIfSignedOut = () => {
    if(this.state.user == null) { browserHistory.replace('/sign_up'); }
  }

  render() {
    let children = this.props.children || <div><Link className='btn btn-default' to={{pathname: `/dashboard/yards`}}>Yards</Link></div>;
    return(
      <div className='dashboards'>
        <div>Dashboard</div>
        {children}
      </div>
    );
  }
}

export default Dashboard;
