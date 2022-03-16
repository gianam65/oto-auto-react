import React from 'react'
import { Table, Button } from 'antd'
import { DiffOutlined } from '@ant-design/icons'

const AdminMangagementOrder = (props) => {
    function handleProduceDatasource() {
        return props.listUsers.filter(user => {
            return user.emailCustomer || user.nameCustomer
        })
    }
    function renderColumn() {
        const columns = [
            {
                title: "Name customer",
                dataIndex: "nameCustomer"
            },
            {
                title: "Email customer",
                dataIndex: "emailCustomer"
            },
            {
                title: "Phone customer",
                dataIndex: "phoneCustomer"
            },
            {
                title: "Order count",
                render: (record) => {
                    return <span>{record.listOrder && record.listOrder.length}</span>
                }
            },
            {
                title: "Action",
                render: (record) => {
                    return <div className="action-icon">
                        <Button onClick={() => handleAddOrderCustomer(record._id)}>
                            Add order
                            <DiffOutlined style={{ marginLeft: 8 }} className="delete-icon" />
                        </Button>
                    </div>
                }
            }
        ]
        return columns
    }

    const handleAddOrderCustomer = (id) => {
        console.log(id)
    }

    return (
        <div className="manage-product">
            <span className="title" style={{ marginBottom: 15 }}>Order management</span>
            <Table
                dataSource={handleProduceDatasource()}
                columns={renderColumn()}
                bordered
            />
        </div>
    )
}

export default AdminMangagementOrder