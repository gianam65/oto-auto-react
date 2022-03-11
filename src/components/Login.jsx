import { useState } from 'react'
import axios from 'axios'
import { notification, Button } from 'antd'

const Login = () => {
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [passWord, setPassWord] = useState(null)
    const [phone, setPhone] = useState(null)
    const [emailLogin, setEmailLogin] = useState(null)
    const [passwordLogin, setPasswordLogin] = useState(null)
    const [isChecked, setIsChecked] = useState(false)


    function handleRegister(e) {
        e.preventDefault()
        const userData = {
            nameCustomer: userName,
            emailCustomer: email,
            password: passWord,
            phoneCustomer: phone
        }
        axios.post("https://oto-auto.herokuapp.com/customer", userData).then((res) => {
            refreshState()
            notification.open({
                message: "Success",
                description: "Register success",
                duration: 3,
            })
            setIsChecked(false)
        }).catch(err => console.log(err))
    }

    function handleLogin(e) {
        e.preventDefault();
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
        setEmail(null)
        setUserName(null)
        setPassWord(null)
        setPhone(null)
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
                                    <input value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} type="text" placeholder="gianam65@xyz.com" className="inp" />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Password</span>
                                    <input value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} type="password" placeholder="********" className="inp" />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <Button
                                        onClick={(e) => handleLogin(e)}
                                        className="btn-login"
                                        style={{
                                            width: '100%',
                                            padding: '13px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            letterSpacing: '1px'
                                        }}
                                        disabled={emailLogin == null || passwordLogin == null}
                                    >Login</Button>
                                </div>
                                <div className="inputBx not-have-acc" style={{ marginTop: '20px' }}>
                                    <p style={{ marginTop: '5px', marginBottom: 0, marginRight: 10 }}>Don't have an account?</p>
                                    <span className="register-here" onClick={() => setIsChecked(true)}
                                        style={{ marginTop: 0, color: "#ff5e57", cursor: "pointer", fontWeight: 600, fontSize: 16 }}>
                                        Register
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="login">
                            <form>
                                <div className="input-group inputBx">
                                    <span>Username</span>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Ex. abc123" name className="inp" />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Email</span>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="namdev@xyz.com" className="inp" />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Password</span>
                                    <input type="password" placeholder="********" value={passWord} onChange={(e) => setPassWord(e.target.value)} className="inp" />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Phone</span>
                                    <input type="text" placeholder="0123456789" value={phone} onChange={(e) => setPhone(e.target.value)} className="inp" />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <Button
                                        onClick={(e) => handleRegister(e)}
                                        className="btn-login"
                                        style={{
                                            width: '100%',
                                            padding: '13px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            letterSpacing: '1px'
                                        }}
                                        disabled={userName == null || email == null || passWord == null || phone == null}
                                    >Sign Up</Button>
                                </div>
                                <div className="inputBx not-have-acc">
                                    <p style={{ marginTop: '5px', marginBottom: 0, marginRight: 12 }}>Already have an account?</p>
                                    <span className="register-here" onClick={() => setIsChecked(false)}
                                        style={{ marginTop: 0, color: "#ff5e57", cursor: "pointer", fontWeight: 600, fontSize: 16 }}>
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