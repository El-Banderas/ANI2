
import React, { useEffect, useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DateCard from "./DateCard";

import './SelectDate.scss'
import useGetDates from "./useGetDates";


  /**
   * Component used to display the cards with dates. 
   * Both for projects to be allocated, and to projects already allocated.
   */
export default function SelectDate({ urlBackend, submissionDone, keywordGet }) {

  const nextPage = keywordGet === "get_allocatted_dates" ? "LoadProjectsAllocated" : "MakeAllocations"

  const { dates, scenarioDay } = useGetDates(urlBackend, keywordGet, nextPage)



  return <div >
    {Object.keys(dates).length > 0 ?
      <div className="flexCards">
        {
          dates.map(dateInfo => (<DateCard key={dateInfo[0]} info={dateInfo} onClick={submissionDone} nextPage={nextPage} special={dateInfo[0].split(' ')[0].localeCompare(scenarioDay) === 0} />))
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