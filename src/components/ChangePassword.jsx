import React from 'react'
import { useState } from 'react'
import { notification } from 'antd'
import axios from 'axios'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleChangePassword = (e) => {
        e.preventDefault()
        const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
        if (!customerInfor) window.location.href = window.location.origin
        const customerPassword = customerInfor.password
        const customerId = customerInfor._id
        if (!validateInfor(customerPassword, currentPassword, newPassword, confirmPassword)) {
            let bodyChange = {
                oldPassword: currentPassword,
                newPassword: newPassword
            }
            axios.put(`https://oto-auto.herokuapp.com/customer/changePassword/${customerId}`, bodyChange).then(res => {
                if (!res.data.error) {
                    localStorage.setItem('customer-infor', JSON.stringify(res.data.data))
                    notification.success({
                        message: "Change password success",
                        description: "Change password success",
                        duration: 3,
                        placement: "topRight"

                    })
                } else {
                    notification.error({
                        message: "Failure to change",
                        description: "Change password failure",
                        duration: 3,
                        placement: "topRight"

                    })
                }
            }).catch(err => {
                notification.error({
                    message: "Failure to change",
                    description: "Change password failure",
                    duration: 3,
                    placement: "topRight"

                })
            })
        }
    }

    function validateInfor(customerPassword, currentPassword, newPassword, confirmPassword) {
        let result;
        if (customerPassword != currentPassword) {
            result = false
        }
        if (newPassword.length < 6 || confirmPassword.length < 6) {
            result = false
        }
        if (newPassword !== confirmPassword) {
            result = false
        }

        return result
    }

    function handleValidatePassword(type, value) {
        const customerInfor = JSON.parse(localStorage.getItem("customer-infor"))
        const customerPassword = customerInfor.password
        switch (type) {
            case "currentPass":
                renderStyleRedBorder(type, customerPassword != value, "Current password is not match")
                break;
            case "newPass":
                renderStyleRedBorder(type, value.length < 6, "New password must be at least 6 characters")
                break;
            case "confirmPass":
                renderStyleRedBorder(type, value.length != newPassword, "Password confirm is not match")
                break;
        }
    }

    function renderStyleRedBorder(idDom, condition, message) {
        const element = document.getElementById(idDom)
        const descErrElement = document.getElementById(`${idDom}-desc`)
        if (element && descErrElement) {
            element.style.border = `1px solid ${condition ? "#ff5e57" : "#607d8b"}`
            descErrElement.innerHTML = condition ? message : ""
        }
    }
    return (
        <section>
            <div className="imgBx">
                <div className="background_size" id="slide_bg" />
                <img src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <div className="box">
                        <div className="changepassword">
                            <form>
                                <div className="input-group inputBx">
                                    <span style={{ fontWeight: 500 }}>Current password</span>
                                    <input type="password"
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        onBlur={e => handleValidatePassword("currentPass", e.target.value)}
                                        id="currentPass"
                                    />
                                    <span id="currentPass-desc"></span>
                                </div>
                                <div className="input-group inputBx">
                                    <span style={{ fontWeight: 500 }}>Enter new password</span>
                                    <input type="password"
                                        className="inp"
                                        onChange={e => setNewPassword(e.target.value)}
                                        onBlur={e => handleValidatePassword("newPass", e.target.value)}
                                        id="newPass"
                                    />
                                    <span id="newPass-desc"></span>
                                </div>
                                <div className="input-group inputBx">
                                    <span style={{ fontWeight: 500 }}>Confirm new password</span>
                                    <input type="password"
                                        className="inp"
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        onBlur={e => handleValidatePassword("confirmPass", e.target.value)}
                                        id="confirmPass"
                                    />
                                    <span id="confirmPass-desc"></span>
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <input className="btn-login" type="submit" onClick={(e) => handleChangePassword(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword