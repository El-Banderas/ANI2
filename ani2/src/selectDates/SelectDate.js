
import React, {useEffect, useState} from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DateCard from "./DateCard";

import './SelectDate.scss'


export default function SelectDate({urlBackend, submissionDone}) {

  useEffect( () => {
    getDates();
  }, [] );

  const [dates, setDates] = useState([])

const getDates =  () => {
        axios.get(`${urlBackend}/get_allocation_dates`).then(
          (response) => {
            const cleanAnswer = response['data']['input']
            console.log("[Get dates] Answer")
            console.log(cleanAnswer)

            //setProjects([...cleanAnswer, ...cleanAnswer])
            setDates(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }



    return <div >
{ Object.keys(dates).length > 0 ?
          <div className="flexCards">
          {
            dates.map(dateInfo => (<DateCard key={dateInfo[0]} info={dateInfo} onClick={submissionDone} />))
          }
          </div>
            :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
}