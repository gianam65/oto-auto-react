import React from 'react'
import { Line } from '@ant-design/charts'

const AdminChart = (props) => {
    // function handleGetDataStatistic() {

    // }
    console.log(props.orders)
    let test = props.orders.map(item => {
        const timeStamp = item.timeOder.split("T")[0]
        return { time: timeStamp, value: item.totalPrice }
    })
    console.log(test)

    const data = test;

    const config = {
        data,
        // width: 800,
        // height: 400,
        autoFit: false,
        xField: 'time',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    return (
        <Line {...config} />
    )
}

export default AdminChart