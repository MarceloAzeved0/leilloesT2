import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Footer from '../components/template/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

export default props =>
  <BrowserRouter>
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </BrowserRouter>