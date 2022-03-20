import React from 'react'
import { Table, Button, notification, Tooltip, Modal } from 'antd'
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal;

const UserManagement = (props) => {
    function renderColumnsAdmin() {
        const columns = [
            {
                title: 'Name',
                render: (record) => {
                    return <span style={{ textTransform: 'capitalize', color: '#ff5e57' }}>{record.nameAdmin}</span>
                }
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
                    return <span style={{
                        fontWeight: 500,
                        color: record == 'superAdmin' ? "#ff5e57" : "#2a2a2a"
                    }}
                    >
                        {record == 'superAdmin' ? 'Super admin' : 'Admin'}
                    </span>
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
                                    <Tooltip placement='top' title="Upgrade to admin">
                                        <UserAddOutlined className="delete-icon" />
                                    </Tooltip>
                                </Button>
                            </div>
                            :
                            <div className="action-icon">
                                <Button onClick={() => handleDowngrade(record._id)}>
                                    <Tooltip placement='top' title="Downgrade to employee">
                                        <UserDeleteOutlined />
                                    </Tooltip>
                                </Button>
                            </div>
                    )
                }
            },
        ]
        return columns
    }

    const handleDowngrade = (id) => {
        confirm({
            title: "Confirm",
            content: "Do you want to downgrade role",
            onOk() {
                let body = { role: "admin" }
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
            },
            onCancel() {
                return
            }
        })
    }

    const handleUpdateToAdmin = (id) => {
        confirm({
            title: "Confirm",
            content: "Do you want to upgrade role",
            onOk() {
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
            },
            onCancel() {
                return
            }
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