import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Product from './components/Product';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  );
}

export default App;
