import React from 'react';

class CartItem extends React.Component{
    constructor() {
        super();
        this.state ={
            price: 999,
            title: 'Phone',
            qty: 1,
            img: ''
        }
    }

    increaseQuantity = () => {
        this.setState({
            qty: this.state.qty + 1
        });
    }

    decreaseQuantity = () => {
        const {qty} = this.state;
        if(qty != 0){
            this.setState({
            qty: this.state.qty - 1
            }, () => {});
        }
    }

    render(){
        const {price, title, qty} = this.state;     // importing this.state so we do not have to write this.state.price to grab value of price from this.state object
        return(
            <div className='cart-item' style={styles.border}>
                <div className='left-block'>
                    <img style={styles.image}/>
                </div>
                <div className='right-block'>
                    <div style={{fontSize: 25}}>{title}</div>
                    <div style={{color: '#777'}}>Rs {price}</div>
                    <div style={{color: '#777'}}>Qty: {qty}</div>
                    <div className='card-item-actions'>
                        {/* Buttons */}
                        <img alt="increase" onClick={this.increaseQuantity} className='action-icons' src='https://cdn-icons-png.flaticon.com/128/1828/1828919.png'/>
                        <img alt="decrease" onClick={this.decreaseQuantity} className='action-icons' src='https://cdn-icons-png.flaticon.com/128/1828/1828899.png'/>
                        <img alt="delete" className='action-icons' src='https://cdn-icons-png.flaticon.com/128/484/484611.png'/>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    },
    border: {
        border: '1px solid #ccc',
        borderRadius: 10
    }
}

export default CartItem;