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
import Slider from '@mui/material/Slider';
import StatsTable from "./StatsTable";
import LineGraph from "./LineGraph";


export default function LandPage({ defaultInput, updateInput, urlBackend }) {

    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");
    const [currentselectedTecns, setCurrentSelectedTecns] = useState(0);

    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <TextComponentPrimary text={"Nada selecionado"} size={32} fontWeightGiven={"medium"} />

            case "task":
                return <TaskPage request_word={"proj"} name={currentArg} urlBackend={urlBackend}/>

            case "tecn":
                return <>
                    <TaskPage request_word={"tecn"} name={currentArg} urlBackend={urlBackend}/>
                    <TasksCards name={currentArg} urlBackend={urlBackend}/>
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
    const removeTech = async () => {
        console.log("Update from excel")
        axios.get(`http://127.0.0.1:7999/?removeTecn=nothing`).then(
            (response) => {
                console.log("Change attribution")
                const cleanAnswer = response['data']//['input']
                console.log(cleanAnswer)
                updateInput(cleanAnswer)
            }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')

    }

    const tecNames = () => {
        return Object.keys(defaultInput["input"]["technicians"])
    }
    function valuetext(value) {
        return `From ${value} to ${value + 5}`;
    }

    const max_graph = 5
    const num_tecns = Object.keys(defaultInput["input"]["technicians"]).length
    const maxSlider = num_tecns / (max_graph)
    const currentTecnsNames = Object.entries(defaultInput["input"]["technicians"]).slice(currentselectedTecns * max_graph, currentselectedTecns * max_graph + max_graph).map((pair) => pair[0])
    //const currentTecnsNames = Object.keys(defaultInput["technicians"])
    const changeCurrentTecn = (event, new_value) => {
        setCurrentSelectedTecns(new_value)

    }

    return (
        <div >

            {/**Caso dê problemas, remover o everything */}
            <div className="everything">
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={2}
                    className="getTecn"

                >

                    <TextComponentPrimary text={"Selecione o técnico"} size={20} fontWeightGiven={"bold"} />
                    <div className="rowButtons">
                        <Autocomplete
                            disablePortal
                            id="selectTecn"
                            options={tecNames()}
                            sx={{ width: 600 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant="outlined" onClick={() => getTecn()} style={{
                            borderRadius: 10,
                            backgroundColor: "#32DBC4",
                            margin: "0% 0% 1% 0%",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "lighter",
                        }} ><TextComponentPrimary text={"Buscar"} size={16} fontWeightGiven={"regular"} /></Button>
                        <Slider
                            aria-label="Conjunto técnicos"
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={maxSlider - 1}
                            onChangeCommitted={changeCurrentTecn}
                        />
                    </div>
                </Stack>


                <div className="line">

                    {/*
                    <ManyTechsGraph  input={defaultInput["input"]} setCurrentSidePage={setCurrentSidePage} setCurrentArg={setCurrentArg} tecnsNames={currentTecnsNames} />
                    <div className="stats"><StatsTable input={defaultInput["stats"]}/></div>
*/}
<LineGraph />
                    
                </div>
                {
                    decideSidePannel(currentSidePage)
                }
            </div>
        </div>
    )

}