
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './TaskMain.scss';

/**
 * This class shows the projects the tech is involved, in cards
 * It does a get request to server, to get the information.
 * @param {str} nameTech Tech name to get his projects
 * @returns 
 */
export default function TasksCards({ nameTech }) {

  const [info, setInfo] = useState([])

  // Functions to create mocked info
  function getRandomInt(max) {
  return Math.floor(Math.random() * max).toString();
}
  const createProjectInfo = (id) => {

    return {
      "id": id,
         "Name": `Projeto${id}`,
        "Área" : getRandomInt(3),
        "Fase": getRandomInt(4),
        "TecAnalise": `Zé ${id}`,
        "TecAcomp": `Zé ${id}`,
        "Tipo projeto": "Mobilizador",
      
    }
  }

  const defaultCardsInput = () => {
    const projectsInfo = []
    for (let i = 0; i < nameTech.length; i++) {
      projectsInfo.push(createProjectInfo(i))
}
return projectsInfo

  }

  useEffect(() => {
    setInfo(defaultCardsInput)
  }, [nameTech]);

  // Render part
 

const convertPhaseToString = (phaseInt) => {
  switch(phaseInt){
    case "0":
      return "Por avaliar";
    case "1":
      return "Aprovado";
    case "2":
      return "Rejeitado";
    case "3":
      return "Concluido";
      default:
        return phaseInt.toString()
  }
}
const getColourByPhase = (phaseInt) => {
switch(phaseInt){
    case "0":
      return "#FFFFF0";
    case "1":
      return "#ADFF2F";
    case "2":
      return "#FF6347";
    case "3":
      return "#40E0D0";
  }
}
const commonStyles = {
  borderColor: 'text.primary',
};
  const renderProjectInfo = (info) => {
    return <Card sx={{ ...commonStyles, minWidth: 275, border:1}} style={{backgroundColor: getColourByPhase(info["Fase"])}}>
       <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {info["Tipo projeto"]}
        </Typography>
        <Typography variant="h5" component="div">
        {info["Name"]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {convertPhaseToString(info["Fase"])}
        </Typography>
        <Typography variant="body2">
        Texto?
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" >Tec. Análise: {info["TecAnalise"]} <br/>   Tec. Acomp.: {info["TecAcomp"]} </Typography>
      </CardActions>
    </Card>
  }

  const convertInput= () => {
    return (
      <div className="max">
      <h1>Projetos {nameTech}</h1>
      <div className="scrollable">
      {info.map(project => renderProjectInfo(project))}
      </div>
</div>
    )
    }
  return (
      <div >

        {Object.keys(info).length >= 0 ?
          convertInput() :
          <CircularProgress color="inherit" />
        }

      </div>

  )
}