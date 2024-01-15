import React, {useState} from "react";
import "../Components/ComponentStyles/Sidebar.css"
import Lightmode from '../images/SunDim.svg';
import Darkmode from '../images/darkmode.svg';

export default function Sidebar(){
    const [isMode, setIsMode] = useState(`${Lightmode}`)
    function changeMode(){
        setIsMode((ModeContainer) => 
        ModeContainer === `${Lightmode}`? `${Darkmode}` : `${Lightmode}`)
    }
    return(
        <div className="Sidebar">
 <ul className="List">
                <li>Home</li>
                <li>About</li>
                <li>Project</li>
                <li>Blog</li>
                <li>Contacts</li>
<div className="line"></div>
             
             <div className=" mode side">
             <img onClick={changeMode} src={isMode} />  
              </div>
             
            </ul>
        </div>
    )
}