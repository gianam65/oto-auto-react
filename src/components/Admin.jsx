import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import UserManagement from './UserManagement'
import ProductManagement from './ProductManagement'
import AdminMangagementOrder from './AdminMangagementOrder'
import axios from 'axios'

const { TabPane } = Tabs

const Admin = () => {
    const [listProducts, setListProducts] = useState([])
    const [listAdmin, setListAdmin] = useState([])
    // const [listUsers, setListUsers] = useState([])
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const loadProducts = async () => {
            const res = await axios.get("https://oto-auto.herokuapp.com/product")
            setListProducts(res.data.data || [])
        }

        const loadListAdmin = async () => {
            const res = await axios.get("https://oto-auto.herokuapp.com/getalladmin")
            setListAdmin(res.data.data || [])
        }

        const loadOrders = async () => {
            const res = await axios.get("https://oto-auto.herokuapp.com/order")
            setOrders(res.data.data)
        }

        loadListAdmin()
        loadProducts()
        loadOrders()
    }, [])

    function handleLogout() {
        localStorage.removeItem("customer-infor")
        window.location.href = window.location.origin
    }

    return (
        <div className="admin-section">
            <div className="admin-header">
                <div className="header-inner">
                    <div className="admin-left">
                        <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/274306154_331701969011884_1563692950701305637_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=oCgWJE8bZ04AX9JgqWj&_nc_ht=scontent.fhan2-4.fna&oh=03_AVKOpb31-w1yXobP39FVevxnuqP-EgX9QOzUdXLnnnELVA&oe=624C9A37" alt="" />
                    </div>
                    <div className="admin-right" onClick={() => handleLogout()}>Logout</div>
                </div>
            </div>
            <div className="admin-wrapper">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="User management" key="user">
                        <UserManagement listAdmin={listAdmin} setListAdmin={(value) => setListAdmin(value)} />
                    </TabPane>
                    <TabPane tab="Product management" key="product">
                        <ProductManagement listProducts={listProducts} setListProducts={(value) => setListProducts(value)} />
                    </TabPane>
                    <TabPane tab="Order management" key="order">
                        <AdminMangagementOrder orders={orders} setOrders={(value) => setOrders(value)} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Admin