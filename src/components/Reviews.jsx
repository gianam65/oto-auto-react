import React from 'react'

const BACKUPURL = "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const Reviews = (props) => {
    const reviews = props.location.state.item
    console.log(reviews)
    return (
        <div className="review-section">
            <h3 className="review-title">Product reviews</h3>
            <div className="review-wrapper" style={{ height: 350 }}>
                <div className="review-left">
                    <img src={reviews.imageProduct[0] && BACKUPURL} style={{ maxHeight: 350 }} alt="car" className="review-img" />
                </div>
                <div className="review-right">
                    <span className="product-name">Name: {reviews.nameProduct}</span>
                    <span className="product-price">Type product: {reviews.typeProduct}</span>
                    <span className="product-price">Price: <span className="normal-font">{reviews.priceProduct}</span></span>
                    <span className="product-price">Auto company: <span className="normal-font">{reviews.autoCompany}</span></span>
                    <div className="color-wrapper" style={{ marginTop: 12 }}>
                        <span className="product-price" style={{ paddingTop: 0 }}>Color: </span>
                        <span className="product-color" style={{ background: reviews.color }}></span>
                    </div>
                    <span className="product-price">Discount: <span className="normal-font">{reviews.discountProduct}%</span></span>
                </div>
            </div>

            <div className="review-before" style={{ overflowY: 'unser', maxHeight: 'unset' }}>
                <span className="before-text">Review before</span>
                {
                    reviews.reviewsCustomer.length > 0
                        ?
                        <div className="reviewed-box">
                            {reviews.reviewsCustomer.map(item => {
                                return <p style={{ fontStyle: "italic" }}><span style={{ fontWeight: 700 }}>{item.nameCustomer}:</span> {item.review}</p>
                            })}
                        </div>
                        :
                        <p style={{ fontStyle: "italic" }}>This product has no reviews yet</p>
                }
            </div>
        </div>
    )
}

export default Reviews