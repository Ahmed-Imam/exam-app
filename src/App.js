import React, { Component } from 'react';
import Routes from './routes'
import Layout from '../src/container'
import Home from '../src/views/Home'
import Login from '../src/views/Login'
import Tables from '../src/views/Tables'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/home">
              <Layout>  <Home /></Layout>
            </Route>

            <Route exact path="/tables">
              <Layout><Tables /></Layout>
            </Route>

            <Route exact path="/messages">
              <Layout><Tables /></Layout>
            </Route>
          
            <Route path="/">
              <Layout page='login'> <Login /> </Layout>
            </Route>

            
          </Switch>
     
      </Router>
    );

  }
}

export default App;
