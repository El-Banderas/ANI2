import CircularProgress from '@mui/material/CircularProgress';

import ScenarioCard from "./ScenarioCard";
import useGetScenario from "./useGetScenario";
import useDeleteScenario from './useDeleteScenario';

/**
 * Panel with all scenarios cards
 * @param {function} chooseScenario Changes the current page to the graph, and makes the get request. 
 * @param {function} allScenariosDeleted Function called when all scenarios are deleted, switching to the previous page (projects efforts definition)
 * @returns 
 */
export default function ChooseScenario({ urlBackend, chooseScenario, date, allScenariosDeleted }) {

// To get scenarios, and delete them.
const {scenariosNames, setScenariosNames} = useGetScenario(urlBackend, date)
const {deleteScenario} = useDeleteScenario(urlBackend, scenariosNames, setScenariosNames, allScenariosDeleted)

  
  return (
    <div >
      {
        scenariosNames.length === 0 && <div> <h1>Loading</h1> <CircularProgress /> </div>
      }
      {
        Object.keys(scenariosNames).length > 0 &&
        <div className="horizontalFlex">
          {Object.entries(scenariosNames)
            .map(([scenarioName, metrics]) => <ScenarioCard key={scenarioName} info={scenarioName} setScenario={chooseScenario} metrics={metrics} deleteScenario={deleteScenario} />)}
        </div>
      }

    </div>
  )
}
