import React from 'react'
import { Table, Button } from 'antd'
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
                title: 'Actions',
                render: (record) => {
                    return <div className="action-icon">
                        <Button onClick={() => handleUpdateToAdmin(record._id)}>
                            Upgrade to admin
                            <UserAddOutlined style={{ marginLeft: 8 }} className="delete-icon" />
                        </Button>
                    </div>
                }
            },
        ]
        return columns
    }

    const handleUpdateToAdmin = (id) => {
        axios.put(`https://oto-auto.herokuapp.com/admin/${id}`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
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