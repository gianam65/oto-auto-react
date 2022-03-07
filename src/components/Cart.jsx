import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Empty } from 'antd'
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons'
import axios from 'axios'

const Cart = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
        if (!customerInfor) return

        axios.get(`https://oto-auto.herokuapp.com/cart/${customerInfor.idCart}`).then(res => {
            setCart(res.data.data.listProduct || [])
        }).catch(err => {
            console.log(err)
        })

    }, [])



    const addActive = () => {
        const menusEle = document.querySelector('.menu-link')
        menusEle.classList.add('active')
    }
    const removeActive = () => {
        const menusEle = document.querySelectorAll('.menu-link')
        for (let i = 0; i < menusEle.length; ++i) {
            menusEle[i].classList.remove('active')
        }
    }
    const handleCart = () => {
        setIsDisplay(!isDisplay)
    }

    const handleRemoveProduct = (id) => {
        const idCart = JSON.parse(localStorage.getItem("customer-infor")).idCart
        axios.delete(`https://oto-auto.herokuapp.com/cart/${id}`, { idCart }).then(res => {
            setCart(res.data.data)
        }).catch(err => { console.log(err) })
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
                                    cart.length > 0
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
                                <span className="total-price">Total: $499.99</span>
                            </div>
                            <div className="cart-button">
                                <Link to='/checkout' onClick={removeActive} className="btn-checkout">Checkout</Link>
                                <Link to='/' onClick={addActive} className="btn-continue">Continue shopping</Link>
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