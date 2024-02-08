import logo from './logo.svg';
import './App.css';
import LandPage from './LandPage/LandPage'
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import React, {useEffect, useState} from "react";

export default function MainApp({urlBackend}) {

  useEffect( () => {
    getAttributions();
  }, [] );

  const tasks = {
    "Task1": 5,
    "Task2": 7,
    "Task3": 3,
    "Task4": 9,
    "Task5": 5,
    "Task6": 5,
    "Task7": 5,
    "Task8": 1,
    "Task9": 5,
    "Task10": 10,
    "Task11": 5,
  }

  const technicians = {
    "Tec1": ["Task1", "Task2", "Task3", "Task4"],
    "Tec2": ["Task5", "Task6", "Task7", "Task8"],
    "Tec3": ["Task9", "Task10", "Task11"]
  }

  //const [input, setInput] = useState({ })
  const defaultInput ={"input": 
              {"tasks": tasks, "technicians": technicians },
            "stats" : {
              "min" : 0,
              "max" : 0,
              "std" : 0,
              "amp" : 0,
            } }
  const [input, setInput] = useState(defaultInput)

  
const getAttributions =  () => {
        console.log("[MAIN APP] GET initial attris")
        axios.get(`${urlBackend}/attri`).then(
          (response) => {
            const cleanAnswer = response['data']
            setInput(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
        //axios.get('http://localhost:7999/')
    }

 
  const currentTech = "Tec1"

  // Other routes not working
  return (
    <div className="App">
          { Object.keys(input).length > 0 ?
            <LandPage defaultInput={input} updateInput={setInput} urlBackend={urlBackend}/> :
            <div>
            <h1>Loading</h1> 
            <CircularProgress />
            </div>
          }
    </div>
  );
}

