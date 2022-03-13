import { useState } from 'react'
import axios from 'axios'
import { notification, Button } from 'antd'

const Login = () => {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [phone, setPhone] = useState("")
    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [isChecked, setIsChecked] = useState(false)

    function validateFields(type, value) {
        const inputField = document && document.getElementById(type)
        switch (type) {
            case "username":
                styleForInvalidFields(inputField, !value, "You have to enter name")
                break;
            case "email":
                const emailSplited = value.split("")
                let isValidEmail = emailSplited.findIndex(character => character.includes("@"))
                styleForInvalidFields(inputField, (!value || isValidEmail == -1), "Email have to includes @")
                break;
            case "password":
                styleForInvalidFields(inputField, (!value || value.length < 6), "Password must be at least 6 characters")
                break;
            case "phone":
                styleForInvalidFields(inputField, !value, "You have to enter phone")
                break;
            case "emailLogin":
                styleForInvalidFields(inputField, !value, "You have to enter email")
                break;
            case "passwordLogin":
                styleForInvalidFields(inputField, !value, "You have to enter password")
                break;
            default:
                break;
        }
    }

    function styleForInvalidFields(element, result, message) {
        if (element && result) {
            element.style.border = "1px solid #ff5e57"
            element.placeholder = message
        } else {
            element.style.border = "1px solid #607d8b"
        }
    }

    function handleRegister(e) {
        e.preventDefault()
        if (!userName || !passWord || !email || !phone) {
            notification.error({
                message: "Register error",
                description: "Register error",
                duration: 3,
            })
            return
        }
        const userData = {
            nameCustomer: userName,
            emailCustomer: email,
            password: passWord,
            phoneCustomer: phone
        }
        axios.post("https://oto-auto.herokuapp.com/customer", userData).then((res) => {
            refreshState()
            notification.success({
                message: "Success",
                description: "Register success",
                duration: 3,
            })
            setIsChecked(false)
        }).catch(err => {
            notification.error({
                message: "Register error",
                description: err,
                duration: 3,
            })
        })
    }

    function handleLogin(e) {
        e.preventDefault();
        if (!emailLogin || !passwordLogin) {
            notification.error({
                message: "Failure to login",
                description: "Login failure",
                duration: 3,
            })
            return
        }
        const customerInfor = {
            emailCustomer: emailLogin,
            password: passwordLogin
        }
        axios.post("https://oto-auto.herokuapp.com/customer/login", customerInfor).then(res => {
            if (res.data.isLogin) {
                localStorage.setItem('customer-infor', JSON.stringify(res.data.Customer))
                const urlToHome = `${window.location.href.split("/login")[0]}/`
                window.location.href = urlToHome
                notification.success({
                    message: "Success",
                    description: "Login success",
                    duration: 3,
                })
            } else {
                notification.error({
                    message: "Failure to login",
                    description: "Login failure",
                    duration: 3,
                })
            }
        }).catch(err => {
            notification.error({
                message: "Failure to login",
                description: "Login failure",
                duration: 3,
            })
        })
    }

    function refreshState() {
        setEmail("")
        setUserName("")
        setPassWord("")
        setPhone("")
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
                        <input type="checkbox" className="toggle-btn" onChange={() => setIsChecked(!isChecked)} checked={isChecked} name />
                        <div className="signup">
                            <form action method>
                                <div className="input-group inputBx">
                                    <span>Email</span>
                                    <input value={emailLogin}
                                        onChange={(e) => { setEmailLogin(e.target.value); validateFields("emailLogin", e.target.value) }}
                                        onBlur={e => validateFields("emailLogin", e.target.value)}
                                        type="text" className="inp"
                                        id="emailLogin"
                                    />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Password</span>
                                    <input value={passwordLogin}
                                        onChange={(e) => { setPasswordLogin(e.target.value); validateFields("passwordLogin", e.target.value) }}
                                        type="password" className="inp"
                                        onBlur={e => validateFields("passwordLogin", e.target.value)}
                                        id="passwordLogin"
                                    />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <input className="btn-login" type="submit" onClick={(e) => handleLogin(e)} />
                                </div>
                                <div className="inputBx not-have-acc" style={{ marginTop: '20px' }}>
                                    <p style={{ marginTop: '5px', marginBottom: 0, marginRight: 10 }}>Don't have an account?</p>
                                    <span className="register-here" onClick={() => setIsChecked(true)}
                                        style={{ marginTop: 0, color: "#ff5e57", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                                        Register
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="login">
                            <form>
                                <div className="input-group inputBx">
                                    <span>Username</span>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => { setUserName(e.target.value); validateFields("username", e.target.value) }}
                                        onBlur={e => validateFields("username", e.target.value)}
                                        className="inp"
                                        id="username"
                                    />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Email</span>
                                    <input type="text"
                                        onChange={(e) => { setEmail(e.target.value); validateFields("email", e.target.value) }}
                                        value={email} className="inp"
                                        onBlur={e => validateFields("email", e.target.value)}
                                        id="email"
                                    />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Password</span>
                                    <input type="password" value={passWord}
                                        onChange={(e) => { setPassWord(e.target.value); validateFields("password", e.target.value) }}
                                        className="inp"
                                        onBlur={e => validateFields("password", e.target.value)}
                                        id="password"
                                    />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Phone</span>
                                    <input type="text"
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value); validateFields("phone", e.target.value) }}
                                        className="inp"
                                        onBlur={e => validateFields("phone", e.target.value)}
                                        id="phone"
                                    />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <input className="btn-login" type="submit" onClick={(e) => handleRegister(e)} />
                                </div>
                                <div className="inputBx not-have-acc">
                                    <p style={{ marginTop: '5px', marginBottom: 0, marginRight: 12 }}>Already have an account?</p>
                                    <span className="register-here" onClick={() => setIsChecked(false)}
                                        style={{ marginTop: 0, color: "#ff5e57", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                                        Login
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login