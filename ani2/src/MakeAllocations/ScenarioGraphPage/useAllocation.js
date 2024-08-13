import { useState} from "react";

/**
 * Stores the allocation information
 * @param {dict} scenarioInfo 
 * @returns 
 */
export default function useAllocation( scenarioInfo) {

  const [thisAllocation, setThisAllocation] = useState({ ...scenarioInfo["allocations"] });
  
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

  return {thisAllocation, changeTecn}
}