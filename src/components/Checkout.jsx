import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'
import DATAIMAGES from '../default-data/data.js'
import { CheckOutlined } from '@ant-design/icons'
import ModalReviewProduct from './ModalReviewProduct'

const Checkout = (props) => {
    const [openReview, setOpenReview] = useState(false)
    const currentItemInCart = props.cart
    const [lastItemInCart, setLastItemInCart] = useState({})

    const handleRemoveProduct = (id) => {
        const listIdsItem = currentItemInCart.filter(item => item.product._id !== id).map(item => {
            return {
                product: item.product._id,
                amountProduct: item.amountProduct
            }
        })
        const params = { listProduct: listIdsItem }
        props.setNewCart(params)
    }

    const handlePayment = () => {
        const params = { listProduct: [] }
        props.setNewCart(params)
        setOpenReview(true)
    }

    function getLastItemInCart() {
        const lastItem = props.cart && props.cart[props.cart.length - 1] || {}
        setLastItemInCart(lastItem)
        return lastItem
    }

    function calcTotalPrice() {
        let totalPrice = 0;
        for (let i = 0; i < props.cart.length; ++i) {
            totalPrice += props.cart[i].product.priceProduct * props.cart[i].amountProduct
        }

        return totalPrice || 0
    }

    function handleCloseReview() {
        setOpenReview(false)
    }

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
                    <p className="product-inner-name" style={{ marginBottom: 0 }}>Product</p>
                    <span className="product-price">Price</span>
                    <span className="product-quantity">Quantity</span>
                    <span className="product-delete">Remove</span>
                </div>
                <div className="check-out-product-inner">
                    {
                        currentItemInCart.length > 0
                            ?
                            currentItemInCart.map((item) => (
                                <div className='list-cart-inner' key={item.product._id}>
                                    <div className="check-out-product-item">
                                        <div className="product-item-detail">
                                            <img src={item.product.imageProduct[0] && DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" />
                                            <p className="check-out-product-name" style={{ marginBottom: 0, fontWeight: 600 }}>{item.product.nameProduct}</p>
                                        </div>
                                        <span className="check-out-product-price">${item.product.priceProduct}</span>
                                        <span className="check-out-product-quantity">Amount: {item.amountProduct}</span>
                                        <span className="check-out-product-delete" onClick={() => handleRemoveProduct(item.product._id)}>Delete</span>
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
                    <p className="check-out-total" style={{ margin: 0, marginRight: 22 }}>{
                        props.cart.length == 0 ? 'Total price: $0' : `Total price: $${calcTotalPrice()}`
                    }</p>
                    {
                        props.cart.length > 0 && (
                            <button onClick={() => { handlePayment(); getLastItemInCart() }} className="check-out-btn">Payment</button>
                        )
                    }
                    {
                        props.cart.length == 0 && (
                            <Link to='/product' className="check-out-btn">Continue shopping...</Link>
                        )
                    }
                </div>
            </div>

            {
                Object.keys(lastItemInCart).length > 0 && <ModalReviewProduct
                    lastItemInCart={lastItemInCart}
                    openReview={openReview}
                    handleCloseReview={handleCloseReview}
                    customerInfor={props.customerInfor}
                />
            }
        </div>
    )
}

export default Checkout