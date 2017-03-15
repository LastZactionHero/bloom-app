import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import UserSignIn from './components/Users/SignIn';
import UserSignUp from './components/Users/SignUp';
import YardsMain from './components/Yards/YardsMain';
import YardBuilder from './components/Yards/YardBuilder/YardBuilder';
import YardMain from './components/Yards/YardMain';
import BedBuilder from './components/Beds/BedBuilder/BedBuilder';
import BedTemplateSelect from './components/Beds/BedTemplateSelect';
import BedMain from './components/Beds/BedMain';
import BedPlantsSelect from './components/Beds/BedPlantsSelect';
import ShoppingList from './components/Yards/ShoppingList';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
// Render the main component into the dom

/*
  /dashboard                                        YardList
  /dashboard/yards                                  YardList
  /dashboard/yards/new                              YardBuilder
  /dashboard/yards/<id>                             *YardMain
  /dashboard/yards/<id>/beds                        *BedList
  /dashboard/yards/<id>/beds/new                    *BedBuilder
  /dashboard/yards/<id>/beds/<id>                   *BedMain
  /dashboard/yards/<id>/beds/<id>/template          *BedTemplateSelect
  /dashboard/yards/<id>/beds/<id>/plants            *BedPlantPicker
  /dashboard/yards/<id>/shopping_list               *ShoppingList
*/

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/dashboard" />
      <Route path="dashboard" component={Dashboard}>
        <Route path="yards" component={YardsMain}>
          <Route path="new" component={YardBuilder} />
          <Route path=":yard_id" component={YardMain}>
            <Route path="beds/new" component={BedBuilder} />
            <Route path="beds/:id" component={BedMain}>
              <Route path="template" component={BedTemplateSelect} />
              <Route path="plants" component={BedPlantsSelect} />
            </Route>
            <Route path="shopping_list" component={ShoppingList} />
          </Route>
        </Route>
      </Route>
      <Route path="sign_in" component={UserSignIn}/>
      <Route path="sign_up" component={UserSignUp}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>, document.getElementById('app'));
