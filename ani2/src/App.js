import logo from './logo.svg';
import './App.css';
import MainApp from './MainApp'
import LoadProjects from './loadProjects/LoadProjects';
import React, {useEffect, useState} from "react";

function App() {
  
  const [currentPage, setCurPage] = useState("loadProjects")

  return (
    <div className="App">
      {
        currentPage === "loadProjects" && <LoadProjects />
      }
      {
        currentPage === "landPage" && <MainApp />
      }
    </div>
  );
}

export default App;
