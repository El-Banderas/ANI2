
import React, {useEffect, useState} from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import ScenarioCard from "./ScenarioCard";


export default function ChooseScenario({ urlBackend, chooseScenario }) {
  
  useEffect( () => {
    getNamesScenarios();
  }, [] );

  const [scenariosNames, setScenariosDays] = useState([])

const getNamesScenarios =  () => {
axios.get(`${urlBackend}/getScenariosNames`).then(
          (response) => {
            const cleanAnswer = response['data']['answer']

          setScenariosDays(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
}
 return (
    <div >

     {
      scenariosNames.length === 0 &&   <div> <h1>Loading</h1> <CircularProgress /> </div>
     }
     {
      scenariosNames.length > 0 &&  
        <div className="horizontalFlex"> 
          {scenariosNames.map((scenarioName) => <ScenarioCard key={scenarioName} info={scenarioName} setScenario={chooseScenario} /> )}
          </div>
     }

    </div>
  )
}
