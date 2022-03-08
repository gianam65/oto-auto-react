import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'

const Checkout = (props) => {
    const currentItemInCart = props.location.state || []

    return (
        <div className="checkout-wrapper">
            <div className="check-out-top">
                <span className="check-out-title">
                    Items in your cart
                </span>
                <br />
                <span className="check-out-confirm">
                    Ready to checkout ?
                </span>
            </div>
            <div className="check-out-product">
                <div className="check-out-product-top">
                    <p className="product-inner-name">Product</p>
                    <span className="product-price">Price</span>
                    <span className="product-quantity">Quantity</span>
                    <span className="product-delete">Remove</span>
                </div>
                <div className="check-out-product-inner">
                    {
                        currentItemInCart.length > 0
                            ?
                            currentItemInCart.map((item) => (
                                <div className='list-cart-inner' key={item._id}>
                                    <div className="check-out-product-item">
                                        <div className="product-item-detail">
                                            <img src={item.imageProduct[0]} alt="" />
                                            <p className="check-out-product-name">{item.nameProduct}</p>
                                        </div>
                                        <span className="check-out-product-price">${item.priceProduct}</span>
                                        <span className="check-out-product-quantity">Amount: {item.getQuantity}</span>
                                        <span className="check-out-product-delete">Delete</span>
                                    </div>
                                </div>
                            ))
                            :
                            <Empty />
                    }
                </div>
            </div>
            <div className="check-out-footer">
                <div className="check-out-product-total">
                    {/* <p className="check-out-total">{
                        isDelete ? 'Total price: $0' : `Total price: ${total}`
                    }</p>
                    {
                        isDelete || (
                            <button onClick={toggleModal} className="check-out-btn">Payment</button>
                        )
                    }
                    {
                        isDelete && (
                            <Link to='/product' className="check-out-btn">Continue shopping...</Link>
                        )
                    } */}
                </div>
            </div>

            <div className="check-out-overlay">
                <div className="check-out-modal">
                    <span className="modal-success">Payment success</span>
                    <div className="success-icon">
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <p className="notice">Click outside the modal to continue shopping</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout