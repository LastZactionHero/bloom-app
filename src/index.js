import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import UserSignIn from './components/Users/SignIn';
import UserSignUp from './components/Users/SignUp';
import YardsMain from './components/Yards/YardsMain';
import YardBuilder from './components/Yards/YardBuilder';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
// Render the main component into the dom
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/dashboard" />
      <Route path="dashboard" component={Dashboard}>
        <Route path="yards" component={YardsMain}>
          <Route path="builder/*" component={YardBuilder} />
        </Route>
      </Route>
      <Route path="sign_in" component={UserSignIn}/>
      <Route path="sign_up" component={UserSignUp}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>, document.getElementById('app'));
