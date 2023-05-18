import { async } from '@firebase/util';
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc,updateDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9fwC_4oDoJTiBIjDRITo7EpdC0S0LRSw",
  authDomain: "cart-a0c86.firebaseapp.com",
  projectId: "cart-a0c86",
  storageBucket: "cart-a0c86.appspot.com",
  messagingSenderId: "683752978916",
  appId: "1:683752978916:web:f71965a26e77b7caa1eff1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

  async componentDidMount() {
    const collect = collection(db, "products");
    onSnapshot(collect, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => {
          const data= doc.data();
          data['id']= doc.id;
    
          return data;
        })
    
        this.setState({
          products: products,
          loading: false
        })
    })

  }

  handleIncreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;

    // this.setState({
    //   products: products
    // }) 

    //updating in firebase
    const productRef = doc(db, "products", products[index].id);
    await updateDoc(productRef, {
      qty: products[index].qty +1
    });
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty !== 0) {
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
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;
    let total = 0
    products.map((product) => {
      total = total + product.qty * product.price;
    })
    return total;
  }

  async addProduct() {
    await setDoc(doc(db, "products", "PD"), {
      img: 'https://t4.ftcdn.net/jpg/02/22/70/75/240_F_222707513_kLhrXd6EPmU2efoxNRUGhmLhRaoJDd6n.jpg',
      title: "Pendrive",
      qty: 1,
      price: 500
    });
  }
  
  render() {
    const { products, loading } = this.state;

    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <h1>Cart</h1>
        {/* <button onClick={this.addProduct}>ADD</button> */}
        <Cart
          products={products}
          handleIncreaseQuantity={this.handleIncreaseQuantity}
          handleDecreaseQuantity={this.handleDecreaseQuantity}
          handleDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : RS - {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
