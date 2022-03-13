import { useState, useEffect } from 'react'
import Cart from './Cart.jsx'
import { AlignCenterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

let ROUTES = [
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
]

const Header = (props) => {
    const [activeMenu, setActiveMenu] = useState('/')
    const [openMobile, setOpenMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(getWindowWidth() || 769)

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                setActiveMenu(window.location.pathname)
            }
        }

        function handleResize() {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)

    }, [])

    // Not good for performance
    if (windowWidth > 768) {
        ROUTES = [
            { link: '/', title: 'Homepage' },
            { link: '/product', title: 'Products' },
            { link: '/blog', title: 'Blog Entries' },
            { link: '/contact', title: 'Contact Us' }
        ]

    } else {
        ROUTES = [
            { link: '/', title: 'Homepage' },
            { link: '/product', title: 'Products' },
            { link: '/blog', title: 'Blog Entries' },
            { link: '/contact', title: 'Contact Us' },
            { link: '/checkout', title: "Checkout" },
            { link: '/login', title: "Login" },
        ]
    }

    function getWindowWidth() {
        return window.innerWidth
    }

    function handleRemoveActiveMenu() {
        setActiveMenu('/checkout')
    }

    function handleActiveCurrentMenu() {
        setActiveMenu('/product')
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
                                    <li className="menu-item" key={route.link} onClick={() => setActiveMenu(route.link)}>
                                        <Link to={route.link} className={`menu-link ${activeMenu == route.link ? "active" : ""}`}>
                                            {route.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {props.customerInfor ? <span style={{ fontWeight: 600 }}>{props.customerInfor.nameCustomer}</span> : <Link to='/login' className={`menu-link`} style={{ paddingRight: 0 }}>
                        Login/Register
                    </Link>}
                    <Cart handleActiveCurrentMenu={handleActiveCurrentMenu} handleRemoveActiveMenu={handleRemoveActiveMenu} idCart={props.idCart} cart={props.cart} setNewCart={props.setNewCart} />
                </div>
            </header>
            <header className="header-mobile">
                <div className="logo-container">
                    <Link to='/' className="logo-link">
                        <img style={{ width: 80, height: 60 }} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/274306154_331701969011884_1563692950701305637_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=oCgWJE8bZ04AX9JgqWj&_nc_ht=scontent.fhan2-4.fna&oh=03_AVKOpb31-w1yXobP39FVevxnuqP-EgX9QOzUdXLnnnELVA&oe=624C9A37" alt="" />
                    </Link>
                </div>
                <div className="bar-btn" onClick={() => setOpenMobile(true)}>
                    <AlignCenterOutlined className='global-icon' />
                </div>
            </header>
            <nav className={`menu-mobile ${openMobile ? "active" : ""}`}>
                <div className="close-mobile" onClick={() => setOpenMobile(false)}>
                    <AlignCenterOutlined className='global-icon' />
                </div>
                <ul className="menu-mobile-list">
                    {
                        ROUTES.map((route, index) => {
                            return (
                                <li key={index} className="menu-mobile-item" onClick={() => { setActiveMenu(route.link); setOpenMobile(false) }}>
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