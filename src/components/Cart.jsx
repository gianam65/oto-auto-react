import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Empty } from 'antd'
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons'
import axios from 'axios'

const Cart = (props) => {
    const [isDisplay, setIsDisplay] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
        if (!customerInfor) return

        axios.get(`https://oto-auto.herokuapp.com/cart/${customerInfor.idCart}`).then(res => {
            console.log(res.data.data.listProduct)
            setCart(res.data.data.listProduct || [])
        }).catch(err => {
            console.log(err)
        })

    }, [])

    const handleCart = () => {
        setIsDisplay(!isDisplay)
    }

    const handleRemoveProduct = (id) => {
        const idCart = JSON.parse(localStorage.getItem("customer-infor"))
        const listIdsItem = cart.filter(item => item._id !== id).map(item => item._id)
        axios.put(`https://oto-auto.herokuapp.com/cart/${idCart}`, { listProduct: listIdsItem }).then(res => {
            setCart(res.data.data)
        }).catch(err => { console.log(err) })
    }

    function calcTotalPrice() {
        let totalPrice = 0
        for (let i = 0; i < cart.length; ++i) {
            totalPrice += cart[i].priceProduct
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
                                    Array.isArray(cart) && cart.length > 0
                                        ?
                                        cart.map(product => {
                                            return (
                                                <li className="cart-detail-item">
                                                    <img src={product.imageProduct[0]} className="cart-detail-thumb" style={{ width: 100, height: 100 }} />
                                                    <div className="cart-detail-desc">
                                                        <div className="cart-desc-title">
                                                            <p className="cart-detail-name">{product.nameProduct}</p>
                                                            <div className="cart-close-item" style={{ display: 'flex' }}>
                                                                <CloseOutlined onClick={() => handleRemoveProduct(product._id)} style={{ fontSize: 16 }} className='global-icon' />
                                                            </div>
                                                        </div>
                                                        <div className="cart-desc-price">
                                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                                            <span className="cart-detail-total">${product.priceProduct}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        : <Empty />
                                }
                            </ul>
                            <div className="cart-total-price">
                                <span className="total-price">Total: ${calcTotalPrice() || 0}</span>
                            </div>
                            <div className="cart-button">
                                <Link to={{ pathname: '/checkout', state: cart }} onClick={() => { setIsDisplay(false); props.handleRemoveActiveMenu() }} className="btn-checkout">Checkout</Link>
                                <Link to='/' className="btn-continue">Continue shopping</Link>
                            </div>
                        </div>
                    </div>
                    <div className="cart-amount">{cart.length}</div>
                </div>
            </div>
        </>
    )
}

export default Cart