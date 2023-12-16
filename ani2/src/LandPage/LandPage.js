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


export default function LandPage({ defaultInput }) {

    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");


    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <h2>Nada selecionado</h2>

            case "task":
                return <TaskPage request_word={"proj"} name={currentArg} />

            case "tecn":
                return <>
                <TaskPage request_word={"tecn"} name={currentArg} /> 
                <TasksCards name={currentArg} />
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
        console.log("GET localhost")
        //axios.get('http://localhost:7999/')
        const res = await axios.get(`http://localhost:7999/?removeTecn=${getCurrentSelectedTech()}`);
        console.log(res['data'])
    }
    const techHoliday = async () => {
        //axios.get('http://localhost:7999/')

        setCurrentArg(getCurrentSelectedTech())
        setCurrentSidePage("tecnHoliday")
    }

    const tecNames = () => {
        return Object.keys(defaultInput["technicians"])
    }

    return (
        <div >

            <NavBar />
            {/**Caso dê problemas, remover o everything */}
            <div className="everything">
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={2}
                    className="getTecn"

                >
                    <h3 className="selectTecn">Selecione o técnico</h3>
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
                            margin: "1% 0% 1% 0%",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "lighter",
                        }} >Buscar</Button>
                    </div>
                </Stack>


                <div className="line">

                    <ManyTechsGraph input={defaultInput} setCurrentSidePage={setCurrentSidePage} setCurrentArg={setCurrentArg} />
                    <div className="btnsColumn">
                        <Stack
                            justifyContent="space-evenly"
                            alignItems="center"
                            direction={{ xs: 'column' }}
                            spacing={{ xs: 10 }}
                            gap={{xs: 3}}
                        >

                            <Button variant="outlined" onClick={() => removeTech()} style={{
                            borderRadius: 10,
                            backgroundColor: "#32DBC4",
                            margin: "1% 0% 1% 0%",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "lighter",
                        }}fullWidth>Reload excel</Button>
                            <Button variant="outlined" onClick={() => techHoliday()} style={{
                            borderRadius: 10,
                            backgroundColor: "#32DBC4",
                            margin: "1% 0% 1% 0%",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "lighter",
                        }} fullWidth>Técnico férias</Button>

                        </Stack>
                    </div>
                </div>
                {
                    decideSidePannel(currentSidePage)
                }
            </div>
        </div>
    )

}