
import React, { useEffect, useState } from "react";
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import LineGraph from './LineGraph';
import './LineGraph.scss'

export default function SelectTecns({ urlBackend }) {

  useEffect(() => {
    getEfforts();
  }, []);

  const [selectedTecns, setSelectedTecns] = useState({});
  const [listTecns, setListTecns] = useState({})

  const getEfforts = () => {
    axios.get(`${urlBackend}/tecns_efforts`).then(
      (response) => {
        console.log("[LOAD Efforts] Receubeu resposta")
        const cleanAnswer = response['data']["efforts"]
        console.log(cleanAnswer)
        //setProjects([...cleanAnswer, ...cleanAnswer])
        setListTecns(cleanAnswer)
      }
    ).catch(error => console.error(`Error: ${error}`))
    //axios.get('http://localhost:7999/')
  }



  const years = [
    new Date(2015, 0, 1),
    new Date(2015, 6, 1),
    new Date(2016, 0, 1),
    new Date(2016, 6, 1),
    new Date(2017, 0, 1),
    new Date(2017, 6, 1),
    new Date(2018, 0, 1),
    new Date(2018, 6, 1),
    new Date(2019, 0, 1),
    new Date(2019, 6, 1),
    new Date(2020, 0, 1),
    new Date(2020, 6, 1),
    new Date(2021, 0, 1),
    new Date(2021, 6, 1),
    new Date(2022, 0, 1),
    new Date(2022, 6, 1),
    new Date(2023, 0, 1),
    new Date(2023, 6, 1),

    new Date(2024, 0, 1),
    new Date(2024, 6, 1),
  ];

  const generate_tecn = (idx) => {
    return {
      TecName: `Tecn${idx}`,
      efforts: [
        10000 * idx, 28114.264, 30619.805,
        28129, 28294.264 * idx, 18699.805,
        28129 * idx, 28294.264, 23619.805,
      ]
    }
  }


  const Max = {
    TecName: "Max",
    label: "Máximo por semana",
    efforts: Array(years.length).fill(90000),
  }
  const NumTecns = 35;
  const list_tecns1 = Array.from(Array.from(Array(NumTecns).keys(NumTecns)), (x) => generate_tecn(x))
  //const list_tecns = [...list_tecns1, Max]

  const handleChange = (event) => {
    if (event.target.checked) {
      setSelectedTecns(old => ({
        ...old,
        [event.target.id]: listTecns["info"][event.target.id]
      }))
    }
    else {
      let copyListTecns = { ...selectedTecns }
      delete copyListTecns[event.target.id]
      setSelectedTecns(old => ({ ...copyListTecns }))
    }

  };
  const tecnChecked = tecn => {
    return tecn in selectedTecns
  }
  const constructCheckBox = (tecnInfo) => {
    return <FormControlLabel 
    
      key={tecnInfo.TecName}
    control={<Checkbox
      checked={tecnChecked(tecnInfo.TecName)}
      onChange={handleChange}
      id={tecnInfo.TecName}
      inputProps={{ 'aria-label': 'controlled' }}
    />}
      label={tecnInfo.TecName} />
  }

  const convertStrDate = () => {
    if (Object.keys(listTecns).length > 0) {
      const yearsConverted = listTecns["years"].map(year => new Date(year))
      return yearsConverted
    } else {
      return []
    }
  }

  return (
    <div>
      <div className="checkBoxes">

        <FormGroup row  >

          {Object.keys(listTecns).length > 0 && Object.keys(listTecns["info"]).map(function (key) {
            return constructCheckBox(listTecns["info"][key])
          })}
          {Object.keys(listTecns).length == 0 && <CircularProgress />}
        </FormGroup>

      </div>
      <LineGraph years={convertStrDate()} list_tecns={Object.values(selectedTecns)} key={Object.keys(selectedTecns).length} />
    </div>
  );
}