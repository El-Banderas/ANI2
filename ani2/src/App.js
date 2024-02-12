import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './loadProjects/LoadProjects';
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";
import Login from './Login/Login';
import LoadTecn from './loadTecns/LoadTecn';
import SelectInput from '@mui/material/Select/SelectInput';
import SelectDate from './selectDates/SelectDate';

function App() {
  const urlBackend = "http://127.0.0.1:10000" 
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [currentPage, setCurPage] = useState("login")
  const [currentDate, setCurDate] = useState("")
  console.log("Backend URL:")
  console.log(urlBackend)

  const logInDone = () => {
    setCurPage("chooseDate")
  }

  const submissionDone = () => {
    setCurPage("landPage")
  }
  const checkTecns = () => {
    setCurPage("tecnInfo")
  }

  const chooseDate = (date) => {
    setCurDate(date)
    setCurPage("loadProjects")
  }

  return (
    <div className="App">
            <NavBar loggedIn={currentPage !== "login"} changeCurrentPage={setCurPage} urlBackend={urlBackend}/>
      {
        currentPage === "login" && <Login urlBackend={urlBackend} logInDone={logInDone}/>
      }
      {
        currentPage === "loadProjects" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone} date={currentDate}/>
        //currentPage === "loadProjects" && <h1>Load projs</h1>
      }
      {
        currentPage === "landPage" && <MainApp urlBackend={urlBackend} />
        //currentPage === "landPage" && <h1>Página principal</h1>
      }

      {
        currentPage === "tecnInfo" && <LoadTecn urlBackend={urlBackend} submissionDone={submissionDone}>Ver técnicos</LoadTecn>
      }
      {
        currentPage === "chooseDate" && <SelectDate urlBackend={urlBackend} submissionDone={chooseDate} >Ver datas </SelectDate >
      }
    </div>
  );
}

export default App;
