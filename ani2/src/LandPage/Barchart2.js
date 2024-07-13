import React, { useEffect, useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import Slider from '@mui/material/Slider';
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dec"]
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
