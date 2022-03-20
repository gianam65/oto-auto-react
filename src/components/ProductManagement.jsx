import { useState, useRef } from 'react'
import * as React from 'react';
import { Table, Button, Modal, notification } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal;

const ProductManagement = (props) => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [typeProduct, setTypeProduct] = useState("")
    const [color, setColor] = useState("")
    const [company, setCompany] = useState("")
    const files = useRef([])

    const handleDeleteProduct = (id) => {
        confirm({
            title: "Confirm",
            content: "Do you want to delete this product",
            onOk() {
                axios.delete(`https://oto-auto.herokuapp.com/product/${id}`).then(res => {
                    props.setListProducts(res.data.data)
                    notification.success({
                        message: "Success",
                        description: "Delete product success",
                        duration: 3,
                    })
                }).catch(err => {
                    notification.error({
                        message: "Failed",
                        description: err,
                        duration: 3,
                    })
                })
            },
            onCancel() {
                return
            }
        })

    }

    const openModalAddProduct = () => {
        setVisible(true)
    }

    const handleAddProduct = () => {
        let bodyToCallAPI = new FormData()
        const fileUpload = files && files.current && files.current.files && files.current.files[0]

        bodyToCallAPI.append("nameProduct", name)
        bodyToCallAPI.append("priceProduct", price)
        bodyToCallAPI.append("typeProduct", typeProduct)
        bodyToCallAPI.append("color", color)
        bodyToCallAPI.append("autoCompany", company)
        bodyToCallAPI.append("imageProduct", [fileUpload])

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post("https://oto-auto.herokuapp.com/product", bodyToCallAPI, config).then(res => {
            props.setListProducts(res.data.data)
            notification.success({
                message: "Success",
                description: "Add product success",
                duration: 3,
            })
        }).catch(err => {
            notification.error({
                message: "Failed",
                description: err,
                duration: 3,
            })
        })
        setVisible(false)
    }

    function renderContentAddProduct() {
        const content = (
            <div className='add-product-wrapper'>
                <div className="namefield">
                    <label htmlFor="">Name product: </label>
                    <input type="text" onChange={e => setName(e.target.value)} />
                </div>
                <div className="namefield">
                    <label htmlFor="">Price product: </label>
                    <input type="text" onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="namefield">
                    <label htmlFor="">Type: </label>
                    <input type="text" onChange={e => setTypeProduct(e.target.value)} />
                </div>
                <div className="namefield">
                    <label htmlFor="">Color: </label>
                    <input type="text" onChange={e => setColor(e.target.value)} />
                </div>
                <div className="namefield">
                    <label htmlFor="">Discount product: </label>
                    <input type="text" onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="namefield">
                    <label htmlFor="">Image product: </label>
                    <input type="file" ref={files} style={{ borderBottom: 0 }} />
                </div>
            </div>
        )

        return content
    }

    function renderColumns() {
        const columns = [
            {
                title: 'Name',
                render: (record) => {
                    return <span style={{ textTransform: 'capitalize', color: '#ff5e57' }}>{record.nameProduct}</span>
                }
            },
            {
                title: 'Type',
                render: (record) => {
                    return <span style={{ textTransform: 'capitalize' }}>{record.typeProduct}</span>
                }
            },
            {
                title: 'Price',
                render: (record) => {
                    return <span style={{ fontWeight: 500 }}>{record.priceProduct} $</span>
                }
            },
            {
                title: 'Color',
                render: (record) => {
                    return <span style={{ textTransform: 'capitalize' }}>{record.color}</span>
                }
            },
            {
                title: 'Discount',
                dataIndex: 'amountProduct'
            },
            {
                title: 'Actions',
                render: (record) => {
                    return <div className="action-icon">
                        <DeleteOutlined style={{ marginLeft: 8 }} className="delete-icon" onClick={() => handleDeleteProduct(record._id)} />
                    </div>
                }
            },
        ]
        return columns
    }

    return (
        <div className="manage-product">
            <span className="title">Product management</span>
            <div className="manage-product-action">
                <Button className="add-product-btn" onClick={() => openModalAddProduct()}>
                    Add product
                </Button>
            </div>
            <Modal
                visible={visible}
                title="Add product"
                onCancel={() => setVisible(false)}
                onOk={() => handleAddProduct()}
            >
                {renderContentAddProduct()}
            </Modal>
            <Table
                dataSource={props.listProducts}
                columns={renderColumns()}
                bordered
            />
        </div>
    )
}

export default ProductManagement   