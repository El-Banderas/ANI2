
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './SecondPage.scss';
import TextField from '@mui/material/TextField';
import TextComponentPrimary from "../../TextComponents/TextPrimary";
import MyButton from 'CommonComponents/MyButton';


export default function ProjectCard({ info, tecnId, changeTecn, possibleTecns }) {

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

        {/* Select Destiny Tecn */}
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
            getOptionLabel={option => String(option)}
          />
          <MyButton onClicki={selectTecn} text={"Selecionar técnico"} />
        </div>
        {/* Info tables (about allocation) */}
        <div className='tables'>

          <Table title={"Fase: "}  content={info["Fase realizada"]} />
          <Table title={"Tema: "}  content={info["Tema"]} />

        </div>
        <div className='tables'>

          <Table title={"Tipo: "}  content={info["Tipo"]} />
          <Table title={"Esforço: "}  content={info["Esforço"]} />
        </div>
      </CardContent>

      <CardActions>
      </CardActions>
    </Card>


  )
}