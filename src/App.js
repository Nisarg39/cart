import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 50000,
          title: 'Mobile Phone',
          qty: 1,
          img: 'https://t4.ftcdn.net/jpg/03/12/57/97/240_F_312579728_JztO9YzcpOwnjuPpnh7i3pxfH1HDbX2l.jpg',
          id: 1
        },

        {
          price: 110000,
          title: 'Laptop',
          qty: 1,
          img: 'https://t4.ftcdn.net/jpg/01/09/69/95/240_F_109699524_pYPsu8h9x6ToK73VvMpZMroJILuCD6it.jpg',
          id: 2
        },

        {
          price: 1000,
          title: 'Watch',
          qty: 1,
          img: 'https://t4.ftcdn.net/jpg/02/13/64/55/240_F_213645596_loormHyI0s6rtzHALtPVT2Zj2YG218ic.jpg',
          id: 3
        }
      ]
    }
  }
  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;

    this.setState({
      products: products
    })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty !== 1) {
      products[index].qty -= 1;

      this.setState({
        products: products
      })
    }
  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);

    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const {products} = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;
    let total = 0
    products.map((product) => {
      total = total + product.qty * product.price;
    })
    return total;
  }

  render() {
    const {products} = this.state;

    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <h1>Cart</h1>
        <Cart
          products = {products}
          handleIncreaseQuantity = {this.handleIncreaseQuantity}
          handleDecreaseQuantity = {this.handleDecreaseQuantity}
          handleDeleteProduct = {this.handleDeleteProduct}

        />
        <div style={{padding: 10, fontSize: 20}}>
          TOTAL : RS - {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
