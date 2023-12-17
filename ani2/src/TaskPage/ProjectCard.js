
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
import TextComponentPrimary from "../TextComponents/TextPrimary";

/**
 * This class shows the projects the tech is involved, in cards
 * It does a get request to server, to get the information.
 * @param {str} nameTech Tech name to get his projects
 * @returns 
 */
export default function ProjectCard({ info, tecnId }) {
  const convertPhaseToString = (phaseInt) => {
    switch (phaseInt) {
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
    return tecnId === info["Técnico análise"] ? info["Esforço análise"] : info["Esforço acompanhamento"]
  }

  const getColourByPhase = (phaseInt) => {
    return "#FC848C"
    switch (phaseInt) {
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
    <Card sx={{ ...commonStyles, minWidth: 375, border: 1 }} style={{ backgroundColor: getColourByPhase(info["Fase atual"]) }} key={Math.random()}>
      <CardContent >
        <div className="horizontalFlex">
          <TextComponentPrimary text={`Sigla: `} size={14} fontWeightGiven={'Bold'} />
          <TextComponentPrimary text={`${info["Sigla"]}`} size={14} fontWeightGiven={'regular'} />
        </div>

        <div className='horizontalFlexSpaceBetween'>
          <div className="horizontalFlex">
            <TextComponentPrimary text={`Data início: `} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={`${info["Data início"]}`} size={14} fontWeightGiven={'regular'} />
          </div>
          <div className="horizontalFlex">
            <TextComponentPrimary text={`Data fim: `} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={`${info["Data fim"]}`} size={14} fontWeightGiven={'regular'} />
          </div>
        </div>

        <div className='horizontalFlexStart'>
          <TextComponentPrimary text={"ID: "} size={14} fontWeightGiven={'Bold'} />
          <TextComponentPrimary text={info["id"]} size={14} fontWeightGiven={'regular'} />
        </div>
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

          <div className="littleBox">
            <TextComponentPrimary text={"Fase: "} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={info["Fase atual"]} size={14} fontWeightGiven={'regular'} />
          </div>

          <div className="littleBox">
            <TextComponentPrimary text={"Tema"} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={info["Tema"]} size={14} fontWeightGiven={'regular'} />
          </div>
        </div>
        <div className='tables'>
<div className="littleBox">
            <TextComponentPrimary text={"Tipo: "} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={info["Tipo de projeto"]} size={14} fontWeightGiven={'regular'} />
          </div>

          <div className="littleBox">
            <TextComponentPrimary text={"Esforço: "} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={getEffort()} size={14} fontWeightGiven={'regular'} />
          </div>
        </div>
      </CardContent>

      <CardActions>
      </CardActions>
    </Card>


  )
}