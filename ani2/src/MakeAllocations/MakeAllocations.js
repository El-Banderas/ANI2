
import React, { useEffect, useState } from "react";
import axios from 'axios';

import LoadProjects from 'CommonComponents/ProjectsTable/LoadProjects';
import Stepper from 'MakeAllocations/MyStepper';
import './LoadProjects.scss'
import ChooseScenario from "./SelectScenario/ChooseScenario";
import ScenarioGraphPage from "./ScenarioGraphPage/ScenarioGraphPage";

/**
 * After the "SelectDate" panel, the user gets this component, where he can start making an allocation.
 * @param {function} submissionDone When the user selects a scenario, this function is called to change the page to the graph with all workers. 
 * @returns 
 */
export default function MakeAllocations({ urlBackend, date, submissionDone }) {
  const [activeStep, setActiveStep] = useState(0);
  const [argLastPage, setArgLastPage] = useState(null);

  useEffect(() => {
    projectsPageOrScenariosPage();
  }, []);

  /**
   * This function checks if the current day is the one selected in the DB.
   * If the analysed day is equal to the DB day, then the website goes directly to the scenarios page.
   * Otherwise, it will present the projects efforts, to be changed.
   */
  const projectsPageOrScenariosPage = () => {
    console.log(`${urlBackend}/scenarios/scenarioDay`)
    axios.get(`${urlBackend}/scenarios/scenarioDay`).then(
      (response) => {
        const scenarioDAY = response['data']['answer']
        const specialFirstPage = scenarioDAY.localeCompare(date.split(' ')[0]) === 0 ? 1 : 0
        setActiveStep(specialFirstPage)
        //setIsSpecial(scenarioDAY)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) console.log("[MakeAllcoation] This message should not appear.");
    else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };


  const chooseScenario = (scenarioName) => {
    console.log("[STEPPER] Choose scenario")
    console.log(scenarioName)
    console.log(`${urlBackend}/scenarios/get_scenario`)
    axios.get(`${urlBackend}/scenarios/get_scenario`, { params: { name: scenarioName, date: date } }).then(
      (response) => {
        const stuff = response['data']
        setArgLastPage(stuff)
        setActiveStep(2)
      }
    ).catch(error => console.error(`Error: ${error}`))

  }

  const chooseContent = () => {
    if (activeStep === 0) return <LoadProjects urlBackend={urlBackend} submissionDone={handleNext} date={date} alreadyAllocated={false}  />
    if (activeStep === 1) return <ChooseScenario urlBackend={urlBackend} chooseScenario={chooseScenario} date={date} allScenariosDeleted={handleBack}/>
    if (activeStep === 2) return <ScenarioGraphPage scenarioInfo={argLastPage} urlBackend={urlBackend}  scenarioChoosen={submissionDone} goBack={handleBack} />
  }


  return <div className='stepperContainer'>
  <Stepper activeStep={activeStep} />
    {chooseContent()}
  </div>
}