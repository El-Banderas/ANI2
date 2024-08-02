
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './TaskMain.scss';
import axios from 'axios';
import ProjectCard from './ProjectCard'
import TextComponentPrimary from "../TextComponents/TextPrimary";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableProjs from "./TableProjs";

/**
 * This class shows the projects the tech is involved, in cards
 * It does a get request to server, to get the information.
 * @param {str} nameTech Tech name to get his projects
 * @returns 
 */
export default function TasksCards({ name, urlBackend }) {

  // Get info, equal to TaskMain...
  const [tasksInfo, setTaskInfo] = useState({})
  const [infoProjects, setInfoProjects] = useState({})
  const [tecnId, setTecnId] = useState("")
  const [tableOrCard, setTableOrCard] = useState(true)

  useEffect(() => {
    getTaskInfo();
  }, [name]);

  const getTaskInfo = () => {
    const regexpSize = /([0-9]+)/;
    const match = name.match(regexpSize);
    console.log(`${urlBackend}/tecns/tecn_projs/?tecn='${name}'`)
    axios.get(`${urlBackend}/tecns/tecn_projs/?tecn='${name}'`).then(
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
    return <ProjectCard key={info.id} info={info} tecnId={tecnId} />
  }

  const switchChanged = (event) => {
    setTableOrCard(event.target.checked)
  }

  const convertInput = () => {
    return (
      <div className="max">
        <div className="title">
          <TextComponentPrimary text={`Projetos ${name}`} size={32} fontWeightGiven={"bold"} />
        </div>
        <div className="verticalFlex1">
        <FormGroup>
      <FormControlLabel control={<Switch defaultChecked  onChange={switchChanged}/>} label="Tabela" />
          </FormGroup>
          {
            tableOrCard && <TableProjs info={infoProjects} /> 
            }

          {
            !tableOrCard && 
          <div className="scrollable">
            {infoProjects.map(project => renderProjectInfo(project))}
          </div>

          }
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