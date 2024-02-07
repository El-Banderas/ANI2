
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './TaskMain.scss';
import axios from 'axios';
import ProjectCard from './ProjectCard'
import TextComponentPrimary from "../TextComponents/TextPrimary";

/**
 * This class shows the projects the tech is involved, in cards
 * It does a get request to server, to get the information.
 * @param {str} nameTech Tech name to get his projects
 * @returns 
 */
export default function TasksCards({ name , urlBackend}) {

  // Get info, equal to TaskMain...
  const [tasksInfo, setTaskInfo] = useState({})
  const [infoProjects, setInfoProjects] = useState({})
  const [tecnId, setTecnId] = useState("")

  useEffect(() => {
    getTaskInfo();
  }, [name]);

  const getTaskInfo = () => {
    const regexpSize = /([0-9]+)/;
    const match = name.match(regexpSize);
    axios.get(`${urlBackend}/tecn_projs/?tecn='${name}'`).then(
      (response) => {
        console.log(" [CARD] Receubeu resposta")
        const cleanAnswer = response['data']
        console.log(cleanAnswer)
        setTaskInfo(cleanAnswer)
        if ("projects" in cleanAnswer) {
          setInfoProjects(cleanAnswer["projects"])
          setTecnId(cleanAnswer["projects_tecn_id"])
        }
      }
    ).catch(error => console.error(`Error: ${error}`))
  }



  // Functions to create mocked info
  function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }
  const createProjectInfo = (id) => {

    return {
      "id": id,
      "Name": `Projeto${id}`,
      "Área": getRandomInt(3),
      "Fase": getRandomInt(4),
      "TecAnalise": `Zé ${id}`,
      "TecAcomp": `Zé ${id}`,
      "Tipo projeto": "Mobilizador",

    }
  }


  const defaultCardsInput = () => {
    const projectsInfo = []
    for (let i = 0; i < tasksInfo.length; i++) {
      projectsInfo.push(createProjectInfo(i))
    }
    return projectsInfo

  }


  // Render part


  const convertPhaseToString = (phaseInt) => {
    switch (phaseInt) {
      case "0":
        return "Por avaliar";
      case "1":
        return "Aprovado";
      case "2":
        return "Rejeitado";
      case "3":
        return "Concluido";
      default:
        return phaseInt.toString()
    }
  }
  const getColourByPhase = (phaseInt) => {
    switch (phaseInt) {
      case 0:
        return "#FFFFF0";
      case 1:
        return "#ADFF2F";
      case 2:
        return "#FF6347";
      case 3:
        return "#40E0D0";
    }
  }
  const commonStyles = {
    borderColor: 'text.primary',
  };

  const renderProjectInfo = (info) => {
    return <ProjectCard info={info} tecnId={tecnId} />
  }

  const convertInput = () => {
    return (
      <div className="max">
        <div className="title">
          <TextComponentPrimary text={`Projetos ${name}`} size={32} fontWeightGiven={"bold"} />
        </div>
        <div className="scrollable">
          {infoProjects.map(project => renderProjectInfo(project))}
        </div>
      </div>
    )
  }
  return (
    <div className='verticalFlex'>

      {infoProjects.length >= 0 ?
        convertInput() :
        <CircularProgress color="inherit" />
      }

    </div>

  )
}