
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import TextComponentPrimary from "CommonComponents/TextComponents/TextPrimary";
import './SecondPage.scss';
import MyButton from 'CommonComponents/MyButton';


export default function ProjectCard({ info, tecnId, changeTecn, possibleTecns, chooseTecn }) {

  const [selected, setSelected] = useState([]);
  const getColourByPhase = (phaseInt) => {
    const backColor = tecnId !== info["Técnico análise"] ? "#FC848C" : "#3C9D92"
    return backColor
  }
  const commonStyles = {
    borderColor: 'text.primary',
  };

  const selectTecn = () => {

    changeTecn(parseInt(info["id"]), tecnId, selected)

  }

  const Table = ({title, content}) => {
    return (<div className="littleBox">
            <TextComponentPrimary text={title} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={content} size={14} fontWeightGiven={'regular'} />
          </div>)
  }

  const chooseTecnOrObservations = () => {
    if (chooseTecn) return   <div className='horizontalFlexStart'>
          <Autocomplete
            disablePortal
            fullWidth
            id="ProjectCard-searchTecn"
            onChange={(event, value) => setSelected(value)}
            value={selected}
            options={possibleTecns}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Técnicos possíveis" />}
            getOptionLabel={option => String(option)}
          />
          <MyButton onClicki={selectTecn} text={"Selecionar técnico"} />
        </div>
        else return <TextField
          margin="dense"
          fullWidth
          size="small"
          defaultValue="Observações..."
          InputProps={{
            readOnly: true,
          }}
        />
  }

  console.log(info)
  const getEffort = () => {
    if (info["Esforço"] !== undefined) return info["Esforço"]
    else {
      return info["Fase Realizada"] === "Acompanhamento" ? info["Esforço acompanhamento"] : info["Esforço análise"]
    }
  } 
  return (
    <Card sx={{ ...commonStyles, minWidth: 375, border: 1 }} style={{ backgroundColor: getColourByPhase(info["Fase atual"]) }} key={Math.random()}>
      <CardContent >
        {/* Info in card header */}
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

        {chooseTecnOrObservations()}
        {/* Info tables (about allocation) */}
        <div className='tables'>

          <Table title={"Fase: "}  content={info["Fase realizada"]} />
          <Table title={"Tema: "}  content={info["Tema"]} />

        </div>
        <div className='tables'>

          <Table title={"Tipo: "}  content={info["Tipo"]} />
          <Table title={"Esforço: "}  content={getEffort()} />
        </div>
      </CardContent>

      <CardActions>
      </CardActions>
    </Card>


  )
}