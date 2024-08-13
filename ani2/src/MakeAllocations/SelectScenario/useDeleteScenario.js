import axios from 'axios';

export default function useDeleteScenario( urlBackend, scenariosNames, setScenariosNames, allScenariosDeleted ) {
  const deleteScenario = (scenarioName) => {
    console.log(`${urlBackend}/scenarios/delete_scenario`)
    axios.get(`${urlBackend}/scenarios/delete_scenario`, { params: { name: scenarioName } }).then(
      () => {
        const copyDict = { ...scenariosNames }
        delete copyDict[scenarioName]
        setScenariosNames(copyDict)
        if (Object.keys(copyDict).length === 0) allScenariosDeleted()
      }).catch(error => console.error(`Error: ${error}`))
  }
  return {deleteScenario}
}