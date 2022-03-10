import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Empty } from 'antd'
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons'
import DATAIMAGES from '../default-data/data.js'
import axios from 'axios'

const Cart = (props) => {
    const [isDisplay, setIsDisplay] = useState(false)
    const cart = { props }
    const handleCart = () => {
        setIsDisplay(!isDisplay)
    }

    const handleRemoveProduct = (id) => {
        const listIdsItem = props.cart.filter(item => item.product._id !== id).map(item => {
            return {
                product: item.product._id,
                amountProduct: item.amountProduct
            }
        })
        const params = { listProduct: listIdsItem }
        props.setNewCart(params)
    }

    function calcTotalPrice() {
        let totalPrice = 0
        for (let i = 0; i < props.cart.length; ++i) {
            totalPrice += props.cart[i].product.priceProduct * props.cart[i].amountProduct
        }
        return totalPrice;
    }

    return (
        <>
            <div className="menu-function">
                <div className="cart-container">
                    <span className="cart-link" onClick={handleCart}>
                        <ShoppingCartOutlined className="global-icon" />
                    </span>
                    <div className={isDisplay ? 'cart-detail active' : 'cart-detail'}>
                        <div className="cart-detail-container">
                            <div className="cart-title-container">
                                <span className="cart-title">Items</span>
                                <div className="cart-close" onClick={handleCart}>
                                    <CloseOutlined style={{ fontSize: 16 }} className='global-icon' />
                                </div>
                            </div>
                            <ul className="cart-detail-list" style={{ minHeight: 435 }}>
                                {
                                    Array.isArray(props.cart) && props.cart.length > 0
                                        ?
                                        props.cart.map(item => {
                                            return (
                                                <li className="cart-detail-item">
                                                    <img src={item.product.imageProduct[0] && DATAIMAGES[Math.floor(Math.random() * 14)]} className="cart-detail-thumb" style={{ width: 100, height: 100 }} />
                                                    <div className="cart-detail-desc">
                                                        <div className="cart-desc-title">
                                                            <p className="cart-detail-name">{item.product.nameProduct}</p>
                                                            <div className="cart-close-item" style={{ display: 'flex' }}>
                                                                <CloseOutlined onClick={() => handleRemoveProduct(item.product._id)} style={{ fontSize: 16 }} className='global-icon' />
                                                            </div>
                                                        </div>
                                                        <div className="cart-desc-price">
                                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                                            <span className="cart-detail-total">${item.product.priceProduct}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        : <Empty />
                                }
                            </ul>
                            <div className="cart-total-price">
                                {props.cart.length > 0 && <span className="total-price">Total: ${calcTotalPrice() || 0}</span>}
                            </div>
                            <div className="cart-button">
                                <Link to='/checkout' onClick={() => { setIsDisplay(false); props.handleRemoveActiveMenu() }} className="btn-checkout">Checkout</Link>
                                <Link to='/product' onClick={() => { setIsDisplay(false); props.handleActiveCurrentMenu() }} className="btn-continue">Continue shopping</Link>
                            </div>
                        </div>
                    </div>
                    <div className="cart-amount">{props.cart.length}</div>
                </div>
            </div>
        </>
    )
}

export default Cart