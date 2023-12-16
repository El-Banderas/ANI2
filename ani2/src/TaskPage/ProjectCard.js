
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
import TextField from '@mui/material/TextField';

/**
 * This class shows the projects the tech is involved, in cards
 * It does a get request to server, to get the information.
 * @param {str} nameTech Tech name to get his projects
 * @returns 
 */
export default function ProjectCard({ info, tecnId }) {
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

const getEffort = () => {
  console.log("What is?")
  console.log(tecnId)
  console.log(info)
  return tecnId === info["Tecn. análise"] ? info["Custo análise"] : info["Custo acompanhamento"]
} 

const getColourByPhase = (phaseInt) => {
switch(phaseInt){
    case 0:
      return "Por analisar";
    case "Aprovado":
      return "#ADFF2F";
    case "Rejeitado":
      return "#FF6347";
    case "Concluído":
      return "#40E0D0";
  }
}
const commonStyles = {
  borderColor: 'text.primary',
};


  const normalSizeText = text => {
    return <Typography sx={{ fontSize: 14 }} color="text.secondary" component="div" >
              {text}
            </Typography>
  }

  const biggerSizeText = text => {
    return <Typography sx={{ fontSize: 16 }} color="text.primary" align="left" component="div" className='topMargin' >
              {text}
            </Typography>
  }

  const boxText = text => {
    return <Typography sx={{ fontSize: 16, border: 1 }} color="text.primary" className='littleBox' component="div" >
              {text}
            </Typography>
  }

 return (
  <Card sx={{ ...commonStyles, minWidth: 375, border:1}} style={{backgroundColor: getColourByPhase(info["Fase atual"])}} key={Math.random()}>
       <CardContent >
          <Typography sx={{ fontSize: 16 }}  gutterBottom align="left">
          {info["Sigla"]}
          </Typography>
          
          <div className='horizontalFlexSpaceBetween'>
          {normalSizeText(`Data init ${info["Data início"]}`)}
          {normalSizeText(`Data fim ${info["Data fim"]}`)}
          </div>

          <div className='horizontalFlexStart'>
          {normalSizeText("ID: ")}
          {normalSizeText(info["id"])}
        </div>
          {biggerSizeText("Projetos")}
           <TextField
           margin="dense"
           fullWidth
          size="small"
          defaultValue="Observações..."
          InputProps={{
            readOnly: true,
          }}
        />
          <div className='tables'>
          {boxText(`Fase: ${info["Fase atual"]}`)}
          {boxText(`Tema: ${info["Tema"]}`)}
          </div>
          <div className='tables'>
          {boxText(`Tipo: ${info["N. Promotores"]}`)}
          {boxText(`Esforço: ${getEffort()}`)}
          </div>
        </CardContent>

      <CardActions>
      </CardActions>
    </Card>
      
      
       )
}