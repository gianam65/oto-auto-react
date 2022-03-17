import React from 'react'
import { Table, Button, notification } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import axios from 'axios'

const UserManagement = (props) => {
    function renderColumnsAdmin() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'nameAdmin'
            },
            {
                title: 'Email',
                dataIndex: 'emailAdmin',
            },
            {
                title: 'Phone',
                dataIndex: 'phoneAdmin'
            },
            {
                title: 'Curent role',
                dataIndex: 'role',
                render: (record) => {
                    return <span>{record == 'superAdmin' ? 'Admin' : 'Employee'}</span>
                }
            },
            {
                title: 'Actions',
                render: (record) => {
                    return (
                        record.role != 'superAdmin'
                            ?
                            <div className="action-icon">
                                <Button onClick={() => handleUpdateToAdmin(record._id)}>
                                    Upgrade to admin
                                    <UserAddOutlined style={{ marginLeft: 8 }} className="delete-icon" />
                                </Button>
                            </div>
                            :
                            <span>Don't have action</span>
                    )
                }
            },
        ]
        return columns
    }

    const handleUpdateToAdmin = (id) => {
        let body = { role: "superAdmin" }
        axios.put(`https://oto-auto.herokuapp.com/admin/author/${id}`, body).then(res => {
            props.setListAdmin(res.data.data)
            notification.success({
                message: "Success",
                description: "Change role success",
                duration: 3,
            })
        }).catch(err => {
            notification.error({
                message: "Error",
                description: "Change role failed",
                duration: 3,
            })
        })
    }
    return (
        <div className="manage-product">
            <span className="title" style={{ marginBottom: 15 }}>User management</span>
            <Table
                dataSource={props.listAdmin}
                columns={renderColumnsAdmin()}
                bordered
            />
        </div>
    )
}

export default UserManagement