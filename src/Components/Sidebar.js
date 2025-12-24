import React, {useState} from "react";
import "../Components/ComponentStyles/Sidebar.css"
import Lightmode from '../images/SunDim.svg';
import Darkmode from '../images/darkmode.svg';
import { Link } from "react-router-dom";

export default function Sidebar(){
    const [isMode, setIsMode] = useState(`${Lightmode}`)
    function changeMode(){
        setIsMode((ModeContainer) => 
        ModeContainer === `${Lightmode}`? `${Darkmode}` : `${Lightmode}`)
    }
    return(
        <div className="Sidebar">
 <ul className="List">
 <li><ActiveLink className='link' to="My_Portfolio/" > Home</ActiveLink></li>
                <li><ActiveLink className='link'  to="My_Portfolio/projects"> Project</ActiveLink></li>
                <li><ActiveLink className='link' to="My_Portfolio/blog"> Blog</ActiveLink></li>
                <li><ActiveLink className='link' to="My_Portfolio/about" > About</ActiveLink></li>
                <li><ActiveLink className='link' to='My_Portfolio/contact' > Contact</ActiveLink></li>
<div className="line"></div>
             
             <div className=" mode side">
             <img onClick={changeMode} src={isMode} />  
              </div>
             
            </ul>
        </div>
    )
}
function ActiveLink({to, children, ...props}){
    const path = window.location.pathname
    
    return(
        <li className={path === to ? "active" : ""}>
             <Link to={to} {...props}>{children}</Link></li>
    )
    }