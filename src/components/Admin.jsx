import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import UserManagement from './UserManagement'
import ProductManagement from './ProductManagement'
import axios from 'axios'

const { TabPane } = Tabs

const Admin = () => {
    const [listProducts, setListProducts] = useState([])
    useEffect(() => {
        const loadProducts = async () => {
            const res = await axios.get("https://oto-auto.herokuapp.com/product")
            setListProducts(res.data.data)
        }

        loadProducts()
    }, [])

    return (
        <div className="admin-wrapper">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="user">
                    <UserManagement />
                </TabPane>
                <TabPane tab="Tab 2" key="product">
                    <ProductManagement listProducts={listProducts} setListProducts={(value) => setListProducts(value)} />
                </TabPane>
                <TabPane tab="Tab 3" key="order">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Admin