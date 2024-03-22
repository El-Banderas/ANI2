import TextComponentPrimary from '../TextComponents/TextPrimary';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from 'axios';
import { dateCalendarClasses } from '@mui/x-date-pickers';

export default function LoginDate({ urlBackend, logInDone }) {
  // Dates selected by user in picker
  const [dateInit, setDateInit] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  // Dates from DB
  const [dateInitFromDB, setDateInitFromDB] = useState(null)
  const [dateEndFromDB, setDateEndFromDB] = useState(null)

  const [waitingForLoading, setWaitingForLoading] = useState(false)

  useEffect(() => {
    getFilterDates();
  }, []);

  const getFilterDates = () => {
    axios.get(`${urlBackend}/get_login_filter_dates`).then(
      (response) => {
        const dateInitFilter = response['data']['startFilterDate']
        const dateEndFilter = response['data']['endFilterDate']
        setDateInitFromDB(dateInitFilter)
        setDateEndFromDB(dateEndFilter)

        setDateInit(dateInitFilter)
        setDateEnd(dateEndFilter)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }

  const keepDate = () => {
    logInDone()
  }
  const changeDate = () => {
    setWaitingForLoading(true)
    axios({
      method: 'put',
      url: `${urlBackend}/change_filter_dates`,
      data: { "startFilterDate": dateInit, "endFilterDate": dateEnd },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(
      console.log("Já recebeu resposta?"),
      console.log("2 Já recebeu resposta?"),
      setWaitingForLoading(false),
    logInDone()
    )

}

const MyPickDate = ({ date, changeDateFunction }) => {

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
      <MyPickDate date={dateState} changeDateFunction={changeDateFunction} />

    </div>

  )
}

return (
  <>
    {
      dateInitFromDB !== null ?

        <div className="Login">
          <div className='flexVertical'>
            <TextComponentPrimary text={"Datas selecionadas anteriormente"} size={30} />
            <TextComponentPrimary text={`Data de início de filtro: ${dateInitFromDB}`} size={15} />
            <TextComponentPrimary text={`Data de fim de filtro: ${dateEndFromDB}`} size={15} />
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
        :
        <CircularProgress />
    }
    {waitingForLoading && <CircularProgress />}
  </>
);
}

