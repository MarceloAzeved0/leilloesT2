import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from '../components/home/Home';
import Leilao from '../components/leilao/Leilao';

export default props =>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/leilao' component={Leilao} />
    <Redirect from ='*' to='/' />
  </Switch>