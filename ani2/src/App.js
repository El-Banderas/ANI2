import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './loadProjects/LoadProjects';
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";
import Login from './Login/Login';
import axios from 'axios';

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

  const reloadData = () => {
    axios.get(`${urlBackend}/reload`).then(
          (response) => {
            console.log("Receubeu resposta")
            //const cleanAnswer = response['data']['input']
            //console.log(cleanAnswer)
            //setInput(cleanAnswer)
          }
        ).catch(error => console.error(`Error: ${error}`))
  }

  return (
    <div className="App">
            <NavBar loggedIn={currentPage !== "login"} changeCurrentPage={setCurPage} reloadData={reloadData}/>
      {
        currentPage === "login" && <Login urlBackend={urlBackend} logInDone={logInDone}/>
      }
      {
        //currentPage === "loadProjects" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone}/>
        currentPage === "loadProjects" && <h1>Load projs</h1>
      }
      {
        //currentPage === "landPage" && <MainApp urlBackend={urlBackend} />
        currentPage === "landPage" && <h1>Página principal</h1>
      }
    </div>
  );
}

export default App;
