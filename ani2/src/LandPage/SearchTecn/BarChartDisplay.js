import React, { useEffect, useState } from "react";
import axios from 'axios';
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
export default function BarChartDisplay({ data , year}) {
    


    const options = {
        plugins: {
            title: {
                display: true,
                text: `Esforço dos técnicos ao longo do ano ${year}`,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                title: {
                    display : true,
                    text : "Meses"
                }
            },
            y: {
                stacked: true,
                title: {
                    display : true,
                    text : "Horas de trabalho"
                }
            },
        },
        maintainAspectRatio: false,
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    return <Bar options={options} data={data} />
}
