
import React, { useEffect, useState } from "react";
import LoadProjects from './LoadProjects';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './LoadProjects.scss'
import TextComponentPrimary from "../TextComponents/TextPrimary";
import SecondPage from './SecondPage/SecondPage';
import axios from 'axios';
import ChooseScenario from "./SecondPage/ChooseScenario";

const steps = ['Alterar esforços de projetos', 'Escolher cenário', 'Comparar alocações', 'Alocação submetida!'];

export default function MyStepper({ urlBackend, selectDatePage, date, alreadyAllocated, submissionDone }) {
  const [activeStep, setActiveStep] = useState(0);
  const [argLastPage, setArgLastPage] = useState(null);

  useEffect(() => {
    checkIsSpecial();
  }, []);
  const checkIsSpecial = () => {
    axios.get(`${urlBackend}/scenarioDay`).then(
      (response) => {
        const scenarioDAY = response['data']['answer']
        const specialFirstPage = scenarioDAY.localeCompare(date.split(' ')[0]) === 0 ? 1 : 0
        setActiveStep(specialFirstPage)
        //setIsSpecial(scenarioDAY)
      }
    ).catch(error => console.error(`Error: ${error}`))
    //axios.get('http://localhost:7999/')
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) selectDatePage();
    else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const chooseScenario = (scenarioName) => {
    console.log("[STEPPER] Choose scenario")
    console.log(scenarioName)
    axios.get(`${urlBackend}/get_scenario`, { params: { name: scenarioName, date: date } }).then(
      (response) => {
        const stuff = response['data']
        setArgLastPage(stuff)
        setActiveStep(2)
      }
    ).catch(error => console.error(`Error: ${error}`))

  }

  const chooseContent = () => {
    if (activeStep === 0)
      return <LoadProjects urlBackend={urlBackend} submissionDone={handleNext} date={date} alreadyAllocated={alreadyAllocated} setArgLastPage={setArgLastPage} />
    if (activeStep === 1) return <ChooseScenario urlBackend={urlBackend} chooseScenario={chooseScenario} date={date}/>
    if (activeStep === 2) return <SecondPage scenarioInfo={argLastPage} urlBackend={urlBackend} submitDone={handleBack} scenarioChoosen={submissionDone} />
    if (activeStep === 3) return <h1>Coisa 3</h1>
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

  const sliderUp = () => {
    return (
      <Box sx={{ width: '100%', marginBottom: '1%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label} >
                <StepLabel >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    )
  }
  const sliderBTNS = () => {
    return (
      <Box sx={{ width: '100%' }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 2 }}>

              {button(handleBack, 'Voltar atrás')}
              <Box sx={{ flex: '1 1 auto' }} />

              {button(handleNext, activeStep === steps.length - 1 ? 'Finish' : 'Next')}
            </Box>
          </React.Fragment>
        )}
      </Box>


    )
  }
  return <div className='stepperContainer'>
    {sliderUp()}
    {chooseContent()}
    {sliderBTNS()}
  </div>
}