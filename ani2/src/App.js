import logo from './logo.svg';
import './App.css';
import LandPage from './LandPage/LandPage'
import React from "react";

function App() {

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

  const getInput = () => {
    return { "tasks": tasks, "technicians": technicians }
  }

  

  const currentTech = "Tec1"

  console.log("Current url")
  console.log(window.location.href)

  // Other routes not working
  return (
    <div className="App">
          <LandPage defaultInput={getInput()}/> 

    </div>
  );
}

export default App;
