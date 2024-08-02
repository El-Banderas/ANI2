
import React, { useState, useEffect } from "react";
import EffortsGraph from './EffortsGraph'
import SeachChooseTecn from './SearchChooseTecn';
import ProjectCard from './ProjectCard';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextComponentPrimary from "../../TextComponents/TextPrimary";

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableProjs from './TableProjs';

export default function SecondPage({ scenarioInfo, urlBackend, scenarioChoosen, goBack }) {
  const [cardsOrTable, setCardsOrTable] = useState(true);
  const [selectedTecn, setSelectedTecn] = useState(null);
  const [thisAllocation, setThisAllocation] = useState({ ...scenarioInfo["allocations"] });
  const totalWorkHours = scenarioInfo["work_hours"];

  const current_efforts = scenarioInfo["current_efforts"]
  const costsProjs = scenarioInfo["costsProjs"]

/*
  useEffect(() => {
    if (selectedTecn !== null && thisAllocation[selectedTecn] !== undefined) {
      chooseCardOrTable()
      
    }
  }, [selectedTecn])
*/
  const switchChanged = (event) => {
    setCardsOrTable(event.target.checked)
  }

  // New Tecn is the name
  const changeTecn = (projID, oldTecn, newTecn) => {
    let copyAllocation = { ...thisAllocation }
    if (copyAllocation[oldTecn].length === 1) {
      delete copyAllocation[oldTecn]
    }
    else {
      copyAllocation[oldTecn] = copyAllocation[oldTecn].filter(number => number !== projID);
    }
    if (copyAllocation[newTecn] !== undefined) {
      copyAllocation[newTecn].push(projID)
    }
    else {
      copyAllocation[newTecn] = [projID]

    }
    setThisAllocation(copyAllocation)
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

  const button = (onClicki, text) => {
    return (
      <Button variant="outlined" onClick={onClicki} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",
      }} ><TextComponentPrimary text={text} size={16} fontWeightGiven={"regular"} /></Button>

    )
  }

  const chooseCardOrTable = () => {
    return cardsOrTable ?   
      <div className='scrollable'>
        {thisAllocation[selectedTecn].map((projId) => <ProjectCard key={`${selectedTecn}-${projId}`} info={costsProjs[projId]} tecnId={selectedTecn} changeTecn={changeTecn} possibleTecns={Object.keys(current_efforts).map(String)} />)}
      </div>
        : 
        <div>
        <TableProjs projsId={thisAllocation[selectedTecn]} info={costsProjs} tecnId={selectedTecn} changeTecn={changeTecn} possibleTecns={Object.keys(current_efforts).map(String)}/>
        </div>
  }

  return (
    <div >
      <EffortsGraph current_efforts={current_efforts} allocations={thisAllocation} costsProjs={costsProjs} totalWorkHours={totalWorkHours} />
      <SeachChooseTecn possibilities={Object.keys(thisAllocation)} changeCurrentTecn={setSelectedTecn} saveScenario={saveScenario} chooseScenarioToAllocation={chooseScenarioToAllocation} />
      {
        selectedTecn !== null && thisAllocation[selectedTecn] !== undefined &&
          chooseCardOrTable()
      }
      <div className='allLeft'>
        {button(goBack, "Voltar atrás")}

        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked onChange={switchChanged} />} label="Tabela" />
        </FormGroup>
      </div>
    </div>
  )
}
