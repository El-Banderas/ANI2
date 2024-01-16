
import React, {useEffect, useState} from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TableTecns from "./TableTecns";



export default function LoadTecn({urlBackend, submissionDone}) {

  useEffect( () => {
    getTecn();
  }, [] );

  const [tecns, setTecns] = useState({})

const getTecn =  () => {
        axios.get(`${urlBackend}/tecns`).then(
          (response) => {
            console.log("Receubeu resposta")
            const cleanAnswer = response['data']
            console.log(cleanAnswer)
            //setProjects([...cleanAnswer, ...cleanAnswer])
            setTecns(cleanAnswer["tecns"])
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }



    return <div>
{ Object.keys(tecns).length > 0 ?
            <TableTecns tecns={tecns} urlBackend={urlBackend} submissionDone={submissionDone}/>
            :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
}