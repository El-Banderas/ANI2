import TextComponentPrimary from '../TextComponents/TextPrimary';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from 'axios';

export default function LoginDate({ urlBackend, logInDone }) {
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [dateInit, setDateInit] = useState(Date.now())
  const [dateEnd, setDateEnd] = useState(Date.now())


  const keepDate = () => {
    logInDone()
  }
  const changeDate = () => {
    logInDone()
    /*
    setLoading(true)
    console.log("SUBMIT")
    console.log(passowrd)
    axios({
      method: 'put',
      url: `${urlBackend}/connect_API`,
      data: { apiKey: passowrd },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(
      function (response) {
        setLoading(false)
        if (response["data"] === "error") {
          setPasswordValid(false)
        }
        else {
          console.log("Sucess")
          setPasswordValid(true)
          logInDone()
        }
      }
    )
    */
  }

    const MyPickDate = ({date, changeDateFunction}) => {
      
      return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"pt"} >
      <DatePicker
        label="Selecionar data de saída"
        inputformat="dd-MMMM-yyyyy"
          mask="__/__/____"
          placeholder="dd/MM/yyyy"
          okLabel="Escolher"
          clearLabel="Limpar"
          cancelLabel="Cancelar"
          value={date}
          format="L"
          views={["year", "month", "date"]}
          onChange={(dateChanged) => changeDateFunction(dateChanged)}
      />
</MuiPickersUtilsProvider>
      
      )
    }

  // Change page
  // submissionDone()
  const columnSelectDate = (text, dateState, changeDateFunction) => {
    return (
      <div className='flexVertical'>
<TextComponentPrimary text={text} size={30} />
        <MyPickDate date={dateState} changeDateFunction={changeDateFunction}/>
        
</div>

    )
  }

  return (
    <div className="Login">
      <div className='flexVertical'>
        <TextComponentPrimary text={"Datas selecionadas anteriormente"} size={30} />
        <TextComponentPrimary text={`Data de início de filtro: 3/3/2023`} size={15} />
        <TextComponentPrimary text={`Data de fim de filtro: 5/5/2024`} size={15} />
        <div className='flexHorizontal'>
          {columnSelectDate("Selecionar data de início de filtro", dateInit, setDateInit)}
          {columnSelectDate("Selecionar data de fim de filtro", dateEnd, setDateEnd)}
        </div>
      </div>
        <div className='flexHorizontal'>
<Button variant="outlined" onClick={() => keepDate()} style={{
          borderRadius: 10,
          backgroundColor: "#32DBC4",
          margin: "5% 20% 1% 0%",
          fontSize: "14px",
          color: "black",
          fontWeight: "lighter",
          width: "30%",
        }} ><TextComponentPrimary text={"Manter filtro"} size={16} fontWeightGiven={"regular"} /></Button>
<Button variant="outlined" onClick={() => changeDate()} style={{
          borderRadius: 10,
          backgroundColor: "#32DBC4",
          margin: "5% 0% 1% 0%",
          fontSize: "14px",
          color: "black",
          fontWeight: "lighter",
          width: "30%",
        }} ><TextComponentPrimary text={"Submeter novo filtro"} size={16} fontWeightGiven={"regular"} /></Button>
 
      </div>
    </div>
  );
}

