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
import BarChart2 from './Barchart2';
import './BarGraph.scss';
import TextComponentPrimary from "../TextComponents/TextPrimary";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

const months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
export function BarChart({ urlBackend }) {

    const [fullGraphInfo, setFullGraphInfo] = useState({})
    const [currentInfo, setCurrentInfo] = useState({})
    const [currentYearSelected, setCurrentYear] = useState(0)
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (Object.keys(currentInfo).length > 0) {
            const tempInfo = {
                "labels": months,
                "datasets": filterInfoByYear(currentYearSelected, fullGraphInfo['info'])
            }
            setCurrentInfo(tempInfo)
        }
    }, [currentYearSelected]);

    const getData = () => {
        const fullUrl = `${urlBackend}/tecns_efforts`
        axios.get(fullUrl).then(
            (response) => {
                console.log("[BAR CHART] Receubeu resposta")
                const cleanAnswer = response['data']['efforts']
                //setProjects([...cleanAnswer, ...cleanAnswer])
                setFullGraphInfo(cleanAnswer)
                const firstYear = cleanAnswer['years'][0]
                setCurrentInfo(firstYear)
                const tempInfo = {
                    "labels": months,
                    "datasets": filterInfoByYear(firstYear, cleanAnswer['info'])
                }
                setCurrentInfo(tempInfo)
            }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }

    const filterInfoByYear = (year, fullData) => {
        const datasets1 = []
        for (const [key, value] of Object.entries(fullData)) {
            datasets1.push({ 'label': key, 'data': value['data'][year] })
        }
        return datasets1
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };




    const changeSelectedYear = (event, new_value) => {
        setCurrentYear(new_value)
    }

    const MySliderYears = () => {
        const firstYear = fullGraphInfo['years'][0]
        const lastYear = fullGraphInfo['years'][fullGraphInfo['years'].length - 1]
        return <div className="MySlider">
            <TextComponentPrimary text={"Selecione o ano:"} size={20} fontWeightGiven={"bold"} />
            <Slider
                aria-label="Conjunto técnicos"
                defaultValue={currentYearSelected}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={firstYear}
                max={lastYear}
                onChangeCommitted={changeSelectedYear}
            />
        </div>
    }
    //return <Bar options={options} data={data} />
    return <>
        {
            Object.keys(currentInfo).length > 0 ?
                <div className="column ">
                    <div className="barChart">
                        <BarChart2 options={options} data={currentInfo} />
                    </div>
                    <MySliderYears />
                </div>
                :

                <div>
                    <h1>Loading</h1>
                    <CircularProgress />
                </div>
        }
    </>
}