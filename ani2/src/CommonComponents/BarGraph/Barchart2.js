import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './BarGraph.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart2({ data , title}) {
    


    const options = {
        plugins: {
            title: {
                display: true,
                text: title,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                title: {
                    display : true,
                    text : "meses"
                }
            },
            y: {
                stacked: true,
                title: {
                    display : true,
                    text : "horas de trabalho"
                }
            },
        },
        maintainaspectratio: false,
    };

    return <Bar options={options} data={data} />
}
