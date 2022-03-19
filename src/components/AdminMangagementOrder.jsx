import React from 'react'
import { Table, Button, Tooltip, notification } from 'antd'
import { DiffOutlined } from '@ant-design/icons'
import axios from 'axios'

const AdminMangagementOrder = (props) => {
    function renderColumn() {
        const columns = [
            {
                title: "Name customer",
                render: (record) => {
                    return <span style={{ textTransform: "capitilize" }}>
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
                        <Button onClick={() => handleCreateOrder(record._id)}>
                            {
                                record.statusOrder != "success" &&
                                <Tooltip placement='top' title="Create order">
                                    <DiffOutlined className="delete-icon" />
                                </Tooltip>
                            }
                        </Button>
                    </div>
                }
            }
        ]
        return columns
    }

    const handleCreateOrder = (id) => {
        const statusOrder = { statusOrder: "success" }
        axios.put(`https://oto-auto.herokuapp.com/order/submit/${id}`, statusOrder).then(res => {
            props.setOrders(res.data.data)
            notification.success({
                message: "Success",
                description: "Create order success",
                duration: 3,
            })
        }).catch(err => console.log(err))
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