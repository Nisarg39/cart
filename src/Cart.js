import React from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
    const { products } = props;
    return (
        <div className="cart">
            {products.map((product) => {
                return (
                    <CartItem
                        product={product}
                        key={product.id}
                        handleIncreaseQuantity={props.handleIncreaseQuantity}
                        handleDecreaseQuantity={props.handleDecreaseQuantity}
                        handleDeleteProduct={props.handleDeleteProduct}
                    />
                )
            })}
        </div>
    )
}

export default Cart;