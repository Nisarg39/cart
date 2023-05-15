import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component{
    constructor() {
        super();
        this.state ={
            products : [
                {
                    price: 50000,
                    title: 'Mobile Phone',
                    qty: 1,
                    img: '',
                    id: 1
                },

                {
                    price: 110000,
                    title: 'Laptop',
                    qty: 1,
                    img: '',
                    id: 2
                },

                {
                    price: 1000,
                    title: 'Watch',
                    qty: 1,
                    img: '',
                    id: 3
                }
            ]
        }
    }
    handleIncreaseQuantity = (product) => {
        const {products} = this.state;
        const index = products.indexOf(product);
        products[index].qty += 1;

        this.setState({
            products: products
        })
    }

    handleDecreaseQuantity = (product) => {
        const {products} = this.state;
        const index = products.indexOf(product);
        if(products[index].qty !== 1){
        products[index].qty -= 1;

        this.setState({
            products: products
        })
    }
    }

    handleDeleteProduct = (id) => {
        const {products} = this.state;
        const items = products.filter((item) => item.id !== id);

        this.setState ({
            products: items
        })
    }
    render(){
        const {products} = this.state;
        return(
            <div className="cart">
            {products.map((product)=> {
                return (
                    <CartItem 
                        product={product} 
                        key={product.id} 
                        handleIncreaseQuantity = {this.handleIncreaseQuantity}
                        handleDecreaseQuantity = {this.handleDecreaseQuantity}
                        handleDeleteProduct = {this.handleDeleteProduct}
                    />
                )
            })}
        </div>
        )
    }
}

export default Cart;