import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import React, { useState } from "react";
import TecnTable from "./TecnTable";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TasksCards from 'TaskPage/TasksCards'
import TextComponentPrimary from "CommonComponents/TextComponents/TextPrimary";
import BarChart from '../CommonComponents/BarGraph/Barchart';
import useGetAllocations from './useGetAllocations';

import CircularProgress from '@mui/material/CircularProgress';
import MyButton from 'CommonComponents/MyButton';
export default function LandPageSearch({ urlBackend }) {

    const tecnsNames = useGetAllocations(urlBackend)

    const [currentArg, setCurrentArg] = useState("");

    const [currentSidePage, setCurrentSidePage] = useState("none");

    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <TextComponentPrimary text={"Nada selecionado"} size={32} fontWeightGiven={"medium"} />


            case "tecn":
                return <>
                    <TecnTable name={currentArg} urlBackend={urlBackend} />
                    <TasksCards name={currentArg} urlBackend={urlBackend} />
                    <BarChart tecnName={currentArg} urlBackend={urlBackend} />
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
        return tecnsNames.sort()
    }


    return (
        <div >
            {
                tecnsNames === undefined ?
                    <div>
                        <h1>Loading</h1>
                        <CircularProgress />
                    </div>
                    :
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
                                <MyButton onClicki={() => getTecn()} text={"Buscar"} />

                            </div>
                        </Stack>
                        {
                            decideSidePannel(currentSidePage)
                        }
                    </div>

            }
        </div>
    )

}