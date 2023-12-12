import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import './Navbar.scss'
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import AniSvg from "./aniLogo.svg";
import UminhoPNG from "./uminho.png";
import IsepPNG from "./isep.png";

export default function NavBar() {

const useStyles = makeStyles({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
});

    return (
 <div className='flexNavBar'>
         <img src={AniSvg} className='ani_logo' alt="Your SVG" />
         <div className='titleNavBar'>
            
          <h2
          >
          Projeto ANI
          </h2>
</div>
         <img src={UminhoPNG}  alt="UMINHO" className='uminho_logo'/>
         <img src={IsepPNG}  alt="ISEP" className='isep_logo'/>
          
    </div>
    )
}