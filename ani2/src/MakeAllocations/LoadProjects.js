
import React, {useEffect, useState} from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TableProjects from "./TableProjects";



export default function LoadProjects({urlBackend, submissionDone, date, alreadyAllocated}) {

  useEffect( () => {
    getProjects();
  }, [] );

  const [projectsAndNames, setProjectsAndNames] = useState({})

const getProjects =  () => {
        const fullUrl = alreadyAllocated ? `${urlBackend}/projs_already_allocated` : `${urlBackend}/proj_cost`
        axios.get(fullUrl, {params : {date : date}}).then(
          (response) => {
            console.log("[LOAD PROJECTS] Receubeu resposta")
            const cleanAnswer = response['data']
            console.log(cleanAnswer)
            //setProjects([...cleanAnswer, ...cleanAnswer])
            setProjectsAndNames(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }



    return <div>
{ Object.keys(projectsAndNames).length > 0 ?
            <TableProjects projects={projectsAndNames} urlBackend={urlBackend} submissionDone={submissionDone} unchangedInput={JSON.parse(JSON.stringify(projectsAndNames))} date={date} alreadyAllocated={alreadyAllocated}/>
            :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
}