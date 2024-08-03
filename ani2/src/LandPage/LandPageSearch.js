import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import React, { useState} from "react";
import TaskPage from "../TaskPage/TaskMain";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TasksCards from '../TaskPage/TasksCards'
import TextComponentPrimary from "../TextComponents/TextPrimary";
import  BarChart from './Barchart';

export default function LandPageChart({ defaultInput, updateInput, urlBackend }) {
    console.log("Default input")
    console.log(defaultInput)
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
                    <TaskPage request_word={"tecns/tecn"} name={currentArg} urlBackend={urlBackend} />
                    <TasksCards name={currentArg} urlBackend={urlBackend} />
                    <BarChart tecnName={currentArg} urlBackend={urlBackend}  />
                </>

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
    const num_tecns = Object.keys(defaultInput["input"]["technicians"]).length
    const maxSlider = num_tecns / (max_graph)
    const currentTecnsNames = Object.entries(defaultInput["input"]["technicians"]).slice(currentselectedTecns * max_graph, currentselectedTecns * max_graph + max_graph).map((pair) => pair[0])
    //const currentTecnsNames = Object.keys(defaultInput["technicians"])

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

                    </div>
                </Stack>
                {
                    decideSidePannel(currentSidePage)
                }
            </div>
        </div>
    )

}