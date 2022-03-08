import React from 'react'
import { useState, useEffect } from 'react'
import { Empty, Spin, notification } from 'antd'
import ModalViewProduct from './ModalViewProduct'
import axios from 'axios'

const menuFilter = [
    {
        panel: 'all products',
    },
    {
        panel: 'Oto',
    },
    {
        panel: 'Wheels',
    },
    {
        panel: 'Steering wheel',
    },
]
const Product = () => {
    const [productsList, setProductsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [activeMenu, setActiveMenu] = useState('all products')
    const [typeFilter, setTypeFilter] = useState('all')
    const [filterPrice, setFilterPrice] = useState(0)
    const [color, setColor] = useState('')
    const [visibleVoucher, setVisibleVoucher] = useState(false)
    const [visibleModalViewProduct, setVisibleModalViewProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const loadProducts = async () => {
            const response = await axios("https://oto-auto.herokuapp.com/product")
            setProductsList(response.data.data)
            setLoading(false)
        }

        loadProducts()

    }, [])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderMenuFilterProducts() {
        const content = (
            <div className="filter-menu">
                <ul className="filter-list">
                    {
                        menuFilter.map((item, index) => (
                            <li key={index} style={{ color: item.panel === activeMenu ? "#ff5e57" : "rgba(0, 0, 0, 0.85)" }} className="filter-item" onClick={() => { setActiveMenu(item.panel); setTypeFilter('type') }}>
                                {item.panel}
                                <div className={`filter-item-hover ${item.panel === activeMenu ? "active" : ""}`} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )

        return content
    }

    function handleFilterProduct() {
        let result;
        switch (typeFilter) {
            case 'name':
                result = productsList.filter(item => item.nameProduct.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0);
                break;
            case 'price':
                result = productsList.filter(item => item.priceProduct >= filterPrice);
                break;
            case 'color':
                result = color === 'all' ? productsList : productsList.filter(item => item.color.toLowerCase() === color.toLowerCase())
                break;
            case 'type':
                result = activeMenu === 'all products' ? productsList : productsList.filter(item => item.typeProduct.toLowerCase() === activeMenu.toLowerCase())
                break;
            default:
                return productsList;
        }
        return result;
    }

    function handleViewProduct(id) {
        const productItem = productsList.filter(product => product._id == id)
        setVisibleModalViewProduct(true)
        setSelectedProduct(...productItem)
    }

    function handleCloseModalView() {
        setVisibleModalViewProduct(false)
    }

    function handleAddToCart(id) {
        const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
        if (!customerInfor) {
            const urlToLogin = `${window.location.href.split("/product")[0]}/login`
            window.location.href = urlToLogin
            return
        } else {
            const URL = `https://oto-auto.herokuapp.com/product/addCart/${id}`
            axios.put(URL, { idCart: customerInfor.idCart }).then(res => {
                notification.open({
                    message: "Success",
                    description: "Add product success"
                })
                loadCart(res.data.data.listProduct || [])
            }).catch(err => {
                console.log(err)
            })
        }
    }

    function loadCart(item) {
        localStorage.setItem("customer-cart", JSON.stringify(item))
    }

    function renderFilterSide() {
        return (
            <div className="filter-sidebar">
                <form className="filter-form">
                    <input type="text"
                        placeholder="Type here to search"
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value); setTypeFilter('name') }}
                        className="filter-input"
                    />
                </form>
                <div className="filter-detail">
                    <h3 className="sidebar-title filter-title">Search filter</h3>
                    <div className="select">
                        <select id="color" className="filter-select"
                            onChange={(e) => { setColor(e.target.value); setTypeFilter('color') }}
                        >
                            <option value="all">Color</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div className="price-chose">Price: {filterPrice}$</div>
                    <div className="price">
                        <span className="price-current">0$</span>
                        <input className="price-range"
                            type="range" min="0" step="200" max="20000"
                            value={filterPrice} onChange={(e) => { setFilterPrice(e.target.value); setTypeFilter('price') }}
                        />
                        <span className="price-current">20.000$</span>
                    </div>

                    <div className="filter-search-btn">
                        <button className="search-btn" onClick={() => setVisibleVoucher(true)}>
                            Get voucher
                        </button>
                    </div>
                    <div onClick={() => setVisibleVoucher(false)} className={`overlay-voucher ${visibleVoucher ? "active" : ""}`}>
                        <div className="overlay-inner">
                            <p className="overlay-alert">You are not eligible to receive this voucher</p>
                            <span className="overlay-close">Click outside the modal to close</span>
                        </div>
                    </div>
                </div>
                <div className="product-category">
                    <h3 className="sidebar-title">Products Categories</h3>
                    <ul className="category-list">
                        <li className="category-item">
                            <span>Women collection</span>
                            <p>36</p>
                        </li>
                        <li className="category-item">
                            <span>Men collection</span>
                            <p>43</p>
                        </li>
                        <li className="category-item">
                            <span>Kids collection</span>
                            <p>62</p>
                        </li>
                        <li className="category-item">
                            <span>Accessories</span>
                            <p>18</p>
                        </li>
                        <li className="category-item">
                            <span>New arrivals</span>
                            <p>12</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="product-content">
            <p className="product-title">
                Welcome to <br /><span className="sub-product-title">
                    our Products
                </span>
            </p>
            <div className="filter-section">
                {renderFilterSide()}
                <div className="filter-product">
                    {renderMenuFilterProducts()}
                    <div className="filter-content">
                        {
                            loading
                                ?
                                <div className="loading" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Spin />
                                </div>
                                :
                                <ul className="product-list">
                                    {
                                        handleFilterProduct().length > 0
                                            ? handleFilterProduct().map(product =>
                                                <div key={product._id} className='wrapper-product'>
                                                    <img src={product.imageProduct[0]} onClick={() => handleViewProduct(product._id)} style={{ width: '100%', height: '200px' }} />
                                                    <div className="product-item-id">
                                                        <p className="product-name">{product.nameProduct}</p>
                                                        <span className="product-price">Price: {product.priceProduct}</span>
                                                        <span className="product-size">Color: {capitalizeFirstLetter(product.color)}</span>
                                                    </div>
                                                    <button className='add-to-cart' style={{ width: '100%' }} onClick={() => handleAddToCart(product._id)}>Add to cart</button>
                                                </div>
                                            ) : <Empty />
                                    }
                                </ul>
                        }
                    </div>
                </div>
            </div>
            {selectedProduct && <ModalViewProduct
                selectedProduct={selectedProduct}
                handleCloseModalView={() => handleCloseModalView()}
                visibleModalViewProduct={visibleModalViewProduct}
            />
            }
        </div>
    )
}

export default Product