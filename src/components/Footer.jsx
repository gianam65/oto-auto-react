import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-about">
                    <div className="footer-logo">
                        <span>FENCO SHOP</span>
                    </div>
                    <p className="about-desc">
                        The customer is at the heart of our unique business model, which includes design.
                    </p>
                </div>
                <div className="footer-sub">
                    <ul className="sub-list">
                        <li className="sub-item">
                            <h6 className="sub-title">
                                Shopping
                            </h6>
                            <span className="sub-desc">
                                Privacy policy
                            </span>
                            <span className="sub-desc">
                                Terms of sale
                            </span>
                            <span className="sub-desc">
                                Report
                            </span>
                        </li>
                        <li className="sub-item">
                            <h6 className="sub-title">
                                Contact us
                            </h6>
                            <span className="sub-desc">
                                gianamweb@gmail.com
                            </span>
                            <span className="sub-desc">
                                +8469193637
                            </span>
                            <span className="sub-desc">
                                Thanh Xuan, Ha Noi
                            </span>

                        </li>
                        <li className="sub-item">
                            <h6 className="sub-title">
                                New letter
                            </h6>
                            <span className="sub-desc">
                                Be the first to know about new arrivals, look books, sales & promos!
                            </span>
                            <form>
                                <input type="text" placeholder="Your email" />
                            </form>
                        </li>
                    </ul>
                </div>
            </footer>
            <p className="copy-right">Copyright at adidas.com & fenco shop</p>
        </>
    )
}

export default Footer