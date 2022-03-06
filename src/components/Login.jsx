import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [passWord, setPassWord] = useState(null)
    const [phone, setPhone] = useState(null)


    function handleRegister(e) {
        e.preventDefault()
        const userData = {
            userName,
            email,
            passWord,
            phone
        }
        axios.post("https://oto-auto.herokuapp.com/customer", { userData }).then((res) => {
            if (res.status == 200) {
                localStorage.setItem('customer-infor', JSON.stringify(res.data.data))
                refreshState()
            }
        }).catch(err => console.log(err))
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
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <div className="box">
                        <div className="logo">
                            <img src="../../assets/img/batmanlogo.png" alt="" />
                        </div>
                        <input type="checkbox" className="toggle-btn" name />
                        <div className="signup">
                            <form action method>
                                <div className="input-group inputBx">
                                    <span>Email</span>
                                    <input type="text" placeholder="gianam65@xyz.com" className="inp" />
                                </div>
                                <div className="input-group inputBx">
                                    <span>Password</span>
                                    <input type="password" placeholder="********" className="inp" />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <input type="submit" defaultValue="Login" />
                                </div>
                                <div className="inputBx" style={{ marginTop: '20px' }}>
                                    <p style={{ marginTop: '5px' }}>Don't have an account?</p>
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
                                    <input type="submit" defaultValue="Sign Up" onClick={(e) => handleRegister(e)} />
                                </div>
                                <div className="inputBx">
                                    <p style={{ marginTop: '5px' }}>Already have an account?</p>
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