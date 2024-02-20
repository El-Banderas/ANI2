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

const months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
export default function BarChart2({ data }) {


    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Esforço dos técnicos ao longo do ano',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                title: {
                    display : true,
                    text : "months"
                }
            },
            y: {
                stacked: true,
                title: {
                    display : true,
                    text : "Hours of work"
                }
            },
        },
        maintainAspectRatio: false,
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    return <Bar options={options} data={data} />
}
