import React, { useState, useEffect } from "react";
import axios from 'axios';

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
 
export default function useGetAllocations( urlBackend ) {
  /**
   * Default input, in case the server is down, to don't show error to user.
   */
 const [input, setInput] = useState(defaultInput)

  
const getAttributions =  () => {
        console.log("[MAIN APP] GET initial attris")

        console.log(`${urlBackend}/tecns/efforts_w_stats`)
        axios.get(`${urlBackend}/tecns/efforts_w_stats`).then(
          (response) => {
            const cleanAnswer = response['data']
            setInput(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
    }


    useEffect(() => {
      getAttributions();
    },[]);


    
  return input;
}