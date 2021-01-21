import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ParkingLot } from './components/ParkingLot';
import { Transactions } from './components/Transactions';

import './custom.css'
import './theme/bootstrap.min.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/parking-lot' component={ParkingLot} />
        <Route path='/transactions' component={Transactions} />
      </Layout>
    );
  }
}
