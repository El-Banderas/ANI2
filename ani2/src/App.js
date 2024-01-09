import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './loadProjects/LoadProjects';
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";

function App() {
  const urlBackend = "http://127.0.0.1:10000" 
  const [currentPage, setCurPage] = useState("loadProjects")

  const submissionDone = () => {
    setCurPage("landPage")
  }

  return (
    <div className="App">
            <NavBar />
      {
        currentPage === "loadProjects" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone}/>
      }
      {
        currentPage === "landPage" && <MainApp />
      }
    </div>
  );
}

export default App;
