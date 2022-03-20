import * as React from 'react';
import { Chart } from "react-google-charts";

const AdminChart = (props) => {
    const options = {
        chart: {
            title: "Statistics of total revenue by day",
            subtitle: "Sales and Profit: 2022",
        },
    };
    const data = [
        [
            "Day",
            "Total revenue",
        ],
        ...groupByTimeAndCountTotal()
    ];

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
        return result
    }

    return (
        <Chart
            chartType="Bar"
            options={options}
            data={data}
            width="100%"
            height="500px"
            legendToggle
        />
    )
}

export default AdminChart