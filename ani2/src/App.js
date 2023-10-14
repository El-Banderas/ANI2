import logo from './logo.svg';
import './App.css';
import TechMain from './TechnicianPage/TechnicianMain'
import NoPage from './NoPage'
import LandPage from './LandPage/LandPage'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  const getTasksTech = (name) => {
    const input = getInput()
    const tasksTech = input["technicians"][name]
    const res = []
    for (let task of tasksTech) {
      const lengthTask = input["tasks"][task]
      res.push([task, lengthTask])
    }
    return res
  }

  const currentTech = "Tec1"

  console.log("Current url")
  console.log(window.location.href)



  return (
    <div className="App">
        <Routes>
          <Route path="*" element={<LandPage input={getInput()}/>} />
            <Route path="/ANI2/b" element={<TechMain name={currentTech} listTasks={getTasksTech(currentTech)} />} />
                      <Route path="/ANI3" element={<NoPage />} />
        </Routes>

    </div>
  );
}

export default App;
