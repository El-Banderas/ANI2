import ManyTechsGraph from "./ManyTechsGraph";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import axios from 'axios';
import React, { useState, useRef } from "react";
import TaskPage from "../TaskPage/TaskMain";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TechHoliday from "../TechHoliday/TechHoliday";
import NavBar from "../NavBar/Navbar";
import TasksCards from '../TaskPage/TasksCards'
import TextComponentPrimary from "../TextComponents/TextPrimary";
import StatsTable from "./StatsTable";
import SelectTecns from "./selectTecns";
import  BarChart  from "./Barchart";

export default function LandPageChart({ defaultInput, updateInput, urlBackend }) {

    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");
    const [currentselectedTecns, setCurrentSelectedTecns] = useState(0);

    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <TextComponentPrimary text={"Nada selecionado"} size={32} fontWeightGiven={"medium"} />

            case "task":
                return <TaskPage request_word={"proj"} name={currentArg} urlBackend={urlBackend} />

            case "tecn":
                return <>
                    <TaskPage request_word={"tecn"} name={currentArg} urlBackend={urlBackend} />
                    <TasksCards name={currentArg} urlBackend={urlBackend} />
                </>

            case "tecnHoliday":
                return <TechHoliday techName={getCurrentSelectedTech()} />
            default:
                return <div>Default</div>

        }
    }


    const getCurrentSelectedTech = () => {

        const element = document.getElementById("selectTecn");
        return element.value
    }

    const getTecn = async () => {
        console.log("GET tecn")
        setCurrentArg(getCurrentSelectedTech())

        setCurrentSidePage("tecn")
    }

    const tecNames = () => {
        return Object.keys(defaultInput["input"]["technicians"]).sort()
    }

    const max_graph = 5
    //const currentTecnsNames = Object.keys(defaultInput["technicians"])

    return (
        <div >
            {/**Caso dê problemas, remover o everything */}
            <div className="everything">

                <BarChart urlBackend={urlBackend} tecnName={undefined}/>
            </div>
        </div>
    )

}