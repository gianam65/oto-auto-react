import { useState, useEffect } from 'react'
import Cart from './Cart.jsx'
import { AlignCenterOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

const ROUTES = [
    {
        link: '/',
        title: 'Homepage'
    },
    {
        link: '/product',
        title: 'Products'
    },
    {
        link: '/blog',
        title: 'Blog Entries'
    },
    {
        link: '/contact',
        title: 'Contact Us'
    },
    // {
    //     link: '/login',
    //     title: 'Login/Register'
    // },
]

const Header = () => {
    const [activeMenu, setActiveMenu] = useState('/')

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                window.location = "/"
            }
        }
    }, [])

    function handleRemoveActiveMenu() {
        setActiveMenu('/checkout')
    }
    return (
        <>
            <header className='header-fixed'>
                <div className="logo-container">
                    <Link to="/" className="logo-link">
                        <img style={{ width: 80, height: 60 }} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/274306154_331701969011884_1563692950701305637_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=oCgWJE8bZ04AX9JgqWj&_nc_ht=scontent.fhan2-4.fna&oh=03_AVKOpb31-w1yXobP39FVevxnuqP-EgX9QOzUdXLnnnELVA&oe=624C9A37" alt="" />
                    </Link>
                </div>
                <nav className="menu">
                    <ul className="menu-list" style={{ marginBottom: 0 }}>
                        {
                            ROUTES.map(route => {
                                return (
                                    <li className="menu-item" onClick={() => setActiveMenu(route.link)}>
                                        <Link to={route.link} className={`menu-link ${activeMenu == route.link ? "active" : ""}`}>
                                            {route.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div>
                    <Cart handleRemoveActiveMenu={handleRemoveActiveMenu} />
                    {/* <Link to='/login' className={`menu-link`}>
                        Login
                    </Link> */}
                </div>
            </header>
            <header className="header-mobile">
                <div className="logo-container">
                    <Link to='/' className="logo-link">
                        <span className="logo-title">fenco</span>
                    </Link>
                </div>
                <div className="bar-btn">
                    <AlignCenterOutlined className='global-icon' />
                </div>
            </header>
            <nav className={'menu-mobile'}>
                <div className="close-mobile">
                    <AlignCenterOutlined className='global-icon' />
                </div>
                <ul className="menu-mobile-list">
                    {
                        ROUTES.map(route => {
                            return (
                                <li className="menu-mobile-item" onClick={() => setActiveMenu(route.link)}>
                                    <Link to={route.link} className={`menu-mobile-link ${activeMenu == route.link ? "active" : ""}`}>
                                        {route.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </>
    )
}

export default Header