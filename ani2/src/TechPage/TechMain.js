import './TechnicianMain.scss'
import TextField from '@mui/material/TextField';
import ProjectScroll from './ProjectsScroll'
import React, {useEffect, useState} from "react";
import axios from 'axios';

export default function TechMain({ name}) {

  const [info, setInfo] = useState({ })
  useEffect( () => {
    getTaskInfo();
  }, [] );

const getTaskInfo =  () => {
        console.log("GET proj initial attris")
        console.log(name)
        const regexpSize = /([0-9]+)/;
        const match = name.match(regexpSize);
        console.log(match[0])
        axios.get(`http://localhost:7999/?proj=${match[0]}`).then(
          (response) => {
            console.log("Receubeu resposta")
            const cleanAnswer = response['data']
            console.log(cleanAnswer)
            setInfo(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }

    console.log("Info loaded")
    console.log(info)

    return (
        <div className='verticalFlex'>
            <div className="nameLine ">

                <div className='nameTec'> Olá {name}</div>
                <div className='caixaAvisos'>

                    <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Avisos"
                        defaultValue="- Acho que a nossa aplicação não devia ter avisos..."
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
            </div>
            <div className='projectLine '>
                {/*<ProjectScroll name={"Projetos alocados"} listTasks={[...listTasks, ...listTasks, ...listTasks]} />*/}
                <ProjectScroll name={"Projetos alocados"} listTasks={["A", "B", "C"]} />
                <ProjectScroll name={"Projetos Concluidos"} listTasks={["D", "D"]} />

            </div>
        </div>
    )
}