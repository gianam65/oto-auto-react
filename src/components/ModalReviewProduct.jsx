import React from 'react'
import { Modal } from 'antd'
import { useState } from 'react'
import axios from 'axios'

const ModalReviewProduct = (props) => {
    const [review, setReview] = useState("")

    function handleReviewProduct() {
        const url = `https://oto-auto.herokuapp.com/product/review/${props.lastItemInCart.product._id}`
        const body = {
            review: review,
            idCustomer: props.customerInfor && props.customerInfor._id
        }

        axios.put(url, body).then(res => { }).catch(err => {
            console.log(err)
        })
        props.handleCloseReview()
    }

    function renderContentReviewProduct() {
        const lastItemIncart = props.lastItemInCart
        const contentRender = (
            <>
                <div className="review-wrapper">
                    <div className="review-left">
                        <img src={lastItemIncart.product.imageProduct[0] || ""} alt="" className="review-img" />
                    </div>
                    <div className="review-right">
                        <span className="product-name">Name: {lastItemIncart.product.nameProduct}</span>
                        <span className="product-price">Price: {lastItemIncart.product.priceProduct}</span>
                        <div className="color-wrapper">
                            <span className="product-price">Color: </span>
                            <span className="product-color" style={{ background: lastItemIncart.product.color }}></span>
                        </div>
                    </div>
                </div>

                <div className="review-before">
                    <span className="before-text">Review before</span>
                    {
                        lastItemIncart.product.reviewsCustomer.length > 0
                            ?
                            lastItemIncart.product.reviewsCustomer.map(item => {
                                return <p style={{ fontStyle: "italic" }}>{item.nameCustomer}: {item.review}</p>
                            })
                            :
                            <p style={{ fontStyle: "italic" }}>This product has no reviews yet</p>
                    }
                </div>

                <div className="start-review">
                    <input onChange={e => setReview(e.target.value)} type="text" className="review-input" placeholder='Enter your review here...' />
                </div>
            </>
        )

        return contentRender
    }
    return (
        <Modal
            title="Review products"
            visible={props.openReview}
            onCancel={props.handleCloseReview}
            onOk={() => handleReviewProduct()}
        >
            {renderContentReviewProduct()}
        </Modal>
    )
}

export default ModalReviewProduct