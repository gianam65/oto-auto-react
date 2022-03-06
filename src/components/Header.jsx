import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className='header-fixed'>
                <div className="logo-container">
                    <Link to="/" className="logo-link">
                        <span className="logo-title">fenco</span>
                    </Link>
                </div>
                <nav className="menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link to='/' className="menu-link active">
                                Homepage
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link to='/product' className="menu-link">
                                Products
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link to='/blog' className="menu-link">Blog Entries</Link>
                        </li>
                        <li className="menu-item">
                            <Link to='/contact' className="menu-link">Contact Us</Link>
                        </li>
                    </ul>
                </nav>
                {/* {
                <Cart />
            } */}
            </header>
            <header className="header-mobile">
                <div className="logo-container">
                    <Link to='/' className="logo-link">
                        <span className="logo-title">fenco</span>
                    </Link>
                </div>
                <div className="bar-btn">
                    <ion-icon className="global-icon" name="filter-outline" />
                </div>
            </header>
            <nav className={'menu-mobile'}>
                <div className="close-mobile">
                    <ion-icon className="global-icon" name="close-outline" />
                </div>
                <ul className="menu-mobile-list">
                    <li className="menu-mobile-item">
                        <Link to='/' className="menu-mobile-link active">
                            Homepage
                        </Link>
                    </li>
                    <li className="menu-mobile-item">
                        <Link to='/product' className="menu-mobile-link">
                            Products
                        </Link>
                    </li>
                    <li className="menu-mobile-item">
                        <Link to='/blog' className="menu-mobile-link">Blog Entries</Link>
                    </li>
                    <li className="menu-mobile-item">
                        <Link to='/contact' className="menu-mobile-link">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header