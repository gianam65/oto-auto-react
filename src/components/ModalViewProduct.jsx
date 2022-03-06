import React from 'react'
import { Modal } from 'antd'

const ModalViewProduct = (props) => {
    const productItem = props.selectedProduct
    const visibleModalViewProduct = props.visibleModalViewProduct
    return (
        <Modal
            visible={visibleModalViewProduct}
            title="Product detail"
            footer={null}
            width={800}
            onCancel={props.handleCloseModalView}
        >
            <div className='product-detail-wrapper'>
                <div className="product-detail">
                    <div className="product-detail-img">
                        <img src={productItem && productItem.imageProduct[0]} alt="" />
                    </div>
                    <div className="product-detail-desc">
                        <span className="product-detail-name">
                            {productItem.nameProduct}
                        </span>
                        <br />
                        <span className="product-detail-price">
                            ${productItem.priceProduct}
                        </span>
                        <p>Pinterest 90's keytar, neutra narwhal drinking vinegar gastropub hexagon intelligentsia succulents letterpress copper mug tilde. Readymade lyft kogi shabby chic hell of austin direct trade croix.</p>
                        <p>Swag fingerstache typewriter cliche, la croix everyday carry.</p>
                        <div className="item-option">
                            <span className="option-size">Type product:</span>
                            <span className="size-panel">{productItem.typeProduct}</span>
                        </div>
                        <div className='item-option'>
                            <span className="option-color">Color: </span>
                            <span className="color-panel" style={{ opacity: 0.7, background: productItem.color, boxShadow: '0rem 0rem 0.2rem rgba(0,0,0,0.85)' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalViewProduct   