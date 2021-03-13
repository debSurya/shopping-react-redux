
import React from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filters from './components/Filter';
import Products from './components/Products';
import store from './store';

const data = { products: [] };

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: !!localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems
        .filter((item) => item._id !== product._id)
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems
      .filter((item) => item._id !== product._id)));
  };

  createOrder = (order) => {
    alert('Save!!')
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container" >
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filters></Filters>
                <Products addToCart={this.addToCart}
                ></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}></Cart>
              </div>
            </div>
          </main>
          <footer>
            All rights are reserved.
      </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
