
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

  const getEffort = () => {
        return tecnId === info["Técnico análise"] ? info["Esforço análise"] : info["Esforço acompanhamento"]
  }

  const getColourByPhase = (phaseInt) => {
const backColor = tecnId !== info["Técnico análise"] ?  "#FC848C" : "#3C9D92"
return backColor
    switch (phaseInt) {
      // PINK
      case "Por analisar":
        return "#FC848C"
      case "Rejeitado":
        return "#FC848C"
      // Blue
      case "Aprovado":
        return "#3C9D92";
      case "Concluído":
        return "#3C9D92";
    }
  }
  const commonStyles = {
    borderColor: 'text.primary',
  };



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
            <TextComponentPrimary text={`${info["Data início"].split(" ")[0]}`} size={14} fontWeightGiven={'regular'} />
          </div>
          <div className="horizontalFlex">
            <TextComponentPrimary text={`Data fim: `} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={`${info["Data fim"].split(" ")[0]}`} size={14} fontWeightGiven={'regular'} />
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
            <TextComponentPrimary text={info["Tipo"]} size={14} fontWeightGiven={'regular'} />
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