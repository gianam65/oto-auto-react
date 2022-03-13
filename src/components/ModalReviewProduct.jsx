import React from 'react'
import { Modal, notification } from 'antd'
import { useState } from 'react'
import axios from 'axios'

const BACKUPURL = "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

const ModalReviewProduct = (props) => {
    const [review, setReview] = useState("")

    function checkIsAllWideSpace() {
        const reviewSplitted = review.split("")
        let isAllWideSpaceCount = 0;
        if (reviewSplitted.length > 0) {
            for (let i = 0; i < reviewSplitted.length; i++) {
                console.log(reviewSplitted[i])
                if (reviewSplitted[i].trim() == '') {
                    isAllWideSpaceCount = isAllWideSpaceCount + 1;
                }
            }
        }

        return isAllWideSpaceCount == reviewSplitted.length
    }

    function handleReviewProduct() {
        const url = `https://oto-auto.herokuapp.com/product/review/${props.lastItemInCart.product._id}`
        const body = {
            review: review,
            idCustomer: props.customerInfor && props.customerInfor._id
        }

        if (checkIsAllWideSpace()) {
            notification.error({
                title: "Error",
                description: "Please don't enter all wide space",
                placement: 'topRight',
                bottom: 50,
                duration: 3,
                rtl: true,
            });
            return
        }

        if (review.length == 0) {
            notification.error({
                title: "Review error",
                description: "You have to enter character to review this product",
                placement: 'topRight',
                bottom: 50,
                duration: 3,
                rtl: true,
            });
            return
        }

        axios.put(url, body).then(res => {
            notification.success({
                title: "Review success",
                description: "Thanks for you review",
                placement: 'topRight',
                bottom: 50,
                duration: 3,
                rtl: true,
            });
        }).catch(err => {
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
                        <img src={lastItemIncart.product.imageProduct[0] && BACKUPURL} alt="car" className="review-img" />
                    </div>
                    <div className="review-right">
                        <span className="product-name">Name: {lastItemIncart.product.nameProduct}</span>
                        <span className="product-price">Price: {lastItemIncart.product.priceProduct}</span>
                        <span className="product-price">Auto company: {lastItemIncart.product.autoCompany}</span>
                        <span className="product-price">Type product: {lastItemIncart.product.typeProduct}</span>
                        <div className="color-wrapper" style={{ paddingTop: 10 }}>
                            <span className="product-price" style={{ paddingTop: 0 }}>Color: </span>
                            <span className="product-color" style={{ background: lastItemIncart.product.color }}></span>
                        </div>
                    </div>
                </div>

                <div className="review-before">
                    <span className="before-text">Review before</span>
                    {
                        lastItemIncart.product.reviewsCustomer.length > 0
                            ?
                            <div className="reviewed-box">
                                {lastItemIncart.product.reviewsCustomer.map(item => {
                                    return <p style={{ fontStyle: "italic" }}><span style={{ fontWeight: 700, fontStyle: "initial" }}>{item.nameCustomer}:</span> {item.review}</p>
                                })}
                            </div>
                            :
                            <p style={{ fontStyle: "italic" }}>This product has no reviews yet</p>
                    }
                </div>

                <div className="start-review">
                    <input
                        style={{ borderBottom: `1px solid ${review.length == 0 || (review.length != 0 && checkIsAllWideSpace()) ? "#ff5e57" : "#2a2a2a"}` }}
                        onChange={e => { setReview(e.target.value); checkIsAllWideSpace() }}
                        type="text" className="review-input"
                        placeholder="Enter your review here..."
                    />
                    {
                        review.length != 0 && checkIsAllWideSpace()
                            ? <span style={{ marginTop: 6, marginLeft: 8, display: "block", color: "#ff5e57" }}>"Please don't review with all wide space"</span>
                            : <span style={{ height: 22, display: "inline-block", width: '100%' }}></span>
                    }
                </div>
            </>
        )

        return contentRender
    }
    return (
        <Modal
            title="Review products"
            width={1065}
            visible={props.openReview}
            onCancel={props.handleCloseReview}
            onOk={() => handleReviewProduct()}
        >
            {renderContentReviewProduct()}
        </Modal>
    )
}

export default ModalReviewProduct