import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const menuFilter = [
    {
        panel: 'all products',
    },
    {
        panel: 'women',
    },
    {
        panel: 'men',
    },
    {
        panel: 'kids',
    },
]

const products = [
    {
        id: 1,
        title: 'Adidas step in motions',
        price: 82,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/4f1ef0c1e5134f28a9ebac9300cc69ad_9366/ultraboost-21-primeblue-shoes.jpg',
        category: 'women',
        color: 'white',
        size: 'S',
    },
    {
        id: 2,
        title: 'Ultra boost 21 shoes',
        price: 260,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/7fb6601c967d4cb195c5ac9200dda919_9366/adidas-by-stella-mccartney-ultraboost-21-shoes.jpg',
        category: 'kids',
        size: 'L',
        color: 'black',
    },
    {
        id: 3,
        title: 'Adidas show crew 2021',
        price: 30,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/faacdde0342b4eee99a7ac6300c3203f_9366/adidas-by-stella-mccartney-ultraboost-sandal.jpg',
        color: 'white',
        size: 'S',
        category: 'men',
    },
    {
        id: 4,
        title: 'Laced up lessons 2019',
        price: 50,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/98fa87a98a424822af99acb700b4034b_9366/samba-shoes.jpg',
        color: 'green',
        size: 'L',
        category: 'men',
    },
    {
        id: 5,
        title: 'Splenlisd shoes younger',
        price: 122,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/cc96de7cc307435fb764ac9300dce751_9366/ultraboost-4.0-dna-shoes.jpg',
        color: 'black',
        size: 'S',
        category: 'kids',
    },
    {
        id: 6,
        title: 'Adidas creative shoes',
        price: 251,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/cec3b575bad8410b8fcaacaa00cabb58_9366/zx-1k-boost-shoes.jpg',
        color: 'white',
        size: 'L',
        category: 'women',
    },
    {
        id: 7,
        title: 'Ultra boost built-in desk',
        price: 232,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/5343cf0c338b4a3cb27eac9300cc9ade_9366/ultraboost-21-primeblue-shoes.jpg',
        color: 'black',
        size: 'S',
        category: 'kids',
    },
    {
        id: 8,
        title: 'Hip homes office',
        price: 211,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/7026326449dc4539882faca700fc95e6_9366/nmd_r1-shoes.jpg',
        color: 'green',
        size: 'L',
        category: 'kids',
    },
    {
        id: 9,
        title: 'Interior design idea',
        price: 150,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/d45df8df7aee4275a7e8ac7501336879_9366/delpala-x-fmf-shoes.jpg',
        category: 'women',
        size: 'M',
        color: 'white',
    },
    {
        id: 10,
        title: 'New kitchen storage',
        price: 190,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/918940e30da149dda00eaca700fc6198_9366/nmd_r1-shoes.jpg',
        color: 'black',
        size: 'S',
        category: 'kids',
    },
    {
        id: 11,
        title: 'New house of Turquois',
        price: 200,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/afdfb701ba4f47568c83ac9800e49f72_9366/lite-racer-adapt-4.0-shoes.jpg',
        color: 'white',
        size: 'M',
        category: 'men',
    },
    {
        id: 12,
        title: 'Nemeziz Super shoes',
        price: 220,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/cc2ac2ee32a945bb9598acb700baa74b_9366/superstar-shoes.jpg',
        color: 'green',
        category: 'women',
        size: 'L',
    },
    {
        id: 13,
        title: 'Strong footing new',
        price: 240,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/ffdcc6cacd9b4c16b85eac7900cb1137_9366/ultraboost-21-shoes.jpg',
        color: 'black',
        size: 'M',
        category: 'men',
    },
    {
        id: 14,
        title: 'Adidas super steps',
        price: 152,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/b4eb074fa6f54a69ab35acaf00fe87d9_9366/stan-smith-shoes.jpg',
        color: 'white',
        size: 'L',
        category: 'women',
    },
    {
        id: 15,
        title: 'A foot for leader',
        price: 300,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/bc9536acf0854e2694bdac9800e3e34b_9366/lite-racer-adapt-4.0-shoes.jpg',
        color: 'black',
        size: 'M',
        category: 'men',
    },
    {
        id: 16,
        title: 'Nemeziz step Away',
        price: 142,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/8a77742c2aa44df2ad60ac9300b437c7_9366/zx-2k-boost-shoes.jpg',
        color: 'white',
        size: 'S',
        category: 'kids',
    },
    {
        id: 17,
        title: 'Trust your self',
        price: 233,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/0569332e1bc54431a2d7ac9500dcef5f_9366/ultraboost-dna-cc_1-shoes.jpg',
        color: 'green',
        size: 'M',
        category: 'men',
    },
    {
        id: 18,
        title: 'Foot forward shoes',
        price: 123,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/569d5d904fa141d3987dacb70070cc2b_9366/zx-1000-the-simpsons-flaming-moe-shoes.jpg',
        color: 'green',
        size: 'L',
        category: 'women',
    },
    {
        id: 19,
        title: 'Step into success',
        price: 10,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/ecbee3d4da7e4f02bedcac7900abbb39_9366/ultraboost-21-x-parley-shoes.jpg',
        color: 'black',
        size: 'L',
        category: 'kids',
    },
    {
        id: 20,
        title: 'Trusted for Toes',
        price: 120,
        image: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/ecc3a7ba2228482291a9ac8a006a78fa_9366/superstar-shoes.jpg',
        color: 'green',
        size: 'M',
        category: 'men',
    },
]
const Product = () => {
    const [productsList, setProductsList] = useState(products)

    const [tag, setTag] = useState('all products')
    useEffect(() => {
        tag === 'all products' ? setProductsList(products) : setProductsList(products.filter(item => item.category === tag))
    }, [tag])

    useEffect(() => {
        const menuEle = document.querySelectorAll('.filter-item-hover')
        menuEle[0].classList.add('active')
    }, [])

    const handleMenuFilter = (index, panel) => {
        const menuEle = document.querySelectorAll('.filter-item-hover')
        for (let i = 0; i < menuEle.length; ++i) {
            menuEle[i].classList.remove('active')
        }
        menuEle[index].classList.add('active')
        setTag(panel)
    }

    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        searchTerm === '' ? setProductsList(products) : setProductsList(products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm])

    const [colorValue, setColorValue] = useState('all')
    useEffect(() => {
        if (colorValue === 'all') {
            const newProducts = [
                ...products,
            ]
            setProductsList(newProducts)
        } else {
            const filteredProduct = products.filter((item) => {
                return item.color === colorValue
            })
            setProductsList(filteredProduct)
        }

    }, [colorValue])

    const [sizeValue, setsizeValue] = useState('all')
    useEffect(() => {
        if (sizeValue === 'all') {
            const newProducts = [
                ...products,
            ]
            setProductsList(newProducts)
        } else {
            const filteredProduct = products.filter((item) => {
                return item.size === sizeValue
            })
            setProductsList(filteredProduct)
        }

    }, [sizeValue])

    const [priceValue, setPriceValue] = useState(0)
    const handleChange = (e) => {
        setPriceValue(e.target.value)
        if (priceValue === 0) {
            const newProducts = products.sort((a, b) => b.price - a.price)
            setProductsList(newProducts)
        } else {
            const filteredProduct = products.filter((item) => {
                if (priceValue > 150) {
                    return priceValue <= item.price
                } else {
                    return priceValue >= item.price
                }
            })
            setProductsList(filteredProduct)
        }
    }

    const altertNoti = () => {
        const overLay = document.querySelector('.overlay-voucher')
        overLay.classList.add('active')
    }

    const hiddenOverlay = () => {
        const overLay = document.querySelector('.overlay-voucher')
        overLay.classList.remove('active')
    }

    const removeActiveMenu = () => {
        const menus = document.querySelectorAll('.menu-link')
        for (let i = 0; i < menus.length; ++i) {
            menus[i].classList.remove('active')
        }
    }

    return (
        <div className="product-content">
            <p className="product-title">
                Welcome to <br /><span className="sub-product-title">
                    our Products
                </span>
            </p>
            <div className="filter-section">
                <div className="filter-sidebar">
                    <form className="filter-form">
                        <input type="text"
                            placeholder="Type here to search"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                            className="filter-input"
                        />
                    </form>
                    <div className="filter-detail">
                        <h3 className="sidebar-title filter-title">Search filter</h3>
                        <div className="select">
                            <select id="color" className="filter-select"
                                onChange={(e) => { setColorValue(e.target.value) }}
                            >
                                <option value="all">All color</option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                                <option value="green">Green</option>
                            </select>
                        </div>
                        <div className="select">
                            <select id="size" className="filter-select"
                                onChange={(e) => { setsizeValue(e.target.value) }}
                            >
                                <option value="all">Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                            </select>
                        </div>

                        <div className="price-chose">Price: 120$</div>
                        <div className="price">
                            <span className="price-current">0$</span>
                            <input className="price-range"
                                type="range" min="0" step="20" max="300"
                                value={priceValue} onChange={handleChange}
                            />
                            <span className="price-current">300$</span>
                        </div>

                        <div className="filter-search-btn">
                            <button className="search-btn"
                                onClick={altertNoti}
                            >
                                Get voucher
                            </button>
                        </div>
                        <div className="overlay-voucher"
                            onClick={hiddenOverlay}
                        >
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
                <div className="filter-product">
                    <div className="filter-menu">
                        <ul className="filter-list">
                            {
                                menuFilter.map((item, index) => (
                                    <li key={index} className="filter-item" onClick={() => handleMenuFilter(index, item.panel)}>
                                        {item.panel}
                                        <div className="filter-item-hover" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="filter-content">
                        {/* <ProductList products={productsList} /> */}
                        <ul className="product-list">
                            {
                                products.map((product, index) => (
                                    <div key={index} className='wrapper-product'>
                                        <li className="product-item" style={{ backgroundImage: `url(${product.image})` }}></li>
                                        <div className="product-item-id">
                                            <p className="product-name">{product.title}</p>
                                            <span className="product-price">${product.price}</span>
                                            <span className="product-size">Size: {product.size}</span>
                                        </div>
                                        <Link to={{
                                            pathname: '/detail',
                                            state: { product: product }
                                        }} className="add-to-cart" onClick={removeActiveMenu}>View detail</Link>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product