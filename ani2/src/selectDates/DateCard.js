import React, {useState} from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextComponentPrimary from "../TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {getDate} from '../utils/convertDates'

import './SelectDate.scss'

export default function DateCard({  info, onClick, nextPage , special}) {
  
  /*
  //const changedTecns= {}
    const submit = () => {
        axios({
            method: 'put',
            url: `${urlBackend}/update_tecns`,
            data: {
                "tecns": changedTecns
                //"name" : "AAA"
            }
        });
        // Change page
        submissionDone()

    }
*/

const textLeft = (textField, bold=false) => {
  const font = bold ? "medium" : "small"
  const size = bold ? 15 : 10
  return (
    <div className="positionRelative" >
<div className="left">
  <TextComponentPrimary size={size} text={textField} fontWeightGiven={font} />
</div>
    </div>
  )
}
const num_allocation_analisis = "Date_analisis" in info[1] ? info[1]["Date_analisis"] : 0  
const num_allocation_accomp = "Date_acomp" in info[1] ? info[1]["Date_acomp"] : 0  
const backGroundColor = special ? "red" : ""
   return (
        <div >
        <Card sx={{ minWidth: 275 , backgroundColor: backGroundColor}}>
      <CardContent className="card">

        {textLeft("Dia")}
        {textLeft(getDate(info[0]), true)}
        {textLeft()}
        {textLeft(`N.º projetos análise: ${num_allocation_analisis}`)}
        {textLeft(`N.º projetos acompanhamento: ${num_allocation_accomp}`)}
        
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onClick(info[0], nextPage )}>Selecionar</Button>
      </CardActions>
    </Card>
        </div>
    )
}