
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TextComponentPrimary from "../../TextComponents/TextPrimary";
import './SecondPage.scss'

import React from 'react';
import Button from '@mui/material/Button';

export default function SeachChooseTecn({ possibilities, changeCurrentTecn }) {

    const selectTecn = () => {
       const element = document.getElementById("SecPage-searchTecn").value; 
       
       if (possibilities.includes(element)){
        changeCurrentTecn(element)
       }
    }
    return (
        <div className='searchTecn'>
<Autocomplete
        disablePortal
        id="SecPage-searchTecn"
        options={possibilities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Técnico" />}
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
        
    )
}