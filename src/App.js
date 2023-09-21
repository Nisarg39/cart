import { async } from '@firebase/util';
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

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
        const data = doc.data();
        data['id'] = doc.id;

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

    //updating in firebase
    const productRef = doc(db, "products", products[index].id);
    await updateDoc(productRef, {
      qty: products[index].qty + 1
    });
  }

  handleDecreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty !== 0) {
      const productRef = doc(db, "products", products[index].id);
      await updateDoc(productRef, {
        qty: products[index].qty - 1
      });
    }
  }

  handleDeleteProduct = async (id) => {
    const { products } = this.state;

    await deleteDoc(doc(db, "products", id));
    
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
      img: 'https://cdn-icons-png.flaticon.com/256/6119/6119847.png',
      title: "Pendrive",
      qty: 1,
      price: 500
    });
  }

  render() {
    const { products, loading } = this.state;

    return (
      <div className="App" style={{backgroundColor : "black"}}>
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct}>ADD</button> */}
        <Cart
          products={products}
          handleIncreaseQuantity={this.handleIncreaseQuantity}
          handleDecreaseQuantity={this.handleDecreaseQuantity}
          handleDeleteProduct={this.handleDeleteProduct}
          
        />
        <div style={{ padding: 10, fontSize: 20, color: "#eee" }}>
          TOTAL : RS - {this.getCartTotal()}
        </div>
        {loading && <h1>Loading Products...</h1>}
        
      </div>
    );
  }
}

export default App;
