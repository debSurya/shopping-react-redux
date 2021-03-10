
import React from 'react';
import { Filters } from './components/filter';
import Products from './components/products';
import data from './data.json';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: ''
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort,
      products: state.products.slice()
        .sort((a, b) => sort === 'lowest' ?
          (a.price > b.price ? 1 : -1) :
          (sort === 'highest' ?
            (a.price < b.price ? 1 : -1) :
            (a._id < b._id ? 1 : -1)
          ))
    }));
  }

  filterProducts = (event) => {
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: data.products
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products
          .filter((product) => product.availableSizes.indexOf(event.target.value) >= 0)
      });
    }
  }

  render() {
    return (
      <div className="grid-container" >
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filters count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filters>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart items
            </div>
          </div>
        </main>
        <footer>
          All rights are reserved.
      </footer>
      </div>
    );
  }
}

export default App;
