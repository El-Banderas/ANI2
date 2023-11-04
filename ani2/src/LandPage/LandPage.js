import ManyTechsGraph from "./ManyTechsGraph";
import TechMain from "../TechPage/TechMain"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState, useRef } from "react";
import TaskPage from "../TaskPage/TaskMain";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TechHoliday from "../TechHoliday/TechHoliday";


export default function LandPage({ defaultInput }) {

    const [input, setInput] = useState(defaultInput);
    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");
    let fileRef = useRef();

    const runAllocation = () => {
        setCurrentSidePage("allocation")
    }

    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <div>Nothing selected</div>

            case "allocation":
                return <div>Correr alocação</div>
            case "task":
                return <TaskPage request_word={"proj"} name={currentArg} />

            case "tecn":
                return <TaskPage request_word={"tecn"} name={currentArg} />
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
        <div>
            <h1>Land page 2</h1>
            <div className="line">

                <ManyTechsGraph className="tabelTecs" input={defaultInput} setCurrentSidePage={setCurrentSidePage} setCurrentArg={setCurrentArg} />
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                    className="btnsColumn"
                >
                    <Button variant="outlined" onClick={() => runAllocation()}>Correr alocação</Button>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            className="getTecn"
                        >
                            <Button variant="outlined" onClick={() => getTecn()}>Get Tecn</Button>
                            <Autocomplete
                                disablePortal
                                id="selectTecn"
                                options={tecNames()}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Técnico" />}
                            />
                        </Stack>
                    <Button variant="outlined" onClick={() => removeTech()}>Remover técnico</Button>
                    <Button variant="outlined" onClick={() => techHoliday()}>Técnico férias</Button>
                    <Button variant="outlined" onClick={() => runAllocation()}>
                    TODO: Trocar projetos 
                    </Button>

                </Stack>
            </div>
            {
                decideSidePannel(currentSidePage)
            }
        </div>
    )

}