
import { useState, useEffect } from "react";
import axios from 'axios';

export default function useGetDates(urlBackend, keywordGet, nextPage) {


  const [dates, setDates] = useState([])
  const [scenarioDay, setScenarioDay] = useState("")

  const getDates = () => {
    console.log(`${urlBackend}/dates/${keywordGet}`)
    axios.get(`${urlBackend}/dates/${keywordGet}`).then(
      (response) => {
        const cleanAnswer = response['data']['input']
        const scenarioDAY = response['data']['dayScenario']

        //setProjects([...cleanAnswer, ...cleanAnswer])
        setDates(cleanAnswer, nextPage)
        setScenarioDay(scenarioDAY)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }

  useEffect(() => {
    getDates();
  }, [] );

  return { dates, scenarioDay };
}