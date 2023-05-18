import React from 'react';

const CartItem = (props) => {
    const { price, title, qty, id } = props.product;     // importing this.props from Cart.js so we do not have to write this.state.price to grab value of price from this.state object
    const { product, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteProduct } = props;
    return (
        <div className='cart-item' style={styles.border}>
            <div className='left-block'>
                <img style={styles.image} src={product.img} />
            </div>
            <div className='right-block'>
                <div style={{ fontSize: 25 }}>{title}</div>
                <div style={{ color: '#777' }}>Rs {price}</div>
                <div style={{ color: '#777' }}>Qty: {qty}</div>
                <div className='card-item-actions'>
                    {/* Buttons */}
                    <img alt="increase" onClick={() => handleIncreaseQuantity(product)} className='action-icons' src='https://cdn-icons-png.flaticon.com/128/1828/1828919.png' />
                    <img alt="decrease" onClick={() => handleDecreaseQuantity(product)} className='action-icons' src='https://cdn-icons-png.flaticon.com/128/1828/1828899.png' />
                    <img alt="delete" onClick={() => handleDeleteProduct(product.id)} className='action-icons' src='https://cdn-icons-png.flaticon.com/128/484/484611.png' />
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 20,
    
    },
    border: {
        border: '2px solid #979797',
        borderRadius: 20
    }
}

export default CartItem;