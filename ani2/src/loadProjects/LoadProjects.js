
import React, {useEffect, useState} from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TableProjects from "./TableProjects";



export default function LoadProjects({urlBackend, submissionDone}) {

  useEffect( () => {
    getProjects();
  }, [] );

  const [projects, setProjects] = useState({})

const getProjects =  () => {
        axios.get(`${urlBackend}/proj_cost`).then(
          (response) => {
            console.log("Receubeu resposta")
            const cleanAnswer = response['data']
            console.log(cleanAnswer)
            //setProjects([...cleanAnswer, ...cleanAnswer])
            setProjects(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }



    return <div>
{ Object.keys(projects).length > 0 ?
            <TableProjects projects={projects} urlBackend={urlBackend} submissionDone={submissionDone}/>
            :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
}