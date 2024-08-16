
import React, { useEffect, useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import TableProjects from "./TableProjects";


/**
 * Gather information, to send to TableProjects component.
 * 
 * @param {boolean} alreadyAllocated If the projects are already allocated or not (to have the effort input or not). 
 * @returns 
 */
export default function LoadProjects({ urlBackend, submissionDone, date, alreadyAllocated }) {


  const [projectsAndNames, setProjectsAndNames] = useState({})

  useEffect(() => {
    const fullUrl = alreadyAllocated ? `${urlBackend}/projs/projs_already_allocated` : `${urlBackend}/projs/proj_cost`
    console.log(fullUrl)
    axios.get(fullUrl, { params: { date: date } }).then(
      (response) => {
        const cleanAnswer = response['data']
        //setProjects([...cleanAnswer, ...cleanAnswer])
        setProjectsAndNames(cleanAnswer)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }, [alreadyAllocated, date, urlBackend]);

  return <div>
    {Object.keys(projectsAndNames).length > 0 ?
      <TableProjects projects={projectsAndNames} urlBackend={urlBackend} submissionDone={submissionDone} unchangedInput={projectsAndNames} date={date} alreadyAllocated={alreadyAllocated} />
      :
      <div>
        <h1>Loading</h1>
        <CircularProgress />
      </div>
    }
  </div>
}