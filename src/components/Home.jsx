import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SRLWrapper } from 'simple-react-lightbox'
import axios from 'axios'
import { Spin } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import DATAIMAGES from '../default-data/data.js'

const SLIDEDATA = [
    {
        background: DATAIMAGES[Math.floor(Math.random() * 14)],
        name: "Toyota Vios",
        subName: "Would the best car name ?",
        desc: "Always be 100% honest",
        link: "Go to products"
    },
    {
        background: DATAIMAGES[Math.floor(Math.random() * 14)],
        name: "Volkswagen Germany",
        subName: "New car arrivals",
        desc: "Know your target market.",
        link: "Go to products"
    },
    {
        background: DATAIMAGES[Math.floor(Math.random() * 14)],
        name: "Ford Motor United States",
        subName: "The best car ?",
        desc: "Make sure to mention upgrades",
        link: "Go to products"
    }
]

const menuHome = ['all products', 'car', 'wheels', 'steering wheel']

const Home = () => {
    const [productsList, setProductsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [current, setCurrent] = useState(0)
    const [activeMenu, setActiveMenu] = useState(0)
    const length = SLIDEDATA.length

    useEffect(() => {
        const loadProducts = async () => {
            const response = await axios("https://oto-auto.herokuapp.com/product")
            setProductsList(response.data.data)
            setLoading(false)
        }

        loadProducts()
    }, [])

    const handleNextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const handlePrevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    function handleFilterTypeProduct() {
        let productFiltered = productsList
        switch (activeMenu) {
            case 0:
                productFiltered = productsList
                break;
            case 1:
                productFiltered = productsList.filter(product => product.typeProduct.toLowerCase() == "car")
                break;
            case 2:
                productFiltered = productsList.filter(product => product.typeProduct.toLowerCase() == "wheel")
                break;
            case 3:
                productFiltered = productsList.filter(product => product.typeProduct.toLowerCase() == "streering wheel")
                break;
            default:
                return productFiltered;
        }

        return productFiltered;
    }

    return (
        <div className="content">
            <div className="slider-container">
                <div className="slides">
                    {
                        SLIDEDATA.map((item, index) => (
                            <div key={index} className={current === index ? 'slide-wrapp active' : 'slide-wrapp'}>
                                {index === current && (
                                    <div className="slider-item" style={{ backgroundImage: `url(${item.background})` }}>
                                        <div className="slide-detail">
                                            <span>New arrivals --</span>
                                            <h2 className="slide-product-name">{item.name}<span className="product-highlight">{item.subName}</span></h2>
                                            <p className="slide-product-desc">{item.desc}</p>
                                            <Link to='/product' className="slide-product-link">{item.link}</Link>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="slides-btn">
                    <LeftOutlined id="prev-button" onClick={handlePrevSlide} className="btn-left" />
                    <RightOutlined id="next-button" onClick={handleNextSlide} className="btn-right" />
                </div>
            </div>
            <div className="new-content">
                <h2 className="content-title">
                    New arrivals
                </h2>
                <span className="content-desc">
                    Here you can check our new products with fair price on fenco
                </span>
                <ul className="menu-products-list">
                    {
                        menuHome.map((item, index) => (
                            <li onClick={() => setActiveMenu(index)} key={index} className={`menu-product-item ${activeMenu == index ? "active" : ""}`}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
                <div className="new-products">
                    {
                        loading
                            ?
                            <Spin />
                            :
                            <>
                                <SRLWrapper>
                                    <ul className="new-product-list">
                                        {
                                            handleFilterTypeProduct().map((item) => (
                                                <li key={item._id} className="new-product-item">
                                                    <img src={item.imageProduct[0] && DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="new-product-img" />
                                                    <p className="new-product-name">Sneaker Splash VRT</p>
                                                    <span className="new-product-price">$3.99</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </SRLWrapper>
                                <div className="view-all">
                                    <Link to='/product' className="view-all-link">View all products</Link>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="blog-content-wrapper">
                <h2 className="content-title">
                    Blog Entries
                </h2>
                <span className="content-desc">
                    Here you can check out our blog entries
                </span>
                <ul className="blog-list">
                    <li className="blog-item">
                        <div className="blog-thumb">
                            <img src={DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="blog-img" />
                            <span className="blog-admin">Admin</span>
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">
                                Team building of us
                            </h2>
                            <p className="blog-desc">
                                Trade chicharrones rawing denim beard kombucha locavore and blue bottle bunch
                            </p>
                            <Link to='/blog' className="blog-reading">Continue reading...</Link>
                        </div>
                    </li>
                    <li className="blog-item">
                        <div className="blog-thumb">
                            <img src={DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="blog-img" />
                            <span className="blog-admin">Admin</span>
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">
                                Team building of us
                            </h2>
                            <p className="blog-desc">
                                Trade chicharrones rawing denim beard kombucha locavore and blue bottle bunch
                            </p>
                            <Link to='/blog' className="blog-reading">Continue reading...</Link>
                        </div>
                    </li>
                    <li className="blog-item">
                        <div className="blog-thumb">
                            <img src={DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="blog-img" />
                            <span className="blog-admin">Admin</span>
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">
                                Compare Ultraboost vs Nemeziz
                            </h2>
                            <p className="blog-desc">
                                Trade chicharrones rawing denim beard kombucha locavore and blue bottle bunch
                            </p>
                            <Link to='/blog' className="blog-reading">Continue reading...</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="features-content">
                <h2 className="content-title">How it work</h2>
                <span className='content-desc'>We've designed a simple, efficient tool for prototyping. Here's how it work</span>
                <div className="features-box">
                    <img src={DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="features-box-img" />
                    <span className="features-box-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, deleniti.
                    </span>
                </div>
                <div className="features-box">
                    <span className="features-box-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, deleniti.
                    </span>
                    <img src={DATAIMAGES[Math.floor(Math.random() * 14)]} alt="" className="features-box-img" />
                </div>
            </div>
            <div className="delivery-content">
                <h2 className="content-title">Delivery</h2>
                <span className="content-desc">
                    Delivery shipping methods
                </span>
                <ul className="delivery-list">
                    <li className="delivery-item">
                        <div className="delivery-thumb">
                            <ion-icon name="car-outline" />
                        </div>
                        <div className="delivery-content">
                            <span className="delivery-title">
                                Free shipping
                            </span>
                            <p className="delivery-desc">
                                Free, fast &amp; secure delivery within 24h
                            </p>
                        </div>
                    </li>
                    <li className="delivery-item">
                        <div className="delivery-thumb">
                            <ion-icon name="shield-outline" />
                        </div>
                        <div className="delivery-content">
                            <span className="delivery-title">
                                Secure Payment
                            </span>
                            <p className="delivery-desc">
                                Up to 12 months open for  support tickets
                            </p>
                        </div>
                    </li>
                    <li className="delivery-item">
                        <div className="delivery-thumb">
                            <ion-icon name="refresh-outline" />
                        </div>
                        <div className="delivery-content">
                            <span className="delivery-title">
                                30 Days return
                            </span>
                            <p className="delivery-desc">
                                30 days return for unhappy products
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home