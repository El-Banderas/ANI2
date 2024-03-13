
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

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

 const changeTecn = (projID, oldTecn, newTecn) => {
    let copyAllocation = { ...thisAllocation }
    if (copyAllocation[oldTecn].length === 1){
      delete copyAllocation[oldTecn]
    }
    else{
      copyAllocation[oldTecn] = removeItemOnce(copyAllocation[oldTecn], projID)
    }
    if (copyAllocation[newTecn] !== undefined){
      console.log("Why no add")
      console.log(copyAllocation[newTecn])
copyAllocation[newTecn].push(projID)
      console.log(copyAllocation[newTecn])
      console.log(copyAllocation[newTecn])
    }
    else {
copyAllocation[newTecn]= [projID]

    }
    setThisAllocation(old => ({ ...copyAllocation }))
 }

 return (
    <div >
      <EffortsGraph current_efforts={current_efforts} allocations={thisAllocation} costsProjs={costsProjs} />      
      <SeachChooseTecn possibilities={Object.keys(thisAllocation)} changeCurrentTecn={setSelectedTecn} />
     {
      selectedTecn !== null &&  thisAllocation[selectedTecn] !== undefined && 
        <div className='scrollable'> 
        
          {thisAllocation[selectedTecn].map((projId) => <ProjectCard key={`${selectedTecn}-${projId}`} info={costsProjs[projId]} tecnId={selectedTecn} changeTecn={changeTecn}  possibleTecns={Object.keys(current_efforts)}/> )}
          </div>
     }

    </div>
  )
}
