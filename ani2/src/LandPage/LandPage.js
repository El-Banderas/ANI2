import ManyTechsGraph from "./ManyTechsGraph";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState, useRef } from "react";

export default function LandPage({ input }) {
 const [fileContent, setFileContent] = useState("");
  let fileRef = useRef();

  const readFile = event => {
    const fileReader = new FileReader();
    const { files } = event.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = e => {
      const content = e.target.result;
      console.log("INPUT?")
      console.log(content);
      setFileContent(JSON.parse(content));
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

    return (
        <div>
            <h1>Land page 2</h1>
            <div className="line">

                <ManyTechsGraph className="tabelTecs" input={input} />
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                    className="btnsColumn"
                >
                    <Button variant="outlined">Correr alocação</Button>
                    <Button variant="outlined" href="#outlined-buttons">
                        Adicionar Projeto
                    </Button>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                        Adicionar ficheiro com input
                        <VisuallyHiddenInput type="file" ref={fileRef} onChange={readFile} onClick={()=>fileRef.current.click()}/>
                    </Button>

                </Stack>
            </div>
            <h1>Input possível</h1>
            <div>{JSON.stringify(fileContent)}</div>
        </div>
    )

}