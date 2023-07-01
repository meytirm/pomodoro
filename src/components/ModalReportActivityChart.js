import {useState} from "react";
import {Bar} from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

function ModalReportActivityChart({filter}) {
    const today = moment().format('YYYY-MM-DD')

    const week = moment().subtract('7', 'days').format('YYYY-MM-DD')
    const month = moment().subtract('1', 'month').format('YYYY-MM-DD')
    const year = moment().subtract('12', 'months').format('YYYY-MM-DD')

    const filters = {
        week: {date: week, unit: 'day'},
        month: {date: month, unit: 'day'},
        year: {date: year, unit: 'month'}
    }

    const report = JSON.parse(localStorage.getItem('report'))
    let labels = report.dates.labels
    let chartData = report.dates.data.map(s => s / 60)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            x: {
                type: 'time',
                display: true,
                offset: true,
                min: filters[filter].date,
                max: today,
                time: {
                    unit: filters[filter].unit
                }
            },
        },
    };

    if (filter === 'year') {
        const dataPerMonth = []
        const timePerDay = report.dates.data
        const datePerDay = labels

        let currentMonth = moment(datePerDay[0]).month()
        let currentMonthTotalSeconds = 0
        for (let i = 0; i < timePerDay.length ; i++) {
            if (currentMonth === moment(datePerDay[i]).month()) {
                currentMonthTotalSeconds += timePerDay[i]
            } else {
                currentMonth = moment(datePerDay[i]).month()
                dataPerMonth.push(currentMonthTotalSeconds)
                currentMonthTotalSeconds = 0
            }
        }
        dataPerMonth.push(currentMonthTotalSeconds)


        chartData = dataPerMonth.map(s => s / 60)
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'pomodoro',
                data: chartData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar key={Math.random()} options={options} data={data}/>

    )
}

export default ModalReportActivityChart