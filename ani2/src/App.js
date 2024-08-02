import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './MakeAllocations/LoadProjects';
import MyStepper from './MakeAllocations/Stepper';
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";
import LoginDate from './Login/LoginDate';
import Login from './Login/Login';
import LoadTecn from './loadTecns/LoadTecn';
import SelectInput from '@mui/material/Select/SelectInput';
import SelectDate from './selectDates/SelectDate';

function App() {
  const urlBackend = "http://127.0.0.1:8000" 
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [currentPage, setCurPage] = useState("login")
  const [currentDate, setCurDate] = useState("")
  console.log("Backend URL:")
  console.log(urlBackend)
  console.log("Current page")
  console.log(currentPage)

  const logInDone = () => {
    setCurPage("chooseDate")
  }

  const selectDatePage = () => {
    setCurPage("chooseDate")
  }
  const submissionDone = () => {
    setCurPage("landPageGraph")
  }
  const checkTecns = () => {
    setCurPage("tecnInfo")
  }

  const chooseDate = (date, otherPage) => {
    setCurDate(date)
    setCurPage(otherPage)
  }
  const selectFilterDate = () => {
    setCurPage("loginDate")
  }

  return (
    <div className="App">
            <NavBar loggedIn={currentPage !== "login"} changeCurrentPage={setCurPage} urlBackend={urlBackend}/>

      {
        currentPage === "loginDate" && <LoginDate urlBackend={urlBackend} logInDone={logInDone}/>
      }
      {
        currentPage === "login" && <Login urlBackend={urlBackend} logInDone={selectFilterDate}/>
      }
      {
        currentPage === "loadProjects" && <MyStepper urlBackend={urlBackend} selectDatePage={selectDatePage} date={currentDate} alreadyAllocated={false} submissionDone={submissionDone}/>
        //currentPage === "loadProjects" && <h1>Load projs</h1>
      }

      {
        currentPage === "loadProjectsAllocated" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone} date={currentDate} alreadyAllocated={true}/>
        //currentPage === "loadProjects" && <h1>Load projs</h1>
      }
      {
        currentPage === "landPageSearch" && <MainApp urlBackend={urlBackend} chartOrSearch={false} />
      }

      {
        currentPage === "landPageGraph" && <MainApp urlBackend={urlBackend} chartOrSearch={true} />
      }
      {
        currentPage === "tecnInfo" && <LoadTecn urlBackend={urlBackend} submissionDone={submissionDone}>Ver técnicos</LoadTecn>
      }
      {
        currentPage === "chooseDate" && <SelectDate urlBackend={urlBackend} submissionDone={chooseDate} keywordGet={"get_allocation_dates"}>Ver datas </SelectDate >
      }

      {
        currentPage === "alocatedProjs" && <SelectDate urlBackend={urlBackend} submissionDone={chooseDate} keywordGet={"get_allocatted_dates"}>Ver Projetos alocados </SelectDate >
      }
    </div>
  );
}

export default App;
