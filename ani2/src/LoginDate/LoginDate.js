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

  const checkingDatesEqual = (date1, dateInit2) => {
    if (date1 !== null) {
      if (typeof (date1) === "string"){
        return date1.localeCompare(dateInit2) === 0
      }
      else {
        const dateConverted = date1._d.toLocaleDateString('pt-PT')

        return dateInit2.localeCompare(dateConverted) === 0
      }
    }

  }
  const [waitingForLoading, setWaitingForLoading] = useState(false)

  useEffect(() => {
    getFilterDates();
  }, []);

  const getFilterDates = () => {
    axios.get(`${urlBackend}/login/get_login_filter_dates`).then(
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
    console.log("[LOGIN DATES] Change data of filters")
    setWaitingForLoading(true)
    const date1Converted = typeof(dateInit) === "string" ? dateInit :  dateInit._d.toLocaleDateString('pt-PT')
    const date2Converted = typeof(dateEnd) === "string" ? dateEnd :  dateEnd._d.toLocaleDateString('pt-PT')
    axios({
      method: 'put',
      url: `${urlBackend}/login/change_filter_dates`,
      data: { "startFilterDate": date1Converted, "endFilterDate": date2Converted },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((respose) => {
      console.log("[LOGIN DATES] Server reloaded all data?")
      console.log(respose)
      setWaitingForLoading(false)
      logInDone()
    }
    )

  }

  const MyPickDate = ({ date, changeDateFunction }) => {

    return (
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"pt"} >
        <DatePicker
          label="Selecionar data"
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
  const advance = () => {
    if (checkingDatesEqual(dateInit, dateInitFromDB) && checkingDatesEqual(dateEnd, dateEndFromDB)){
      keepDate()
    }
    else {
      changeDate()
    }
  }
  return (
    <>
      {
        dateInitFromDB !== null ?

          <div className="Login">
              <div className='flexHorizontal'>
                {columnSelectDate("Selecionar data de início de filtro", dateInit, setDateInit)}
                {columnSelectDate("Selecionar data de fim de filtro", dateEnd, setDateEnd)}
              </div>
            <div className='flexHorizontal'>
              <Button variant="outlined" onClick={() => advance()  } style={{
                borderRadius: 10,
                backgroundColor: "#32DBC4",
                margin: "5% 0% 1% 0%",
                fontSize: "14px",
                color: "black",
                fontWeight: "lighter",
                width: "30%",
              }} ><TextComponentPrimary text={"Avançar"} size={16} fontWeightGiven={"regular"} /></Button>
              
            </div>

          </div>
          :
          <CircularProgress />
      }
      {waitingForLoading && <CircularProgress />}
    </>
  );
}

