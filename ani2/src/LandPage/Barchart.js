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
import { useDateTimeField } from "@mui/x-date-pickers/DateTimeField/useDateTimeField";

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



const randomColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

const months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
export default function BarChart({ urlBackend , tecnName }) {

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
        console.log("Wich tecnName")
        const fullurlBackend = tecnName !== undefined ? `${urlBackend}/tecn_effort/?tecn_name='${tecnName}'` : `${urlBackend}/tecns_efforts`
        axios.get(fullurlBackend).then(
            (response) => {
                const cleanAnswer = response['data']['efforts']
                //setProjects([...cleanAnswer, ...cleanAnswer])
                setFullGraphInfo(cleanAnswer)
                const firstYear = cleanAnswer['years'][0]+1
                setCurrentYear(firstYear)
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
           const sumEfforts = value['data'][year].reduce((partialSum, a) => partialSum + a, 0) 
           if ( sumEfforts > 0) {
            datasets1.push({ 'label': key, 'data': value['data'][year], backgroundColor: randomColor() })
           }
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
        const firstYear = fullGraphInfo['years'][0]+1
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
    const title = tecnName !== undefined ? 
        `Esforços do/a técnico/a ${tecnName}` :
        `Esforço dos técnicos ao longo do ano ${currentYearSelected}`
    return <>
        {
            Object.keys(currentInfo).length > 0 ?
                <div className="column ">
                    <div className="barChart">
                        <BarChart2 options={options} data={currentInfo} title={title}/>
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
