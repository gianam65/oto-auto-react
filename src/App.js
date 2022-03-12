import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Product from './components/Product';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import ScrollTop from './ScrollTop'

const GlobalState = React.createContext();

function App() {
  const [cart, setCart] = useState([])
  const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
  const idCart = customerInfor && customerInfor.idCart

  useEffect(() => {
    if (idCart) {
      axios.get(`https://oto-auto.herokuapp.com/cart/${idCart}`).then(res => {
        setCart(res.data.data.listProduct)
      }).catch(err => { console.log(err) })
    }
  }, [])


  function setNewCart(value) {
    axios.put(`https://oto-auto.herokuapp.com/cart/${idCart}`, value).then(res => {
      setCart(res.data.data.listProduct || [])
    }).catch(err => { console.log(err) })
  }

  return (
    <div className="wrapper">
      <GlobalState.Provider>
        <Header idCart={idCart} customerInfor={customerInfor} cart={cart} setNewCart={(value) => setNewCart(value)} />
        <ScrollTop />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/product">
            <Product idCart={idCart} cart={cart} setNewCart={(value) => setNewCart(value)} />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout" >
            <Checkout idCart={idCart} customerInfor={customerInfor} cart={cart} setNewCart={(value) => setNewCart(value)} />
          </Route>
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/reviews" component={Reviews} />
        </Switch>
        <Route exact path="/" component={Home} />
        <Footer />
      </GlobalState.Provider>
    </div>
  );
}

export default App;
