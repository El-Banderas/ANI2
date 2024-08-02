
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
        const fullUrl = alreadyAllocated ? `${urlBackend}/projs/projs_already_allocated` : `${urlBackend}/projs/proj_cost`
        console.log(fullUrl)
        axios.get(fullUrl, {params : {date : date}}).then(
          (response) => {
            const cleanAnswer = response['data']
            //setProjects([...cleanAnswer, ...cleanAnswer])
            setProjectsAndNames(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }



    return <div>
{ Object.keys(projectsAndNames).length > 0 ?
            <TableProjects projects={projectsAndNames} urlBackend={urlBackend} submissionDone={submissionDone} unchangedInput={JSON.parse(JSON.stringify(projectsAndNames))} date={date} alreadyAllocated={alreadyAllocated} />
            :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
}