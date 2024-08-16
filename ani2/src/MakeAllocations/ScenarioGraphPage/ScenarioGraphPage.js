
import React, { useState, useEffect } from "react";
import EffortsGraph from './GraphAndStatsTable/EffortsGraph'
import SeachChooseTecn from './SearchChooseTecn';
import ProjectCard from 'CommonComponents/ProjectCard/ProjectCard';
import axios from 'axios';


import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableProjs from './TableProjs';
import MyButton from "CommonComponents/MyButton";
import useAllocation from "./useAllocation";

export default function ScenarioGraphPage({ scenarioInfo, urlBackend, scenarioChoosen, goBack }) {
  const [cardsOrTable, setCardsOrTable] = useState(true);
  const [selectedTecn, setSelectedTecn] = useState(null);
  const {thisAllocation, changeTecn} = useAllocation(scenarioInfo)
  const totalWorkHours = scenarioInfo["work_hours"];

  const current_efforts = scenarioInfo["current_efforts"]
  const costsProjs = scenarioInfo["costsProjs"]


  const switchCardOrTableChanged = (event) => {
    setCardsOrTable(event.target.checked)
  }

  

  const saveScenario = (name) => {
    console.log("Save scenario")
    axios({
      method: 'put',
      url: `${urlBackend}/scenarios/saveScenarius`,
      data: { allocation: thisAllocation, projsInfo: costsProjs, scenarioName: name },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(goBack)
  }

  const chooseScenarioToAllocation = () => {
    axios({
      method: 'put',
      url: `${urlBackend}/scenarios/chooseScenarioToSave`,
      data: { allocation: thisAllocation, projsInfo: costsProjs, scenarioName: "" },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(scenarioChoosen)
  }

  const chooseCardOrTable = () => {
    return cardsOrTable ?   
      <div className='scrollable'>
        {thisAllocation[selectedTecn].map((projId) => <ProjectCard key={`${selectedTecn}-${projId}`} info={costsProjs[projId]} tecnId={selectedTecn} changeTecn={changeTecn} possibleTecns={Object.keys(current_efforts).map(String)} chooseTecn={true}/>)}
      </div>
        : 
        <div>
        <TableProjs projsId={thisAllocation[selectedTecn]} costsProjs={costsProjs} tecnId={selectedTecn} changeTecn={changeTecn} possibleTecns={Object.keys(current_efforts).map(String)}/>
        </div>
  }

  return (
    <div >
      <EffortsGraph old_efforts={current_efforts} allocations={thisAllocation} costsProjs={costsProjs} totalWorkHours={totalWorkHours} />
      <SeachChooseTecn possibilities={Object.keys(thisAllocation)} changeCurrentTecn={setSelectedTecn} saveScenario={saveScenario} chooseScenarioToAllocation={chooseScenarioToAllocation} />
      {
        selectedTecn !== null && thisAllocation[selectedTecn] !== undefined &&
          chooseCardOrTable()
      }
      <div className='allLeft'>
        <MyButton text={"Voltar atrás"} onClicki={goBack} />

        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked onChange={switchCardOrTableChanged} />} label="Tabela" />
        </FormGroup>
      </div>
    </div>
  )
}
