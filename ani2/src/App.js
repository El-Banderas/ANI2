import './App.css';
import LoadProjects from './CommonComponents/ProjectsTable/LoadProjects';
import MakeAllocations from './MakeAllocations/MakeAllocations';
import React, {useState} from "react";
import NavBar from "./NavBar/Navbar";
import LoginDate from './LoginDate/LoginDate';
import Login from './Login/Login';
import LoadTecn from './loadTecns/LoadTecn';
import SelectDate from './selectDates/SelectDate';
import GraphAllAllocation from 'GraphAllAllocation/GraphAllAllocation';
import LandPageSearch from 'LandPage/LandPageSearch';

function App() {
  //const urlBackend = "http://127.0.0.1:8000" 
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [urlBackend, setURLBackend] = useState("http://127.0.0.1:8000")
  const [currentPage, setCurPage] = useState("login")
  const [currentDate, setCurDate] = useState("")
  console.log("Backend URL:")
  console.log(urlBackend)
  console.log("Current page")
  console.log(currentPage)

  const logInDone = () => {
    setCurPage("SelectDateToAllocate")
  }

  const submissionDone = () => {
    setCurPage("GraphAllAllocation")
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
        currentPage === "login" && <Login urlBackend={urlBackend} logInDone={selectFilterDate} setURLBackend={setURLBackend}/>
      }
      {
        currentPage === "SelectDateToAllocate" && <SelectDate urlBackend={urlBackend} submissionDone={chooseDate} keywordGet={"get_allocation_dates"}/>
      }
      {
        currentPage === "tecnsInfo" && <LoadTecn urlBackend={urlBackend} submissionDone={submissionDone} />
      }
      {
        currentPage === "SelectDateAlreadyAllocated" && <SelectDate urlBackend={urlBackend} submissionDone={chooseDate} keywordGet={"get_allocatted_dates"}/>
      }
      {
        currentPage === "MakeAllocations" && <MakeAllocations urlBackend={urlBackend} date={currentDate}  submissionDone={submissionDone}/>
      }
      {
        currentPage === "LoadProjectsAllocated" && <LoadProjects urlBackend={urlBackend} submissionDone={submissionDone} date={currentDate} alreadyAllocated={true}/>
      }
      {
        currentPage === "GraphAllAllocation" && <GraphAllAllocation urlBackend={urlBackend} />
      }
      {
        currentPage === "SearchOneTecn" && <LandPageSearch  urlBackend={urlBackend}/> 
      }

    </div>
  );
}

export default App;
