import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './loadProjects/LoadProjects';
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";
import Login from './Login/Login';
import LoadTecn from './loadTecns/LoadTecn';

function App() {
  const urlBackend = "http://127.0.0.1:10000" 
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [currentPage, setCurPage] = useState("login")

  const logInDone = () => {
    setCurPage("loadProjects")
  }

  const submissionDone = () => {
    setCurPage("landPage")
  }
  const checkTecns = () => {
    setCurPage("tecnInfo")
  }

  return (
    <div className="App">
            <NavBar loggedIn={currentPage !== "login"} changeCurrentPage={setCurPage} urlBackend={urlBackend}/>
      {
        currentPage === "login" && <Login urlBackend={urlBackend} logInDone={logInDone}/>
      }
      {
        currentPage === "loadProjects" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone}/>
        //currentPage === "loadProjects" && <h1>Load projs</h1>
      }
      {
        currentPage === "landPage" && <MainApp urlBackend={urlBackend} />
        //currentPage === "landPage" && <h1>Página principal</h1>
      }

      {
        currentPage === "tecnInfo" && <LoadTecn urlBackend={urlBackend} submissionDone={submissionDone}>Ver técnicos</LoadTecn>
      }
    </div>
  );
}

export default App;
