import * as React from 'react';
import './Navbar.scss'
import Ani from "./ani_corner.png";
import UminhoPNG from "./uminho_corner.png";
import IsepPNG from "./isep_corner.png";
import TextWhite from '../TextComponents/TextWhite';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export default function NavBar({ loggedIn, changeCurrentPage, reloadData }) {

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
        <ColorButton onClick={() => changeCurrentPage("loadProjects")} variant="outlined" >Muda projetos</ColorButton  >
        <ColorButton onClick={() => changeCurrentPage("landPage")} variant="outlined">Vê configuração</ColorButton  >
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