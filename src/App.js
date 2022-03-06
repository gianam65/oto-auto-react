import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Product from './components/Product';
import Login from './components/Login';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  );
}

export default App;
