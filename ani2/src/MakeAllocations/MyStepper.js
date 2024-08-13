
import React  from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './LoadProjects.scss'

const steps = ['Alterar esforços de projetos', 'Escolher cenário', 'Comparar alocações', 'Alocação submetida!'];

/**
 * After the "SelectDate" panel, the user gets this component, where he can start making an allocation.
 * @param {function} submissionDone When the user selects a scenario, this function is called to change the page to the graph with all workers. 
 * @returns 
 */
export default function MyStepper({ activeStep }) {

  return <Box sx={{ width: '100%', marginBottom: '1%' }}>
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
  
}