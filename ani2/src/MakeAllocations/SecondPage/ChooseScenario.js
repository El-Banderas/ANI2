
import React, { useEffect, useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import ScenarioCard from "./ScenarioCard";


export default function ChooseScenario({ urlBackend, chooseScenario, date, allScenariosDeleted }) {

  useEffect(() => {
    getNamesScenarios();
  }, []);

  const [scenariosNames, setScenariosNames] = useState([])

  const getNamesScenarios = () => {
    axios.get(`${urlBackend}/getScenariosNames`, { params: { date: date } }).then(
      (response) => {
        const cleanAnswer = response['data']['answer']

        setScenariosNames(cleanAnswer)

      }
    ).catch(error => console.error(`Error: ${error}`))
  }
const deleteScenario = (scenarioName) => {

    axios.get(`${urlBackend}/delete_scenario`, { params: { name: scenarioName } }).then(
      () =>
{
  const copyDict= {...scenariosNames}
   delete copyDict[scenarioName]
  setScenariosNames(copyDict)
  if (Object.keys(copyDict).length === 0) allScenariosDeleted()
    }    ).catch(error => console.error(`Error: ${error}`))
  }
  return (
    <div >

      {
        scenariosNames.length === 0 && <div> <h1>Loading</h1> <CircularProgress /> </div>
      }
      {
        Object.keys(scenariosNames).length > 0 &&
        <div className="horizontalFlex">
          {Object.entries(scenariosNames)
            .map(([scenarioName, metrics]) => <ScenarioCard key={scenarioName} info={scenarioName} setScenario={chooseScenario} metrics={metrics} deleteScenario={deleteScenario}/> )}
        </div>
      }

    </div>
  )
}
