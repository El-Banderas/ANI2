import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import './Login.scss';
import useGetFilterDates from './useGetFilterDates';
import useChangeDate from './useChangeDate';
import ColumnDatePicker from './ColumnDatePicker';
import MyButton from 'CommonComponents/MyButton';

export default function LoginDate({ urlBackend, logInDone }) {

  // Dates from DB
  const {dateInitFromDB, dateEndFromDB} = useGetFilterDates(urlBackend)

  // Dates selected by user in picker
  const [dateInit, setDateInit] = useState(dateInitFromDB)
  const [dateEnd, setDateEnd] = useState(dateEndFromDB)

  const [waitingForLoading, setWaitingForLoading] = useState(false)

  // Function to change the backend date filters
  const {changeDate} = useChangeDate(urlBackend, setWaitingForLoading, dateInit, dateEnd, logInDone)

  const keepDate = () => {
    logInDone()
  }

  // When the dates are received from DB, the interface is updated with the received values.
  useEffect(() => {
    setDateInit(dateInitFromDB)
    setDateEnd(dateEndFromDB)
  }, [dateInitFromDB, dateEndFromDB]);

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
                <ColumnDatePicker text="Selecionar data de início de filtro" dateState={dateInit} changeDateFunction={setDateInit} />
                <ColumnDatePicker text="Selecionar data de fim de filtro" dateState={dateEnd} changeDateFunction={setDateEnd} />
              </div>
            <div className='button'>
              <MyButton onClicki={() => advance()  } text={"Avançar"} />
              
            </div>

          </div>
          :
          <CircularProgress />
      }
      {waitingForLoading && <CircularProgress />}
    </>
  );
}

