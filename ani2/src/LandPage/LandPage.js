import ManyTechsGraph from "./ManyTechsGraph";
import TechMain from "./../TechnicianPage/TechnicianMain"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState, useRef } from "react";

export default function LandPage({ defaultInput }) {

    const [input, setInput] = useState(defaultInput);
    const [currentTech, setCurrentTech] = useState("");
    const [currentSidePage, setCurrentSidePage] = useState("none");
    let fileRef = useRef();

    const readFile = event => {
        const fileReader = new FileReader();
        const { files } = event.target;

        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
            const content = e.target.result;
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
    const getTasksTech = (name) => {
        const tasksTech = input["technicians"][name]
        const res = []
        for (let task of tasksTech) {
            const lengthTask = input["tasks"][task]
            res.push([task, lengthTask])
        }
        return res
    }
    const decideSidePannel = (currentState) => {
        switch (currentState) {
            case "none":
                return <div>Nothing selected</div>

            case "allocation":
                return <div>Correr alocação</div>
            case "tech":
                return <TechMain name={currentTech} listTasks={getTasksTech(currentTech)} />
            default:
                return <div>Default</div>

        }
    }

    const localhostGET = async () => {
        console.log("GET localhost")
        //axios.get('http://localhost:7999/')
        const res = await axios.get('http://localhost:7999/');
        console.log(res['data'])
    }

    return (
        <div>
            <h1>Land page 2</h1>
            <div className="line">

                <ManyTechsGraph className="tabelTecs" input={input} setCurrentSidePage={setCurrentSidePage} setCurrentTech={setCurrentTech} />
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                    className="btnsColumn"
                >
                    <Button variant="outlined" onClick={() => runAllocation()}>Correr alocação</Button>
                    <Button variant="outlined" onClick={() => localhostGET()}>Get Localhost</Button>
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