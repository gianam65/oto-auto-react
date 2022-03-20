import React from 'react'
import { Table, Button, Tooltip, notification, Modal } from 'antd'
import { DiffOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal;

const AdminMangagementOrder = (props) => {
    function renderColumn() {
        const columns = [
            {
                title: "Name customer",
                render: (record) => {
                    return <span style={{ textTransform: "capitalize", color: "#ff5e57" }}>
                        {record.idCustomer.nameCustomer}
                    </span>
                }
            },
            {
                title: "Email customer",
                render: (record) => {
                    return <span>{record.idCustomer.emailCustomer}</span>
                }
            },
            {
                title: "Phone customer",
                render: (record) => {
                    return <span>{record.idCustomer.phoneCustomer}</span>
                }
            },
            {
                title: "Total price",
                render: (record) => {
                    return <span>{record.totalPrice}</span>
                }
            },
            {
                title: "Status",
                render: (record) => {
                    return (
                        <span
                            style={{
                                textTransform: "capitalize",
                                fontWeight: 500,
                                color: (record.statusOrder == "success" || record.statusOrder == "Success") ? "#1dd1a1" : record.statusOrder == "failure" ? "#ff5e57" : "#feca57"
                            }}
                        >
                            {record.statusOrder}
                        </span>
                    )
                }
            },
            {
                title: "Action",
                render: (record) => {
                    return <div className="action-icon">
                        {
                            record.statusOrder == "success"
                                ?
                                <Button onClick={() => handleRemoveOrder(record._id)}>
                                    <Tooltip placement='top' title="Change order">
                                        <EditOutlined className="delete-icon" />
                                    </Tooltip>
                                </Button>
                                :
                                <Button onClick={() => handleCreateOrder(record._id)}>
                                    <Tooltip placement='top' title="Create order">
                                        <DiffOutlined className="delete-icon" />
                                    </Tooltip>
                                </Button>

                        }
                    </div>
                }
            }
        ]
        return columns
    }

    const handleRemoveOrder = (id) => {
        confirm({
            title: "Confirm",
            content: "Do you want to change status this order",
            onOk() {
                const statusOrder = { statusOrder: "pending" }
                axios.put(`https://oto-auto.herokuapp.com/order/submit/${id}`, statusOrder).then(res => {
                    props.setOrders(res.data.data)
                    notification.success({
                        message: "Success",
                        description: "Change status order success",
                        duration: 3,
                    })
                }).catch(err => console.log(err))
            },
            onCancel() {
                return
            }
        })
    }

    const handleCreateOrder = (id) => {
        confirm({
            title: "Confirm",
            content: "Do you want to add this order",
            onOk() {
                const statusOrder = { statusOrder: "success" }
                axios.put(`https://oto-auto.herokuapp.com/order/submit/${id}`, statusOrder).then(res => {
                    props.setOrders(res.data.data)
                    notification.success({
                        message: "Success",
                        description: "Create order success",
                        duration: 3,
                    })
                }).catch(err => console.log(err))
            },
            onCancel() {
                return
            }
        })
    }

    return (
        <div className="manage-product">
            <span className="title" style={{ marginBottom: 15 }}>Order management</span>
            <Table
                dataSource={props.orders}
                columns={renderColumn()}
                bordered
            />
        </div>
    )
}

export default AdminMangagementOrder