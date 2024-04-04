
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SecondPage.scss';
import TextField from '@mui/material/TextField';
import TextComponentPrimary from "../../TextComponents/TextPrimary";


export default function ProjectCard({ info, tecnId , changeTecn, possibleTecns}) {

const [selected, setSelected] = useState([]);
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

  const selectTecn = () => {

       changeTecn(parseInt(info["id"]), tecnId, selected)
       
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

        <div className='horizontalFlexStart'>
<Autocomplete
        disablePortal
          fullWidth
        id="ProjectCard-searchTecn"
        onChange={(event, value) => setSelected(value)}
        value={selected}
        options={possibleTecns}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Técnicos possíveis" />}
        getOptionLabel = {option => String(option)}
      />
 <Button variant="outlined" onClick={selectTecn} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",

      }} ><TextComponentPrimary text={"Selecionar técnico"} size={16} fontWeightGiven={"regular"} /></Button>
</div>
        <div className='tables'>

          <div className="littleBox">
            <TextComponentPrimary text={"Fase: "} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={info["Fase realizada"]} size={14} fontWeightGiven={'regular'} />
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
            <TextComponentPrimary text={info["Esforço"]} size={14} fontWeightGiven={'regular'} />
          </div>
        </div>
      </CardContent>

      <CardActions>
      </CardActions>
    </Card>


  )
}