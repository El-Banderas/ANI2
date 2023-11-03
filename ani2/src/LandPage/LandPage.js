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


export default function LandPage({ defaultInput }) {

    const [input, setInput] = useState(defaultInput);
    const [currentArg, setCurrentArg] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");
    let fileRef = useRef();

    const readFile = event => {
        const fileReader = new FileReader();
        const { files } = event.target;

        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
            const content = e.target.result;
            console.log("SET INPUT Land page")
            console.log(JSON.parse(content)["input"])
            setInput(JSON.parse(content)["input"]);
        };
    };


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
            default:
                return <div>Default</div>

        }
    }


    const getTecn = async () => {
        console.log("GET tecn")
        const element = document.getElementById("selectTecn");
        console.log(element)
        console.log(element.value)
        //axios.get('http://localhost:7999/')
        //const res = await axios.get('http://localhost:7999/?tecn=aaa&tecn=bbb');
        const res = await axios.get(`http://localhost:7999/?tecn=${element.value}`);
        console.log(res['data'])
        setCurrentArg(res['data'])

            setCurrentSidePage("tecn")

    }
    const getProj = async () => {
        console.log("GET localhost")
        //axios.get('http://localhost:7999/')
        const res = await axios.get('http://localhost:7999/?proj=1');
        console.log(res['data'])
    }
    const getHello = async () => {
        //axios.get('http://localhost:7999/')
        const res = await axios.get('http://localhost:7999/?attri=aa');
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
                    <div>
                        <Button variant="outlined" onClick={() => getTecn()}>Get Tecn</Button>
                        <Autocomplete
                            disablePortal
                            id="selectTecn"
                            options={tecNames()}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Técnico" />}
                        />
                    </div>
                    <Button variant="outlined" onClick={() => getProj()}>Get Proj</Button>
                    <Button variant="outlined" onClick={() => getHello()}>Get Hello</Button>
                    <Button variant="outlined" onClick={() => runAllocation()}>
                        Outra coisa
                    </Button>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                        Adicionar ficheiro com input
                        <VisuallyHiddenInput type="file" ref={fileRef} onChange={readFile} onClick={() => fileRef.current.click()} />
                    </Button>

                </Stack>
            </div>
            {
                decideSidePannel(currentSidePage)
            }
        </div>
    )

}