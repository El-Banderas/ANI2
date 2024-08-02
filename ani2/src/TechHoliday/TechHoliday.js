import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CircularProgress from '@mui/material/CircularProgress';
import { DateRangePicker} from "mui-daterange-picker";

export default function TechHoliday({ techName }) {
  const name = "AAA"
  const [value, setValue] = React.useState(null);
  const [info, setInfo] = useState({})

  const [dateRange, setDateRange] = React.useState({});

  const toggle = () => {};

  useEffect(() => {
   // getTaskInfo();
  }, [name]);
const getTaskInfo = () => {
  console.log("GET task info")
    console.log(name)
    const regexpSize = /([0-9]+)/;
    const match = name.match(regexpSize);
    console.log(name)
    console.log(`http://localhost:7999/?${techName}=${name}`)
    axios.get(`http://localhost:7999/?${techName}=${name}`).then(
      (response) => {
        console.log("Receubeu resposta")
        const cleanAnswer = response['data']
        console.log(cleanAnswer)
        setInfo(cleanAnswer)
      }
    ).catch(error => console.error(`Error: ${error}`))
    //axios.get('http://localhost:7999/')
    }
  
    const selectDatePicker = () => {
      console.log("Date picker")

        console.log(value)
        console.log(value.format('MM-DD-YYYY'))
    }
const selectDateRange = () => {
      console.log("Data range")

        const initDate = new Date(dateRange["startDate"])
        const endDate = new Date(dateRange["endDate"])
        console.log(`${initDate.getDate()} - ${initDate.getMonth()} - ${initDate.getFullYear()}`)
        console.log(`${endDate.getDate()} - ${endDate.getMonth()} - ${endDate.getFullYear()}`)
    }
  return (
    <div className='verticalFlex'>
<div>
  <DateRangePicker
  open={true}
        toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />

</div>
                    <Button variant="outlined" onClick={() => selectDateRange()}>Remover técnico</Button>
 
      <div className="nameLine ">
      {techName}
        {Object.keys(info).length >= 0 ?
          <h3>Oi</h3> :
          <CircularProgress color="inherit" />
        }
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DatePicker  id="datePicker" value={value} onChange={(newValue) => setValue(newValue)}/>
              </DemoContainer>
    </LocalizationProvider>
                    <Button variant="outlined" onClick={() => selectDatePicker()}>Remover técnico</Button>
      </div>
   </div>

  )
}