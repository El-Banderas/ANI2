import axios from 'axios';
import { useEffect, useState } from "react";

export default function useGetScenario( urlBackend, date ) {
  
const [scenariosNames, setScenariosNames] = useState([])

  const getNamesScenarios = () => {
    console.log(`${urlBackend}/scenarios/getScenariosNames`)
    axios.get(`${urlBackend}/scenarios/getScenariosNames`, { params: { date: date } }).then(
      (response) => {
        const cleanAnswer = response['data']['answer']

        setScenariosNames(cleanAnswer)

      }
    ).catch(error => console.error(`Error: ${error}`))
  }
  
  useEffect(() => {
    getNamesScenarios();
  }, []);

  return {scenariosNames, setScenariosNames}
}