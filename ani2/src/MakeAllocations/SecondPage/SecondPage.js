
import React from 'react';
import EffortsGraph from './EffortsGraph'
import SeachChooseTecn from './SearchChooseTecn';
import ProjectCard from './ProjectCard';
import axios from 'axios';



export default function SecondPage({ scenarioInfo, urlBackend, submitDone, scenarioChoosen }) {
  const [selectedTecn, setSelectedTecn] = React.useState(null);
  const [thisAllocation, setThisAllocation] = React.useState({...scenarioInfo["allocations"]});
  
  console.log("Info to render second page")
  console.log(scenarioInfo)
  
  const current_efforts = scenarioInfo["current_efforts"]
  const costsProjs = scenarioInfo["costsProjs"]

 const changeTecn = (projID, oldTecn, newTecn) => {
    let copyAllocation = { ...thisAllocation }
    if (copyAllocation[oldTecn].length === 1){
      delete copyAllocation[oldTecn]
    }
    else{
      copyAllocation[oldTecn] = copyAllocation[oldTecn].filter(number => number  !== projID);
    }
    if (copyAllocation[newTecn] !== undefined){
copyAllocation[newTecn].push(projID)
    }
    else {
copyAllocation[newTecn]= [projID]

    }
    setThisAllocation(copyAllocation )
 }
 
 const saveScenario = (name) => {
  console.log("Save scenario")
axios({
            method: 'put',
            url: `${urlBackend}/saveScenarius`,
            data: {allocation: thisAllocation, projsInfo : costsProjs, scenarioName : name},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(submitDone)
 }
const chooseScenarioToAllocation = () => {
  
axios({
            method: 'put',
            url: `${urlBackend}/chooseScenarioToSave`,
            data: {allocation: thisAllocation, projsInfo : costsProjs, scenarioName : ""},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(scenarioChoosen)
 }
 return (
    <div >
      <EffortsGraph current_efforts={current_efforts} allocations={thisAllocation} costsProjs={costsProjs} />
      <SeachChooseTecn possibilities={Object.keys(thisAllocation)} changeCurrentTecn={setSelectedTecn} saveScenario={saveScenario} chooseScenarioToAllocation={chooseScenarioToAllocation} />
     {
      selectedTecn !== null &&  thisAllocation[selectedTecn] !== undefined && 
        <div className='scrollable'> 
        
          {thisAllocation[selectedTecn].map((projId) => <ProjectCard key={`${selectedTecn}-${projId}`} info={costsProjs[projId]} tecnId={selectedTecn} changeTecn={changeTecn}  possibleTecns={Object.keys(current_efforts).map(String)}/> )}
          </div>
     }

    </div>
  )
}
