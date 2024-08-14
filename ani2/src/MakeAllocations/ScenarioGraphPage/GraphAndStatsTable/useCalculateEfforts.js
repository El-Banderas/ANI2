
export default function useCalculateEfforts(workers_ids, old_efforts, costsProjs, allocations) {

   const old_efforts_in_list = workers_ids.map((tecn_id) => old_efforts[tecn_id])

  const getEffortsCurrentAllocation = () => {
    const currsEffort = []
    for (const tecnId of workers_ids) {
      if (allocations[tecnId] !== undefined) {
        let costThisTecn = 0
        for (const projId of allocations[tecnId]) {
          costThisTecn += parseInt(costsProjs[projId]["Esforço"])
        }
        currsEffort.push(costThisTecn)
      }
      else {
        currsEffort.push(0)
      }
    }
    return currsEffort
  }
  // Used to calculate if option of select max is showed or not
  const current_efforts = getEffortsCurrentAllocation()
  const total_efforts = old_efforts_in_list.map(function (num, idx) {
    return num + current_efforts[idx];
  })
 
    const efforts_current_allocation = getEffortsCurrentAllocation()
    
      return {old_efforts_in_list, efforts_current_allocation, total_efforts}

}