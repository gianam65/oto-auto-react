import React, { useState } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'

const GoTop = () => {
    const [displayBtn, setDisplayBtn] = useState(false)
    window.addEventListener('scroll', function () {
        const currentHeight = window.pageYOffset
        if (currentHeight > 200) {
            setDisplayBtn(true)
        } else {
            setDisplayBtn(false)
        }
    })
    const handleGoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className={displayBtn ? 'go-to-top active' : 'go-to-top'} onClick={handleGoTop}>
            <button className="go-top-btn">
                <ArrowUpOutlined />
            </button>
        </div>
    )
}

export default GoTop