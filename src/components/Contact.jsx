import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {

    return (
        <>
            <div className="contact">
                <div className="contact-wrapper">
                    <div className="contact-content">
                        <div className="contact-content-top">
                            <p className="content-top-title">
                                Contact us <br />
                            </p>
                            <p className="content-top-desc">
                                Don't be shy, Contact us right now.
                            </p>
                            <br />
                            <Link to='/' className='return'>
                                Return home
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="contact-detail">
                    <div className="detail-desc">
                        <p className="detail-title">
                            Find us on map &amp; Contact us
                        </p>
                        <span className="detail-direct">
                            Street art enamel pin etsy direct trade schlitz activated charcoal knausgaard shabby chic. Intelligentsia celiac authentic, jianbing cliche wayfarers stumptown chambray fanny pack pop-up bushwick vinyl messenger bag copper viral activated charcoal, everyday carry four dollar toast organic blog gastropub. Lyft chambray unicorn drinking vinegar, before they sold out.
                        </span>
                        <br />
                        <br />
                        <span className="detail-direct">
                            Helvetica fingerstache leggings cliche synth, try-hard slow-carb raclette migas forage VHS vinyl typewriter live-edge. Swag portland drinking vinegar, squid umami green juice. Knausgaard raclette bitters, blue bottle typewriter.
                        </span>
                        <br />
                    </div>
                    <div className="detail-map">
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6466832870587!2d105.82330931447562!3d21.006795386010232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8107b993e5%3A0x17eefb43209b6835!2zS2hvYSBCLCAxNzUgUC4gVMOieSBTxqFuLCBUcnVuZyBMaeG7h3QsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1646543185792!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
                        <iframe title='google map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1110401776123!2d105.79536325673457!3d20.98818558182549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6a5e21a775%3A0xee7526a00fb5f3ed!2zU8OibiBiw7NuZyDEkOG6oEkgSOG7jEMgSMOAIE7hu5hJ!5e0!3m2!1svi!2s!4v1621862215349!5m2!1svi!2s" width={400} height={300} style={{ border: 0 }} allowFullScreen loading="lazy" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact