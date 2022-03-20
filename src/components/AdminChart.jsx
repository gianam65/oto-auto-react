import * as React from 'react';
import { useState } from 'react';
import { Chart } from "react-google-charts";
import { Empty, Radio } from 'antd';
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons'

const AdminChart = (props) => {
    const [selectedView, setSelectedView] = useState('All time')
    const [typeChart, setTypeChart] = useState('Bar')
    const options = {
        chart: {
            title: "Statistics of total revenue by day",
        },
    };
    const data = [
        [
            selectedView,
            "Total revenue",
        ],
        ...groupByTimeAndCountTotal()
    ];

    function customChartDataByDay(type, datas) {
        const today = new Date().toLocaleDateString();
        const unixADayTime = 86400000 // a day;
        let result = datas
        switch (type) {
            case "7days":
                const aWeekAgo2UnixTime = Date.parse(today) - 7 * unixADayTime
                result = datas.filter(data => {
                    return Date.parse(data[0]) <= Date.parse(today) && Date.parse(data[0]) >= aWeekAgo2UnixTime
                })
                break;
            case "30days":
                const aMonthAgo2UnixTime = Date.parse(today) - 30 * unixADayTime
                result = datas.filter(data => {
                    return Date.parse(data[0]) <= Date.parse(today) && Date.parse(data[0]) >= aMonthAgo2UnixTime
                })
                break;
            case "90days":
                const threeMonthAgo2UnixTime = Date.parse(today) - 90 * unixADayTime
                result = datas.filter(data => {
                    return Date.parse(data[0]) <= Date.parse(today) && Date.parse(data[0]) >= threeMonthAgo2UnixTime
                })
                break;
            default:
                result = datas
                break;

        }
        return result
    }

    function groupByTimeAndCountTotal() {
        const groupByTime = props.orders.filter(item => item.statusOrder == "success").reduce(function (acc, curr) {
            if (curr.timeOder) {
                let fromMap = acc.map[curr.timeOder.split("T")[0]];
                if (!fromMap) {
                    acc.map[curr.timeOder.split("T")[0]] = fromMap = {
                        totalPrice: 0,
                        timeOder: curr.timeOder.split("T")[0]
                    }
                    acc.result.push(fromMap);
                }
                fromMap.totalPrice += parseFloat(curr.totalPrice);
            } else {
                acc.result.push(curr);
            }
            return acc;
        }, {
            map: {},
            result: []
        }).result;

        let result = groupByTime.sort((a, b) => {
            return Date.parse(a.timeOder) - Date.parse(b.timeOder) > 0 ? 1 : -1
        }).map(item => {
            return [item.timeOder, item.totalPrice]
        })
        return customChartDataByDay(selectedView, result)
    }

    return (
        <div className="manage-product">
            <span className="title">Statistic profit</span>
            <div className="select-view-wrapper">
                <select style={{ maxWidth: 300 }} onChange={e => setSelectedView(e.target.value)} className="filter-select">
                    <option value={"All time"} className="view-item">All time</option>
                    <option value={"7days"} className="view-item">7 days ago</option>
                    <option value={"30days"} className="view-item">30 days ago</option>
                    <option value={"90days"} className="view-item">90 days ago</option>
                </select>
            </div>
            <Radio.Group onChange={(e) => setTypeChart(e.target.value)} value={typeChart}>
                <Radio value={"Bar"}>
                    <BarChartOutlined style={{ marginRight: 5 }} />
                    Bar chart
                </Radio>
                <Radio value={"LineChart"}>
                    <LineChartOutlined style={{ marginRight: 5 }} />
                    Line chart
                </Radio>
            </Radio.Group>
            {groupByTimeAndCountTotal().length > 0
                ?
                <Chart
                    chartType={typeChart}
                    options={options}
                    data={data}
                    width="100%"
                    height="500px"
                    legendToggle
                />
                :
                <Empty />
            }
        </div>
    )
}

export default AdminChart