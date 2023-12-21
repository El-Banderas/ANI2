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


export default function LandPage({ defaultInput, updateInput }) {

    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");

    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return  <TextComponentPrimary text={"Nada selecionado"} size={32} fontWeightGiven={"medium"} /> 

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
        console.log("Update from excel")
axios.get(`http://127.0.0.1:7999/?removeTecn=nothing`).then(
          (response) => {
            console.log("Change attribution")
            const cleanAnswer = response['data']['input']
            console.log(cleanAnswer)
            updateInput(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
        
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
                        <Button variant="outlined" onClick={() => removeTech()} style={{
                            borderRadius: 10,
                            backgroundColor: "#32DBC4",
                            margin: "0% 0% 1% 0%",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "lighter",
                        }} ><TextComponentPrimary text={"Reload excel"} size={16} fontWeightGiven={"regular"} /></Button>

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
                            gap={{ xs: 3 }}
                        >

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