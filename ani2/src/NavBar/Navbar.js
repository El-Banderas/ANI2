import * as React from 'react';
import './Navbar.scss'
import Ani from "./ani_corner.png";
import UminhoPNG from "./uminho_corner.png";
import IsepPNG from "./isep_corner.png";
import TextWhite from '../TextComponents/TextWhite';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function NavBar({ loggedIn, changeCurrentPage, urlBackend }) {
  const [openBackDropSucess, setOpenBackDropSucess] = React.useState(false);
  const [openBackDropWaiting, setOpenBackDropWaiting] = React.useState(false);
  const handleClose = () => {
    setOpenBackDropSucess(false);
    setOpenBackDropWaiting(false)
  };
  const handleOpen = () => {
    setOpenBackDropSucess(true);
  };
  const reloadData = () => {
    setOpenBackDropWaiting(true)
    axios.get(`${urlBackend}/reload`).then(
      (response) => {
        console.log("Receubeu resposta")
        handleOpen()
      }
    ).catch(error => console.error(`Error: ${error}`))
  }
const makeAllocation = () => {
    setOpenBackDropWaiting(true)
    axios.get(`${urlBackend}/make_allocation`).then(
      (response) => {
        console.log("Receubeu resposta")
        handleOpen()
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
  const changeURL = (url) => {
    window.open(url, "_blank")
  }

  const btnsChangePage = <div className='btns'>
    <ColorButton onClick={() => changeCurrentPage("chooseDate")} variant="outlined">Selecionar data</ColorButton  >
    <ColorButton onClick={() => changeCurrentPage("tecnInfo")} variant="outlined">Ver técnicos</ColorButton  >
    <ColorButton onClick={() => changeCurrentPage("alocatedProjs")} variant="outlined" >Projetos alocados</ColorButton  >
    <ColorButton onClick={() => changeCurrentPage("landPage")} variant="outlined">Ver alocação</ColorButton  >
    <ColorButton onClick={() => reloadData()} variant="outlined">Reload Data</ColorButton  >
  </div>
  const moreMargin = loggedIn ? "titleNavBar" : "titleNavBarWithMargin";
  return (
    <div className='flexNavBar'>

      <img src={Ani} className='ani_logo' alt="ANI logo"  onClick={() => changeURL("https://www.ani.pt/")}
/>
      <div className={moreMargin}>

        <TextWhite text={"Projeto ANI"} size={20} fontWeightGiven={"medium"} />
      </div>

      {
        loggedIn &&
        btnsChangePage
      }
      <img src={UminhoPNG} alt="UMINHO" className='uminho_logo' onClick={() => changeURL("https://www.uminho.pt/PT")}/>
      <img src={IsepPNG} alt="ISEP" className='isep_logo' onClick={() => changeURL("https://www.isep.ipp.pt/")}/>
{openBackDropWaiting && 
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openBackDropWaiting}
              onClick={() => setOpenBackDropWaiting(false)}
            >
             <CircularProgress color="inherit" />
        </Backdrop>
        }

        {openBackDropSucess && 
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openBackDropSucess}
              onClick={handleClose}
            >
                 <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                 Informação carregada com sucesso!
    </Alert>
        </Backdrop>
        }
    </div>
  )
}