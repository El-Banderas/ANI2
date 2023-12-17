import * as React from 'react';
import './Navbar.scss'
import Ani from "./ani_corner.png";
import UminhoPNG from "./uminho_corner.png";
import IsepPNG from "./isep_corner.png";
import TextWhite from '../TextComponents/TextWhite';

export default function NavBar() {


    return (
 <div className='flexNavBar'>
         <img src={Ani} className='ani_logo' alt="Your SVG" />
         <div className='titleNavBar'>
            
                    <TextWhite text={"Projeto ANI"} size={20} fontWeightGiven={"medium"} />
</div>
         <img src={UminhoPNG}  alt="UMINHO" className='uminho_logo'/>
         <img src={IsepPNG}  alt="ISEP" className='isep_logo'/>
    </div>
    )
}