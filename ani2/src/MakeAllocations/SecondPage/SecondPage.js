
import React from 'react';
import EffortsGraph from './EffortsGraph'
import SeachChooseTecn from './SearchChooseTecn';
import ProjectCard from './ProjectCard';



export default function SecondPage({ scenarioInfo }) {
  const [selectedTecn, setSelectedTecn] = React.useState(null);
  const [thisAllocation, setThisAllocation] = React.useState({...scenarioInfo["allocations"]});
  console.log("Info to render second page")
  console.log(scenarioInfo)
  const current_efforts = scenarioInfo["current_efforts"]
  const allocations = scenarioInfo["allocations"]
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

 return (
    <div >
      <EffortsGraph current_efforts={current_efforts} allocations={thisAllocation} costsProjs={costsProjs} />      
      <SeachChooseTecn possibilities={Object.keys(thisAllocation)} changeCurrentTecn={setSelectedTecn} />
     {
      selectedTecn !== null &&  thisAllocation[selectedTecn] !== undefined && 
        <div className='scrollable'> 
        
          {thisAllocation[selectedTecn].map((projId) => <ProjectCard key={`${selectedTecn}-${projId}`} info={costsProjs[projId]} tecnId={selectedTecn} changeTecn={changeTecn}  possibleTecns={Object.keys(current_efforts).map(String)}/> )}
          </div>
     }

    </div>
  )
}
