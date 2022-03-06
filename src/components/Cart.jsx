import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons'

const Cart = () => {
    const [isDisplay, setIsDisplay] = useState(false)
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
                            <ul className="cart-detail-list">
                                <li className="cart-detail-item">
                                    <div className="cart-detail-thumb" style={{ backgroundImage: 'url(https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }} />
                                    <div className="cart-detail-desc">
                                        <div className="cart-desc-title">
                                            <p className="cart-detail-name">Hoodies Cute Panda</p>
                                            <div className="cart-close-item">
                                                <ion-icon className="global-icon" name="close-outline" />
                                            </div>
                                        </div>
                                        <div className="cart-desc-price">
                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                            <span className="cart-detail-total">$124.99</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="cart-detail-item">
                                    <div className="cart-detail-thumb" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1192335/pexels-photo-1192335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }} />
                                    <div className="cart-detail-desc">
                                        <div className="cart-desc-title">
                                            <p className="cart-detail-name">Hoodies Cute Panda</p>
                                            <div className="cart-close-item">
                                                <ion-icon className="global-icon" name="close-outline" />
                                            </div>
                                        </div>
                                        <div className="cart-desc-price">
                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                            <span className="cart-detail-total">$124.99</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="cart-detail-item">
                                    <div className="cart-detail-thumb" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1192335/pexels-photo-1192335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }} />
                                    <div className="cart-detail-desc">
                                        <div className="cart-desc-title">
                                            <p className="cart-detail-name">Hoodies Cute Panda</p>
                                            <div className="cart-close-item">
                                                <ion-icon className="global-icon" name="close-outline" />
                                            </div>
                                        </div>
                                        <div className="cart-desc-price">
                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                            <span className="cart-detail-total">$124.99</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="cart-detail-item">
                                    <div className="cart-detail-thumb" style={{ backgroundImage: 'url(https://images.pexels.com/photos/724499/pexels-photo-724499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }} />
                                    <div className="cart-detail-desc">
                                        <div className="cart-desc-title">
                                            <p className="cart-detail-name">Hoodies Cute Panda</p>
                                            <div className="cart-close-item">
                                                <ion-icon className="global-icon" name="close-outline" />
                                            </div>
                                        </div>
                                        <div className="cart-desc-price">
                                            <span className="cart-detail-quantity">Quantity: 1</span>
                                            <span className="cart-detail-total">$124.99</span>
                                        </div>
                                    </div>
                                </li>
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
                    <div className="cart-amount">0</div>
                </div>
            </div>
        </>
    )
}

export default Cart