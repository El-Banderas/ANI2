import * as React from 'react';
import './Navbar.scss'
import Ani from "./ani_corner.png";
import UminhoPNG from "./uminho_corner.png";
import IsepPNG from "./isep_corner.png";
import TextWhite from '../TextComponents/TextWhite';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';

export default function NavBar({ loggedIn, changeCurrentPage, urlBackend }) {
  
  const reloadData = () => {
    axios.get(`${urlBackend}/reload`).then(
          (response) => {
            console.log("Receubeu resposta")
          }
        ).catch(error => console.error(`Error: ${error}`))
  }


    const ColorButton = styled(Button)(({ theme }) => ({
        backgroundColor: "#FC848C",
        borderColor: "white",
        color: "white",
        fontSize: "10px",
        height: "5vh",
        '&:hover': {
            backgroundColor: "#fb505c",
        },
    }));

    const btnsChangePage = <div className='btns'>
        <ColorButton onClick={() => changeCurrentPage("tecnInfo")} variant="outlined">Ver técnicos</ColorButton  >
        <ColorButton onClick={() => changeCurrentPage("loadProjects")} variant="outlined" >Muda projetos</ColorButton  >
        <ColorButton onClick={() => changeCurrentPage("landPage")} variant="outlined">Ver alocação</ColorButton  >
        <ColorButton onClick={() => reloadData()} variant="outlined">Reload Data</ColorButton  >
    </div>
      const moreMargin = loggedIn ? "titleNavBar" : "titleNavBarWithMargin";
    return (
        <div className='flexNavBar'>
            <img src={Ani} className='ani_logo' alt="Your SVG" />
            <div className={moreMargin}>

                <TextWhite text={"Projeto ANI"} size={20} fontWeightGiven={"medium"} />
            </div>

            {
                loggedIn &&
                btnsChangePage
            }
            <img src={UminhoPNG} alt="UMINHO" className='uminho_logo' />
            <img src={IsepPNG} alt="ISEP" className='isep_logo' />
        </div>
    )
}